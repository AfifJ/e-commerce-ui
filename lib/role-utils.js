// Utility functions for role management
import { ROLES } from './constants';

/**
 * Check if user has admin role
 */
export function isAdmin(roleName) {
  return roleName === ROLES.ADMIN;
}

/**
 * Check if user can access admin routes
 */
export function canAccessAdmin(roleName) {
  return roleName === ROLES.ADMIN || roleName === ROLES.VENDOR;
}

/**
 * Get redirect path based on user role
 */
export function getRedirectPath(roleName) {
  switch (roleName) {
    case ROLES.ADMIN:
      return '/admin/dashboard';
    case ROLES.VENDOR:
      return '/vendor/dashboard';
    case ROLES.SALES:
      return '/sales/dashboard';
    case ROLES.MITRA:
      return '/mitra/dashboard';
    case ROLES.CUSTOMER:
    default:
      return '/';
  }
}

/**
 * Format user object with role information
 */
export function formatUserWithRole(user) {
  if (!user) return null;

  return {
    ...user,
    role: user.role || ROLES.CUSTOMER,
  };
}