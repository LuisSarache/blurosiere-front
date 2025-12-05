import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

export const Button = forwardRef(({ 
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}, ref) => {
  const baseClasses = 'btn-base inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'btn-primary text-white shadow-lg hover:shadow-xl focus:ring-primary-500',
    secondary: 'btn-secondary text-white focus:ring-primary-500',
    outline: 'bg-transparent border-2 border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white focus:ring-primary-500',
    ghost: 'bg-transparent text-white hover:bg-white/10 focus:ring-primary-500',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 focus:ring-red-500'
  };
  
  const sizes = {
    xs: 'px-2 py-1 text-xs rounded-md',
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-4 py-2 text-base rounded-lg',
    lg: 'px-6 py-3 text-lg rounded-xl',
    xl: 'px-8 py-4 text-xl rounded-2xl'
  };

  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={isDisabled}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!loading && leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
      <span className={loading ? 'opacity-70' : ''}>{children}</span>
      {!loading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </button>
  );
});

Button.displayName = 'Button';