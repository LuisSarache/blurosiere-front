/**
 * Utilitários de validação
 * Funções reutilizáveis para validar dados da aplicação
 */

import { VALIDATION_RULES } from '../constants';

/**
 * Valida formato de email
 * @param {string} email - Email a validar
 * @returns {boolean} True se válido
 */
export const isValidEmail = (email) => {
  return VALIDATION_RULES.EMAIL_REGEX.test(email);
};

/**
 * Valida força de senha
 * @param {string} password - Senha a validar
 * @returns {object} Objeto com validação e mensagens
 */
export const validatePassword = (password) => {
  const errors = [];
  
  if (!password || password.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH) {
    errors.push(`Mínimo ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} caracteres`);
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Deve conter letra maiúscula');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Deve conter número');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Valida nome
 * @param {string} name - Nome a validar
 * @returns {boolean} True se válido
 */
export const isValidName = (name) => {
  return name && 
    name.length >= VALIDATION_RULES.NAME_MIN_LENGTH && 
    name.length <= VALIDATION_RULES.NAME_MAX_LENGTH;
};

/**
 * Valida telefone
 * @param {string} phone - Telefone a validar
 * @returns {boolean} True se válido
 */
export const isValidPhone = (phone) => {
  return VALIDATION_RULES.PHONE_REGEX.test(phone);
};

/**
 * Valida data de nascimento
 * @param {string} birthDate - Data no formato YYYY-MM-DD
 * @returns {object} Objeto com validação e idade
 */
export const validateBirthDate = (birthDate) => {
  const birth = new Date(birthDate);
  const today = new Date();
  
  if (birth > today) {
    return { isValid: false, error: 'Data de nascimento não pode ser no futuro' };
  }
  
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  if (age < 18) {
    return { isValid: false, error: 'Deve ter pelo menos 18 anos' };
  }
  
  return { isValid: true, age };
};

/**
 * Valida CRP (Conselho Regional de Psicologia)
 * @param {string} crp - CRP a validar
 * @returns {boolean} True se válido
 */
export const isValidCRP = (crp) => {
  return /^CRP\s\d{2}\/\d{5}$/.test(crp);
};

/**
 * Valida objeto de login
 * @param {object} credentials - Email e senha
 * @returns {object} Objeto com validação e erros
 */
export const validateLoginCredentials = (credentials) => {
  const errors = {};
  
  if (!credentials.email || !isValidEmail(credentials.email)) {
    errors.email = 'Email inválido';
  }
  
  if (!credentials.password || credentials.password.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH) {
    errors.password = 'Senha inválida';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Valida objeto de registro
 * @param {object} userData - Dados do usuário
 * @returns {object} Objeto com validação e erros
 */
export const validateRegisterData = (userData) => {
  const errors = {};
  
  if (!isValidName(userData.name)) {
    errors.name = `Nome deve ter entre ${VALIDATION_RULES.NAME_MIN_LENGTH} e ${VALIDATION_RULES.NAME_MAX_LENGTH} caracteres`;
  }
  
  if (!isValidEmail(userData.email)) {
    errors.email = 'Email inválido';
  }
  
  const passwordValidation = validatePassword(userData.password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.errors.join(', ');
  }
  
  if (userData.type === 'psicologo') {
    if (!isValidCRP(userData.crp)) {
      errors.crp = 'CRP inválido (formato: CRP XX/XXXXX)';
    }
    if (!userData.specialty || userData.specialty.trim().length === 0) {
      errors.specialty = 'Especialidade é obrigatória';
    }
  }
  
  if (userData.birthDate) {
    const birthValidation = validateBirthDate(userData.birthDate);
    if (!birthValidation.isValid) {
      errors.birthDate = birthValidation.error;
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Sanitiza string removendo caracteres perigosos
 * @param {string} str - String a sanitizar
 * @returns {string} String sanitizada
 */
export const sanitizeString = (str) => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[<>]/g, '')
    .trim();
};

/**
 * Valida se data é válida
 * @param {string} dateString - Data no formato YYYY-MM-DD
 * @returns {boolean} True se válida
 */
export const isValidDate = (dateString) => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};
