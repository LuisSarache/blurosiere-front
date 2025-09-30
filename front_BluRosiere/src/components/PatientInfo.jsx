import { Card } from '../components/Card';
import { Users, Calendar, Phone, Mail, Activity, CheckCircle } from 'lucide-react';

export const PatientInfo = ({ patient }) => {
  const fields = [
    { icon: Calendar, label: 'Idade', value: `${patient.age} anos` },
    { icon: Calendar, label: 'Data de Nascimento', value: new Date(patient.birthDate).toLocaleDateString('pt-BR') },
    { icon: Phone, label: 'Telefone', value: patient.phone, href: `tel:${patient.phone}` },
    { icon: Mail, label: 'Email', value: patient.email, href: `mailto:${patient.email}` },
    { icon: Activity, label: 'Total de Sessões', value: patient.totalSessions },
    { icon: CheckCircle, label: 'Status do Tratamento', value: patient.status, isStatus: true }
  ];

  return (
    <Card className="bg-gradient-to-br from-black/70 via-dark to-dark backdrop-blur-2xl border border-blue-500/20 shadow-2xl rounded-2xl p-6">
      <div className="space-y-6">
        {/* Cabeçalho com avatar */}
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-blue-800/70 rounded-full flex items-center justify-center shadow-lg">
            <Users className="w-10 h-10 text-white/90" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white/90">{patient.name}</h2>
            <p className="text-blue-200">Paciente #{patient.id}</p>
          </div>
        </div>

        {/* Campos do paciente */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fields.map(({ icon: Icon, label, value, href, isStatus }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon className="w-5 h-5 text-blue-200" />
              <div>
                <p className="text-sm text-blue-200">{label}</p>
                {href ? (
                  <a href={href} className="font-semibold text-white/90 hover:text-blue-400 transition-colors break-all">
                    {value}
                  </a>
                ) : isStatus ? (
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium shadow-sm ${
                      value === 'Ativo' || value === 'Em tratamento'
                        ? 'bg-blue-500 text-white'
                        : 'bg-blue-800 text-white'
                    }`}
                  >
                    {value}
                  </span>
                ) : (
                  <p className="font-semibold text-white/90">{value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
