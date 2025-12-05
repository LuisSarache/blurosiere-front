import { forwardRef } from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Breadcrumb = forwardRef(({ items = [], className = '' }, ref) => (
  <nav ref={ref} className={`flex items-center space-x-2 text-sm ${className}`}>
    <Link to="/" className="text-white/60 hover:text-white transition-colors">
      <Home className="w-4 h-4" />
    </Link>
    
    {items.map((item, index) => {
      const isLast = index === items.length - 1;
      
      return (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="w-4 h-4 text-white/40" />
          {isLast ? (
            <span className="text-white font-medium">{item.label}</span>
          ) : (
            <Link 
              to={item.href} 
              className="text-white/60 hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          )}
        </div>
      );
    })}
  </nav>
));