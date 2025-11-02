import { db } from '../db';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'mysql',
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: false,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },
  // URL configuration
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  // Default redirect URLs - disable to let client handle
  successRedirectUrl: false,
  errorRedirectUrl: "/auth/login",
  // Authentication redirects
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    }
  },
  // Account management
  account: {
    enabled: true,
    redirectUrl: '/',
  },
  // Social providers configuration
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    },
  },
  // Admin configuration
  admin: {
    enabled: true,
    defaultRole: 'customer',
    roles: ['admin', 'vendor', 'sales', 'mitra', 'customer'],
  },
  // Advanced configuration
  advanced: {
    defaultUserRole: 'customer',
    database: {
      generateId: () => crypto.randomUUID(),
    }
  },
  // Custom user data with additional fields
  user: {
    additionalFields: {
      phone: {
        type: 'string',
        required: true,
      },
      phoneVerified: {
        type: 'boolean',
        required: false,
        defaultValue: false,
      },
      isActive: {
        type: 'boolean',
        required: false,
        defaultValue: true,
      },
      role: {
        type: 'string',
        required: false,
        defaultValue: 'customer',
      },
      username: {
        type: 'string',
        required: true,
      },
      image: {
        type: 'string',
        required: false,
        defaultValue: null,
      },
      currentHotelId: {
        type: 'string',
        required: false,
        defaultValue: null,
      },
      lastLogin: {
        type: 'date',
        required: false,
        defaultValue: null,
      },
    },
  },
  // Custom redirects based on role
  redirects: {
    afterSignIn: async (ctx) => {
      // Get user role from session
      const user = ctx.user;
      if (!user) return '/';

      switch (user.role) {
        case 'admin':
          return '/admin/dashboard';
        case 'vendor':
          return '/vendor/dashboard';
        case 'sales':
          return '/sales/dashboard';
        case 'mitra':
          return '/mitra/dashboard';
        case 'customer':
        default:
          return '/';
      }
    }
  },
});
