import { forwardRef } from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

export const Stepper = forwardRef(({ 
  steps = [],
  currentStep = 0,
  orientation = 'horizontal',
  className = ''
}, ref) => {
  const isHorizontal = orientation === 'horizontal';

  return (
    <div 
      ref={ref}
      className={`
        flex ${isHorizontal ? 'flex-row items-center' : 'flex-col'}
        ${className}
      `}
    >
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isLast = index === steps.length - 1;

        return (
          <div 
            key={index}
            className={`
              flex ${isHorizontal ? 'flex-col items-center' : 'flex-row items-start'}
              ${isHorizontal && !isLast ? 'flex-1' : ''}
            `}
          >
            <div className={`flex ${isHorizontal ? 'flex-col' : 'flex-row'} items-center`}>
              {/* Step Circle */}
              <motion.div
                initial={false}
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                  backgroundColor: isCompleted || isCurrent 
                    ? 'rgb(59, 130, 246)' 
                    : 'rgba(255, 255, 255, 0.1)'
                }}
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  border-2 transition-colors
                  ${isCompleted || isCurrent 
                    ? 'border-primary-500 text-white' 
                    : 'border-white/20 text-white/40'
                  }
                `}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="font-semibold">{index + 1}</span>
                )}
              </motion.div>

              {/* Step Label */}
              <div className={`
                ${isHorizontal ? 'mt-2 text-center' : 'ml-4'}
              `}>
                <div className={`
                  text-sm font-medium
                  ${isCurrent ? 'text-white' : 'text-white/60'}
                `}>
                  {step.label}
                </div>
                {step.description && (
                  <div className="text-xs text-white/40 mt-1">
                    {step.description}
                  </div>
                )}
              </div>
            </div>

            {/* Connector Line */}
            {!isLast && (
              <div className={`
                ${isHorizontal 
                  ? 'flex-1 h-0.5 mx-4' 
                  : 'w-0.5 h-12 ml-5 my-2'
                }
                ${isCompleted ? 'bg-primary-500' : 'bg-white/10'}
                transition-colors
              `} />
            )}
          </div>
        );
      })}
    </div>
  );
});