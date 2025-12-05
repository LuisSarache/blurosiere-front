import { useState, forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Accordion = forwardRef(({ children, type = 'single', className = '' }, ref) => {
  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (value) => {
    if (type === 'single') {
      setOpenItems(openItems.includes(value) ? [] : [value]);
    } else {
      setOpenItems(prev =>
        prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
      );
    }
  };

  return (
    <div ref={ref} className={`space-y-2 ${className}`}>
      {children.map((child) =>
        child.type === AccordionItem
          ? { ...child, props: { ...child.props, isOpen: openItems.includes(child.props.value), onToggle: toggleItem } }
          : child
      )}
    </div>
  );
});

export const AccordionItem = forwardRef(({ value, trigger, children, isOpen, onToggle, className = '' }, ref) => (
  <div ref={ref} className={`glass-card overflow-hidden ${className}`}>
    <button
      onClick={() => onToggle(value)}
      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
    >
      <span className="font-medium text-white">{trigger}</span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <ChevronDown className="w-5 h-5 text-white/60" />
      </motion.div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="px-6 pb-4 text-white/70">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
));