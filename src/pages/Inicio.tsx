import React from 'react';
import { Link } from 'react-router-dom';
import { GitBranch, Database, FileText, BarChart2, Settings, BookOpen } from 'lucide-react';

const Inicio: React.FC = () => {
  const recursos = [
    {
      titulo: 'Manual de Instruções',
      descricao: 'Aprenda a utilizar o sistema com nosso guia passo a passo detalhado.',
      icone: <BookOpen size={40} />,
      caminho: '#manual',
      cor: 'bg-purple-100 text-purple-600',
    },
    {
      titulo: 'Fluxo do Processo',
      descricao: 'Visualize o processo de monitoramento de ANS utilizando diagramas de fluxo.',
      icone: <GitBranch size={40} />,
      caminho: '/fluxo-processo',
      cor: 'bg-blue-100 text-blue-600',
    },
    {
      titulo: 'Automação de Dados',
      descricao: 'Aprenda como automatizar a coleta de dados com Python e RPA.',
      icone: <Database size={40} />,
      caminho: '/automacao-dados',
      cor: 'bg-green-100 text-green-600',
    },
    {
      titulo: 'Extrator de Relatórios',
      descricao: 'Gere relatórios padronizados em formato TXT e JSON para auditoria.',
      icone: <FileText size={40} />,
      caminho: '/extrator-relatorios',
      cor: 'bg-yellow-100 text-yellow-600',
    },
    {
      titulo: 'Dashboard',
      descricao: 'Visualize os ANS através de dashboards interativos semelhantes ao Power BI.',
      icone: <BarChart2 size={40} />,
      caminho: '/dashboard',
      cor: 'bg-orange-100 text-orange-600',
    },
    {
      titulo: 'Recomendações',
      descricao: 'Confira recomendações adicionais para implementação em produção.',
      icone: <Settings size={40} />,
      caminho: '/recomendacoes',
      cor: 'bg-gray-100 text-gray-600',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 mb-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Sistema de Monitoramento de ANS</h1>
        <p className="text-lg mb-6">
          Bem-vindo ao projeto educacional sobre automatização do monitoramento de Acordos de Nível de Serviço (ANS).
          Este sistema demonstra conceitos de automação de processos, coleta de dados, geração de relatórios e visualização
          através de dashboards.
        </p>
        <div className="flex flex-wrap gap-2">
          <a 
            href="#manual" 
            className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors"
          >
            Ver Manual de Instruções
          </a>
          <Link 
            to="/fluxo-processo" 
            className="bg-transparent text-white border border-white px-4 py-2 rounded-md hover:bg-white/10 transition-colors"
          >
            Começar pelo Fluxo
          </Link>
        </div>
      </div>

      <div id="manual" className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Manual de Instruções</h2>
        
        <div className="space-y-8">
          <section>
            <h3 className="text-xl font-semibold mb-4 text-blue-700">1. Primeiros Passos</h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <ol className="list-decimal pl-5 space-y-4">
                <li>
                  <span className="font-medium">Instalação do Projeto:</span>
                  <pre className="mt-2 bg-gray-800 text-white p-3 rounded">
                    git clone https://github.com/holandaalex/sistema-monitoramento-ans.git <br></br>
                    cd sistema-monitoramento-ans <br></br>
                    npm install <br></br>
                    npm run dev <br></br>
                  </pre>
                </li>
                <li>
                  <span className="font-medium">Configuração do Ambiente:</span>
                  <ul className="list-disc pl-5 mt-2 space-y-2">
                    <li>Node.js 18 ou superior</li>
                    <li>Python 3.8 ou superior (para scripts de automação)</li>
                    <li>Editor de código (VS Code recomendado)</li>
                  </ul>
                </li>
              </ol>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4 text-blue-700">2. Estrutura do Projeto</h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <ul className="space-y-3">
                <li>
                  <span className="font-medium">📁 src/</span>
                  <ul className="list-disc pl-5 mt-2">
                    <li>components/: Componentes reutilizáveis</li>
                    <li>pages/: Páginas principais do sistema</li>
                    <li>types/: Definições de tipos TypeScript</li>
                  </ul>
                </li>
                <li>
                  <span className="font-medium">📁 public/</span>
                  <p className="mt-1 text-gray-600">Arquivos estáticos e assets</p>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4 text-blue-700">3. Utilizando o Sistema</h3>
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <div>
                <h4 className="font-medium text-lg mb-2">Fluxo do Processo</h4>
                <p>Navegue pelo diagrama interativo para entender cada etapa do monitoramento de ANS.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-lg mb-2">Automação de Dados</h4>
                <p>Explore exemplos práticos de scripts Python para automação da coleta de dados.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-lg mb-2">Relatórios e Dashboard</h4>
                <p>Gere relatórios em diferentes formatos e visualize métricas no dashboard interativo.</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4 text-blue-700">4. Customização</h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <ul className="space-y-3">
                <li>
                  <span className="font-medium">Adaptando Scripts:</span>
                  <p className="mt-1 text-gray-600">Modifique os scripts em Python conforme suas necessidades específicas.</p>
                </li>
                <li>
                  <span className="font-medium">Personalizando Dashboards:</span>
                  <p className="mt-1 text-gray-600">Ajuste as visualizações e métricas no Power BI conforme seu contexto.</p>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4 text-blue-700">5. Suporte</h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="mb-4">Para dúvidas ou suporte adicional:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Consulte a documentação completa no GitHub</li>
                <li>Abra uma issue no repositório</li>
                <li>Entre em contato com a equipe de desenvolvimento</li>
              </ul>
            </div>
          </section>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-gray-800">Recursos Disponíveis</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {recursos.map((recurso) => (
          <Link 
            key={recurso.titulo} 
            to={recurso.caminho}
            className="block group"
          >
            <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full">
              <div className={`p-6 ${recurso.cor}`}>
                {recurso.icone}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  {recurso.titulo}
                </h3>
                <p className="text-gray-600">{recurso.descricao}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Sobre o Projeto</h2>
        <p className="text-gray-700 mb-4">
          Este projeto foi desenvolvido como material educacional para ensinar conceitos de automação
          de processos e monitoramento de ANS para alunos iniciantes. Todo o código está comentado em
          português do Brasil para facilitar o aprendizado.
        </p>
        <p className="text-gray-700">
          Navegue pelos diferentes módulos para entender como funciona cada parte do sistema de monitoramento
          de ANS, desde a coleta automática de dados até a visualização em dashboards.
        </p>
      </div>
    </div>
  );
};

export default Inicio;