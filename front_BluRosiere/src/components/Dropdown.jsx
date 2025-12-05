import { useState, useRef, useEffect, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

export const Dropdown = forwardRef(({ 
  trigger,
  items = [],
  onSelect,
  placement = 'bottom-start',
  className = ''
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (item) => {
    onSelect?.(item);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-dropdown mt-2 min-w-[200px] glass-card p-2"
          >
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => handleSelect(item)}
                className="w-full px-3 py-2 text-left text-sm text-white/80 hover:bg-white/10 rounded-lg transition-colors flex items-center justify-between"
              >
                <span>{item.label}</span>
                {item.selected && <Check className="w-4 h-4 text-primary-400" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export const Select = forwardRef(({ 
  value,
  onChange,
  options = [],
  placeholder = 'Selecione...',
  className = ''
}, ref) => {
  const selected = options.find(opt => opt.value === value);

  return (
    <Dropdown
      ref={ref}
      trigger={
        <button className={`
          w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg
          text-white/70 text-left flex items-center justify-between
          hover:bg-white/15 transition-colors ${className}
        `}>
          <span>{selected?.label || placeholder}</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      }
      items={options.map(opt => ({
        ...opt,
        selected: opt.value === value
      }))}
      onSelect={(item) => onChange?.(item.value)}
    />
  );
});