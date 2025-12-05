/**
 * Utilitários de Busca Avançada
 * Filtros e busca inteligente
 */

/**
 * Busca fuzzy em múltiplos campos
 */
export const fuzzySearch = (items, query, fields) => {
  if (!query) return items;
  
  const lowerQuery = query.toLowerCase();
  
  return items.filter(item => {
    return fields.some(field => {
      const value = getNestedValue(item, field);
      return value && value.toString().toLowerCase().includes(lowerQuery);
    });
  });
};

/**
 * Filtra por múltiplos critérios
 */
export const multiFilter = (items, filters) => {
  return items.filter(item => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value || value === 'all') return true;
      
      const itemValue = getNestedValue(item, key);
      
      if (Array.isArray(value)) {
        return value.includes(itemValue);
      }
      
      return itemValue === value;
    });
  });
};

/**
 * Ordena por campo
 */
export const sortBy = (items, field, order = 'asc') => {
  return [...items].sort((a, b) => {
    const aVal = getNestedValue(a, field);
    const bVal = getNestedValue(b, field);
    
    if (aVal === bVal) return 0;
    
    const comparison = aVal > bVal ? 1 : -1;
    return order === 'asc' ? comparison : -comparison;
  });
};

/**
 * Paginação
 */
export const paginate = (items, page, perPage) => {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  
  return {
    items: items.slice(start, end),
    total: items.length,
    pages: Math.ceil(items.length / perPage),
    currentPage: page
  };
};

/**
 * Busca por data
 */
export const filterByDateRange = (items, dateField, startDate, endDate) => {
  return items.filter(item => {
    const itemDate = new Date(getNestedValue(item, dateField));
    const start = startDate ? new Date(startDate) : new Date(0);
    const end = endDate ? new Date(endDate) : new Date();
    
    return itemDate >= start && itemDate <= end;
  });
};

/**
 * Helper para acessar valores aninhados
 */
const getNestedValue = (obj, path) => {
  return path.split('.').reduce((current, key) => current?.[key], obj);
};

/**
 * Destaca termo de busca no texto
 */
export const highlightText = (text, query) => {
  if (!query) return text;
  
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
};
