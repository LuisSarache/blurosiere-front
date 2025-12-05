import { useState, useMemo, forwardRef } from 'react';
import { ChevronUp, ChevronDown, Search, Filter } from 'lucide-react';
import { Input } from './Input';
import { Button } from './Button';
import { Badge } from './Badge';
import { Stack, Flex } from './Layout';

export const DataTable = forwardRef(({ 
  data = [], 
  columns = [], 
  searchable = true,
  sortable = true,
  filterable = false,
  pagination = true,
  pageSize = 10,
  className = '',
  ...props 
}, ref) => {
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter(item =>
      columns.some(col => 
        String(item[col.key] || '').toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search, columns]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize, pagination]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const handleSort = (key) => {
    if (!sortable) return;
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  return (
    <div ref={ref} className={`space-y-4 ${className}`} {...props}>
      {searchable && (
        <Input
          leftIcon={<Search className="w-4 h-4" />}
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      )}

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`
                      px-4 py-3 text-left text-sm font-medium text-white/80
                      ${sortable && col.sortable !== false ? 'cursor-pointer hover:bg-white/5' : ''}
                    `}
                    onClick={() => handleSort(col.key)}
                  >
                    <Flex align="center" gap="sm">
                      {col.label}
                      {sortable && sortConfig.key === col.key && (
                        sortConfig.direction === 'asc' 
                          ? <ChevronUp className="w-4 h-4" />
                          : <ChevronDown className="w-4 h-4" />
                      )}
                    </Flex>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr 
                  key={item.id || index}
                  className="border-t border-white/10 hover:bg-white/5 transition-colors"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-sm text-white/70">
                      {col.render ? col.render(item[col.key], item) : item[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {pagination && totalPages > 1 && (
          <div className="px-4 py-3 border-t border-white/10">
            <Flex justify="between" align="center">
              <div className="text-sm text-white/50">
                {sortedData.length} resultados
              </div>
              <Flex gap="sm">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                >
                  Anterior
                </Button>
                <Badge variant="outline">
                  {currentPage} de {totalPages}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => p + 1)}
                >
                  Próximo
                </Button>
              </Flex>
            </Flex>
          </div>
        )}
      </div>
    </div>
  );
});

DataTable.displayName = 'DataTable';