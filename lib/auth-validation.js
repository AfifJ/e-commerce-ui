// Email validation regex
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password requirements
export const PASSWORD_REQUIREMENTS = {
  minLength: 8,
  hasUppercase: /[A-Z]/,
  hasLowercase: /[a-z]/,
  hasNumber: /[0-9]/,
  hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/
};

// Validate email
export const validateEmail = (email) => {
  if (!email) return "Email wajib diisi";
  if (!EMAIL_REGEX.test(email)) return "Format email tidak valid";
  return "";
};

// Validate password
export const validatePassword = (password) => {
  if (!password) return "Password wajib diisi";
  if (password.length < PASSWORD_REQUIREMENTS.minLength) {
    return `Password minimal ${PASSWORD_REQUIREMENTS.minLength} karakter`;
  }
  if (!PASSWORD_REQUIREMENTS.hasUppercase.test(password)) {
    return "Password harus mengandung huruf besar";
  }
  if (!PASSWORD_REQUIREMENTS.hasLowercase.test(password)) {
    return "Password harus mengandung huruf kecil";
  }
  if (!PASSWORD_REQUIREMENTS.hasNumber.test(password)) {
    return "Password harus mengandung angka";
  }
  return "";
};

// Validate name
export const validateName = (name) => {
  if (!name) return "Nama wajib diisi";
  if (name.length < 2) return "Nama minimal 2 karakter";
  if (name.length > 50) return "Nama maksimal 50 karakter";
  return "";
};

// Check password strength
export const checkPasswordStrength = (password) => {
  if (!password) return { score: 0, text: "", color: "" };

  let score = 0;
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  };

  score = Object.values(checks).filter(Boolean).length;

  const strengthLevels = [
    { score: 0, text: "", color: "" },
    { score: 1, text: "Sangat Lemah", color: "bg-red-500" },
    { score: 2, text: "Lemah", color: "bg-orange-500" },
    { score: 3, text: "Sedang", color: "bg-yellow-500" },
    { score: 4, text: "Kuat", color: "bg-blue-500" },
    { score: 5, text: "Sangat Kuat", color: "bg-green-500" }
  ];

  return strengthLevels[score];
};

// Sanitize input
export const sanitizeInput = (input) => {
  return input.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
};

// Format error messages
export const formatErrorMessage = (error) => {
  if (typeof error === "string") return error;
  if (error?.message) return error.message;
  return "Terjadi kesalahan. Silakan coba lagi.";
};

// Generate random token for reset password
export const generateToken = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};