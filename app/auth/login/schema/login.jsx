import { z } from 'zod'

// Schema untuk login form
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email wajib diisi')
    .email('Format email tidak valid'),
  password: z
    .string()
    .min(1, 'Password wajib diisi')
    .min(1, 'Password tidak boleh kosong'),
  rememberMe: z.boolean().default(false)
})

// Schema untuk forgot password form
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email wajib diisi')
    .email('Format email tidak valid')
})

// Export validation functions
export function validateLogin(data) {
  return loginSchema.safeParse(data)
}

export function validateForgotPassword(data) {
  return forgotPasswordSchema.safeParse(data)
}