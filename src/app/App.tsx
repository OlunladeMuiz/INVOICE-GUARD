import {
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react'
import type { Invoice, InvoiceStatus, InvoiceFormValues } from '../types/invoice'
import type { ThemeMode } from '../types/theme'
import { seedInvoices } from '../data/seedInvoices'
import { STORAGE_KEYS, loadStoredValue, saveStoredValue } from '../utils/storage'
import {
  getTotalLabel,
  invoiceStatuses,
  createInvoiceFromForm,
} from '../utils/invoice'
import { readRoute, navigateTo, type Route } from './router'
import { PageShell } from '../components/layout/PageShell'
import { Sidebar } from '../components/layout/Sidebar'
import { MobileHeader } from '../components/layout/MobileHeader'
import { InvoiceListPage } from '../pages/InvoiceListPage'
import { InvoiceDetailPage } from '../pages/InvoiceDetailPage'
import { InvoiceFormDrawer } from '../components/invoice/InvoiceFormDrawer'
import { DeleteModal } from '../components/shared/DeleteModal'
import '../styles/tokens.css'
import '../styles/globals.css'
import '../App.css'

type DrawerState =
  | { mode: 'create' }
  | { mode: 'edit'; invoice: Invoice }

type SaveMode = 'draft' | 'submit'

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(() =>
    loadStoredValue<ThemeMode>(STORAGE_KEYS.theme, 'light'),
  )
  const [invoices, setInvoices] = useState<Invoice[]>(() =>
    loadStoredValue<Invoice[]>(STORAGE_KEYS.invoices, seedInvoices),
  )
  const [route, setRoute] = useState<Route>(() => readRoute())
  const [drawer, setDrawer] = useState<DrawerState | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Invoice | null>(null)
  const [selectedFilters, setSelectedFilters] = useState<InvoiceStatus[]>([])
  const [filterOpen, setFilterOpen] = useState(false)
  const filterRef = useRef<HTMLDivElement>(null)

  // Persist theme
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    saveStoredValue(STORAGE_KEYS.theme, theme)
  }, [theme])

  // Persist invoices
  useEffect(() => {
    saveStoredValue(STORAGE_KEYS.invoices, invoices)
  }, [invoices])

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = () => setRoute(readRoute())
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Handle filter clicking outside
  useEffect(() => {
    if (!filterOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      if (!filterRef.current?.contains(event.target as Node)) {
        setFilterOpen(false)
      }
    }

    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setFilterOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [filterOpen])

  // Handle body scroll lock
  useEffect(() => {
    document.body.classList.toggle('no-scroll', Boolean(drawer || deleteTarget))
    return () => {
      document.body.classList.remove('no-scroll')
    }
  }, [drawer, deleteTarget])

  const filteredInvoices =
    selectedFilters.length === 0
      ? invoices
      : invoices.filter((invoice) => selectedFilters.includes(invoice.status))

  const currentInvoice =
    route.type === 'detail'
      ? invoices.find((invoice) => invoice.id === route.id) ?? null
      : null

  const navigate = useCallback((pathname: string) => {
    navigateTo(pathname)
    setRoute(readRoute())
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setFilterOpen(false)
  }, [])

  const openCreateDrawer = useCallback(() => setDrawer({ mode: 'create' }), [])

  const openEditDrawer = useCallback((invoice: Invoice) => {
    setDrawer({ mode: 'edit', invoice })
  }, [])

  const closeDrawer = useCallback(() => setDrawer(null), [])

  const upsertInvoice = useCallback((nextInvoice: Invoice) => {
    setInvoices((current) => {
      const exists = current.some((invoice) => invoice.id === nextInvoice.id)
      if (!exists) return [nextInvoice, ...current]
      return current.map((invoice) =>
        invoice.id === nextInvoice.id ? nextInvoice : invoice,
      )
    })
  }, [])

  const removeInvoice = useCallback(
    (invoiceId: string) => {
      setInvoices((current) => current.filter((invoice) => invoice.id !== invoiceId))
      if (route.type === 'detail' && route.id === invoiceId) {
        navigate('/')
      }
    },
    [route, navigate],
  )

  const markAsPaid = useCallback((invoiceId: string) => {
    setInvoices((current) =>
      current.map((invoice) =>
        invoice.id === invoiceId ? { ...invoice, status: 'paid' } : invoice,
      ),
    )
  }, [])

  const handleSubmit = useCallback(
    (values: InvoiceFormValues, mode: SaveMode) => {
      const targetInvoice = drawer?.mode === 'edit' ? drawer.invoice : null
      const nextStatus: InvoiceStatus =
        mode === 'draft'
          ? 'draft'
          : targetInvoice?.status === 'draft'
            ? 'pending'
            : targetInvoice?.status ?? 'pending'

      const nextInvoice = createInvoiceFromForm(
        values,
        nextStatus,
        invoices.map((invoice) => invoice.id),
        targetInvoice?.id,
      )

      upsertInvoice(nextInvoice)
      closeDrawer()
      navigate(`/invoice/${nextInvoice.id}`)
    },
    [drawer, invoices, upsertInvoice, closeDrawer, navigate],
  )

  const handleToggleFilter = useCallback((status: InvoiceStatus | 'all', checked: boolean) => {
    if (status === 'all') {
      setSelectedFilters([])
      return
    }

    setSelectedFilters((current) => {
      const next = checked
        ? [...current, status].filter((value, index, array) => array.indexOf(value) === index)
        : current.filter((value) => value !== status)

      return next.length === invoiceStatuses.length ? [] : next
    })
  }, [])

  const subtitle = getTotalLabel(invoices.length, selectedFilters, filteredInvoices.length)

  const page = (() => {
    if (route.type === 'detail') {
      if (!currentInvoice) {
        return (
          <NotFoundState
            onHome={() => navigate('/')}
            label="That invoice could not be found."
          />
        )
      }

      return (
        <InvoiceDetailPage
          invoice={currentInvoice}
          onBack={() => navigate('/')}
          onEdit={openEditDrawer}
          onDelete={setDeleteTarget}
          onMarkAsPaid={markAsPaid}
        />
      )
    }

    if (route.type === 'notfound') {
      return (
        <NotFoundState
          onHome={() => navigate('/')}
          label="That page does not exist."
        />
      )
    }

    return (
      <InvoiceListPage
        subtitle={subtitle}
        invoices={filteredInvoices}
        totalInvoices={invoices.length}
        onCreate={openCreateDrawer}
        onOpenInvoice={(invoiceId) => navigate(`/invoice/${invoiceId}`)}
        filterOpen={filterOpen}
        setFilterOpen={setFilterOpen}
        filterRef={filterRef}
        selectedFilters={selectedFilters}
        onToggleFilter={handleToggleFilter}
      />
    )
  })()

  return (
    <div className="app-shell">
      <Sidebar
        theme={theme}
        onHome={() => navigate('/')}
        onToggleTheme={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))}
      />
      <MobileHeader
        theme={theme}
        onHome={() => navigate('/')}
        onToggleTheme={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))}
      />

      <PageShell>{page}</PageShell>

      {drawer ? (
        <InvoiceFormDrawer
          key={drawer.mode === 'edit' ? drawer.invoice.id : 'create'}
          drawer={drawer}
          onClose={closeDrawer}
          onSubmit={handleSubmit}
        />
      ) : null}

      {deleteTarget ? (
        <DeleteModal
          invoice={deleteTarget}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={() => {
            removeInvoice(deleteTarget.id)
            setDeleteTarget(null)
          }}
        />
      ) : null}
    </div>
  )
}

function NotFoundState({
  label,
  onHome,
}: {
  label: string
  onHome: () => void
}) {
  return (
    <section className="empty-state">
      <div className="empty-state__art" aria-hidden="true">
        <div className="empty-state__orbit empty-state__orbit--one" />
        <div className="empty-state__orbit empty-state__orbit--two" />
        <div className="empty-state__card" />
      </div>
      <h2>{label}</h2>
      <p>Return to the invoice list to keep moving.</p>
      <button type="button" className="button button--primary" onClick={onHome}>
        Back to invoices
      </button>
    </section>
  )
}
