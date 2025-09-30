import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockApi } from '../services/mockApi';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ArrowLeft, Clock, Calendar, User, FileText, Edit3, Save, X } from 'lucide-react';
import { motion } from 'framer-motion';

export const SessaoDetalhes = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [session, setSession] = useState(null);
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editNotes, setEditNotes] = useState('');
  const [editReport, setEditReport] = useState('');
  const [editStatus, setEditStatus] = useState('');

  useEffect(() => {
    const loadSessionData = async () => {
      try {
        const sessionData = await mockApi.getSessionDetails(parseInt(sessionId));
        setSession(sessionData);
        setEditNotes(sessionData.notes || '');
        setEditReport(sessionData.fullReport || '');
        setEditStatus(sessionData.status);

        const patients = await mockApi.getPatients(user.id);
        const patientData = patients.find(p => p.id === sessionData.patientId);
        setPatient(patientData);
      } catch (error) {
        console.error('Erro ao carregar dados da sessão:', error);
        navigate('/pacientes');
      } finally {
        setLoading(false);
      }
    };

    loadSessionData();
  }, [sessionId, user.id, navigate]);

  const handleSave = async () => {
    try {
      await mockApi.updateSessionStatus(session.id, editStatus);
      await mockApi.updateSessionNotes(session.id, editNotes, editReport);
      setSession({ ...session, status: editStatus, notes: editNotes, fullReport: editReport });
      setEditing(false);
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
    }
  };

  const handleCancel = () => {
    setEditNotes(session.notes || '');
    setEditReport(session.fullReport || '');
    setEditStatus(session.status);
    setEditing(false);
  };

  if (loading) return <LoadingSpinner size="lg" />;
  if (!session || !patient) return null;

  const statusOptions = [
    { value: 'agendado', label: 'Agendado', color: 'bg-blue-200 text-blue-900' },
    { value: 'iniciado', label: 'Em andamento', color: 'bg-yellow-200 text-yellow-900' },
    { value: 'concluido', label: 'Concluído', color: 'bg-green-200 text-green-900' },
    { value: 'cancelado', label: 'Cancelado', color: 'bg-red-200 text-red-900' }
  ];

  const currentStatus = statusOptions.find(s => s.value === session.status);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="space-y-8 p-6 bg-gradient-to-b from-black/70 via-dark to-dark min-h-screen">
      {/* Header */}
      <motion.div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(`/pacientes/${patient.id}`)}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-lg font-semibold shadow hover:scale-105 transition-transform duration-200"
          >
            <ArrowLeft size={20} />
            Voltar
          </button>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-wide bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
            Detalhes da Sessão
          </h1>
        </div>
        <div className="flex items-center gap-3">
          {!editing ? (
            <Button onClick={() => setEditing(true)} className="bg-white text-blue-900 font-semibold hover:scale-105 transition-transform flex items-center gap-2 shadow-md">
              <Edit3 size={16} /> Editar
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handleSave} className="bg-green-500 text-white flex items-center gap-2 hover:scale-105 shadow-md transition-transform">
                <Save size={16} /> Salvar
              </Button>
              <Button variant="secondary" onClick={handleCancel} className="bg-red-500 text-white flex items-center gap-2 hover:scale-105 shadow-md transition-transform">
                <X size={16} /> Cancelar
              </Button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Informações da Sessão */}
      <motion.div variants={cardVariants} initial="hidden" animate="visible">
        <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg p-6 rounded-xl hover:shadow-2xl transition-all duration-300">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">Sessão #{session.id}</h2>
                <p className="text-white/70 mt-1">{session.description}</p>
              </div>
              {editing ? (
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-white/30 text-white bg-white/10 backdrop-blur-md focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              ) : (
                <motion.span
                  className={`px-4 py-2 rounded-full font-medium ${currentStatus?.color} shadow-md`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentStatus?.label}
                </motion.span>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-white/70" />
                <div>
                  <p className="text-sm text-white/60">Paciente</p>
                  <p className="font-semibold text-white">{patient.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-white/70" />
                <div>
                  <p className="text-sm text-white/60">Data e Hora</p>
                  <p className="font-semibold text-white">{new Date(session.date).toLocaleDateString('pt-BR')} às {session.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-white/70" />
                <div>
                  <p className="text-sm text-white/60">Duração</p>
                  <p className="font-semibold text-white">{session.duration} minutos</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Anotações Rápidas */}
      <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
        <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg p-6 rounded-xl hover:shadow-2xl transition-all duration-300">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-white" />
              <h3 className="text-xl font-bold text-white">Anotações Rápidas</h3>
            </div>
            {editing ? (
              <textarea
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                placeholder="Adicione anotações rápidas sobre a sessão..."
                className="w-full h-24 p-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/50 focus:ring-2 focus:ring-blue-400 backdrop-blur-md resize-none transition-all duration-200"
              />
            ) : (
              <div className="bg-white/10 p-4 rounded-lg min-h-[100px] text-white/80">
                {session.notes ? <p className="leading-relaxed">{session.notes}</p> : <p className="italic text-white/50">Nenhuma anotação adicionada</p>}
              </div>
            )}
          </div>
        </Card>
      </motion.div>

      {/* Relatório Completo */}
      <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
        <Card className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg p-6 rounded-xl hover:shadow-2xl transition-all duration-300">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-white" />
              <h3 className="text-xl font-bold text-white">Relatório Completo da Sessão</h3>
            </div>
            {editing ? (
              <textarea
                value={editReport}
                onChange={(e) => setEditReport(e.target.value)}
                placeholder="Relatório detalhado da sessão..."
                className="w-full h-64 p-3 rounded-lg bg-white/10 border border-white/30 text-white font-mono placeholder-white/50 focus:ring-2 focus:ring-blue-400 backdrop-blur-md resize-none transition-all duration-200"
              />
            ) : (
              <div className="bg-white/10 p-4 rounded-lg min-h-[300px] text-white/80 font-sans">
                {session.fullReport ? <pre className="whitespace-pre-wrap leading-relaxed">{session.fullReport}</pre> : <p className="italic text-white/50">Nenhum relatório adicionado</p>}
              </div>
            )}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
