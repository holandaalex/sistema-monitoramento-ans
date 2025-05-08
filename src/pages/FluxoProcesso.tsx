import React, { useState } from 'react';
import { ArrowRight, AlertCircle, CheckCircle, Database, FileText, Bell } from 'lucide-react';
import { EtapaProcesso } from '../types';

// Componente para mostrar o fluxo de processo usado no monitoramento de ANS
const FluxoProcesso: React.FC = () => {
  // Etapas do fluxo de processo
  const etapas: EtapaProcesso[] = [
    {
      id: 1,
      nome: 'Coleta de Dados Automatizada',
      descricao: 'Integração com sistemas das superintendências ou automação de planilhas Excel via RPA.',
      responsavel: 'Sistema Automatizado',
      icone: 'database',
    },
    {
      id: 2,
      nome: 'Aprovação de Dados',
      descricao: 'Se houver inconsistências, disparar alerta para o responsável da superintendência corrigir.',
      responsavel: 'Analista de Superintendência',
      icone: 'check',
    },
    {
      id: 3,
      nome: 'Consolidação em Repositório Central',
      descricao: 'Salvar dados em um banco de dados ou arquivo estruturado (.json).',
      responsavel: 'Sistema Automatizado',
      icone: 'database',
    },
    {
      id: 4,
      nome: 'Monitoramento Contínuo',
      descricao: 'Disparar alertas quando ANS estiver próximo de vencer ou fora do limite aceitável.',
      responsavel: 'Sistema de Alertas',
      icone: 'alert',
    },
    {
      id: 5,
      nome: 'Geração de Relatórios',
      descricao: 'Exportar status dos ANS em .txt ou .json diariamente.',
      responsavel: 'Sistema Automatizado',
      icone: 'file',
    },
    {
      id: 6,
      nome: 'Atualização do Dashboard',
      descricao: 'Power BI atualizado automaticamente via conexão direta ao repositório.',
      responsavel: 'Dashboard Power BI',
      icone: 'chart',
    },
  ];

  // Estado para controlar qual etapa está sendo visualizada em detalhes
  const [etapaAtiva, setEtapaAtiva] = useState<number | null>(null);

  // Função que retorna o ícone apropriado baseado na string do ícone
  const getIcone = (icone: string) => {
    switch (icone) {
      case 'database':
        return <Database size={24} className="text-blue-500" />;
      case 'check':
        return <CheckCircle size={24} className="text-green-500" />;
      case 'alert':
        return <AlertCircle size={24} className="text-yellow-500" />;
      case 'file':
        return <FileText size={24} className="text-purple-500" />;
      case 'chart':
        return <Bell size={24} className="text-red-500" />;
      default:
        return <Database size={24} className="text-gray-500" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Fluxo do Processo Automatizado</h1>
        <p className="text-gray-600 mb-4">
          Visualize o processo completo de monitoramento de ANS, desde a coleta de dados até a geração de relatórios e dashboards.
          Clique em cada etapa para ver mais detalhes.
        </p>
      </div>

      {/* Diagrama de fluxo do processo */}
      <div className="mb-12 overflow-x-auto">
        <div className="min-w-max">
          <div className="flex flex-nowrap items-start space-x-2 pb-6">
            {etapas.map((etapa, index) => (
              <React.Fragment key={etapa.id}>
                <div 
                  className={`flex flex-col items-center cursor-pointer transition-all duration-300 transform ${
                    etapaAtiva === etapa.id ? 'scale-105' : 'hover:scale-105'
                  }`}
                  onClick={() => setEtapaAtiva(etapa.id === etapaAtiva ? null : etapa.id)}
                >
                  <div className="w-36 h-24 flex flex-col items-center justify-center p-2 rounded-lg bg-white shadow-md border-2 border-blue-200 text-center">
                    <div className="mb-2">{getIcone(etapa.icone)}</div>
                    <span className="text-sm font-medium">{etapa.nome.split(' ').slice(0, 2).join(' ')}</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">{etapa.responsavel}</div>
                </div>
                
                {/* Seta conectora entre etapas */}
                {index < etapas.length - 1 && (
                  <div className="flex items-center self-center mt-12">
                    <ArrowRight size={24} className="text-blue-400" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Detalhes da etapa selecionada */}
      {etapaAtiva && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 animate-fadeIn">
          <h3 className="text-xl font-bold mb-2 text-blue-800">
            {etapas.find(e => e.id === etapaAtiva)?.nome}
          </h3>
          <p className="text-gray-700 mb-4">
            {etapas.find(e => e.id === etapaAtiva)?.descricao}
          </p>
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium mr-2">Responsável:</span>
            <span>{etapas.find(e => e.id === etapaAtiva)?.responsavel}</span>
          </div>
        </div>
      )}

      {/* Seção de integração */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Pontos de Integração</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-blue-600">Sistemas Existentes</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>APIs das superintendências para coleta de dados</li>
              <li>BPMS para automatizar aprovações e notificações</li>
              <li>Banco de dados para armazenamento centralizado</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2 text-blue-600">Ferramentas</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Power BI (visualização)</li>
              <li>Python/RPA (automação de coleta)</li>
              <li>Bizagi (modelagem de processos)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Código Bizagi (simulado) */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Modelo Visual no Bizagi (Conceito)</h2>
        <p className="text-gray-600 mb-4">
          O diagrama abaixo representa como seria o modelo BPMN completo no Bizagi, com lanes, 
          gatilhos e eventos intermediários.
        </p>
        
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <div className="bg-gray-50 p-4 rounded border border-gray-300 text-sm font-mono text-gray-700 h-32 flex items-center justify-center">
            [Representação visual do diagrama BPMN - Em ambiente real seria implementado no Bizagi]
          </div>
          <p className="mt-4 text-sm text-gray-600">
            <strong>Nota:</strong> Os modelos BPMN são criados no Bizagi Modeler, que é uma ferramenta visual.
            O código XML gerado pelo Bizagi não é incluído aqui por ser extenso e específico da ferramenta.
          </p>
        </div>
      </div>

      {/* Dicas de Implementação */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-yellow-800">Dicas para Implementação</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Use <strong>lanes</strong> para diferenciar papéis (ex: Superintendência, Analista de Processos, Gestor)</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Inclua <strong>gatilhos condicionais</strong> (ex: "Se dados válidos → Consolidar; Senão → Alertar")</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Adicione <strong>eventos intermediários</strong> para alertas em tempo real</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Documente o fluxo com comentários claros para facilitar a manutenção</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FluxoProcesso;