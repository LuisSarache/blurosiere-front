/**
 * API Service - Conexão com Backend
 * Todas as requisições vão para o backend real
 */

import { API_CONFIG } from '../constants';
import { AppError, validateResponse } from './errorHandler';
import { getAuthToken } from '../utils/storage';

const BASE_URL = API_CONFIG.BASE_URL;

/**
 * Configuração padrão de requisições
 */
const getHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

/**
 * Wrapper para fetch com tratamento de erros
 */
const fetchAPI = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...getHeaders(),
        ...options.headers,
      },
      timeout: API_CONFIG.TIMEOUT,
    });
    
    if (!response.ok) {
      const text = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(text);
      } catch {
        errorData = { message: text };
      }
      console.error('Erro da API:', response.status, errorData);
    }
    
    return await validateResponse(response);
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      throw new AppError(
        'Não foi possível conectar ao servidor. Verifique se o backend está online.',
        'NETWORK_ERROR',
        0
      );
    }
    throw new AppError(
      error.message || 'Erro ao conectar com o servidor',
      'NETWORK_ERROR',
      0
    );
  }
};

/**
 * API Service
 */
export const api = {
  // Autenticação
  async login(email, password) {
    return fetchAPI('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  async register(userData) {
    const cleanPhone = userData.phone?.replace(/\D/g, '').slice(0, 11) || '';
    
    const payload = {
      email: userData.email,
      password: userData.password.slice(0, 72),
      name: userData.name,
      type: userData.type,
      phone: cleanPhone,
      birth_date: userData.birthDate || '1990-01-01',
    };
    
    if (userData.crp) {
      payload.crp = userData.crp;
    }
    if (userData.specialty) {
      payload.specialty = userData.specialty;
    }
    
    // console.log('Payload enviado para registro:', JSON.stringify(payload, null, 2));
    
    return fetchAPI('/api/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async logout() {
    return fetchAPI('/api/v1/auth/logout', {
      method: 'POST',
    });
  },

  // Consultas
  async getAppointments(userId, userType) {
    return fetchAPI(`/appointments?userId=${userId}&userType=${userType}`);
  },

  async getAppointmentsByEmail(email) {
    return fetchAPI(`/appointments/by-email?email=${email}`);
  },

  async createAppointment(appointmentData) {
    return fetchAPI('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    });
  },

  async updateAppointment(appointmentId, updateData) {
    return fetchAPI(`/appointments/${appointmentId}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  },

  async cancelAppointment(appointmentId) {
    return fetchAPI(`/appointments/${appointmentId}/cancel`, {
      method: 'PATCH',
    });
  },

  async getSessionDetails(sessionId) {
    return fetchAPI(`/appointments/${sessionId}`);
  },

  async updateSessionStatus(sessionId, status) {
    return fetchAPI(`/appointments/${sessionId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  async updateSessionNotes(sessionId, notes, fullReport) {
    return fetchAPI(`/appointments/${sessionId}/notes`, {
      method: 'PATCH',
      body: JSON.stringify({ notes, fullReport }),
    });
  },

  // Psicólogos
  async getPsychologists() {
    return fetchAPI('/api/v1/psychologists');
  },

  async getAvailableSlots(date, psychologistId) {
    return fetchAPI(`/api/v1/psychologists/${psychologistId}/slots?date=${date}`);
  },

  // Pacientes
  async getPatients(psychologistId) {
    return fetchAPI(`/patients?psychologistId=${psychologistId}`);
  },

  async createPatient(patientData) {
    return fetchAPI('/patients', {
      method: 'POST',
      body: JSON.stringify(patientData),
    });
  },

  async addPatientNote(patientId, noteData) {
    return fetchAPI(`/patients/${patientId}/notes`, {
      method: 'POST',
      body: JSON.stringify(noteData),
    });
  },

  // Solicitações
  async getRequests(psychologistId) {
    const url = psychologistId 
      ? `/api/v1/requests?psychologistId=${psychologistId}`
      : '/api/v1/requests';
    return fetchAPI(url);
  },

  async createRequest(requestData) {
    const payload = {
      patient_name: requestData.patientName,
      patient_email: requestData.patientEmail,
      patient_phone: requestData.patientPhone,
      preferred_psychologist: requestData.preferredPsychologist,
      description: requestData.description,
      urgency: requestData.urgency,
      preferred_dates: requestData.preferredDates || [],
      preferred_times: requestData.preferredTimes || [],
    };
    
    return fetchAPI('/api/v1/requests', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async updateRequestStatus(requestId, status, notes = '') {
    return fetchAPI(`/api/v1/requests/${requestId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, notes }),
    });
  },

  // Relatórios
  async getReportsData(psychologistId) {
    return fetchAPI(`/api/v1/reports/${psychologistId}`);
  },
};

export default api;
