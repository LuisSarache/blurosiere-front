import { forwardRef } from 'react';
import { motion } from 'framer-motion';

export const Timeline = forwardRef(({ children, className = '' }, ref) => (
  <div ref={ref} className={`relative ${className}`}>
    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white/10" />
    <div className="space-y-8">{children}</div>
  </div>
));

export const TimelineItem = forwardRef(({ 
  icon: Icon,
  title,
  description,
  date,
  variant = 'default',
  className = ''
}, ref) => {
  const variants = {
    default: 'bg-primary-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500'
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={`relative pl-12 ${className}`}
    >
      <div className={`
        absolute left-0 w-8 h-8 rounded-full
        flex items-center justify-center
        ${variants[variant]}
      `}>
        {Icon && <Icon className="w-4 h-4 text-white" />}
      </div>

      <div className="glass-card p-4">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-semibold text-white">{title}</h4>
          {date && (
            <span className="text-xs text-white/50">{date}</span>
          )}
        </div>
        {description && (
          <p className="text-sm text-white/70">{description}</p>
        )}
      </div>
    </motion.div>
  );
});