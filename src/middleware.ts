export { auth as middleware } from '@/auth'
export const config = {
  matcher: ['/((?!login|signup|onboarding|api|_next/static|_next/image|favicon.ico).*)'],
}
