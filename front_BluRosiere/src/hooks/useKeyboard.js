import { useEffect, useCallback } from 'react';

export const useKeyboard = (keyMap) => {
  const handleKeyPress = useCallback((event) => {
    const key = event.key.toLowerCase();
    const combo = [
      event.ctrlKey && 'ctrl',
      event.altKey && 'alt', 
      event.shiftKey && 'shift',
      key
    ].filter(Boolean).join('+');

    if (keyMap[combo] || keyMap[key]) {
      event.preventDefault();
      (keyMap[combo] || keyMap[key])();
    }
  }, [keyMap]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);
};

export const useEscape = (callback) => {
  useKeyboard({ escape: callback });
};