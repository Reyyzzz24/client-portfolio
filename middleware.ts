import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  // 1. Proteksi Admin: Jika belum login, paksa ke login
  if (!session && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // 2. Proteksi Login: Jika sudah login, jangan biarkan kembali ke login
  if (session && request.nextUrl.pathname.startsWith('/auth/login')) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return response
}

export const config = {
  // Pastikan matcher tidak menangkap asset statis seperti _next/static, images, dll
  matcher: [
    '/admin/:path*', 
    '/auth/login',
    // Gunakan regex untuk menghindari error pada file statis
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}