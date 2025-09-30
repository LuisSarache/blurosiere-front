import { Eye, Clock } from 'lucide-react';

export const SessionList = ({ sessions, onStatusUpdate, updatingSessions, navigate }) => {
  if (sessions.length === 0) {
    return (
      <div className="text-center py-12">
        <Clock className="w-20 h-20 text-blue-400/40 mx-auto mb-6 animate-pulse" />
        <p className="text-blue-200 text-lg">Nenhuma sessão encontrada para este paciente.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {sessions.map((session) => (
        <div
          key={session.id}
          className="bg-gradient-to-r from-dark via-blue-800/60 to-dark backdrop-blur-2xl border border-blue-500/20 rounded-2xl p-5 shadow-xl hover:shadow-2xl transition-shadow duration-300"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <p className="font-semibold text-white/90 text-lg">Sessão #{session.id}</p>
                <select
                  value={session.status}
                  onChange={(e) => onStatusUpdate(session.id, e.target.value)}
                  disabled={updatingSessions.has(session.id)}
                  className={`px-3 py-1 text-sm font-medium border-0 rounded-full shadow-sm focus:ring-2 focus:ring-blue-400 transition-all duration-300 ${
                    session.status === 'agendado'
                      ? 'bg-blue-500 text-white'
                      : session.status === 'iniciado'
                      ? 'bg-blue-400 text-white'
                      : session.status === 'concluido'
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-800 text-white'
                  }`}
                >
                  <option value="agendado">Agendado</option>
                  <option value="iniciado">Iniciado</option>
                  <option value="concluido">Concluído</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>
              <p className="text-sm text-blue-200 mb-2">
                {new Date(session.date).toLocaleDateString('pt-BR')} às {session.time}
              </p>
              <p className="text-white/90 font-medium">{session.description}</p>
            </div>
            <button
              onClick={() => navigate(`/sessao/${session.id}`)}
              className="p-2 text-white/60 hover:text-blue-300 transition-colors rounded-full"
              title="Ver detalhes completos"
            >
              <Eye size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
