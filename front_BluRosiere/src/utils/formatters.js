/**
 * Utilitários de formatação
 * Funções para formatar dados para exibição
 */

/**
 * Formata data para formato brasileiro
 * @param {string|Date} date - Data a formatar
 * @returns {string} Data formatada (DD/MM/YYYY)
 */
export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

/**
 * Formata data e hora
 * @param {string|Date} date - Data a formatar
 * @returns {string} Data e hora formatadas (DD/MM/YYYY HH:MM)
 */
export const formatDateTime = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const dateStr = formatDate(d);
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${dateStr} ${hours}:${minutes}`;
};

/**
 * Formata hora
 * @param {string} time - Hora no formato HH:MM
 * @returns {string} Hora formatada
 */
export const formatTime = (time) => {
  if (!time) return '';
  return time;
};

/**
 * Formata telefone
 * @param {string} phone - Telefone sem formatação
 * @returns {string} Telefone formatado (XX) XXXXX-XXXX
 */
export const formatPhone = (phone) => {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length !== 11) return phone;
  return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
};

/**
 * Formata CPF
 * @param {string} cpf - CPF sem formatação
 * @returns {string} CPF formatado (XXX.XXX.XXX-XX)
 */
export const formatCPF = (cpf) => {
  if (!cpf) return '';
  const cleaned = cpf.replace(/\D/g, '');
  if (cleaned.length !== 11) return cpf;
  return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9)}`;
};

/**
 * Formata moeda brasileira
 * @param {number} value - Valor a formatar
 * @returns {string} Valor formatado (R$ X.XXX,XX)
 */
export const formatCurrency = (value) => {
  if (typeof value !== 'number') return '';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

/**
 * Formata percentual
 * @param {number} value - Valor entre 0 e 100
 * @returns {string} Percentual formatado (XX,XX%)
 */
export const formatPercentage = (value) => {
  if (typeof value !== 'number') return '';
  return `${value.toFixed(2).replace('.', ',')}%`;
};

/**
 * Formata nome próprio (primeira letra maiúscula)
 * @param {string} name - Nome a formatar
 * @returns {string} Nome formatado
 */
export const formatName = (name) => {
  if (!name) return '';
  return name
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Formata duração em minutos
 * @param {number} minutes - Duração em minutos
 * @returns {string} Duração formatada (Xh XXm ou XXm)
 */
export const formatDuration = (minutes) => {
  if (typeof minutes !== 'number' || minutes < 0) return '';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0 && mins > 0) {
    return `${hours}h ${mins}m`;
  }
  if (hours > 0) {
    return `${hours}h`;
  }
  return `${mins}m`;
};

/**
 * Formata status para exibição
 * @param {string} status - Status a formatar
 * @returns {string} Status formatado
 */
export const formatStatus = (status) => {
  const statusMap = {
    agendado: 'Agendado',
    concluido: 'Concluído',
    cancelado: 'Cancelado',
    reagendado: 'Reagendado',
    iniciado: 'Iniciado',
    pendente: 'Pendente',
    aceito: 'Aceito',
    rejeitado: 'Rejeitado',
    ativo: 'Ativo',
    inativo: 'Inativo',
  };
  return statusMap[status?.toLowerCase()] || status;
};

/**
 * Trunca texto com reticências
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Comprimento máximo
 * @returns {string} Texto truncado
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

/**
 * Formata idade
 * @param {number} age - Idade em anos
 * @returns {string} Idade formatada
 */
export const formatAge = (age) => {
  if (typeof age !== 'number') return '';
  return `${age} ano${age !== 1 ? 's' : ''}`;
};

/**
 * Calcula idade a partir de data de nascimento
 * @param {string|Date} birthDate - Data de nascimento
 * @returns {number} Idade em anos
 */
export const calculateAge = (birthDate) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

/**
 * Formata data relativa (ex: "há 2 horas")
 * @param {string|Date} date - Data a formatar
 * @returns {string} Data relativa
 */
export const formatRelativeDate = (date) => {
  if (!date) return '';
  
  const now = new Date();
  const past = new Date(date);
  const diffMs = now - past;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return 'agora mesmo';
  if (diffMins < 60) return `há ${diffMins} minuto${diffMins !== 1 ? 's' : ''}`;
  if (diffHours < 24) return `há ${diffHours} hora${diffHours !== 1 ? 's' : ''}`;
  if (diffDays < 7) return `há ${diffDays} dia${diffDays !== 1 ? 's' : ''}`;
  
  return formatDate(past);
};
