import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/** Eski URL’ler ve CMS’te kalan slug; tek iletişim sayfası /contact */
const LEGACY_CONSULT_PATH = '/book-consultation'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname === LEGACY_CONSULT_PATH || pathname === `${LEGACY_CONSULT_PATH}/`) {
    const url = request.nextUrl.clone()
    url.pathname = '/contact'
    url.search = ''
    return NextResponse.redirect(url, 308)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/book-consultation', '/book-consultation/'],
}
