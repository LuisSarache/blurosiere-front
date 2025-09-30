import { Card } from '../components/Card';
import { Clock, Plus } from 'lucide-react';
import { SessionForm } from './SessionForm';
import { SessionList } from './SessionList';
import { Button } from '../components/Button';

export const SessionsCard = ({
  sessions,
  showForm,
  formData,
  onFormChange,
  onFormSubmit,
  onFormCancel,
  onShowForm,
  onStatusUpdate,
  updatingSessions,
  creatingSession,
  navigate
}) => (
  <Card className="bg-gradient-to-br from-black/70 via-dark to-dark backdrop-blur-2xl border border-white/20 shadow-2xl hover:shadow-3xl transition-shadow duration-500 rounded-2xl p-6">
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-white/20 pb-4">
        <h3 className="text-2xl font-extrabold text-white flex items-center gap-3 drop-shadow-md">
          <Clock className="w-6 h-6 text-accent" />
          Histórico de Sessões
        </h3>
        <Button
          onClick={onShowForm}
          className="flex items-center gap-2 bg-accent/80 hover:bg-accent/100 text-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
        >
          <Plus className="w-5 h-5" />
          Nova Sessão
        </Button>
      </div>

      {showForm && (
        <SessionForm
          data={formData}
          onChange={onFormChange}
          onSubmit={onFormSubmit}
          onCancel={onFormCancel}
          loading={creatingSession}
        />
      )}

      <SessionList
        sessions={sessions}
        onStatusUpdate={onStatusUpdate}
        updatingSessions={updatingSessions}
        navigate={navigate}
      />
    </div>
  </Card>
);
