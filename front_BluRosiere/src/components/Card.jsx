import { forwardRef } from 'react';

export const Card = forwardRef(({ 
  children, 
  className = '', 
  variant = 'default',
  padding = 'md',
  hover = false,
  ...props 
}, ref) => {
  const variants = {
    default: 'glass-card',
    elevated: 'glass-card-light shadow-2xl',
    solid: 'bg-secondary-800 border border-secondary-700',
    outline: 'bg-transparent border-2 border-white/20',
    gradient: 'bg-gradient-to-br from-primary-900/50 to-secondary-900/50 border border-white/10'
  };

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

  const hoverEffects = hover ? 'hover:scale-[1.02] hover:shadow-2xl transition-all duration-300' : '';

  return (
    <div
      ref={ref}
      className={`
        ${variants[variant]}
        ${paddings[padding]}
        ${hoverEffects}
        rounded-2xl
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

// Componentes auxiliares para estruturar o Card
export const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`mb-6 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={`text-xl font-semibold text-white mb-2 ${className}`} {...props}>
    {children}
  </h3>
);

export const CardDescription = ({ children, className = '', ...props }) => (
  <p className={`text-white/70 ${className}`} {...props}>
    {children}
  </p>
);

export const CardContent = ({ children, className = '', ...props }) => (
  <div className={`${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`mt-6 flex items-center justify-between ${className}`} {...props}>
    {children}
  </div>
);
