/**
 * API Mock - Simulação de backend
 * Todas as funções simulam operações de um servidor real com delays e validações
 * Os dados são persistidos no localStorage do navegador
 */

import { STORAGE_KEYS, APPOINTMENT_STATUS, REQUEST_STATUS, AVAILABLE_SLOTS } from '../constants';
import { handleError, AppError } from './errorHandler';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getStorageData = (key, defaultData) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultData;
  } catch {
    return defaultData;
  }
};

const setStorageData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const initialUsers = [
  { id: 2, email: 'ana@test.com', password: '123456', type: 'psicologo', name: 'Dra. Ana Costa', specialty: 'Terapia Cognitivo-Comportamental', crp: 'CRP 01/23456' },
  { id: 3, email: 'carlos@test.com', password: '123456', type: 'psicologo', name: 'Dr. Carlos Mendes', specialty: 'Psicologia Infantil', crp: 'CRP 01/34567' },
  { id: 4, email: 'lucia@test.com', password: '123456', type: 'psicologo', name: 'Dra. Lucia Ferreira', specialty: 'Terapia Familiar', crp: 'CRP 01/45678' },
  { id: 5, email: 'paciente@test.com', password: '123456', type: 'paciente', name: 'Maria Santos' }
];

const initialPatients = [
  { id: 20, name: 'Fernanda Lima', email: 'fernanda.lima@email.com', phone: '(11) 99999-5555', birthDate: '1992-03-12', age: 32, status: 'Em tratamento', psychologistId: 2 },
  { id: 6, name: 'Lucas Pereira', email: 'lucas.pereira@email.com', phone: '(11) 99999-6666', birthDate: '1987-11-25', age: 37, status: 'Ativo', psychologistId: 2 },
  { id: 7, name: 'Camila Rodrigues', email: 'camila.rodrigues@email.com', phone: '(11) 99999-7777', birthDate: '1993-09-08', age: 31, status: 'Em tratamento', psychologistId: 2 },
  { id: 8, name: 'Diego Santos', email: 'diego.santos@email.com', phone: '(11) 99999-8888', birthDate: '1991-06-30', age: 33, status: 'Ativo', psychologistId: 2 },
  { id: 9, name: 'Isabella Martins', email: 'isabella.martins@email.com', phone: '(11) 99999-9999', birthDate: '1994-04-14', age: 30, status: 'Em tratamento', psychologistId: 3 },
  { id: 10, name: 'Gabriel Alves', email: 'gabriel.alves@email.com', phone: '(11) 99999-0000', birthDate: '1989-10-07', age: 35, status: 'Ativo', psychologistId: 3 },
  { id: 11, name: 'Sophia Ferreira', email: 'sophia.ferreira@email.com', phone: '(11) 88888-1111', birthDate: '1996-01-20', age: 28, status: 'Em tratamento', psychologistId: 3 },
  { id: 12, name: 'Mateus Barbosa', email: 'mateus.barbosa@email.com', phone: '(11) 88888-2222', birthDate: '1986-12-11', age: 38, status: 'Ativo', psychologistId: 3 },
  { id: 13, name: 'Beatriz Souza', email: 'beatriz.souza@email.com', phone: '(11) 88888-3333', birthDate: '1990-08-05', age: 34, status: 'Em tratamento', psychologistId: 4 },
  { id: 14, name: 'Thiago Nascimento', email: 'thiago.nascimento@email.com', phone: '(11) 88888-4444', birthDate: '1984-05-28', age: 40, status: 'Ativo', psychologistId: 4 },
  { id: 15, name: 'Larissa Campos', email: 'larissa.campos@email.com', phone: '(11) 88888-5555', birthDate: '1997-02-16', age: 27, status: 'Em tratamento', psychologistId: 4 },
  { id: 16, name: 'André Moreira', email: 'andre.moreira@email.com', phone: '(11) 88888-6666', birthDate: '1983-11-09', age: 41, status: 'Ativo', psychologistId: 4 }
];

const generateFutureDate = (daysFromNow) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split('T')[0];
};

