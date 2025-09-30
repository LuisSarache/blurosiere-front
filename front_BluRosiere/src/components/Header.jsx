import { Button } from '../components/Button';
import { ArrowLeft } from 'lucide-react';

export const Header = ({ onBack, title }) => (
  <div className="flex items-center gap-6 mb-6">
    <Button
      variant="secondary"
      onClick={onBack}
      className="flex items-center gap-3 bg-blue-900/60 backdrop-blur-2xl border border-blue-500/20 text-white hover:bg-blue-800/80 hover:text-blue-300 transition-all duration-300 shadow-md rounded-xl px-4 py-2"
    >
      <ArrowLeft size={22} />
      Voltar
    </Button>
    <h1 className="text-4xl font-extrabold text-white/90 drop-shadow-lg tracking-wide">{title}</h1>
  </div>
);
