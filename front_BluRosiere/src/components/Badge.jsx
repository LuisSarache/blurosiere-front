import { forwardRef } from 'react';

export const Badge = forwardRef(({ 
  children, 
  variant = 'default',
  size = 'md',
  className = '',
  ...props 
}, ref) => {
  const variants = {
    default: 'bg-primary-500/20 text-primary-300 border-primary-500/30',
    secondary: 'bg-secondary-500/20 text-secondary-300 border-secondary-500/30',
    success: 'bg-green-500/20 text-green-300 border-green-500/30',
    warning: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    error: 'bg-red-500/20 text-red-300 border-red-500/30',
    outline: 'bg-transparent text-white border-white/30',
    solid: 'bg-primary-500 text-white border-primary-500'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base'
  };

  return (
    <span
      ref={ref}
      className={`
        inline-flex items-center
        font-medium
        rounded-full
        border
        transition-colors
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';

// Badge com ícone
export const IconBadge = forwardRef(({ 
  icon: Icon, 
  children, 
  iconPosition = 'left',
  ...props 
}, ref) => {
  return (
    <Badge ref={ref} {...props}>
      {iconPosition === 'left' && Icon && <Icon className="w-3 h-3 mr-1" />}
      {children}
      {iconPosition === 'right' && Icon && <Icon className="w-3 h-3 ml-1" />}
    </Badge>
  );
});

IconBadge.displayName = 'IconBadge';

// Badge com ponto de status
export const StatusBadge = forwardRef(({ 
  status = 'default',
  children,
  showDot = true,
  ...props 
}, ref) => {
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-500',
    busy: 'bg-red-500',
    away: 'bg-yellow-500',
    default: 'bg-primary-500'
  };

  const statusVariants = {
    online: 'success',
    offline: 'secondary',
    busy: 'error',
    away: 'warning',
    default: 'default'
  };

  return (
    <Badge ref={ref} variant={statusVariants[status]} {...props}>
      {showDot && (
        <span className={`w-2 h-2 rounded-full mr-1.5 ${statusColors[status]}`} />
      )}
      {children}
    </Badge>
  );
});

StatusBadge.displayName = 'StatusBadge';