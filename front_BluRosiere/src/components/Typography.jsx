import { forwardRef } from 'react';

// Componente base para tipografia
const createTypographyComponent = (defaultTag, defaultClasses) => {
  return forwardRef(({ 
    as: Component = defaultTag,
    children, 
    className = '',
    variant,
    size,
    weight,
    color = 'default',
    align = 'left',
    ...props 
  }, ref) => {
    const colors = {
      default: 'text-white',
      muted: 'text-white/70',
      subtle: 'text-white/50',
      primary: 'text-primary-400',
      success: 'text-green-400',
      warning: 'text-yellow-400',
      error: 'text-red-400',
      gradient: 'text-gradient'
    };

    const alignments = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify'
    };

    const weights = {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold'
    };

    return (
      <Component
        ref={ref}
        className={`
          ${defaultClasses}
          ${colors[color]}
          ${alignments[align]}
          ${weight ? weights[weight] : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </Component>
    );
  });
};

// Headings
export const Heading = createTypographyComponent('h1', 'font-bold leading-tight');

export const H1 = forwardRef((props, ref) => (
  <Heading ref={ref} as="h1" className="text-4xl md:text-5xl lg:text-6xl" {...props} />
));
H1.displayName = 'H1';

export const H2 = forwardRef((props, ref) => (
  <Heading ref={ref} as="h2" className="text-3xl md:text-4xl lg:text-5xl" {...props} />
));
H2.displayName = 'H2';

export const H3 = forwardRef((props, ref) => (
  <Heading ref={ref} as="h3" className="text-2xl md:text-3xl lg:text-4xl" {...props} />
));
H3.displayName = 'H3';

export const H4 = forwardRef((props, ref) => (
  <Heading ref={ref} as="h4" className="text-xl md:text-2xl lg:text-3xl" {...props} />
));
H4.displayName = 'H4';

export const H5 = forwardRef((props, ref) => (
  <Heading ref={ref} as="h5" className="text-lg md:text-xl lg:text-2xl" {...props} />
));
H5.displayName = 'H5';

export const H6 = forwardRef((props, ref) => (
  <Heading ref={ref} as="h6" className="text-base md:text-lg lg:text-xl" {...props} />
));
H6.displayName = 'H6';

// Texto do corpo
export const Text = createTypographyComponent('p', 'leading-relaxed');

export const Paragraph = forwardRef((props, ref) => (
  <Text ref={ref} className="text-base md:text-lg mb-4" {...props} />
));
Paragraph.displayName = 'Paragraph';

export const Lead = forwardRef((props, ref) => (
  <Text ref={ref} className="text-lg md:text-xl lg:text-2xl font-light leading-relaxed" {...props} />
));
Lead.displayName = 'Lead';

export const Small = forwardRef((props, ref) => (
  <Text ref={ref} as="small" className="text-sm" {...props} />
));
Small.displayName = 'Small';

export const Caption = forwardRef((props, ref) => (
  <Text ref={ref} as="span" className="text-xs text-white/50" {...props} />
));
Caption.displayName = 'Caption';

// Texto inline
export const Span = createTypographyComponent('span', '');

export const Strong = forwardRef((props, ref) => (
  <Span ref={ref} as="strong" className="font-semibold" {...props} />
));
Strong.displayName = 'Strong';

export const Em = forwardRef((props, ref) => (
  <Span ref={ref} as="em" className="italic" {...props} />
));
Em.displayName = 'Em';

export const Code = forwardRef(({ className = '', ...props }, ref) => (
  <Span 
    ref={ref} 
    as="code" 
    className={`
      px-2 py-1 
      bg-secondary-800 
      border border-secondary-700 
      rounded-md 
      text-sm 
      font-mono 
      text-primary-300
      ${className}
    `} 
    {...props} 
  />
));
Code.displayName = 'Code';

// Link
export const Link = forwardRef(({ 
  className = '', 
  variant = 'default',
  ...props 
}, ref) => {
  const variants = {
    default: 'text-primary-400 hover:text-primary-300 underline underline-offset-2',
    subtle: 'text-white/70 hover:text-white transition-colors',
    button: 'text-primary-400 hover:text-primary-300 font-medium'
  };

  return (
    <Span 
      ref={ref} 
      as="a" 
      className={`
        transition-colors duration-200
        ${variants[variant]}
        ${className}
      `} 
      {...props} 
    />
  );
});
Link.displayName = 'Link';

// Lista
export const List = forwardRef(({ 
  ordered = false, 
  className = '', 
  ...props 
}, ref) => {
  const Component = ordered ? 'ol' : 'ul';
  const listStyle = ordered ? 'list-decimal' : 'list-disc';
  
  return (
    <Component
      ref={ref}
      className={`
        ${listStyle}
        list-inside
        space-y-2
        text-white/80
        ${className}
      `}
      {...props}
    />
  );
});
List.displayName = 'List';

export const ListItem = forwardRef((props, ref) => (
  <Text ref={ref} as="li" className="leading-relaxed" {...props} />
));
ListItem.displayName = 'ListItem';