import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockApi } from '../services/mockApi';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Bell, User, Clock, CheckCircle, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

export const Solicitacoes = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingRequests, setProcessingRequests] = useState(new Set());

  useEffect(() => {
    if (!user?.id) return;
    loadRequests();
  }, [user.id]);

  const loadRequests = async () => {
    setLoading(true);
    try {
      const data = await mockApi.getRequests(user.id);
      const pendingRequests = data.filter(req => req.status === 'pendente');
      setRequests(pendingRequests);
    } catch (error) {
      console.error('Erro ao carregar solicitações:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptRequest = async (requestId, requestData) => {
    setProcessingRequests(prev => new Set([...prev, requestId]));
    try {
      const existingPatients = await mockApi.getPatients(user.id);
      const duplicatePatient = existingPatients.find(p => p.email === requestData.patientEmail);
      if (duplicatePatient) {
        toast.error('Este paciente já está cadastrado!');
        return;
      }

      await mockApi.createPatient({
        name: requestData.patientName,
        email: requestData.patientEmail,
        phone: requestData.patientPhone,
        birthDate: '1990-01-01',
        age: 30,
        status: 'Ativo',
        psychologistId: user.id
      });

      await mockApi.updateRequestStatus(requestId, 'aceito', 'Paciente aceito e cadastrado');
      setRequests(prev => prev.filter(req => req.id !== requestId));
      toast.success('Solicitação aceita! Paciente adicionado.');
    } catch (error) {
      console.error('Erro ao aceitar solicitação:', error);
      toast.error('Erro ao processar solicitação');
    } finally {
      setProcessingRequests(prev => {
        const newSet = new Set(prev);
        newSet.delete(requestId);
        return newSet;
      });
    }
  };

  const handleRejectRequest = async (requestId) => {
    setProcessingRequests(prev => new Set([...prev, requestId]));
    try {
      await mockApi.updateRequestStatus(requestId, 'rejeitado', 'Solicitação rejeitada');
      setRequests(prev => prev.filter(req => req.id !== requestId));
      toast.success('Solicitação rejeitada.');
    } catch (error) {
      console.error('Erro ao rejeitar solicitação:', error);
      toast.error('Erro ao processar solicitação');
    } finally {
      setProcessingRequests(prev => {
        const newSet = new Set(prev);
        newSet.delete(requestId);
        return newSet;
      });
    }
  };

  const getUrgencyStyle = (urgency) => {
    switch (urgency) {
      case 'alta':
        return 'bg-red-600 text-white shadow-[0_0_20px_rgba(255,0,0,0.6)] animate-pulse-glow';
      case 'media':
        return 'bg-yellow-400 text-black shadow-[0_0_10px_rgba(255,255,0,0.4)]';
      case 'baixa':
        return 'bg-green-500 text-white shadow-[0_0_10px_rgba(0,255,0,0.3)]';
      default:
        return 'bg-gray-400 text-black';
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'aceito': return 'bg-green-200 text-green-900';
      case 'rejeitado': return 'bg-red-200 text-red-900';
      case 'pendente': return 'bg-blue-200 text-blue-900';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div className="space-y-6 p-4 md:p-8">
      {/* Cabeçalho */}
      <div className="flex items-center gap-3 mb-6">
        <Bell className="w-10 h-10 text-gradient-to-r from-purple-500 to-pink-500 animate-bounce" />
        <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-xl">Solicitações de Pacientes</h1>
      </div>

      {/* Lista de solicitações com animação */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {requests.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="text-center py-12 bg-gray-900 shadow-2xl rounded-3xl border border-gray-700 hover:shadow-3xl transition-shadow duration-500">
                <Bell className="w-16 h-16 text-white/30 mx-auto mb-4 animate-bounce" />
                <h3 className="text-xl font-semibold text-white/70 mb-2">Nenhuma solicitação encontrada</h3>
                <p className="text-white/70">As solicitações de novos pacientes aparecerão aqui.</p>
              </Card>
            </motion.div>
          ) : (
            requests.map((request, index) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
              <Card
  className="flex flex-col justify-between p-6 bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl rounded-3xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl h-[480px]"
>
  {/* Informações do paciente */}
  <div className="flex justify-between items-start">
    <div className="flex items-center gap-4">
      <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center shadow-inner animate-pulse">
        <User className="w-7 h-7 text-white" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white">{request.patientName}</h3>
        <p className="text-sm text-white/60 truncate">{request.patientEmail}</p>
        <p className="text-sm text-white/60">{request.patientPhone}</p>
      </div>
    </div>

    <div className="flex flex-col gap-2">
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getUrgencyStyle(request.urgency)}`}>
        {request.urgency === 'alta' ? 'Alta' : request.urgency === 'media' ? 'Média' : 'Baixa'} urgência
      </span>
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(request.status)}`}>
        {request.status === 'aceito' ? 'Aceito' : request.status === 'rejeitado' ? 'Rejeitado' : 'Pendente'}
      </span>
    </div>
  </div>

  {/* Descrição */}
  <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:bg-gray-700 transition-colors duration-300 shadow-inner flex-1 mt-4 overflow-hidden">
    <h4 className="font-medium text-white mb-2">Descrição da necessidade:</h4>
    <div className="max-h-full overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-700">
      <p className="text-white/70 whitespace-pre-wrap">{request.description}</p>
    </div>
  </div>

  {/* Data de envio */}
  <div className="flex items-center gap-2 text-sm text-white/50 mt-2">
    <Clock className="w-4 h-4" />
    Enviado em {new Date(request.createdAt).toLocaleDateString('pt-BR')}
  </div>

  {/* Observações */}
  {request.notes && (
    <div className="bg-blue-800 rounded-xl p-3 border border-blue-700 shadow-inner mt-2 max-h-16 overflow-y-auto">
      <p className="text-sm text-white/80">
        <strong>Observações:</strong> {request.notes}
      </p>
    </div>
  )}

  {/* Botões */}
  <div className="flex gap-3 mt-2">
    <Button
      variant="secondary"
      onClick={() => handleRejectRequest(request.id)}
      loading={processingRequests.has(request.id)}
      className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 transition-colors text-white font-semibold rounded-lg shadow-md hover:shadow-lg"
    >
      <X className="w-4 h-4" />
      Rejeitar
    </Button>
    <Button
      onClick={() => handleAcceptRequest(request.id, request)}
      loading={processingRequests.has(request.id)}
      className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 transition-colors text-white font-semibold rounded-lg shadow-md hover:shadow-lg"
    >
      <CheckCircle className="w-4 h-4" />
      Aceitar como Paciente
    </Button>
  </div>
</Card>

              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
