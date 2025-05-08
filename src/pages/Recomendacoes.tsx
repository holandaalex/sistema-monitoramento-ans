import React from 'react';
import { ShieldCheck, Zap, Clock, Database, Share2, LineChart } from 'lucide-react';

// Componente para recomendações adicionais
const Recomendacoes: React.FC = () => {
  // Lista de recomendações agrupadas por categoria
  const recomendacoes = [
    {
      categoria: 'Automação de Processos',
      icone: <Zap size={24} className="text-yellow-500" />,
      cor: 'bg-yellow-50',
      bordaCor: 'border-yellow-500',
      itens: [
        {
          titulo: 'BPMS para Fluxo Completo',
          descricao: 'Utilize uma plataforma BPMS para automatizar todo o fluxo de aprovações e notificações, não apenas partes isoladas do processo.',
          importancia: 'alta',
        },
        {
          titulo: 'Webhooks para Integrações',
          descricao: 'Implemente webhooks para permitir que sistemas externos sejam notificados automaticamente quando o status de um ANS muda.',
          importancia: 'media',
        },
        {
          titulo: 'Chatbots para Consultas',
          descricao: 'Desenvolva chatbots que permitam aos usuários consultarem o status dos ANS através de interfaces conversacionais (Slack, Teams, WhatsApp).',
          importancia: 'baixa',
        },
      ],
    },
    {
      categoria: 'Segurança e Validação',
      icone: <ShieldCheck size={24} className="text-red-500" />,
      cor: 'bg-red-50',
      bordaCor: 'border-red-500',
      itens: [
        {
          titulo: 'Validação Contínua',
          descricao: 'Implemente testes automatizados (ex: pytest) nos scripts Python para garantir que alterações futuras não quebrem a funcionalidade.',
          importancia: 'alta',
        },
        {
          titulo: 'Criptografia de Dados',
          descricao: 'Criptografe dados sensíveis tanto em trânsito quanto em repouso, especialmente informações de autenticação para APIs.',
          importancia: 'alta',
        },
        {
          titulo: 'Logs de Auditoria',
          descricao: 'Mantenha logs detalhados de todas as operações para fins de auditoria e resolução de problemas.',
          importancia: 'media',
        },
      ],
    },
    {
      categoria: 'Monitoramento Avançado',
      icone: <Clock size={24} className="text-blue-500" />,
      cor: 'bg-blue-50',
      bordaCor: 'border-blue-500',
      itens: [
        {
          titulo: 'Detecção de Anomalias',
          descricao: 'Utilize algoritmos de machine learning para detectar padrões anômalos nos dados de ANS, identificando problemas antes que se tornem críticos.',
          importancia: 'media',
        },
        {
          titulo: 'Previsão de Tendências',
          descricao: 'Implemente modelos preditivos que antecipem quando um ANS específico pode ficar abaixo da meta com base em dados históricos.',
          importancia: 'media',
        },
        {
          titulo: 'Monitoramento 24/7',
          descricao: 'Configure alertas em tempo real para notificar gestores sobre degradações significativas nos ANS a qualquer momento.',
          importancia: 'alta',
        },
      ],
    },
    {
      categoria: 'Infraestrutura e Escalabilidade',
      icone: <Database size={24} className="text-purple-500" />,
      cor: 'bg-purple-50',
      bordaCor: 'border-purple-500',
      itens: [
        {
          titulo: 'Banco de Dados Dedicado',
          descricao: 'Utilize um banco de dados SQL robusto (PostgreSQL, SQL Server) em vez de arquivos JSON para armazenamento a longo prazo e consultas complexas.',
          importancia: 'alta',
        },
        {
          titulo: 'Arquitetura em Microsserviços',
          descricao: 'Divida o sistema em microsserviços independentes para coleta, validação, alerta e relatórios, facilitando a manutenção e escalabilidade.',
          importancia: 'media',
        },
        {
          titulo: 'Containerização',
          descricao: 'Utilize Docker para empacotar os componentes do sistema, garantindo consistência entre ambientes de desenvolvimento e produção.',
          importancia: 'media',
        },
      ],
    },
    {
      categoria: 'Integração e Compartilhamento',
      icone: <Share2 size={24} className="text-green-500" />,
      cor: 'bg-green-50',
      bordaCor: 'border-green-500',
      itens: [
        {
          titulo: 'API RESTful',
          descricao: 'Desenvolva uma API REST para permitir que sistemas externos consultem dados de ANS de forma padronizada e segura.',
          importancia: 'alta',
        },
        {
          titulo: 'Exportação para Múltiplos Formatos',
          descricao: 'Além de JSON e TXT, permita exportação em outros formatos como CSV, Excel, e PDF para diferentes necessidades de stakeholders.',
          importancia: 'baixa',
        },
        {
          titulo: 'Sincronização com Sistemas de Gestão',
          descricao: 'Integre diretamente com sistemas de gestão empresarial (ERP) para incorporar dados de ANS em processos de negócio mais amplos.',
          importancia: 'media',
        },
      ],
    },
    {
      categoria: 'Machine Learning e IA',
      icone: <LineChart size={24} className="text-indigo-500" />,
      cor: 'bg-indigo-50',
      bordaCor: 'border-indigo-500',
      itens: [
        {
          titulo: 'Previsão de SLA',
          descricao: 'Treine modelos para prever o SLA futuro com base em dados históricos e padrões sazonais.',
          importancia: 'media',
        },
        {
          titulo: 'Identificação de Causas-Raiz',
          descricao: 'Utilize algoritmos de análise causal para identificar fatores que mais impactam o desempenho dos ANS.',
          importancia: 'alta',
        },
        {
          titulo: 'Recomendações Automatizadas',
          descricao: 'Implemente sistemas de recomendação que sugiram ações corretivas com base em situações similares anteriores.',
          importancia: 'baixa',
        },
      ],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Recomendações Adicionais</h1>
        <p className="text-gray-600 mb-4">
          Explore recomendações avançadas para aprimorar seu sistema de monitoramento de ANS.
          Estas sugestões complementam os conceitos básicos já apresentados e podem ser implementadas
          em etapas futuras do projeto.
        </p>
      </div>

      {/* Banner de destaque de diferenciais */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-6 mb-8 text-white shadow-lg">
        <h2 className="text-xl font-bold mb-4">Diferenciais para o Processo Seletivo</h2>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="mr-2 text-yellow-300">⭐</span>
            <span>Redução significativa de erros manuais com a combinação de Python e Power BI, aumentando a precisão das métricas de ANS.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-yellow-300">⭐</span>
            <span>Integração completa entre sistemas (BPMS + APIs + Power BI), criando um ecossistema coeso e automatizado.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-yellow-300">⭐</span>
            <span>Proposta de inclusão de machine learning para análise preditiva, antecipando problemas antes que ocorram e permitindo ações preventivas.</span>
          </li>
        </ul>
      </div>

      {/* Lista de recomendações agrupadas por categoria */}
      <div className="space-y-8 mb-8">
        {recomendacoes.map((categoria) => (
          <div key={categoria.categoria} className={`${categoria.cor} border-l-4 ${categoria.bordaCor} rounded-lg p-6 shadow-sm`}>
            <div className="flex items-center mb-4">
              {categoria.icone}
              <h2 className="text-xl font-bold ml-2 text-gray-800">{categoria.categoria}</h2>
            </div>
            
            <div className="space-y-4 ml-2">
              {categoria.itens.map((item) => (
                <div key={item.titulo} className="bg-white p-4 rounded-md shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{item.titulo}</h3>
                    <span 
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        item.importancia === 'alta' 
                          ? 'bg-red-100 text-red-800' 
                          : item.importancia === 'media'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {item.importancia === 'alta' ? 'Prioridade Alta' : item.importancia === 'media' ? 'Prioridade Média' : 'Prioridade Baixa'}
                    </span>
                  </div>
                  <p className="text-gray-600">{item.descricao}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Roadmap simplificado */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Roadmap de Implementação</h2>
        
        <div className="relative">
          {/* Linha vertical conectora */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200"></div>
          
          <div className="space-y-8">
            <div className="flex">
              <div className="relative flex items-center justify-center flex-shrink-0 w-16 h-16 mx-auto">
                <div className="z-10 flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full text-white text-lg font-bold">1</div>
              </div>
              <div className="ml-4 -mt-2">
                <h3 className="text-lg font-semibold text-gray-800">Fase Inicial (1-2 meses)</h3>
                <ul className="mt-2 space-y-2 text-gray-600 list-disc ml-5">
                  <li>Configurar coleta automatizada de dados com Python</li>
                  <li>Desenvolver validações básicas de dados</li>
                  <li>Criar primeiro dashboard no Power BI</li>
                  <li>Implementar relatórios em JSON/TXT</li>
                </ul>
              </div>
            </div>
            
            <div className="flex">
              <div className="relative flex items-center justify-center flex-shrink-0 w-16 h-16 mx-auto">
                <div className="z-10 flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full text-white text-lg font-bold">2</div>
              </div>
              <div className="ml-4 -mt-2">
                <h3 className="text-lg font-semibold text-gray-800">Fase Intermediária (3-4 meses)</h3>
                <ul className="mt-2 space-y-2 text-gray-600 list-disc ml-5">
                  <li>Migrar para banco de dados SQL</li>
                  <li>Implementar sistemas de alerta em tempo real</li>
                  <li>Desenvolver API RESTful para acesso aos dados</li>
                  <li>Integrar com BPMS para automatizar aprovações</li>
                </ul>
              </div>
            </div>
            
            <div className="flex">
              <div className="relative flex items-center justify-center flex-shrink-0 w-16 h-16 mx-auto">
                <div className="z-10 flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full text-white text-lg font-bold">3</div>
              </div>
              <div className="ml-4 -mt-2">
                <h3 className="text-lg font-semibold text-gray-800">Fase Avançada (5-6 meses)</h3>
                <ul className="mt-2 space-y-2 text-gray-600 list-disc ml-5">
                  <li>Implementar detecção de anomalias com machine learning</li>
                  <li>Desenvolver modelos preditivos para SLA</li>
                  <li>Criar dashboard avançado com alertas proativos</li>
                  <li>Integrar com outros sistemas corporativos</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefícios esperados */}
      <div className="bg-green-50 rounded-lg p-6 border border-green-200">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Benefícios Esperados</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-md shadow-sm">
            <h3 className="text-lg font-semibold mb-2 text-green-700">Benefícios Quantitativos</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Redução de 90% no tempo de coleta e consolidação de dados</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Diminuição de até 95% nos erros de entrada de dados</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Aumento de 30% na taxa de cumprimento de ANS</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Redução de 40% no tempo de resposta a incidentes</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-md shadow-sm">
            <h3 className="text-lg font-semibold mb-2 text-green-700">Benefícios Qualitativos</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Maior transparência no monitoramento de ANS</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Tomada de decisão mais rápida e fundamentada em dados</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Melhoria na comunicação entre áreas da empresa</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Aumento da satisfação dos usuários e clientes</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recomendacoes;