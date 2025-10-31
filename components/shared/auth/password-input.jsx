import { useState } from "react";
import { Eye, EyeOff, Lock, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function PasswordInput({
  label,
  id,
  name,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  required = false,
  disabled = false,
  placeholder,
  showStrengthIndicator = false,
  className,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputId = id || name;

  // Password strength calculation
  const calculatePasswordStrength = (password) => {
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

  const passwordStrength = calculatePasswordStrength(value);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-foreground flex items-center gap-1"
        >
          <Lock className="w-4 h-4" />
          {label}
          {required && <span className="text-destructive">*</span>}
        </label>
      )}

      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          onFocus={() => setIsFocused(true)}
          disabled={disabled}
          placeholder={placeholder}
          className={cn(
            "pr-10", // Space for the toggle button
            error && "border-destructive focus-visible:ring-destructive/20",
            disabled && "bg-muted cursor-not-allowed",
            className
          )}
          {...props}
        />

        {/* Password Toggle Button */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={togglePasswordVisibility}
          disabled={disabled}
          className="absolute right-0 top-0 h-9 w-9 hover:bg-transparent"
          tabIndex="-1"
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4 text-muted-foreground" />
          ) : (
            <Eye className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      </div>

      {/* Password Strength Indicator */}
      {showStrengthIndicator && value && isFocused && (
        <div className="space-y-2">
          {/* Strength Bar */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full transition-all duration-300 ease-out",
                  passwordStrength.color
                )}
                style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
              />
            </div>
            {passwordStrength.score > 0 && (
              passwordStrength.score >= 3 ? (
                <CheckCircle className="w-4 h-4 text-success-foreground" />
              ) : (
                <XCircle className="w-4 h-4 text-warning-foreground" />
              )
            )}
          </div>

          {/* Strength Text */}
          {passwordStrength.text && (
            <p className={cn(
              "text-xs font-medium",
              passwordStrength.score >= 3 ? "text-success" : "text-warning"
            )}>
              Kekuatan password: {passwordStrength.text}
            </p>
          )}

          {/* Requirements */}
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-medium">Password harus mengandung:</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li className={cn(/.{8,}/.test(value) ? "text-success" : "")}>
                • Minimal 8 karakter
              </li>
              <li className={cn(/[A-Z]/.test(value) ? "text-success" : "")}>
                • Huruf besar (A-Z)
              </li>
              <li className={cn(/[a-z]/.test(value) ? "text-success" : "")}>
                • Huruf kecil (a-z)
              </li>
              <li className={cn(/[0-9]/.test(value) ? "text-success" : "")}>
                • Angka (0-9)
              </li>
              <li className={cn(/[!@#$%^&*(),.?":{}|<>]/.test(value) ? "text-success" : "")}>
                • Karakter special (!@#$%^&*dll)
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Helper Text or Error */}
      {(error || helperText) && !showStrengthIndicator && (
        <p className={cn(
          "text-xs",
          error ? "text-destructive" : "text-muted-foreground"
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  );
}

export default PasswordInput;