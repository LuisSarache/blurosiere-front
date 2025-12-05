import { useState, forwardRef } from 'react';

export const Tooltip = forwardRef(({ 
  children, 
  content, 
  position = 'top',
  delay = 300,
  className = '',
  ...props 
}, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const positions = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  };

  const arrows = {
    top: 'top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-secondary-800',
    bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-secondary-800',
    left: 'left-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-secondary-800',
    right: 'right-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-secondary-800'
  };

  const handleMouseEnter = () => {
    const id = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsVisible(false);
  };

  return (
    <div 
      ref={ref}
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
      
      {isVisible && content && (
        <div
          className={`
            absolute z-tooltip
            px-3 py-2
            bg-secondary-800
            text-white text-sm
            rounded-lg
            shadow-xl
            border border-secondary-700
            whitespace-nowrap
            animate-fade-in
            ${positions[position]}
          `}
          role="tooltip"
        >
          {content}
          <div 
            className={`
              absolute w-0 h-0
              border-4
              ${arrows[position]}
            `} 
          />
        </div>
      )}
    </div>
  );
});

Tooltip.displayName = 'Tooltip';