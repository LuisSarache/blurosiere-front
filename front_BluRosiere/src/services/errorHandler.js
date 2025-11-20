/**
 * Tratador centralizado de erros
 * Padroniza tratamento de erros em toda a aplicação
 */

import { ERROR_MESSAGES } from '../constants';

/**
 * Classe customizada para erros da aplicação
 */
export class AppError extends Error {
  constructor(message, code = 'UNKNOWN_ERROR', statusCode = 500) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
  }
}

/**
 * Trata erro e retorna mensagem amigável
 * @param {Error} error - Erro a tratar
 * @returns {object} Objeto com mensagem e código
 */
export const handleError = (error) => {
  console.error('Erro:', error);

  // Erro de rede
  if (error.message?.includes('network') || error.message?.includes('fetch')) {
    return {
      message: ERROR_MESSAGES.NETWORK_ERROR,
      code: 'NETWORK_ERROR',
      statusCode: 0,
    };
  }

  // Erro de autenticação
  if (error.statusCode === 401 || error.message?.includes('401')) {
    return {
      message: ERROR_MESSAGES.UNAUTHORIZED,
      code: 'UNAUTHORIZED',
      statusCode: 401,
    };
  }

  // Erro de autorização
  if (error.statusCode === 403 || error.message?.includes('403')) {
    return {
      message: ERROR_MESSAGES.FORBIDDEN,
      code: 'FORBIDDEN',
      statusCode: 403,
    };
  }

  // Erro 404
  if (error.statusCode === 404 || error.message?.includes('404')) {
    return {
      message: ERROR_MESSAGES.NOT_FOUND,
      code: 'NOT_FOUND',
      statusCode: 404,
    };
  }

  // Rate limit
  if (error.statusCode === 429 || error.message?.includes('429')) {
    return {
      message: ERROR_MESSAGES.RATE_LIMIT,
      code: 'RATE_LIMIT',
      statusCode: 429,
    };
  }

  // Token inválido
  if (error.message?.includes('token') || error.message?.includes('unauthorized')) {
    return {
      message: ERROR_MESSAGES.INVALID_TOKEN,
      code: 'INVALID_TOKEN',
      statusCode: 401,
    };
  }

  // Erro customizado da aplicação
  if (error instanceof AppError) {
    return {
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
    };
  }

  // Erro genérico
  return {
    message: error.message || ERROR_MESSAGES.UNEXPECTED_ERROR,
    code: 'UNKNOWN_ERROR',
    statusCode: error.statusCode || 500,
  };
};

/**
 * Valida resposta de API
 * @param {Response} response - Resposta HTTP
 * @returns {object} Dados da resposta
 * @throws {AppError} Se resposta não for OK
 */
export const validateResponse = async (response) => {
  if (!response.ok) {
    const error = new AppError(
      `HTTP ${response.status}`,
      `HTTP_${response.status}`,
      response.status
    );
    throw error;
  }

  try {
    return await response.json();
  } catch (err) {
    throw new AppError('Erro ao processar resposta', 'PARSE_ERROR', 500);
  }
};

/**
 * Retry automático para requisições
 * @param {Function} fn - Função a executar
 * @param {number} maxRetries - Número máximo de tentativas
 * @param {number} delay - Delay entre tentativas em ms
 * @returns {any} Resultado da função
 */
export const retryAsync = async (fn, maxRetries = 3, delay = 1000) => {
  let lastError;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
      }
    }
  }

  throw lastError;
};

/**
 * Cria erro de validação
 * @param {object} errors - Objeto com erros por campo
 * @returns {AppError} Erro de validação
 */
export const createValidationError = (errors) => {
  const message = Object.entries(errors)
    .map(([field, error]) => `${field}: ${error}`)
    .join('; ');

  const error = new AppError(message, 'VALIDATION_ERROR', 400);
  error.fieldErrors = errors;
  return error;
};

/**
 * Log de erro para monitoramento
 * @param {Error} error - Erro a logar
 * @param {object} context - Contexto adicional
 */
export const logError = (error, context = {}) => {
  const errorData = {
    timestamp: new Date().toISOString(),
    message: error.message,
    code: error.code,
    stack: error.stack,
    context,
  };

  console.error('Error Log:', errorData);

  // Aqui você poderia enviar para um serviço de monitoramento
  // como Sentry, LogRocket, etc.
};
