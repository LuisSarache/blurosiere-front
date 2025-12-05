import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { H3, Paragraph } from './Typography';
import { Stack } from './Layout';

export const EmptyState = forwardRef(({ 
  icon: Icon,
  title,
  description,
  action,
  actionLabel,
  className = ''
}, ref) => (
  <motion.div
    ref={ref}
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className={`flex items-center justify-center py-16 ${className}`}
  >
    <Stack spacing="lg" align="center" className="max-w-md text-center">
      {Icon && (
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center">
          <Icon className="w-10 h-10 text-white/40" />
        </div>
      )}
      
      <div>
        <H3 color="muted" className="mb-2">{title}</H3>
        {description && (
          <Paragraph color="subtle" className="text-sm mb-0">
            {description}
          </Paragraph>
        )}
      </div>

      {action && actionLabel && (
        <Button onClick={action}>{actionLabel}</Button>
      )}
    </Stack>
  </motion.div>
));