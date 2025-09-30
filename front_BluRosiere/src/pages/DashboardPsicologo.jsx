import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockApi } from '../services/mockApi';
import { Calendar, Users, Bell, CheckCheck } from 'lucide-react';
import { WelcomeCard } from "../components/WelcomeCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Card } from "../components/Card";

export const DashboardPsicologo = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [appointmentsData, patientsData, requestsData] = await Promise.all([
        mockApi.getAppointments(user.id, 'psicologo'),
        mockApi.getPatients(user.id),
        mockApi.getRequests(user.id)
      ]);
      setAppointments(appointmentsData);
      setPatients(patientsData);
      setRequests(requestsData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    const handleFocus = () => loadData();
    window.addEventListener('focus', handleFocus);
    const interval = setInterval(loadData, 5000);

    return () => {
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, [loadData]);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const metrics = useMemo(() => {
    const todayAppointments = [];
    let completedSessions = 0;
    let pendingRequests = 0;
    const upcomingAppointments = [];

    const now = new Date();

    appointments.forEach(apt => {
      const aptDate = new Date(apt.date);
      aptDate.setHours(0, 0, 0, 0);

      if (apt.status === 'concluido' && apt.psychologistId === user.id) completedSessions++;
      if (apt.status === 'agendado' && apt.psychologistId === user.id && aptDate.getTime() === today.getTime()) {
        todayAppointments.push(apt);
      }
      if (apt.status === 'agendado' && apt.psychologistId === user.id && new Date(apt.date) >= now) {
        upcomingAppointments.push(apt);
      }
    });

    requests.forEach(req => {
      if (req.status === 'pendente' && req.preferredPsychologist === user.id) pendingRequests++;
    });

    return {
      totalPatients: patients.length,
      completedSessions,
      pendingRequests,
      todayAppointments,
      upcomingAppointments: upcomingAppointments.slice(0, 5),
      isNewPsychologist: patients.length === 0 && appointments.length === 0 && requests.length === 0
    };
  }, [appointments, patients, requests, user.id, today]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white/80">Dashboard</h1>
        <p className="text-white">Bem-vindo, {user.name}</p>
      </div>

      {metrics.isNewPsychologist && (
        <WelcomeCard className="bg-white rounded-lg shadow-md p-6 text-center border-2 border-dashed border-light/30">
          <Users className="w-16 h-16 text-light/50 mx-auto mb-4" />
        </WelcomeCard>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center">
          <Users className="w-8 h-8 text-light mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-white">{metrics.totalPatients}</h3>
          <p className="text-white/70">Pacientes Ativos</p>
        </Card>
        <Card className="text-center">
          <Calendar className="w-8 h-8 text-light mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-white">{metrics.todayAppointments.length}</h3>
          <p className="text-white/70">Sessões Hoje</p>
        </Card>
        <Card className="text-center">
          <CheckCheck className="w-8 h-8 text-light mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-white">{metrics.completedSessions}</h3>
          <p className="text-white/70">Sessões Concluídas</p>
        </Card>
        <Card className="text-center">
          <Bell className="w-8 h-8 text-light mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-white">{metrics.pendingRequests}</h3>
          <p className="text-white/70">Solicitações Pendentes</p>
        </Card>
      </div>

      {!metrics.isNewPsychologist && (
        <div className="bg-black/70 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Próximos Agendamentos</h2>
          {metrics.upcomingAppointments.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <p className="text-white/70 mb-2">Nenhum agendamento futuro encontrado.</p>
              <p className="text-sm text-white/50">
                {metrics.totalPatients === 0
                  ? 'Você ainda não possui pacientes cadastrados.'
                  : 'Todos os agendamentos estão em dia!'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {metrics.upcomingAppointments.map(appointment => {
                const patient = patients.find(p => p.id === appointment.patientId);
                return (
                  <div key={appointment.id} className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                    <div>
                      <p className="font-medium text-dark">{patient?.name || 'Paciente não encontrado'}</p>
                      <p className="text-sm text-dark/70">
                        {new Date(appointment.date).toLocaleDateString('pt-BR')} às {appointment.time}
                      </p>
                      <p className="text-xs text-dark/60">{appointment.description}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        appointment.status === 'agendado'
                          ? 'bg-blue-100 text-blue-800'
                          : appointment.status === 'iniciado'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {appointment.status === 'agendado'
                        ? 'Agendado'
                        : appointment.status === 'iniciado'
                        ? 'Iniciado'
                        : 'Concluído'}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