const initialRequests = [
  { id: 1, patientName: 'João Silva', patientEmail: 'joao.silva@email.com', patientPhone: '(11) 99999-1111', preferredPsychologist: 2, description: 'Gostaria de agendar uma sessão. Preciso de ajuda com ansiedade e estresse no trabalho.', urgency: 'media', preferredDates: ['2024-12-20', '2024-12-21'], preferredTimes: ['14:00', '15:00'], status: 'pendente', createdAt: new Date().toISOString() },
  { id: 2, patientName: 'Ana Oliveira', patientEmail: 'ana.oliveira@email.com', patientPhone: '(11) 88888-2222', preferredPsychologist: 3, description: 'Gostaria de agendar uma sessão para meu filho de 8 anos.', urgency: 'alta', preferredDates: ['2024-12-19'], preferredTimes: ['09:00', '10:00'], status: 'pendente', createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() },
  { id: 3, patientName: 'Carolina Souza', patientEmail: 'carolina.souza@email.com', patientPhone: '(11) 97777-3333', preferredPsychologist: 2, description: 'Gostaria de iniciar terapia para ansiedade.', urgency: 'alta', preferredDates: ['2025-09-25', '2025-09-27'], preferredTimes: ['09:00', '10:00'], status: 'pendente', createdAt: new Date().toISOString() }
];

const initialAppointments = [
  { id: 8, patientId: 5, psychologistId: 2, date: generateFutureDate(-2), time: '14:00', status: APPOINTMENT_STATUS.COMPLETED, description: 'Terapia cognitivo-comportamental', duration: 50, notes: 'Sessão produtiva com técnicas de TCC.', fullReport: 'Paciente respondeu bem às intervenções.' },
  { id: 9, patientId: 6, psychologistId: 2, date: generateFutureDate(2), time: '15:00', status: APPOINTMENT_STATUS.SCHEDULED, description: 'Sessão de acompanhamento', duration: 50, notes: '', fullReport: '' },
  { id: 10, patientId: 7, psychologistId: 2, date: generateFutureDate(-8), time: '11:00', status: APPOINTMENT_STATUS.COMPLETED, description: 'Sessão inicial', duration: 60, notes: 'Primeira consulta bem-sucedida.', fullReport: 'Estabelecimento de vínculo terapêutico.' },
  { id: 11, patientId: 9, psychologistId: 3, date: generateFutureDate(-1), time: '09:00', status: APPOINTMENT_STATUS.COMPLETED, description: 'Psicologia infantil - Ludoterapia', duration: 45, notes: 'Sessão de ludoterapia muito produtiva.', fullReport: 'Criança demonstrou boa interação.' },
  { id: 12, patientId: 10, psychologistId: 3, date: generateFutureDate(4), time: '10:00', status: APPOINTMENT_STATUS.SCHEDULED, description: 'Avaliação comportamental', duration: 50, notes: '', fullReport: '' },
  { id: 13, patientId: 13, psychologistId: 4, date: generateFutureDate(-6), time: '16:00', status: APPOINTMENT_STATUS.COMPLETED, description: 'Terapia familiar', duration: 60, notes: 'Sessão familiar muito produtiva.', fullReport: 'Família demonstrou boa comunicação.' },
  { id: 14, patientId: 14, psychologistId: 4, date: generateFutureDate(1), time: '14:00', status: APPOINTMENT_STATUS.SCHEDULED, description: 'Terapia de casal', duration: 60, notes: '', fullReport: '' },
  { id: 17, patientId: 5, psychologistId: 2, date: generateFutureDate(-7), time: '14:00', status: APPOINTMENT_STATUS.COMPLETED, description: 'Sessão inicial - Avaliação psicológica', duration: 60, notes: 'Primeira consulta realizada com sucesso.', fullReport: 'Anamnese completa. Identificados sintomas de ansiedade leve.' },
  { id: 18, patientId: 5, psychologistId: 2, date: generateFutureDate(-14), time: '15:00', status: APPOINTMENT_STATUS.COMPLETED, description: 'Terapia cognitivo-comportamental', duration: 50, notes: 'Trabalhamos técnicas de respiração.', fullReport: 'Paciente respondeu bem às técnicas de TCC aplicadas.' },
  { id: 19, patientId: 5, psychologistId: 2, date: generateFutureDate(-21), time: '14:00', status: APPOINTMENT_STATUS.COMPLETED, description: 'Sessão de acompanhamento', duration: 50, notes: 'Progresso significativo observado.', fullReport: 'Evolução positiva. Redução dos sintomas ansiosos.' },
  { id: 21, patientId: 5, psychologistId: 2, date: generateFutureDate(1), time: '15:00', status: APPOINTMENT_STATUS.SCHEDULED, description: 'Sessão de acompanhamento', duration: 50, notes: '', fullReport: '' }
];

