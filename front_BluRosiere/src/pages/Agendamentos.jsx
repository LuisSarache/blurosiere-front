// ===== IMPORTS =====
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { api } from '../services';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Bell } from 'lucide-react';
import toast from 'react-hot-toast';

// ===== COMPONENTE PRINCIPAL =====
export const Agendamentos = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [selectedPsychologist, setSelectedPsychologist] = useState('');
  const [psychologists, setPsychologists] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [requestData, setRequestData] = useState({ description: '', urgency: 'media' });

  useEffect(() => {
    loadPsychologists();
  }, []);

  const loadPsychologists = async () => {
    try {
      const data = await api.getPsychologists();
      setPsychologists(data);
    } catch {
      toast.error('Erro ao carregar psicólogos');
    }
  };

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPsychologist || !requestData.description) {
      toast.error('Selecione um psicólogo e descreva sua necessidade');
      return;
    }

    setSubmitting(true);
    try {
      await api.createRequest({
        patientName: user.name,
        patientEmail: user.email,
        patientPhone: user.phone || '(11) 99999-9999',
        preferredPsychologist: parseInt(selectedPsychologist),
        description: requestData.description,
        urgency: requestData.urgency,
      });
      toast.success('Solicitação enviada! O psicólogo entrará em contato.');
      navigate('/dashboard');
    } catch {
      toast.error('Erro ao enviar solicitação');
    } finally {
      setSubmitting(false);
    }
  };

  // Função para cor de urgência
  const urgencyColor = (level) => {
    switch (level) {
      case 'baixa': return 'bg-green-500/40 text-green-200';
      case 'media': return 'bg-yellow-500/40 text-yellow-200';
      case 'alta': return 'bg-red-500/40 text-red-200';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-medium p-8 flex justify-center items-start">
      <div className="w-full max-w-2xl space-y-8">

        {/* Cabeçalho */}
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-white mb-3 drop-shadow-lg">Solicitar ser Paciente</h1>
          <p className="text-white/80 text-lg">Escolha um psicólogo e descreva sua necessidade de atendimento</p>
        </div>

        {/* Card Formulário */}
        <Card className=" backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-400 p-8" variant="default">
          <form onSubmit={handleRequestSubmit} className="space-y-6">

            {/* Selecionar Psicólogo */}
            <div>
              <label className="flex items-center gap-3 text-lg font-semibold text-white mb-3">
                <Bell className="w-5 h-5 text-blue-400" />
                Escolha o Psicólogo
              </label>
              <select
                value={selectedPsychologist}
                onChange={(e) => setSelectedPsychologist(e.target.value)}
                className="w-full px-5 py-3 bg-white/20 border border-white/30 rounded-xl text-black placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 transition-all duration-300 shadow-sm"
                required
              >
                <option value="">Selecione um psicólogo</option>
                {psychologists.map((psych) => (
                  <option key={psych.id} value={psych.id}>
                    {psych.name} - {psych.specialty}
                  </option>
                ))}
              </select>
            </div>

            {/* Descrição da Necessidade */}
            <div>
              <label className="block text-lg font-semibold text-white mb-3">Descreva sua necessidade *</label>
              <textarea
                value={requestData.description}
                onChange={(e) => setRequestData({ ...requestData, description: e.target.value })}
                className="w-full px-5 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 transition-all duration-300 shadow-sm"
                rows={4}
                placeholder="Ex: Preciso de ajuda com ansiedade..."
                required
              />
            </div>

            {/* Nível de Urgência */}
            <div>
              <label className="block text-lg font-semibold text-white mb-3">Nível de Urgência</label>
              <select
                value={requestData.urgency}
                onChange={(e) => setRequestData({ ...requestData, urgency: e.target.value })}
                className="w-full px-5 py-3 bg-white/20 border border-white/30 rounded-xl text-black placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 transition-all duration-300 shadow-sm"
              >
                <option value="baixa">Baixa - Posso aguardar</option>
                <option value="media">Média - Prefiro em breve</option>
                <option value="alta">Alta - Preciso urgentemente</option>
              </select>
            </div>

            {/* Card Informativo */}
            {selectedPsychologist && (
              <Card className={`bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-5 ${urgencyColor(requestData.urgency)}`}>
                <h3 className="font-semibold text-white text-lg mb-2">Informações Importantes</h3>
                <div className="space-y-2 text-white/80">
                  <p><strong>Psicólogo selecionado:</strong> {psychologists.find(p => p.id === parseInt(selectedPsychologist))?.name}</p>
                  <p><strong>Especialidade:</strong> {psychologists.find(p => p.id === parseInt(selectedPsychologist))?.specialty}</p>
                  <div className="mt-3 p-3 bg-white/5 rounded-lg border border-white/20">
                    <p className="text-white/90">
                      <strong>Como funciona:</strong> Sua solicitação será enviada ao psicólogo. Se aceita, ele entrará em contato para agendar as sessões.
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Botões */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate('/dashboard')}
                className="flex-1 bg-white/20 hover:bg-white/30 text-white font-semibold transition-all duration-300 rounded-xl shadow-md"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                loading={submitting}
                disabled={!selectedPsychologist || !requestData.description}
                className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold transition-all duration-300 rounded-xl shadow-lg"
              >
                Enviar Solicitação
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};
