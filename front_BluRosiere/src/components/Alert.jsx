/**
 * Componente Alert para mensagens
 * Exibe alertas de sucesso, erro, aviso e informação
 */

import { AlertCircle, CheckCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useState } from 'react';

export const Alert = ({
  type = 'info',
  title,
  message,
  onClose,
  dismissible = true,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  const styles = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: 'text-green-600',
      Icon: CheckCircle,
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: 'text-red-600',
      Icon: AlertCircle,
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: 'text-yellow-600',
      Icon: AlertTriangle,
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: 'text-blue-600',
      Icon: Info,
    },
  };

  const style = styles[type];
  const Icon = style.Icon;

  return (
    <div className={`${style.bg} border ${style.border} rounded-lg p-4 flex gap-3`}>
      <Icon className={`${style.icon} flex-shrink-0 w-5 h-5 mt-0.5`} />
      <div className="flex-1">
        {title && <h3 className={`font-semibold ${style.text}`}>{title}</h3>}
        {message && <p className={`text-sm ${style.text}`}>{message}</p>}
      </div>
      {dismissible && (
        <button
          onClick={handleClose}
          className={`${style.icon} hover:opacity-70 flex-shrink-0`}
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
};
