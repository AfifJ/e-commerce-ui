import { z } from 'zod'

// Schema untuk register form
export const registerSchema = z.object({
  username: z
    .string()
    .min(1, 'Username wajib diisi')
    .min(3, 'Username minimal 3 karakter')
    .max(20, 'Username maksimal 20 karakter')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username hanya boleh mengandung huruf, angka, dan underscore'),
  name: z
    .string()
    .min(1, 'Nama wajib diisi')
    .min(2, 'Nama minimal 2 karakter')
    .max(50, 'Nama maksimal 50 karakter')
    .regex(/^[a-zA-Z\s]+$/, 'Nama hanya boleh mengandung huruf dan spasi'),
  email: z
    .string()
    .min(1, 'Email wajib diisi')
    .email('Format email tidak valid')
    .max(100, 'Email maksimal 100 karakter'),
  phone: z
    .string()
    .min(1, 'Nomor HP wajib diisi')
    .regex(/^(\+62|62|0)[0-9]{9,13}$/, 'Format nomor HP tidak valid. Contoh: +628123456789')
    .max(15, 'Nomor HP terlalu panjang'),
  password: z
    .string()
    .min(1, 'Password wajib diisi')
    .min(8, 'Password minimal 8 karakter')
    .max(100, 'Password maksimal 100 karakter'),
  confirmPassword: z
    .string()
    .min(1, 'Konfirmasi password wajib diisi'),
  agreeToTerms: z
    .boolean()
    .refine(val => val === true, 'Anda harus menyetujui syarat dan ketentuan')
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'Password tidak cocok',
    path: ['confirmPassword']
  }
)

// Export validation function
export function validateRegister(data) {
  return registerSchema.safeParse(data)
}