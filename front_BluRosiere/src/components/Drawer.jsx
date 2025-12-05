import { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEscape } from '../hooks/useKeyboard';
import { Button } from './Button';

export const Drawer = forwardRef(({ 
  isOpen, 
  onClose, 
  children,
  position = 'right',
  size = 'md',
  title,
  className = '',
  ...props 
}, ref) => {
  useEscape(onClose);

  const positions = {
    left: { x: '-100%' },
    right: { x: '100%' },
    top: { y: '-100%' },
    bottom: { y: '100%' }
  };

  const sizes = {
    sm: position === 'left' || position === 'right' ? 'w-80' : 'h-80',
    md: position === 'left' || position === 'right' ? 'w-96' : 'h-96',
    lg: position === 'left' || position === 'right' ? 'w-[32rem]' : 'h-[32rem]',
    full: position === 'left' || position === 'right' ? 'w-full' : 'h-full'
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'left': return 'left-0 top-0 h-full';
      case 'right': return 'right-0 top-0 h-full';
      case 'top': return 'top-0 left-0 w-full';
      case 'bottom': return 'bottom-0 left-0 w-full';
      default: return 'right-0 top-0 h-full';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-modal-backdrop"
            onClick={onClose}
          />
          
          <motion.div
            ref={ref}
            initial={positions[position]}
            animate={{ x: 0, y: 0 }}
            exit={positions[position]}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`
              fixed z-modal
              glass-card-strong
              ${getPositionClasses()}
              ${sizes[size]}
              ${className}
            `}
            {...props}
          >
            {title && (
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-lg font-semibold text-white">{title}</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  leftIcon={<X className="w-4 h-4" />}
                />
              </div>
            )}
            
            <div className="flex-1 overflow-y-auto p-6">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

Drawer.displayName = 'Drawer';