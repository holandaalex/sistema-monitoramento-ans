import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart2, 
  GitBranch, 
  Database, 
  FileText, 
  Home, 
  Settings,
  Menu,
  X
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

// Menu de navegação lateral com os componentes do sistema
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [menuAberto, setMenuAberto] = useState(false);

  // Lista de itens do menu
  const itensMenu = [
    { titulo: 'Início', caminho: '/', icone: <Home size={20} /> },
    { titulo: 'Fluxo do Processo', caminho: '/fluxo-processo', icone: <GitBranch size={20} /> },
    { titulo: 'Automação de Dados', caminho: '/automacao-dados', icone: <Database size={20} /> },
    { titulo: 'Extrator de Relatórios', caminho: '/extrator-relatorios', icone: <FileText size={20} /> },
    { titulo: 'Dashboard', caminho: '/dashboard', icone: <BarChart2 size={20} /> },
    { titulo: 'Recomendações', caminho: '/recomendacoes', icone: <Settings size={20} /> },
  ];

  // Função para verificar se um item do menu está ativo
  const isAtivo = (caminho: string) => {
    return location.pathname === caminho;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Botão de menu móvel */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button 
          onClick={() => setMenuAberto(!menuAberto)}
          className="p-2 rounded-md bg-blue-600 text-white"
        >
          {menuAberto ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu lateral */}
      <div 
        className={`fixed md:static h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-40
          ${menuAberto ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-blue-600">Monitoramento ANS</h1>
          <p className="text-sm text-gray-600">CNI - Cand. Alexsander</p>
        </div>
        
        <nav className="mt-4">
          <ul>
            {itensMenu.map((item) => (
              <li key={item.caminho} className="mb-1">
                <Link
                  to={item.caminho}
                  className={`flex items-center px-4 py-3 text-sm ${
                    isAtivo(item.caminho)
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                      : 'text-gray-700 hover:bg-blue-50'
                  }`}
                  onClick={() => setMenuAberto(false)}
                >
                  <span className="mr-3">{item.icone}</span>
                  {item.titulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Projeto @holandaalex &copy; 2025
          </p>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 overflow-auto">
        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
};

export default Layout;



// Alexsander Barreto - Alexlanda.com.br