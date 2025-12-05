import { forwardRef } from 'react';
import { Loader2, RefreshCw } from 'lucide-react';

export const LoadingSpinner = forwardRef(({ 
  size = 'md',
  variant = 'default',
  className = '',
  ...props 
}, ref) => {
  const sizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const variants = {
    default: (
      <div className="flex justify-center items-center">
        <div 
          ref={ref}
          className={`
            animate-spin rounded-full 
            border-2 border-white/20 border-t-primary-500
            ${sizes[size]} 
            ${className}
          `} 
          {...props}
        />
      </div>
    ),
    dots: (
      <div className="flex justify-center items-center">
        <div ref={ref} className={`flex space-x-1 ${className}`} {...props}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`
                bg-primary-500 rounded-full animate-pulse
                ${size === 'xs' ? 'w-1 h-1' : size === 'sm' ? 'w-1.5 h-1.5' : size === 'md' ? 'w-2 h-2' : size === 'lg' ? 'w-3 h-3' : 'w-4 h-4'}
              `}
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      </div>
    ),
    pulse: (
      <div className="flex justify-center items-center">
        <div 
          ref={ref}
          className={`
            bg-primary-500 rounded-full animate-pulse
            ${sizes[size]} 
            ${className}
          `} 
          {...props}
        />
      </div>
    ),
    icon: (
      <div className="flex justify-center items-center">
        <Loader2 
          ref={ref}
          className={`animate-spin text-primary-500 ${sizes[size]} ${className}`} 
          {...props}
        />
      </div>
    ),
    refresh: (
      <div className="flex justify-center items-center">
        <RefreshCw 
          ref={ref}
          className={`animate-spin text-primary-500 ${sizes[size]} ${className}`} 
          {...props}
        />
      </div>
    )
  };

  return variants[variant];
});

LoadingSpinner.displayName = 'LoadingSpinner';

// Componente de loading para páginas inteiras
export const PageLoader = ({ message = 'Carregando...', className = '' }) => (
  <div className={`min-h-screen flex flex-col items-center justify-center space-y-4 ${className}`}>
    <LoadingSpinner size="xl" variant="icon" />
    <p className="text-white/70 text-lg">{message}</p>
  </div>
);

// Componente de loading para seções
export const SectionLoader = ({ message, className = '' }) => (
  <div className={`flex flex-col items-center justify-center py-12 space-y-4 ${className}`}>
    <LoadingSpinner size="lg" variant="icon" />
    {message && <p className="text-white/70">{message}</p>}
  </div>
);

// Componente de loading inline
export const InlineLoader = ({ size = 'sm', className = '' }) => (
  <LoadingSpinner size={size} variant="icon" className={`inline ${className}`} />
);
  