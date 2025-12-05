import { useState, createContext, useContext, forwardRef } from 'react';
import { motion } from 'framer-motion';

const TabsContext = createContext();

export const Tabs = forwardRef(({ children, defaultValue, onChange, className = '' }, ref) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const handleChange = (value) => {
    setActiveTab(value);
    onChange?.(value);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleChange }}>
      <div ref={ref} className={className}>{children}</div>
    </TabsContext.Provider>
  );
});

export const TabsList = forwardRef(({ children, className = '' }, ref) => (
  <div ref={ref} className={`flex gap-2 border-b border-white/10 ${className}`}>
    {children}
  </div>
));

export const TabsTrigger = forwardRef(({ value, children, className = '' }, ref) => {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === value;

  return (
    <button
      ref={ref}
      onClick={() => setActiveTab(value)}
      className={`
        relative px-4 py-2 text-sm font-medium transition-colors
        ${isActive ? 'text-primary-400' : 'text-white/60 hover:text-white/80'}
        ${className}
      `}
    >
      {children}
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500"
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
    </button>
  );
});

export const TabsContent = forwardRef(({ value, children, className = '' }, ref) => {
  const { activeTab } = useContext(TabsContext);
  if (activeTab !== value) return null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={`pt-4 ${className}`}
    >
      {children}
    </motion.div>
  );
});