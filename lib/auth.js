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
    generateId: () => crypto.randomUUID(),
    defaultUserRole: 'buyer',
  },
  // Custom user data
  user: {
    additionalFields: {
      role: {
        type: 'string',
        required: true,
        defaultValue: 'buyer',
      },
      phone: {
        type: 'string',
        required: true,
      },
      phoneVerifiedAt: {
        type: 'date',
        required: false,
      },
      isActive: {
        type: 'boolean',
        required: false,
        defaultValue: true,
      },
    },
  },
  // Session configuration
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
});
