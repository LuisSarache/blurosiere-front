/**
 * Sistema de Rastreamento de Humor
 * Funcionalidade única: Análise emocional ao longo do tempo
 */

export const MOOD_TYPES = {
  MUITO_BOM: { value: 5, label: 'Muito Bem', emoji: '😄', color: '#22c55e' },
  BOM: { value: 4, label: 'Bem', emoji: '🙂', color: '#84cc16' },
  NEUTRO: { value: 3, label: 'Neutro', emoji: '😐', color: '#f59e0b' },
  RUIM: { value: 2, label: 'Mal', emoji: '😟', color: '#f97316' },
  MUITO_RUIM: { value: 1, label: 'Muito Mal', emoji: '😢', color: '#ef4444' }
};

export const MOOD_STORAGE_KEY = 'blurosiere_mood_entries';

/**
 * Registra humor do dia
 */
export const saveMoodEntry = (userId, mood, notes = '') => {
  const entries = getMoodEntries(userId);
  const today = new Date().toISOString().split('T')[0];
  
  // Remove entrada do dia se já existir
  const filtered = entries.filter(e => e.date !== today);
  
  const newEntry = {
    id: Date.now(),
    userId,
    mood,
    notes,
    date: today,
    timestamp: new Date().toISOString()
  };
  
  filtered.push(newEntry);
  localStorage.setItem(MOOD_STORAGE_KEY, JSON.stringify(filtered));
  
  return newEntry;
};

/**
 * Obtém entradas de humor do usuário
 */
export const getMoodEntries = (userId, days = 30) => {
  try {
    const stored = localStorage.getItem(MOOD_STORAGE_KEY);
    const allEntries = stored ? JSON.parse(stored) : [];
    
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return allEntries
      .filter(e => e.userId === userId && new Date(e.date) >= cutoffDate)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  } catch {
    return [];
  }
};

/**
 * Calcula média de humor
 */
export const calculateMoodAverage = (entries) => {
  if (entries.length === 0) return 0;
  const sum = entries.reduce((acc, e) => acc + e.mood, 0);
  return (sum / entries.length).toFixed(1);
};

/**
 * Analisa tendência de humor
 */
export const analyzeMoodTrend = (entries) => {
  if (entries.length < 2) return { trend: 'neutral', message: 'Dados insuficientes' };
  
  const recent = entries.slice(-7); // Últimos 7 dias
  const older = entries.slice(-14, -7); // 7 dias anteriores
  
  const recentAvg = recent.reduce((acc, e) => acc + e.mood, 0) / recent.length;
  const olderAvg = older.length > 0 
    ? older.reduce((acc, e) => acc + e.mood, 0) / older.length 
    : recentAvg;
  
  const diff = recentAvg - olderAvg;
  
  if (diff > 0.5) {
    return { 
      trend: 'improving', 
      message: 'Seu humor está melhorando! 📈',
      color: '#22c55e'
    };
  } else if (diff < -0.5) {
    return { 
      trend: 'declining', 
      message: 'Seu humor está em declínio. Converse com seu psicólogo. 📉',
      color: '#ef4444'
    };
  }
  
  return { 
    trend: 'stable', 
    message: 'Seu humor está estável. ➡️',
    color: '#f59e0b'
  };
};

/**
 * Gera insights de humor
 */
export const generateMoodInsights = (entries) => {
  if (entries.length === 0) return [];
  
  const insights = [];
  const moodCounts = {};
  
  // Conta frequência de cada humor
  entries.forEach(e => {
    moodCounts[e.mood] = (moodCounts[e.mood] || 0) + 1;
  });
  
  // Humor mais frequente
  const mostFrequent = Object.entries(moodCounts)
    .sort((a, b) => b[1] - a[1])[0];
  
  const moodInfo = Object.values(MOOD_TYPES).find(m => m.value === parseInt(mostFrequent[0]));
  
  insights.push({
    type: 'frequent',
    title: 'Humor Predominante',
    message: `Você se sentiu "${moodInfo.label}" em ${mostFrequent[1]} dias`,
    emoji: moodInfo.emoji
  });
  
  // Sequência atual
  const lastMoods = entries.slice(-3).map(e => e.mood);
  if (lastMoods.every(m => m >= 4)) {
    insights.push({
      type: 'streak',
      title: 'Sequência Positiva',
      message: 'Você está em uma boa fase! Continue assim! 🌟',
      emoji: '🎉'
    });
  } else if (lastMoods.every(m => m <= 2)) {
    insights.push({
      type: 'alert',
      title: 'Atenção Necessária',
      message: 'Considere conversar com seu psicólogo sobre como está se sentindo.',
      emoji: '⚠️'
    });
  }
  
  // Média geral
  const avg = calculateMoodAverage(entries);
  insights.push({
    type: 'average',
    title: 'Média Geral',
    message: `Sua média de humor é ${avg}/5`,
    emoji: avg >= 4 ? '😊' : avg >= 3 ? '😐' : '😔'
  });
  
  return insights;
};

/**
 * Formata dados para gráfico
 */
export const formatMoodChartData = (entries) => {
  return entries.map(entry => ({
    date: new Date(entry.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
    humor: entry.mood,
    fullDate: entry.date,
    notes: entry.notes
  }));
};

/**
 * Verifica se já registrou humor hoje
 */
export const hasMoodToday = (userId) => {
  const entries = getMoodEntries(userId, 1);
  const today = new Date().toISOString().split('T')[0];
  return entries.some(e => e.date === today);
};
