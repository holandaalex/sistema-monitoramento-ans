import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importação de componentes
import Layout from './components/Layout';
import Inicio from './pages/Inicio';
import FluxoProcesso from './pages/FluxoProcesso';
import AutomacaoDados from './pages/AutomacaoDados';
import ExtratorRelatorios from './pages/ExtratorRelatorios';
import Dashboard from './pages/Dashboard';
import Recomendacoes from './pages/Recomendacoes';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/fluxo-processo" element={<FluxoProcesso />} />
          <Route path="/automacao-dados" element={<AutomacaoDados />} />
          <Route path="/extrator-relatorios" element={<ExtratorRelatorios />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/recomendacoes" element={<Recomendacoes />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;