import { useState, forwardRef } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

export const Input = forwardRef(({ 
  label, 
  type = 'text', 
  error, 
  success,
  helperText,
  leftIcon,
  rightIcon,
  className = '', 
  id,
  required = false,
  disabled = false,
  autoComplete,
  ...props 
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = error ? `${inputId}-error` : undefined;
  const helperId = helperText ? `${inputId}-helper` : undefined;
  
  const hasError = Boolean(error);
  const hasSuccess = Boolean(success) && !hasError;
  
  const inputClasses = `
    input-base
    ${leftIcon ? '!pl-12' : 'pl-4'}
    ${rightIcon || isPassword || hasError || hasSuccess ? '!pr-12' : 'pr-4'}
    ${hasError ? 'input-error border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
    ${hasSuccess ? 'border-green-500 focus:border-green-500 focus:ring-green-500/20' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className="space-y-2">
      {label && (
        <label 
          htmlFor={inputId} 
          className={`
            block text-sm font-semibold transition-colors
            ${hasError ? 'text-red-400' : hasSuccess ? 'text-green-400' : 'text-white'}
          `}
        >
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none z-10">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          id={inputId}
          type={inputType}
          className={inputClasses}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={[errorId, helperId].filter(Boolean).join(' ') || undefined}
          disabled={disabled}
          required={required}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoComplete={autoComplete || 'off'}
          {...props}
        />
        
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 z-10">
          {hasError && (
            <AlertCircle className="w-4 h-4 text-red-400" />
          )}
          
          {hasSuccess && !isPassword && (
            <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
          
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-white/40 hover:text-white/60 transition-colors p-1 rounded"
              aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              tabIndex={0}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}
          
          {rightIcon && !isPassword && !hasError && !hasSuccess && (
            <div className="text-white/40">
              {rightIcon}
            </div>
          )}
        </div>
      </div>
      
      {error && (
        <p id={errorId} className="text-sm text-red-400 flex items-center gap-1.5 font-medium" role="alert">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p id={helperId} className="text-xs text-white/50">
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
