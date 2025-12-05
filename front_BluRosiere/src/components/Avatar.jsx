import { forwardRef } from 'react';
import { User } from 'lucide-react';

export const Avatar = forwardRef(({ 
  src, 
  alt, 
  name,
  size = 'md',
  variant = 'circle',
  status,
  className = '',
  fallbackIcon: FallbackIcon = User,
  ...props 
}, ref) => {
  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
    '2xl': 'w-20 h-20 text-2xl'
  };

  const variants = {
    circle: 'rounded-full',
    square: 'rounded-lg',
    rounded: 'rounded-xl'
  };

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-500',
    busy: 'bg-red-500',
    away: 'bg-yellow-500'
  };

  const statusSizes = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-3.5 h-3.5',
    '2xl': 'w-4 h-4'
  };

  // Gerar iniciais do nome
  const getInitials = (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const initials = getInitials(name);

  return (
    <div ref={ref} className={`relative inline-block ${className}`} {...props}>
      <div
        className={`
          flex items-center justify-center
          bg-gradient-to-br from-primary-500 to-primary-600
          text-white font-medium
          border-2 border-white/20
          overflow-hidden
          ${sizes[size]}
          ${variants[variant]}
        `}
      >
        {src ? (
          <img
            src={src}
            alt={alt || name || 'Avatar'}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        ) : initials ? (
          <span className="select-none">{initials}</span>
        ) : (
          <FallbackIcon className="w-1/2 h-1/2 text-white/70" />
        )}
      </div>

      {/* Indicador de status */}
      {status && (
        <div
          className={`
            absolute -bottom-0.5 -right-0.5
            border-2 border-white
            rounded-full
            ${statusColors[status]}
            ${statusSizes[size]}
          `}
        />
      )}
    </div>
  );
});

Avatar.displayName = 'Avatar';

// Grupo de avatares
export const AvatarGroup = forwardRef(({ 
  children, 
  max = 3,
  size = 'md',
  className = '',
  ...props 
}, ref) => {
  const avatars = Array.isArray(children) ? children : [children];
  const visibleAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;

  const spacingClasses = {
    xs: '-space-x-1',
    sm: '-space-x-1.5',
    md: '-space-x-2',
    lg: '-space-x-2.5',
    xl: '-space-x-3',
    '2xl': '-space-x-4'
  };

  return (
    <div 
      ref={ref}
      className={`flex items-center ${spacingClasses[size]} ${className}`} 
      {...props}
    >
      {visibleAvatars.map((avatar, index) => (
        <div key={index} className="relative z-10 hover:z-20 transition-all duration-200 hover:scale-110">
          {avatar}
        </div>
      ))}
      
      {remainingCount > 0 && (
        <Avatar
          size={size}
          name={`+${remainingCount}`}
          className="bg-secondary-600 text-white border-2 border-white relative z-10"
        />
      )}
    </div>
  );
});

AvatarGroup.displayName = 'AvatarGroup';