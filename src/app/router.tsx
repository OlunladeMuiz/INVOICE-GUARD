export type Route =
  | { type: 'list' }
  | { type: 'detail'; id: string }
  | { type: 'notfound' }

export function readRoute(): Route {
  const pathname = window.location.pathname
  if (pathname === '/' || pathname === '') {
    return { type: 'list' }
  }

  const match = pathname.match(/^\/invoice\/([^/]+)$/)
  if (match) {
    return { type: 'detail', id: decodeURIComponent(match[1]) }
  }

  return { type: 'notfound' }
}

export function navigateTo(pathname: string): void {
  if (window.location.pathname !== pathname) {
    window.history.pushState({}, '', pathname)
  }
}
