// Utility for merging class names
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Conditional class names
export const clsx = (obj) => {
  return Object.keys(obj)
    .filter(key => obj[key])
    .join(' ');
};