import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { formatUserWithRole, canAccessAdmin, isAdmin } from "@/lib/role-utils";

/**
 * Reusable Role Guard component for protecting routes based on user roles
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The protected content
 * @param {string[]} props.allowedRoles - Array of role names that can access this route
 * @param {string} props.redirectTo - Path to redirect to if user doesn't have access
 * @param {boolean} props.requireAuth - Whether authentication is required at all
 */
export default async function RoleGuard({
  children,
  allowedRoles = [],
  redirectTo = "/auth/login",
  requireAuth = true
}) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  // If authentication is required and user is not authenticated
  if (requireAuth && !session?.user) {
    redirect(redirectTo);
  }

  // If user is authenticated but has no role, assign default customer role
  const user = formatUserWithRole(session?.user);

  // If no specific roles are required and user is authenticated, allow access
  if (allowedRoles.length === 0 && user) {
    return <>{children}</>;
  }

  // Check if user has required role
  const hasAccess = allowedRoles.includes(user?.role);

  if (!hasAccess) {
    // If user doesn't have access, redirect to appropriate path based on their role
    const redirectPath = getFallbackRedirectPath(user?.role);
    redirect(redirectPath);
  }

  return <>{children}</>;
}

/**
 * Fallback redirect paths based on user role when they don't have access
 */
function getFallbackRedirectPath(userRole) {
  switch (userRole) {
    case 'admin':
      return '/admin/dashboard';
    case 'vendor':
      return '/vendor/dashboard';
    case 'sales':
      return '/sales/dashboard';
    case 'mitra':
      return '/mitra/dashboard';
    case 'customer':
      return '/account';
    default:
      return '/auth/login';
  }
}

/**
 * Pre-configured role guards for common use cases
 */

/**
 * Admin only routes - only Admin role can access
 */
export function AdminGuard({ children }) {
  return (
    <RoleGuard
      allowedRoles={['admin']}
      redirectTo="/unauthorized"
    >
      {children}
    </RoleGuard>
  );
}

/**
 * Admin and Vendor routes - Admin and Vendor roles can access
 */
export function AdminVendorGuard({ children }) {
  return (
    <RoleGuard
      allowedRoles={['admin', 'vendor']}
      redirectTo="/unauthorized"
    >
      {children}
    </RoleGuard>
  );
}

/**
 * Authenticated users only - any authenticated user can access
 */
export function AuthGuard({ children }) {
  return (
    <RoleGuard
      requireAuth={true}
      redirectTo="/auth/login"
    >
      {children}
    </RoleGuard>
  );
}

/**
 * Guest only routes - only non-authenticated users can access
 */
export function GuestGuard({ children }) {
  const session = auth.api.getSession({
    headers: headers()
  });

  // If user is authenticated, redirect them to their dashboard
  if (session?.user) {
    const user = formatUserWithRole(session.user);
    redirect(getFallbackRedirectPath(user?.role));
  }

  return <>{children}</>;
}

/**
 * Custom role guard with admin access check
 */
export function AdminAccessGuard({ children }) {
  return (
    <RoleGuard
      allowedRoles={['admin', 'vendor']}
      redirectTo="/unauthorized"
    >
      {children}
    </RoleGuard>
  );
}