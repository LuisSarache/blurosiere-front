import { forwardRef } from 'react';

// Layout principal da aplicação
export const Layout = forwardRef(({ 
  children, 
  className = '',
  withDecorations = true,
  ...props 
}, ref) => {
  return (
    <div ref={ref} className={`min-h-screen relative ${className}`} {...props}>
      {/* Elementos decorativos de fundo */}
      {withDecorations && (
        <>
          <div className="bg-decoration bg-decoration-1" />
          <div className="bg-decoration bg-decoration-2" />
          <div className="bg-decoration bg-decoration-3" />
        </>
      )}
      
      {/* Conteúdo principal */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
});

Layout.displayName = 'Layout';

// Container centralizado com padding responsivo
export const Container = forwardRef(({ 
  children, 
  className = '',
  size = 'default',
  ...props 
}, ref) => {
  const sizes = {
    sm: 'max-w-2xl',
    default: 'max-w-6xl',
    lg: 'max-w-7xl',
    full: 'max-w-full'
  };

  return (
    <div 
      ref={ref}
      className={`
        mx-auto px-4 sm:px-6 lg:px-8
        ${sizes[size]}
        ${className}
      `} 
      {...props}
    >
      {children}
    </div>
  );
});

Container.displayName = 'Container';

// Seção com espaçamento padrão
export const Section = forwardRef(({ 
  children, 
  className = '',
  spacing = 'default',
  ...props 
}, ref) => {
  const spacings = {
    sm: 'py-8',
    default: 'py-16',
    lg: 'py-24',
    xl: 'py-32'
  };

  return (
    <section 
      ref={ref}
      className={`
        ${spacings[spacing]}
        ${className}
      `} 
      {...props}
    >
      {children}
    </section>
  );
});

Section.displayName = 'Section';

// Grid responsivo
export const Grid = forwardRef(({ 
  children, 
  className = '',
  cols = 1,
  gap = 'default',
  ...props 
}, ref) => {
  const gaps = {
    sm: 'gap-4',
    default: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12'
  };

  const columns = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'
  };

  return (
    <div 
      ref={ref}
      className={`
        grid
        ${columns[cols]}
        ${gaps[gap]}
        ${className}
      `} 
      {...props}
    >
      {children}
    </div>
  );
});

Grid.displayName = 'Grid';

// Stack vertical com espaçamento
export const Stack = forwardRef(({ 
  children, 
  className = '',
  spacing = 'default',
  align = 'stretch',
  ...props 
}, ref) => {
  const spacings = {
    xs: 'space-y-1',
    sm: 'space-y-2',
    default: 'space-y-4',
    lg: 'space-y-6',
    xl: 'space-y-8'
  };

  const alignments = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch'
  };

  return (
    <div 
      ref={ref}
      className={`
        flex flex-col
        ${spacings[spacing]}
        ${alignments[align]}
        ${className}
      `} 
      {...props}
    >
      {children}
    </div>
  );
});

Stack.displayName = 'Stack';

// Flex horizontal com espaçamento
export const Flex = forwardRef(({ 
  children, 
  className = '',
  gap = 'default',
  align = 'center',
  justify = 'start',
  wrap = false,
  ...props 
}, ref) => {
  const gaps = {
    xs: 'gap-1',
    sm: 'gap-2',
    default: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8'
  };

  const alignments = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch'
  };

  const justifications = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly'
  };

  return (
    <div 
      ref={ref}
      className={`
        flex
        ${gaps[gap]}
        ${alignments[align]}
        ${justifications[justify]}
        ${wrap ? 'flex-wrap' : ''}
        ${className}
      `} 
      {...props}
    >
      {children}
    </div>
  );
});

Flex.displayName = 'Flex';