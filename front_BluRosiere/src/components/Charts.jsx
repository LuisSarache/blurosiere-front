import { forwardRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const COLORS = ['#3b82f6', '#60a5fa', '#93c5fd', '#dbeafe', '#eff6ff'];

export const Chart = forwardRef(({ 
  type = 'bar',
  data = [],
  dataKey,
  nameKey = 'name',
  height = 300,
  showGrid = true,
  showAxis = true,
  colors = COLORS,
  className = '',
  ...props 
}, ref) => {
  const commonProps = {
    width: '100%',
    height,
    data,
    margin: { top: 5, right: 30, left: 20, bottom: 5 }
  };

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />}
            {showAxis && <XAxis dataKey={nameKey} stroke="rgba(255,255,255,0.5)" />}
            {showAxis && <YAxis stroke="rgba(255,255,255,0.5)" />}
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={colors[0]} 
              strokeWidth={2}
              dot={{ fill: colors[0], strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        );
      
      case 'pie':
        return (
          <PieChart {...commonProps}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey={dataKey}
              nameKey={nameKey}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
          </PieChart>
        );
      
      default:
        return (
          <BarChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />}
            {showAxis && <XAxis dataKey={nameKey} stroke="rgba(255,255,255,0.5)" />}
            {showAxis && <YAxis stroke="rgba(255,255,255,0.5)" />}
            <Bar dataKey={dataKey} fill={colors[0]} radius={[4, 4, 0, 0]} />
          </BarChart>
        );
    }
  };

  return (
    <div ref={ref} className={`glass-card p-6 ${className}`} {...props}>
      <ResponsiveContainer width="100%" height={height}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
});

Chart.displayName = 'Chart';

export const StatsCard = forwardRef(({ 
  title, 
  value, 
  change, 
  icon: Icon,
  trend = 'up',
  className = '',
  ...props 
}, ref) => (
  <div ref={ref} className={`glass-card p-6 ${className}`} {...props}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-white/60 mb-1">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
        {change && (
          <p className={`text-sm mt-1 ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
            {trend === 'up' ? '↗' : '↘'} {change}
          </p>
        )}
      </div>
      {Icon && (
        <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary-400" />
        </div>
      )}
    </div>
  </div>
));