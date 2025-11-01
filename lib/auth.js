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
  },
  // Role-based configuration
  advanced: {
    database: {
      generateId: () => crypto.randomUUID(),
    },
    defaultUserRole: 'customer',
  },
  // Custom user data
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
    },
  },
  // Session configuration
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
});
