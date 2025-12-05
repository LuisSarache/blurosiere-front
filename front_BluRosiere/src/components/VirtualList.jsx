import { useState, useEffect, useMemo, forwardRef } from 'react';

export const VirtualList = forwardRef(({ 
  items = [],
  itemHeight = 50,
  containerHeight = 400,
  renderItem,
  overscan = 5,
  className = '',
  ...props 
}, ref) => {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleRange = useMemo(() => {
    const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const end = Math.min(items.length, start + visibleCount + overscan * 2);
    return { start, end };
  }, [scrollTop, itemHeight, containerHeight, items.length, overscan]);

  const visibleItems = useMemo(() => 
    items.slice(visibleRange.start, visibleRange.end)
  , [items, visibleRange]);

  const totalHeight = items.length * itemHeight;
  const offsetY = visibleRange.start * itemHeight;

  return (
    <div
      ref={ref}
      className={`overflow-auto ${className}`}
      style={{ height: containerHeight }}
      onScroll={(e) => setScrollTop(e.target.scrollTop)}
      {...props}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item, index) => (
            <div
              key={visibleRange.start + index}
              style={{ height: itemHeight }}
            >
              {renderItem(item, visibleRange.start + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

VirtualList.displayName = 'VirtualList';