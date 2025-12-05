import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { Button } from './Button';

export const ThemeToggle = ({ className = '', ...props }) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      leftIcon={theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      className={className}
      aria-label={`Alternar para tema ${theme === 'dark' ? 'claro' : 'escuro'}`}
      {...props}
    >
      <span className="sr-only">
        {theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
      </span>
    </Button>
  );
};