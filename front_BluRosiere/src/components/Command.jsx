import { useState, useEffect, forwardRef } from 'react';
import { Search, Command as CommandIcon } from 'lucide-react';
import { useKeyboard } from '../hooks/useKeyboard';
import { Modal } from './Modal';
import { Input } from './Input';
import { Stack } from './Layout';

export const CommandPalette = forwardRef(({ 
  isOpen, 
  onClose, 
  commands = [],
  placeholder = "Digite um comando...",
  ...props 
}, ref) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(query.toLowerCase()) ||
    cmd.keywords?.some(k => k.toLowerCase().includes(query.toLowerCase()))
  );

  useKeyboard({
    'arrowdown': () => setSelectedIndex(i => Math.min(i + 1, filteredCommands.length - 1)),
    'arrowup': () => setSelectedIndex(i => Math.max(i - 1, 0)),
    'enter': () => {
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
        onClose();
      }
    }
  });

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" {...props}>
      <div ref={ref} className="p-4">
        <Input
          leftIcon={<Search className="w-4 h-4" />}
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mb-4"
          autoFocus
        />
        
        <Stack spacing="xs" className="max-h-80 overflow-y-auto">
          {filteredCommands.map((cmd, index) => (
            <button
              key={cmd.id}
              onClick={() => {
                cmd.action();
                onClose();
              }}
              className={`
                flex items-center gap-3 p-3 rounded-lg text-left w-full
                transition-colors duration-200
                ${index === selectedIndex 
                  ? 'bg-primary-500/20 text-primary-300' 
                  : 'hover:bg-white/5 text-white/80'
                }
              `}
            >
              {cmd.icon && <cmd.icon className="w-4 h-4" />}
              <div>
                <div className="font-medium">{cmd.label}</div>
                {cmd.description && (
                  <div className="text-sm text-white/50">{cmd.description}</div>
                )}
              </div>
              {cmd.shortcut && (
                <div className="ml-auto text-xs text-white/40 font-mono">
                  {cmd.shortcut}
                </div>
              )}
            </button>
          ))}
          
          {filteredCommands.length === 0 && (
            <div className="text-center py-8 text-white/50">
              Nenhum comando encontrado
            </div>
          )}
        </Stack>
      </div>
    </Modal>
  );
});

CommandPalette.displayName = 'CommandPalette';