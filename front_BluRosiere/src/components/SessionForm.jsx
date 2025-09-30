import { Card } from './Card';
import { Input } from './Input';
import { Button } from './Button';

export const SessionForm = ({ data, onChange, onSubmit, onCancel, loading }) => {
  const timeSlots = ['08:00','09:00','10:00','11:00','14:00','15:00','16:00','17:00','18:00'];
  const durations = [30, 45, 50, 60];
  const today = new Date().toISOString().split('T')[0];

  return (
    <Card className="bg-gradient-to-br from-blue-900/80 via-blue-800/60 to-blue-700/70 backdrop-blur-2xl border border-blue-500/20 shadow-2xl rounded-2xl p-6 transition-all duration-500 hover:shadow-3xl">
      <h4 className="text-2xl font-extrabold text-white/90 mb-6 drop-shadow-md">Agendar Nova Sessão</h4>
      <form onSubmit={onSubmit} className="space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          <Input
            label="Data *"
            type="date"
            value={data.date}
            onChange={(e) => onChange({ ...data, date: e.target.value })}
            min={today}
            required
            className="bg-blue-900/50 placeholder-blue-200 focus:ring-blue-400"
          />
          <div>
            <label className="block text-sm font-medium text-blue-200 mb-2">Horário *</label>
            <select
              value={data.time}
              onChange={(e) => onChange({ ...data, time: e.target.value })}
              className="w-full px-4 py-2 bg-blue-900/50 border border-blue-500/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition-all duration-300"
              required
            >
              <option value="">Selecione o horário</option>
              {timeSlots.map((time) => <option key={time} value={time}>{time}</option>)}
            </select>
          </div>
        </div>

        <Input
          label="Descrição"
          value={data.description}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
          placeholder="Ex: Sessão de acompanhamento, Avaliação inicial..."
          className="bg-blue-900/50 placeholder-blue-200 focus:ring-blue-400"
        />

        <div>
          <label className="block text-sm font-medium text-blue-200 mb-2">Duração (minutos)</label>
          <select
            value={data.duration}
            onChange={(e) => onChange({ ...data, duration: parseInt(e.target.value) })}
            className="w-full px-4 py-2 bg-blue-900/50 border border-blue-500/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition-all duration-300"
          >
            {durations.map((duration) => <option key={duration} value={duration}>{duration} minutos</option>)}
          </select>
        </div>

        <div className="flex gap-4 mt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            className="flex-1 bg-blue-800/60 hover:bg-blue-700/80 text-white rounded-xl shadow-md transition-all duration-300"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            loading={loading}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-md transition-all duration-300"
            disabled={!data.date || !data.time}
          >
            Agendar Sessão
          </Button>
        </div>
      </form>
    </Card>
  );
};
