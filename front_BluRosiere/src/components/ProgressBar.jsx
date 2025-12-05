import { forwardRef } from 'react';
import { motion } from 'framer-motion';

export const ProgressBar = forwardRef(({ 
  value = 0, 
  max = 100,
  size = 'md',
  variant = 'primary',
  showLabel = false,
  className = ''
}, ref) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  const variants = {
    primary: 'bg-primary-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500'
  };

  return (
    <div ref={ref} className={className}>
      {showLabel && (
        <div className="flex justify-between text-sm text-white/70 mb-2">
          <span>Progresso</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={`w-full bg-white/10 rounded-full overflow-hidden ${sizes[size]}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`h-full ${variants[variant]} rounded-full`}
        />
      </div>
    </div>
  );
});

export const CircularProgress = forwardRef(({ 
  value = 0, 
  max = 100,
  size = 64,
  strokeWidth = 4,
  variant = 'primary',
  showLabel = true,
  className = ''
}, ref) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const colors = {
    primary: '#3b82f6',
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444'
  };

  return (
    <div ref={ref} className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors[variant]}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset
          }}
        />
      </svg>
      {showLabel && (
        <div className="absolute text-sm font-semibold text-white">
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  );
});