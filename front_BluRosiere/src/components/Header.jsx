import { forwardRef } from 'react';
import { ArrowLeft, Home, User, Settings } from 'lucide-react';
import { Button } from './Button';
import { Flex } from './Layout';
import { H2, H3 } from './Typography';

export const Header = forwardRef(({ 
  onBack, 
  title, 
  subtitle,
  actions,
  showBackButton = true,
  variant = 'default',
  className = '',
  ...props 
}, ref) => {
  const variants = {
    default: 'mb-8',
    compact: 'mb-4',
    large: 'mb-12'
  };

  return (
    <header 
      ref={ref}
      className={`
        ${variants[variant]}
        ${className}
      `} 
      {...props}
    >
      <Flex justify="between" align="center" className="flex-wrap gap-4">
        <Flex align="center" gap="lg">
          {showBackButton && onBack && (
            <Button
              variant="secondary"
              onClick={onBack}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
              className="shrink-0"
            >
              Voltar
            </Button>
          )}
          
          <div className="space-y-1">
            {title && (
              <H2 className="text-gradient leading-tight">
                {title}
              </H2>
            )}
            {subtitle && (
              <H3 color="muted" weight="normal" className="text-lg">
                {subtitle}
              </H3>
            )}
          </div>
        </Flex>
        
        {actions && (
          <Flex gap="sm" className="shrink-0">
            {actions}
          </Flex>
        )}
      </Flex>
    </header>
  );
});

Header.displayName = 'Header';

// Header específico para páginas
export const PageHeader = forwardRef((props, ref) => (
  <Header ref={ref} variant="large" {...props} />
));

PageHeader.displayName = 'PageHeader';

// Header específico para seções
export const SectionHeader = forwardRef((props, ref) => (
  <Header ref={ref} variant="compact" showBackButton={false} {...props} />
));

SectionHeader.displayName = 'SectionHeader';
