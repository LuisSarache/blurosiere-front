/**
 * Utilitários de Exportação
 * Exporta dados em diferentes formatos
 */

/**
 * Exporta dados para CSV
 */
export const exportToCSV = (data, filename = 'export.csv') => {
  if (!data || data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csv = [
    headers.join(','),
    ...data.map(row => headers.map(header => {
      const value = row[header];
      return typeof value === 'string' && value.includes(',') 
        ? `"${value}"` 
        : value;
    }).join(','))
  ].join('\n');

  downloadFile(csv, filename, 'text/csv');
};

/**
 * Exporta dados para JSON
 */
export const exportToJSON = (data, filename = 'export.json') => {
  const json = JSON.stringify(data, null, 2);
  downloadFile(json, filename, 'application/json');
};

/**
 * Gera relatório de paciente em texto
 */
export const generatePatientReport = (patient, appointments) => {
  const report = `
RELATÓRIO DE PACIENTE
=====================

Nome: ${patient.name}
Email: ${patient.email}
Telefone: ${patient.phone}
Idade: ${patient.age} anos
Status: ${patient.status}

HISTÓRICO DE SESSÕES
====================

Total de Sessões: ${appointments.length}
Sessões Concluídas: ${appointments.filter(a => a.status === 'concluido').length}
Sessões Agendadas: ${appointments.filter(a => a.status === 'agendado').length}

DETALHES DAS SESSÕES
===================

${appointments.map(apt => `
Data: ${new Date(apt.date).toLocaleDateString('pt-BR')}
Horário: ${apt.time}
Descrição: ${apt.description}
Status: ${apt.status}
Notas: ${apt.notes || 'Sem notas'}
---
`).join('\n')}

Relatório gerado em: ${new Date().toLocaleString('pt-BR')}
  `.trim();

  downloadFile(report, `relatorio_${patient.name.replace(/\s/g, '_')}.txt`, 'text/plain');
};

/**
 * Helper para download de arquivo
 */
const downloadFile = (content, filename, type) => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
