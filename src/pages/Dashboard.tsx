import React, { useState } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { AlertTriangle, CheckCircle, ArrowUpRight, ArrowDownRight, AlertCircle } from 'lucide-react';
import { ANS, DadoHistorico } from '../types';

// Registrando componentes do ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Componente para demonstrar a visualização de dados em dashboards
const Dashboard: React.FC = () => {
  // Estado para filtros
  const [superintendenciaFiltro, setSuperintendenciaFiltro] = useState<string>('Todas');
  const [periodoFiltro, setPeriodoFiltro] = useState<string>('30');

  // Dados simulados de ANS
  const dadosANS: ANS[] = [
    { id: 1, superintendencia: 'TI', servico: 'Suporte ao Usuário', sla: 95.2, meta: 95, status: 'Dentro do esperado', data: '2025-09-30' },
    { id: 2, superintendencia: 'RH', servico: 'Processamento de Folha', sla: 98.7, meta: 98, status: 'Dentro do esperado', data: '2025-09-30' },
    { id: 3, superintendencia: 'Logística', servico: 'Entrega de Materiais', sla: 87.3, meta: 90, status: 'Atenção', data: '2025-09-30' },
    { id: 4, superintendencia: 'Vendas', servico: 'Atendimento ao Cliente', sla: 92.1, meta: 95, status: 'Atenção', data: '2025-09-30' },
    { id: 5, superintendencia: 'Financeiro', servico: 'Processamento de Pagamentos', sla: 99.8, meta: 99, status: 'Dentro do esperado', data: '2025-09-30' },
    { id: 6, superintendencia: 'Marketing', servico: 'Campanhas Digitais', sla: 78.4, meta: 90, status: 'Crítico', data: '2025-09-30' },
    { id: 7, superintendencia: 'Jurídico', servico: 'Análise de Contratos', sla: 96.2, meta: 95, status: 'Dentro do esperado', data: '2025-09-30' },
    { id: 8, superintendencia: 'Operações', servico: 'Manutenção Predial', sla: 93.5, meta: 90, status: 'Dentro do esperado', data: '2025-09-30' },
  ];

  // Dados históricos simulados para os gráficos
  const dadosHistoricos: DadoHistorico[] = Array.from({ length: 30 }, (_, i) => {
    const dia = 30 - i;
    const data = new Date(2025, 8, dia).toISOString().split('T')[0];
    return {
      data,
      superintendencia: 'TI',
      sla: 90 + Math.random() * 10,
    };
  });

  // Lista de superintendências
  const superintendencias = ['Todas', ...new Set(dadosANS.map(item => item.superintendencia))];

  // Totais para cards
  const totalANS = dadosANS.length;
  const ansDentroEsperado = dadosANS.filter(ans => ans.status === 'Dentro do esperado').length;
  const ansAtencao = dadosANS.filter(ans => ans.status === 'Atenção').length;
  const ansCritico = dadosANS.filter(ans => ans.status === 'Crítico').length;
  const percentualCumprimento = (ansDentroEsperado / totalANS) * 100;

  // Dados filtrados
  const dadosFiltrados = superintendenciaFiltro === 'Todas' 
    ? dadosANS 
    : dadosANS.filter(ans => ans.superintendencia === superintendenciaFiltro);

  // Dados para o gráfico de linha
  const dadosGraficoLinha = {
    labels: dadosHistoricos.map(d => d.data.substring(5)).reverse(), // formato MM-DD
    datasets: [
      {
        label: 'SLA (%)',
        data: dadosHistoricos.map(d => d.sla).reverse(),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Meta (%)',
        data: dadosHistoricos.map(() => 95),
        borderColor: 'rgba(255, 99, 132, 0.8)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderDash: [5, 5],
        borderWidth: 2,
      },
    ],
  };

  // Opções para o gráfico de linha
  const opcoesGraficoLinha = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Evolução do SLA ao Longo do Tempo',
        color: '#374151',
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
    },
    scales: {
      y: {
        min: 70,
        max: 100,
        title: {
          display: true,
          text: 'SLA (%)',
        },
      },
    },
  };

  // Dados para o gráfico de barras
  const dadosGraficoBarras = {
    labels: dadosFiltrados.map(d => d.servico),
    datasets: [
      {
        label: 'SLA Atual (%)',
        data: dadosFiltrados.map(d => d.sla),
        backgroundColor: dadosFiltrados.map(d => {
          if (d.status === 'Dentro do esperado') return 'rgba(34, 197, 94, 0.7)';
          if (d.status === 'Atenção') return 'rgba(234, 179, 8, 0.7)';
          return 'rgba(239, 68, 68, 0.7)';
        }),
        borderWidth: 1,
      },
      {
        label: 'Meta (%)',
        data: dadosFiltrados.map(d => d.meta),
        backgroundColor: 'rgba(156, 163, 175, 0.5)',
        borderWidth: 1,
      },
    ],
  };

  // Opções para o gráfico de barras
  const opcoesGraficoBarras = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'SLA por Serviço',
        color: '#374151',
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
    },
    scales: {
      y: {
        min: 70,
        max: 100,
        title: {
          display: true,
          text: 'SLA (%)',
        },
      },
    },
  };

  // Dados para o gráfico de pizza
  const dadosGraficoPizza = {
    labels: ['Dentro do Esperado', 'Atenção', 'Crítico'],
    datasets: [
      {
        data: [ansDentroEsperado, ansAtencao, ansCritico],
        backgroundColor: [
          'rgba(34, 197, 94, 0.7)',
          'rgba(234, 179, 8, 0.7)',
          'rgba(239, 68, 68, 0.7)',
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(234, 179, 8, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Opções para o gráfico de pizza
  const opcoesGraficoPizza = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Distribuição por Status',
        color: '#374151',
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
    },
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Dashboard de Monitoramento de ANS</h1>
        <p className="text-gray-600 mb-4">
          Visualize o desempenho dos Acordos de Nível de Serviço em tempo real através de gráficos e indicadores.
          Este dashboard simula a funcionalidade que seria implementada no Power BI.
        </p>
      </div>

      {/* Filtros */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="superintendencia" className="block text-sm font-medium text-gray-700 mb-1">
              Superintendência
            </label>
            <select
              id="superintendencia"
              value={superintendenciaFiltro}
              onChange={(e) => setSuperintendenciaFiltro(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {superintendencias.map((sup) => (
                <option key={sup} value={sup}>
                  {sup}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="periodo" className="block text-sm font-medium text-gray-700 mb-1">
              Período de Análise
            </label>
            <select
              id="periodo"
              value={periodoFiltro}
              onChange={(e) => setPeriodoFiltro(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7">Últimos 7 dias</option>
              <option value="15">Últimos 15 dias</option>
              <option value="30">Últimos 30 dias</option>
              <option value="90">Últimos 90 dias</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500">Total de ANS</p>
              <p className="text-2xl font-bold text-gray-800">{totalANS}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <AlertCircle size={24} className="text-blue-500" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500">Dentro do Esperado</p>
              <p className="text-2xl font-bold text-gray-800">{ansDentroEsperado}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle size={24} className="text-green-500" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <ArrowUpRight size={14} className="text-green-500 mr-1" />
            <span className="text-green-500">5% em relação ao mês anterior</span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500">Em Atenção</p>
              <p className="text-2xl font-bold text-gray-800">{ansAtencao}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
              <AlertTriangle size={24} className="text-yellow-500" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <ArrowDownRight size={14} className="text-green-500 mr-1" />
            <span className="text-green-500">2% em relação ao mês anterior</span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500">Críticos</p>
              <p className="text-2xl font-bold text-gray-800">{ansCritico}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle size={24} className="text-red-500" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <ArrowDownRight size={14} className="text-green-500 mr-1" />
            <span className="text-green-500">50% em relação ao mês anterior</span>
          </div>
        </div>
      </div>

      {/* Percentual de cumprimento (gauge) */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-8">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Percentual de Cumprimento de ANS</h2>
        <div className="flex justify-center">
          <div className="relative h-32 w-32">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={
                  percentualCumprimento >= 90
                    ? '#22c55e'
                    : percentualCumprimento >= 80
                    ? '#eab308'
                    : '#ef4444'
                }
                strokeWidth="10"
                strokeDasharray={`${(percentualCumprimento * 283) / 100} 283`}
                strokeDashoffset="0"
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
              <text
                x="50"
                y="55"
                textAnchor="middle"
                fontSize="20"
                fontWeight="bold"
                fill="#374151"
              >
                {percentualCumprimento.toFixed(1)}%
              </text>
            </svg>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <Line data={dadosGraficoLinha} options={opcoesGraficoLinha} />
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md">
          <Bar data={dadosGraficoBarras} options={opcoesGraficoBarras} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md lg:col-span-1">
          <Pie data={dadosGraficoPizza} options={opcoesGraficoPizza} />
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md lg:col-span-2">
          <h2 className="text-lg font-bold mb-4 text-gray-800">ANS em Atenção e Críticos</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Superintendência
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Serviço
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SLA Atual
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Meta
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dadosANS.filter(ans => ans.status !== 'Dentro do esperado').map((ans) => (
                  <tr key={ans.id}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{ans.superintendencia}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{ans.servico}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{ans.sla.toFixed(1)}%</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{ans.meta}%</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        ans.status === 'Atenção'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {ans.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Instruções Power BI */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Implementação no Power BI</h2>
        <p className="text-gray-700 mb-4">
          Este dashboard demonstra as principais visualizações que seriam implementadas em um 
          relatório real do Power BI. Para implementar algo semelhante no Power BI, siga estas etapas:
        </p>
        
        <ol className="list-decimal pl-5 space-y-2 text-gray-700">
          <li>Importe os dados usando o Power Query, conectando ao JSON ou banco de dados.</li>
          <li>Crie medidas DAX para cálculos dinâmicos como percentuais de cumprimento.</li>
          <li>Utilize os visuais nativos do Power BI para criar gráficos semelhantes aos mostrados aqui.</li>
          <li>Configure atualizações automáticas para manter o dashboard sempre atualizado.</li>
          <li>Adicione filtros e segmentações para análises mais detalhadas.</li>
        </ol>
        
        <div className="mt-4 p-4 bg-blue-50 rounded border border-blue-200">
          <p className="text-sm text-blue-700">
            <strong>Dica:</strong> O Power BI permite configurar alertas automáticos quando um indicador atinge 
            determinado limite. Isso é especialmente útil para monitoramento proativo de ANS críticos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;