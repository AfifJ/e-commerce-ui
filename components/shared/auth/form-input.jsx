import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function FormInput({
  label,
  type = "text",
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
  className,
  ...props
}) {
  const inputId = id || name;

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-foreground flex items-center gap-1"
        >
          {label}
          {required && <span className="text-destructive">*</span>}
        </label>
      )}

      <Input
        type={type}
        id={inputId}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        placeholder={placeholder}
        className={cn(
          error && "border-destructive focus-visible:ring-destructive/20",
          disabled && "bg-muted cursor-not-allowed",
          className
        )}
        {...props}
      />

      {(error || helperText) && (
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

export default FormInput;