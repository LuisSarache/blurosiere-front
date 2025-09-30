import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockApi } from '../services/mockApi';
import toast from 'react-hot-toast';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Header } from '../components/Header';
import { PatientInfo } from '../components/PatientInfo';
import { SessionsCard } from '../components/SessionCard';

export const PacienteDetalhes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [patient, setPatient] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingSessions, setUpdatingSessions] = useState(new Set());
  const [showNewSessionForm, setShowNewSessionForm] = useState(false);
  const [newSessionData, setNewSessionData] = useState({
    date: '', time: '', description: 'Sessão de acompanhamento', duration: 50
  });
  const [creatingSession, setCreatingSession] = useState(false);

  const updateSessionStatus = async (sessionId, newStatus) => {
    setUpdatingSessions((prev) => new Set([...prev, sessionId]));
    try {
      await mockApi.updateSessionStatus(sessionId, newStatus);
      setSessions((prev) =>
        prev.map((session) => (session.id === sessionId ? { ...session, status: newStatus } : session))
      );
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    } finally {
      setUpdatingSessions((prev) => {
        const newSet = new Set(prev);
        newSet.delete(sessionId);
        return newSet;
      });
    }
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();
    if (!newSessionData.date || !newSessionData.time) return;

    setCreatingSession(true);
    try {
      const newSession = await mockApi.createAppointment({
        patientId: parseInt(id),
        psychologistId: user.id,
        ...newSessionData,
        notes: '',
        fullReport: ''
      });

      setSessions((prev) => [newSession, ...prev]);
      setShowNewSessionForm(false);
      setNewSessionData({ date: '', time: '', description: 'Sessão de acompanhamento', duration: 50 });
      setPatient((prev) => ({ ...prev, totalSessions: (prev.totalSessions || 0) + 1 }));
      toast.success('Sessão agendada com sucesso!');
    } catch (error) {
      console.error('Erro ao criar sessão:', error);
      toast.error('Erro ao agendar sessão. Tente novamente.');
    } finally {
      setCreatingSession(false);
    }
  };

  useEffect(() => {
    const loadPatientData = async () => {
      try {
        const patients = await mockApi.getPatients(user.id);
        const patientData = patients.find((p) => p.id === parseInt(id));

        if (!patientData) {
          navigate('/pacientes');
          return;
        }

        setPatient(patientData);

        const appointments = await mockApi.getAppointments(user.id, 'psicologo');
        const patientSessions = appointments
          .filter((apt) => apt.patientId === parseInt(id))
          .sort((a, b) => new Date(b.date) - new Date(a.date));

        setSessions(patientSessions);
      } catch (error) {
        console.error('Erro ao carregar dados do paciente:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPatientData();
  }, [id, user.id, navigate]);

  if (loading) return <LoadingSpinner size="lg" />;
  if (!patient) return null;

  return (
    <div className="min-h-screen bg-dark p-6 space-y-6">
      <Header onBack={() => navigate('/pacientes')} title="Detalhes do Paciente" />
      <PatientInfo patient={patient} />
      <SessionsCard
        sessions={sessions}
        showForm={showNewSessionForm}
        formData={newSessionData}
        onFormChange={setNewSessionData}
        onFormSubmit={handleCreateSession}
        onFormCancel={() => setShowNewSessionForm(false)}
        onShowForm={() => setShowNewSessionForm(true)}
        onStatusUpdate={updateSessionStatus}
        updatingSessions={updatingSessions}
        creatingSession={creatingSession}
        navigate={navigate}
      />
    </div>
  );
};
