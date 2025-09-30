// ===== SelectField.jsx =====
import React from 'react';

/**
 * SelectField - Componente genérico para dropdowns (select)
 *
 * Props:
 * - label: texto do label
 * - value: valor selecionado
 * - onChange: função para atualizar o estado
 * - options: array de opções [{ value, label }]
 * - required: boolean para campo obrigatório
 * - icon: componente React opcional para ícone ao lado do label
 * - className: classes extras para customização
 */
export const SelectField = ({
  label,
  value,
  onChange,
  options = [],
  required = false,
  icon = null,
  className = '',
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="flex items-center gap-2 text-lg font-medium text-dark mb-2">
          {icon && <span className="w-5 h-5">{icon}</span>}
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <select
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-dark focus:outline-none focus:ring-2 focus:ring-light ${className}`}
      >
        <option value="">Selecione</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
