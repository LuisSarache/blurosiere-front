import { useState, useEffect } from "react";
import { Card } from "../components/Card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Users, Calendar, TrendingUp, AlertTriangle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { mockApi } from "../services/mockApi";
import { LoadingSpinner } from "../components/LoadingSpinner";

export const Relatorios = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [reportsData, setReportsData] = useState(null);
  const [activeTab, setActiveTab] = useState("frequency");

  useEffect(() => {
    const loadReportsData = async () => {
      try {
        const data = await mockApi.getReportsData(user.id);
        setReportsData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadReportsData();
  }, [user.id]);

  if (loading) return <LoadingSpinner size="lg" />;
  if (!reportsData) return <div>Erro ao carregar dados</div>;

  const {
    stats = { activePatients: 0, totalSessions: 0, attendanceRate: 0, riskAlerts: 0 },
    frequencyData = [],
    statusData = [],
    riskAlerts = [],
    patientsData = []
  } = reportsData || {};

  const tabs = [
    { key: "frequency", label: "Frequência" },
    { key: "status", label: "Status" },
    { key: "patients", label: "Pacientes" },
  ];

  const kpis = [
    { icon: Users, value: stats.activePatients, label: "Pacientes Ativos", color: "text-blue-400" },
    { icon: Calendar, value: stats.totalSessions, label: "Total de Sessões", color: "text-indigo-400" },
    { icon: TrendingUp, value: stats.attendanceRate + "%", label: "Taxa de Conclusão", color: "text-green-400" },
    { icon: AlertTriangle, value: stats.riskAlerts, label: "Alertas de Risco", color: "text-red-500" },
  ];

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <Card key={i} className="text-center p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all">
            <kpi.icon className={`w-8 h-8 mx-auto mb-2 ${kpi.color}`} />
            <h3 className="text-2xl font-bold text-white">{kpi.value}</h3>
            <p className="text-white/70 text-sm">{kpi.label}</p>
          </Card>
        ))}
      </div>

      {/* Gráficos em Tabs */}
      <Card className="p-4">
        <div className="flex gap-4 border-b border-white/20 mb-4">
          {tabs.map(tab => (
            <button
              key={tab.key}
              className={`px-4 py-2 font-medium rounded-t-lg ${
                activeTab === tab.key
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:text-white"
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="h-72">
          {activeTab === "frequency" && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={frequencyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Bar dataKey="sessions" fill="#2493BF" />
              </BarChart>
            </ResponsiveContainer>
          )}
          {activeTab === "status" && (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
          {activeTab === "patients" && (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={patientsData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {patientsData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </Card>

      {/* Alertas de Risco */}
      <Card className="p-4">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-500" /> Alertas de Risco
        </h2>
        <div className="space-y-3">
          {riskAlerts.length === 0 ? (
            <p className="text-white/70 text-center py-4">Nenhum alerta de risco no momento</p>
          ) : (
            riskAlerts.map(alert => (
              <div
                key={alert.id}
                className={`flex justify-between items-center p-4 rounded-lg ${
                  alert.risk === "Alto"
                    ? "bg-red-500/20 text-red-700"
                    : "bg-yellow-500/20 text-yellow-700"
                }`}
              >
                <div>
                  <p className="font-medium">{alert.patient}</p>
                  <p className="text-sm">{alert.reason}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs mt-1">{new Date(alert.date).toLocaleDateString("pt-BR")}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};
