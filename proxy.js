import { NextResponse } from 'next/server';
import { auth } from './lib/auth';

// Define public routes that don't require authentication
const publicRoutes = [
  '/',
  '/home',
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/auth',
];

// Define API routes that should be excluded from middleware
const apiRoutes = [
  '/api/auth',
];

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for API routes and static files
  if (
    apiRoutes.some(route => pathname.startsWith(route)) ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if the current route is public
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );

  try {
    // Get session using Better Auth
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    // If no session and trying to access protected routes, redirect to root
    if (!session?.user && !isPublicRoute) {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }

    // If session exists and user is on root or home, redirect based on role
    if (session?.user && (pathname === '/' || pathname === '/home')) {
      const { role } = session.user;
      const url = request.nextUrl.clone();
      
      // Redirect based on user role
      switch (role) {
        case 'admin':
          url.pathname = '/admin/dashboard';
          break;
        case 'vendor':
          url.pathname = '/vendor/dashboard';
          break;
        case 'sales':
          url.pathname = '/sales/dashboard';
          break;
        case 'mitra':
          url.pathname = '/mitra/dashboard';
          break;
        case 'customer':
        default:
          url.pathname = '/account';
          break;
      }
      
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware auth error:', error);
    
    // If there's an error checking the session and it's not a public route, redirect to root
    if (!isPublicRoute) {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
    
    return NextResponse.next();
  }
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
