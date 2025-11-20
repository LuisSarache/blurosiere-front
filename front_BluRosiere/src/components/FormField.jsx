/**
 * Componente de campo de formulário com validação
 * Encapsula Input com label e mensagem de erro
 */

import { Input } from './Input';

export const FormField = ({
  label,
  error,
  required,
  helperText,
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-white/70">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <Input {...props} error={error} />
      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-xs text-white/50 mt-1">{helperText}</p>
      )}
    </div>
  );
};