if (!localStorage.getItem(STORAGE_KEYS.USERS)) setStorageData(STORAGE_KEYS.USERS, initialUsers);
if (!localStorage.getItem(STORAGE_KEYS.PATIENTS)) setStorageData(STORAGE_KEYS.PATIENTS, initialPatients);
if (!localStorage.getItem(STORAGE_KEYS.APPOINTMENTS)) setStorageData(STORAGE_KEYS.APPOINTMENTS, initialAppointments);
if (!localStorage.getItem(STORAGE_KEYS.REQUESTS)) setStorageData(STORAGE_KEYS.REQUESTS, initialRequests);

export const mockApi = {
  async login(email, password) {
    await delay(1000);
    const currentUsers = getStorageData(STORAGE_KEYS.USERS, initialUsers);
    const user = currentUsers.find(u => u.email === email && u.password === password);
    if (!user) throw new AppError('Credenciais inválidas', 'INVALID_CREDENTIALS', 401);
    return { user: { ...user, password: undefined }, token: 'mock-token' };
  },

  async register(userData) {
    await delay(1000);
    const currentUsers = getStorageData(STORAGE_KEYS.USERS, initialUsers);
    const newUserId = Date.now();
    const newUser = { id: newUserId, ...userData, ...(userData.type === 'psicologo' && { crm: userData.crm, specialty: userData.specialty, phone: userData.phone }) };
    currentUsers.push(newUser);
    setStorageData(STORAGE_KEYS.USERS, currentUsers);

    if (userData.type === 'paciente') {
      const currentPatients = getStorageData(STORAGE_KEYS.PATIENTS, initialPatients);
      const calculateAge = (birthDate) => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) age--;
        return age;
      };
      const newPatient = { id: newUserId, name: userData.name, email: userData.email, phone: userData.phone, birthDate: userData.birthDate, age: calculateAge(userData.birthDate), status: 'Ativo', psychologistId: null };
      currentPatients.push(newPatient);
      setStorageData(STORAGE_KEYS.PATIENTS, currentPatients);
    }

    return { user: { ...newUser, password: undefined }, token: 'mock-token' };
  },

  async getAppointments(userId, userType) {
    await delay(500);
    const currentAppointments = getStorageData(STORAGE_KEYS.APPOINTMENTS, initialAppointments);
    return currentAppointments.filter(apt => userType === 'psicologo' ? apt.psychologistId === userId : apt.patientId === userId);
  },

  async getAppointmentsByEmail(email) {
    await delay(500);
    const currentAppointments = getStorageData(STORAGE_KEYS.APPOINTMENTS, initialAppointments);
    const currentPatients = getStorageData(STORAGE_KEYS.PATIENTS, initialPatients);
    const patient = currentPatients.find(p => p.email === email);
    if (!patient) return [];
    return currentAppointments.filter(apt => apt.patientId === patient.id);
  },

  async createAppointment(appointmentData) {
    await delay(1000);
    const currentAppointments = getStorageData(STORAGE_KEYS.APPOINTMENTS, initialAppointments);
    const newAppointment = { id: Date.now(), ...appointmentData, status: APPOINTMENT_STATUS.SCHEDULED };
    currentAppointments.push(newAppointment);
    setStorageData(STORAGE_KEYS.APPOINTMENTS, currentAppointments);
    return newAppointment;
  },

  async getPsychologists() {
    await delay(500);
    const currentUsers = getStorageData(STORAGE_KEYS.USERS, initialUsers);
    return currentUsers.filter(user => user.type === 'psicologo').map(psych => ({ id: psych.id, name: psych.name, specialty: psych.specialty, crp: psych.crp }));
  },

  async getAvailableSlots(date, psychologistId) {
    await delay(500);
    const currentAppointments = getStorageData(STORAGE_KEYS.APPOINTMENTS, initialAppointments);
    const occupiedSlots = currentAppointments.filter(apt => apt.date === date && apt.psychologistId === psychologistId && apt.status === APPOINTMENT_STATUS.SCHEDULED).map(apt => apt.time);
    return AVAILABLE_SLOTS.filter(slot => !occupiedSlots.includes(slot));
  },

  async cancelAppointment(appointmentId) {
    await delay(500);
    const currentAppointments = getStorageData(STORAGE_KEYS.APPOINTMENTS, initialAppointments);
    const appointment = currentAppointments.find(apt => apt.id === appointmentId);
    if (appointment) {
      appointment.status = APPOINTMENT_STATUS.CANCELED;
      setStorageData(STORAGE_KEYS.APPOINTMENTS, currentAppointments);
      return appointment;
    }
    throw new AppError('Agendamento não encontrado', 'NOT_FOUND', 404);
  },

  async updateAppointment(appointmentId, updateData) {
    await delay(500);
    const currentAppointments = getStorageData(STORAGE_KEYS.APPOINTMENTS, initialAppointments);
    const appointmentIndex = currentAppointments.findIndex(apt => apt.id === appointmentId);
    if (appointmentIndex !== -1) {
      currentAppointments[appointmentIndex] = { ...currentAppointments[appointmentIndex], ...updateData };
      setStorageData(STORAGE_KEYS.APPOINTMENTS, currentAppointments);
      return currentAppointments[appointmentIndex];
    }
    throw new AppError('Agendamento não encontrado', 'NOT_FOUND', 404);
  },

  async getPatients(psychologistId) {
    await delay(500);
    const currentPatients = getStorageData(STORAGE_KEYS.PATIENTS, initialPatients);
    const currentAppointments = getStorageData(STORAGE_KEYS.APPOINTMENTS, initialAppointments);
    const psychologistPatients = currentPatients.filter(patient => patient.psychologistId === psychologistId);
    const patientSessions = {};
    currentAppointments.forEach(apt => { if (apt.psychologistId === psychologistId) patientSessions[apt.patientId] = (patientSessions[apt.patientId] || 0) + 1; });
    return psychologistPatients.map(patient => ({ ...patient, totalSessions: patientSessions[patient.id] || 0 }));
  },

  async addPatientNote(patientId, noteData) {
    await delay(500);
    return { id: Date.now(), ...noteData };
  },

  async updateSessionStatus(sessionId, status) {
    await delay(500);
    const currentAppointments = getStorageData(STORAGE_KEYS.APPOINTMENTS, initialAppointments);
    const sessionIndex = currentAppointments.findIndex(apt => apt.id === sessionId);
    if (sessionIndex !== -1) {
      currentAppointments[sessionIndex].status = status;
      setStorageData(STORAGE_KEYS.APPOINTMENTS, currentAppointments);
      return currentAppointments[sessionIndex];
    }
    throw new AppError('Sessão não encontrada', 'NOT_FOUND', 404);
  },

  async updateSessionNotes(sessionId, notes, fullReport) {
    await delay(500);
    const currentAppointments = getStorageData(STORAGE_KEYS.APPOINTMENTS, initialAppointments);
    const sessionIndex = currentAppointments.findIndex(apt => apt.id === sessionId);
    if (sessionIndex !== -1) {
      currentAppointments[sessionIndex].notes = notes;
      currentAppointments[sessionIndex].fullReport = fullReport;
      setStorageData(STORAGE_KEYS.APPOINTMENTS, currentAppointments);
      return currentAppointments[sessionIndex];
    }
    throw new AppError('Sessão não encontrada', 'NOT_FOUND', 404);
  },

  async getSessionDetails(sessionId) {
    await delay(500);
    const currentAppointments = getStorageData(STORAGE_KEYS.APPOINTMENTS, initialAppointments);
    const session = currentAppointments.find(apt => apt.id === sessionId);
    if (!session) throw new AppError('Sessão não encontrada', 'NOT_FOUND', 404);
    return session;
  },

  async getReportsData(psychologistId) {
    await delay(500);
    const currentAppointments = getStorageData(STORAGE_KEYS.APPOINTMENTS, initialAppointments);
    const currentPatients = getStorageData(STORAGE_KEYS.PATIENTS, initialPatients);
    const psychologistAppointments = currentAppointments.filter(apt => apt.psychologistId === psychologistId);
    const psychologistPatients = currentPatients.filter(patient => patient.psychologistId === psychologistId);
    const totalSessions = psychologistAppointments.length;
    const completedSessions = psychologistAppointments.filter(apt => apt.status === APPOINTMENT_STATUS.COMPLETED).length;
    const canceledSessions = psychologistAppointments.filter(apt => apt.status === APPOINTMENT_STATUS.CANCELED).length;
    const sessionStarted = psychologistAppointments.filter(apt => apt.status === APPOINTMENT_STATUS.STARTED).length;
    const patientsWithSessions = new Set(psychologistAppointments.map(apt => apt.patientId));
    const patientsWithoutSessions = psychologistPatients.filter(patient => !patientsWithSessions.has(patient.id)).length;
    const frequencyData = [];
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    months.forEach((month) => { frequencyData.push({ month, sessions: Math.floor(Math.random() * 20) + 10 }); });
    const statusData = [];
    const agendadoSessions = psychologistAppointments.filter(apt => apt.status === APPOINTMENT_STATUS.SCHEDULED).length;
    if (completedSessions > 0) statusData.push({ name: 'Concluídas', value: completedSessions, color: '#26B0BF' });
    if (canceledSessions > 0) statusData.push({ name: 'Canceladas', value: canceledSessions, color: '#ef4444' });
    if (sessionStarted > 0) statusData.push({ name: 'Iniciadas', value: sessionStarted, color: '#f59e0b' });
    if (agendadoSessions > 0) statusData.push({ name: 'Agendadas', value: agendadoSessions, color: '#10b981' });
    const patientsWithSessionsCount = psychologistPatients.length - patientsWithoutSessions;
    const patientsData = [];
    if (patientsWithSessionsCount > 0) patientsData.push({ name: 'Com sessões', value: patientsWithSessionsCount, color: '#26B0BF' });
    if (patientsWithoutSessions > 0) patientsData.push({ name: 'Sem sessões', value: patientsWithoutSessions, color: '#ef4444' });
    const riskAlerts = psychologistPatients.slice(0, 3).map((patient, index) => ({ id: patient.id, patient: patient.name, risk: index === 0 ? 'Alto' : 'Médio', reason: index === 0 ? 'Faltas consecutivas' : 'Cancelamentos frequentes', date: new Date(Date.now() - (index + 1) * 24 * 60 * 60 * 1000).toISOString().split('T')[0] }));
    return { stats: { activePatients: psychologistPatients.length, totalSessions, completedSessions, attendanceRate: totalSessions > 0 ? ((completedSessions / totalSessions) * 100).toFixed(1) : 0, riskAlerts: riskAlerts.length }, frequencyData, statusData, patientsData, riskAlerts };
  },

  async getRequests(psychologistId) {
    await delay(500);
    const currentRequests = getStorageData(STORAGE_KEYS.REQUESTS, initialRequests);
    return currentRequests.filter(req => !psychologistId || req.preferredPsychologist === psychologistId);
  },

  async updateRequestStatus(requestId, status, notes = '') {
    await delay(500);
    const currentRequests = getStorageData(STORAGE_KEYS.REQUESTS, initialRequests);
    const requestIndex = currentRequests.findIndex(req => req.id === requestId);
    if (requestIndex !== -1) {
      currentRequests[requestIndex] = { ...currentRequests[requestIndex], status, notes, updatedAt: new Date().toISOString() };
      setStorageData(STORAGE_KEYS.REQUESTS, currentRequests);
      return currentRequests[requestIndex];
    }
    throw new AppError('Solicitação não encontrada', 'NOT_FOUND', 404);
  },

  async createRequest(requestData) {
    await delay(1000);
    const currentRequests = getStorageData(STORAGE_KEYS.REQUESTS, initialRequests);
    const existingRequest = currentRequests.find(req => req.patientEmail === requestData.patientEmail && req.preferredPsychologist === requestData.preferredPsychologist && req.status === REQUEST_STATUS.PENDING);
    if (existingRequest) throw new AppError('Você já possui uma solicitação pendente para este psicólogo', 'DUPLICATE_REQUEST', 400);
    const newRequest = { id: Date.now(), ...requestData, status: REQUEST_STATUS.PENDING, createdAt: new Date().toISOString() };
    currentRequests.push(newRequest);
    setStorageData(STORAGE_KEYS.REQUESTS, currentRequests);
    return newRequest;
  },

  async createPatient(patientData) {
    await delay(1000);
    const currentPatients = getStorageData(STORAGE_KEYS.PATIENTS, initialPatients);
    const existingPatient = currentPatients.find(p => p.email === patientData.email && p.psychologistId === patientData.psychologistId);
    if (existingPatient) throw new AppError('Paciente com este email já está cadastrado', 'DUPLICATE_PATIENT', 400);
    const newPatient = { id: Date.now(), ...patientData, status: 'Ativo' };
    currentPatients.push(newPatient);
    setStorageData(STORAGE_KEYS.PATIENTS, currentPatients);
    return newPatient;
  }
};

export { initialUsers, initialPatients, initialAppointments, initialRequests };
