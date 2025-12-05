/**
 * Constantes da aplicação
 * Centraliza valores mágicos e configurações globais
 */

export const APP_CONFIG = {
  NAME: 'BlueRosiere',
  VERSION: '1.0.0',
  ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT || 'development',
};

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://blurosiere-backend.onrender.com/api',
  TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000'),
};

export const USER_TYPES = {
  PSYCHOLOGIST: 'psicologo',
  PATIENT: 'paciente',
};

export const APPOINTMENT_STATUS = {
  SCHEDULED: 'agendado',
  COMPLETED: 'concluido',
  CANCELED: 'cancelado',
  RESCHEDULED: 'reagendado',
  STARTED: 'iniciado',
};

export const REQUEST_STATUS = {
  PENDING: 'pendente',
  ACCEPTED: 'aceito',
  REJECTED: 'rejeitado',
};

export const URGENCY_LEVELS = {
  LOW: 'baixa',
  MEDIUM: 'media',
  HIGH: 'alta',
};

export const PATIENT_STATUS = {
  ACTIVE: 'Ativo',
  INACTIVE: 'Inativo',
  IN_TREATMENT: 'Em tratamento',
};

export const STORAGE_KEYS = {
  TOKEN: 'blurosiere_token',
  USER: 'blurosiere_user',
};

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  APPOINTMENTS: '/agendamento',
  PATIENTS: '/pacientes',
  PATIENT_DETAILS: '/pacientes/:id',
  SESSION_DETAILS: '/sessao/:sessionId',
  CHAT_IA: '/chat-ia',
  REPORTS: '/relatorios',
  REQUESTS: '/solicitacoes',
  NOT_FOUND: '*',
};

export const AVAILABLE_SLOTS = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

export const SESSION_DURATION = {
  SHORT: 45,
  STANDARD: 50,
  LONG: 60,
};

export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Credenciais inválidas',
  NETWORK_ERROR: 'Erro de conexão. Verifique sua internet',
  RATE_LIMIT: 'Muitas requisições. Tente novamente em alguns segundos',
  INVALID_TOKEN: 'Token de API inválido',
  UNEXPECTED_ERROR: 'Erro inesperado ao conectar com a IA',
  EMPTY_MESSAGE: 'Mensagem vazia',
  EMPTY_RESPONSE: 'Resposta vazia da IA',
  NOT_FOUND: 'Recurso não encontrado',
  UNAUTHORIZED: 'Não autorizado',
  FORBIDDEN: 'Acesso proibido',
};

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login realizado com sucesso',
  REGISTER_SUCCESS: 'Cadastro realizado com sucesso',
  APPOINTMENT_CREATED: 'Agendamento criado com sucesso',
  APPOINTMENT_UPDATED: 'Agendamento atualizado com sucesso',
  APPOINTMENT_CANCELED: 'Agendamento cancelado com sucesso',
  LOGOUT_SUCCESS: 'Logout realizado com sucesso',
};

export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 6,
  PHONE_REGEX: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
  NAME_MIN_LENGTH: 3,
  NAME_MAX_LENGTH: 100,
};

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
};

export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
};
