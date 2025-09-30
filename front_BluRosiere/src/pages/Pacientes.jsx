import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockApi } from '../services/mockApi';
import { Card } from '../components/Card';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Users, Mail, Phone, Calendar, Activity, CheckCircle } from 'lucide-react';

export const Pacientes = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPatients = async () => {
    setLoading(true);
    try {
      const data = await mockApi.getPatients(user.id);
      setPatients(data);
    } catch (error) {
      console.error('Erro ao carregar pacientes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPatients();
  }, [user.id]);

  useEffect(() => {
    const handleFocus = () => loadPatients();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div className="space-y-8 p-6 md:p-10 bg-gradient-to-b from-dark via-medium to-accent min-h-screen">
      {/* Cabeçalho */}
      <div className="flex items-center gap-4 mb-6">
        <Users className="w-10 h-10 text-gradient-to-r from-purple-400 to-pink-500 animate-bounce" />
        <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-xl">
          Meus Pacientes
        </h1>
      </div>

      {/* Grid de Pacientes */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {patients.length === 0 ? (
          <Card className="text-center py-12 bg-gray-900/70 backdrop-blur-md shadow-2xl rounded-3xl border border-gray-700 hover:shadow-3xl transition-shadow duration-500">
            <Users className="w-16 h-16 text-white/30 mx-auto mb-4 animate-pulse" />
            <h3 className="text-xl font-semibold text-white/70 mb-2">
              Nenhum paciente encontrado
            </h3>
            <p className="text-white/50">
              Seus pacientes aparecerão aqui conforme os agendamentos.
            </p>
          </Card>
        ) : (
          patients.map(patient => (
            <Card
            key={patient.id}
            className="cursor-pointer hover:shadow-2xl transition-shadow duration-500 bg-gray-900/60 backdrop-blur-lg rounded-3xl p-6 flex flex-col justify-between min-w-[380px]"
            onClick={() => navigate(`/pacientes/${patient.id}`)}
          >
          
              <div className="space-y-4 flex-1">
                {/* Header do Paciente */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center shadow-inner flex-shrink-0">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="text-xl font-semibold text-white truncate">
                      {patient.name}
                    </h3>
                    <p className="text-sm text-white/60 truncate">
                      Paciente #{patient.id}
                    </p>
                  </div>
                </div>

                {/* Detalhes do Paciente */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-white/60" />
                    <div>
                      <p className="text-sm text-white/60">Idade</p>
                      <p className="font-medium text-white">{patient.age} anos</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-white/60" />
                    <div>
                      <p className="text-sm text-white/60">Data de Nascimento</p>
                      <p className="font-medium text-white">
                        {new Date(patient.birthDate).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-white/60" />
                    <div>
                      <p className="text-sm text-white/60">Telefone</p>
                      <a
                        href={`tel:${patient.phone}`}
                        className="font-medium text-white hover:text-purple-400 transition-colors"
                      >
                        {patient.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-white/60" />
                    <div>
                      <p className="text-sm text-white/60">Total de Sessões</p>
                      <p className="font-medium text-white">{patient.totalSessions}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-white/60" />
                    <div>
                      <p className="text-sm text-white/60">Status do Tratamento</p>
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          patient.status === 'Ativo' || patient.status === 'Em tratamento'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {patient.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
  <Mail className="w-5 h-5 text-white/60" />
  <div className="min-w-0">
    <p className="text-sm text-white/60">Email</p>
    <a
      href={`mailto:${patient.email}`}
      className="font-medium text-white hover:text-purple-400 transition-colors break-words"
    >
      {patient.email}
    </a>
  </div>
</div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
