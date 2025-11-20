/**
 * Sistema de logging centralizado
 * Gerencia logs em desenvolvimento e produção
 */

const isDev = import.meta.env.VITE_ENVIRONMENT === 'development';

const levels = {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
};

const colors = {
  DEBUG: '#7c3aed',
  INFO: '#3b82f6',
  WARN: '#f59e0b',
  ERROR: '#ef4444',
};

const log = (level, message, data = null) => {
  const timestamp = new Date().toISOString();
  const logEntry = { timestamp, level, message, data };

  if (isDev) {
    const style = `color: ${colors[level]}; font-weight: bold;`;
    console.log(`%c[${level}]`, style, message, data || '');
  }

  // Em produção, você poderia enviar para um serviço de logging
  // como Sentry, LogRocket, etc.
};

export const logger = {
  debug: (message, data) => log(levels.DEBUG, message, data),
  info: (message, data) => log(levels.INFO, message, data),
  warn: (message, data) => log(levels.WARN, message, data),
  error: (message, data) => log(levels.ERROR, message, data),
};
