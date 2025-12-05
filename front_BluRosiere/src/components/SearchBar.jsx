import { useState, forwardRef } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from './Input';
import { useDebounce } from '../hooks/useDebounce';

export const SearchBar = forwardRef(({ 
  onSearch,
  placeholder = 'Buscar...',
  loading = false,
  suggestions = [],
  onSuggestionClick,
  className = ''
}, ref) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(value.length > 0);
  };

  const handleClear = () => {
    setQuery('');
    setShowSuggestions(false);
    onSearch?.('');
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    onSuggestionClick?.(suggestion);
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <Input
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        leftIcon={loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
        rightIcon={query && (
          <button onClick={handleClear} className="hover:text-white/80">
            <X className="w-4 h-4" />
          </button>
        )}
        onFocus={() => query && setShowSuggestions(true)}
      />

      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-dropdown w-full mt-2 glass-card p-2 max-h-60 overflow-y-auto"
          >
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-3 py-2 text-left text-sm text-white/80 hover:bg-white/10 rounded-lg transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});