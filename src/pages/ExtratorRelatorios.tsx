import React, { useState } from 'react';
import { FileBadge, FileJson, CopyCheck, Download, Play } from 'lucide-react';

// Componente para demonstrar a geração de relatórios
const ExtratorRelatorios: React.FC = () => {
  const [formatoAtivo, setFormatoAtivo] = useState<'json' | 'txt'>('json');
  const [copiado, setCopiado] = useState(false);
  const [gerado, setGerado] = useState(false);

  // Exemplos de relatórios gerados
  const relatoriosExemplo = {
    json: `{
  "meta": {
    "data_geracao": "2025-10-01T14:30:45",
    "periodo": "2025-09-01 a 2025-09-30",
    "versao": "1.0",
    "total_registros": 45
  },
  "dados": [
    {
      "data": "2025-09-30",
      "superintendencia": "TI",
      "servico": "Suporte ao Usuário",
      "sla": 95.2,
      "meta": 95.0,
      "status": "Dentro do esperado",
      "alerta": false,
      "tendencia": "estável"
    },
    {
      "data": "2025-09-30",
      "superintendencia": "RH",
      "servico": "Processamento de Folha",
      "sla": 98.7,
      "meta": 98.0,
      "status": "Dentro do esperado",
      "alerta": false,
      "tendencia": "positiva"
    },
    {
      "data": "2025-09-30",
      "superintendencia": "Logística",
      "servico": "Entrega de Materiais",
      "sla": 87.3,
      "meta": 90.0,
      "status": "Atenção",
      "alerta": true,
      "tendencia": "negativa"
    },
    {
      "data": "2025-09-30",
      "superintendencia": "Vendas",
      "servico": "Atendimento ao Cliente",
      "sla": 92.1,
      "meta": 95.0,
      "status": "Atenção",
      "alerta": true,
      "tendencia": "estável"
    },
    {
      "data": "2025-09-30",
      "superintendencia": "Financeiro",
      "servico": "Processamento de Pagamentos",
      "sla": 99.8,
      "meta": 99.0,
      "status": "Dentro do esperado",
      "alerta": false,
      "tendencia": "estável"
    }
  ],
  "sumario": {
    "total_ans_monitorados": 45,
    "dentro_esperado": 38,
    "atencao": 5,
    "critico": 2,
    "media_geral": 93.4
  }
}`,
    txt: `==========================================================
RELATÓRIO DE STATUS ANS - CONSOLIDADO DIÁRIO
Data de Geração: 01/10/2025 14:30:45
Período de Referência: 01/09/2025 a 30/09/2025
==========================================================

RESUMO GERAL:
- Total de ANS monitorados: 45
- ANS dentro do esperado: 38 (84.4%)
- ANS em atenção: 5 (11.1%)
- ANS críticos: 2 (4.4%)
- Média geral de SLA: 93.4%

----------------------------------------------------------
DETALHAMENTO POR SUPERINTENDÊNCIA (30/09/2025):
----------------------------------------------------------

1. TI - Suporte ao Usuário
   SLA Atual: 95.2% | Meta: 95.0%
   Status: Dentro do esperado
   Tendência: Estável

2. RH - Processamento de Folha
   SLA Atual: 98.7% | Meta: 98.0%
   Status: Dentro do esperado
   Tendência: Positiva

3. Logística - Entrega de Materiais
   SLA Atual: 87.3% | Meta: 90.0%
   Status: Atenção
   Tendência: Negativa

4. Vendas - Atendimento ao Cliente
   SLA Atual: 92.1% | Meta: 95.0%
   Status: Atenção
   Tendência: Estável

5. Financeiro - Processamento de Pagamentos
   SLA Atual: 99.8% | Meta: 99.0%
   Status: Dentro do esperado
   Tendência: Estável

----------------------------------------------------------
ALERTAS ATIVOS:
----------------------------------------------------------

ATENÇÃO:
- Logística (Entrega de Materiais): SLA abaixo da meta por 2 dias consecutivos
- Vendas (Atendimento ao Cliente): SLA abaixo da meta, tendência de queda

CRÍTICO:
- Nenhum alerta crítico no período

==========================================================
Relatório gerado automaticamente pelo Sistema de Monitoramento ANS
Versão 1.0
==========================================================`
  };

  // Função para copiar o relatório
  const copiarRelatorio = () => {
    navigator.clipboard.writeText(relatoriosExemplo[formatoAtivo]);
    setCopiado(true);
    
    setTimeout(() => {
      setCopiado(false);
    }, 2000);
  };

  // Função para simular a geração do relatório
  const simularGeracao = () => {
    setGerado(false);
    setTimeout(() => {
      setGerado(true);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Extração de Relatório de Status</h1>
        <p className="text-gray-600 mb-4">
          Saiba como gerar relatórios padronizados em formatos TXT e JSON para facilitar a auditoria 
          e o acompanhamento dos ANS.
        </p>
      </div>

      {/* Seletor de formato */}
      <div className="mb-6 flex items-center">
        <span className="text-gray-700 mr-4">Selecione o formato do relatório:</span>
        <div className="flex bg-gray-200 rounded-md overflow-hidden">
          <button
            className={`px-4 py-2 text-sm font-medium ${
              formatoAtivo === 'json'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setFormatoAtivo('json')}
          >
            <FileJson size={16} className="inline mr-1" /> JSON
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              formatoAtivo === 'txt'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setFormatoAtivo('txt')}
          >
            <FileBadge size={16} className="inline mr-1" /> TXT
          </button>
        </div>
      </div>

      {/* Ações */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button 
          onClick={simularGeracao}
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-sm flex items-center"
        >
          <Play size={16} className="mr-1" /> Gerar Relatório
        </button>
        <button 
          onClick={copiarRelatorio}
          className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm flex items-center"
        >
          {copiado ? <CopyCheck size={16} className="mr-1" /> : <span className="mr-1">📋</span>}
          {copiado ? 'Copiado!' : 'Copiar Conteúdo'}
        </button>
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm flex items-center"
        >
          <Download size={16} className="mr-1" /> Baixar Arquivo
        </button>
      </div>

      {/* Display do relatório */}
      <div className="relative mb-8">
        <div className="bg-gray-800 text-white p-2 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center">
            {formatoAtivo === 'json' ? <FileJson size={18} className="mr-2" /> : <FileBadge size={18} className="mr-2" />}
            <span className="text-sm font-medium">
              {formatoAtivo === 'json' ? 'relatorio_ans_20250930.json' : 'relatorio_ans_20250930.txt'}
            </span>
          </div>
        </div>
        <pre className={`bg-gray-900 text-gray-100 p-4 rounded-b-lg overflow-x-auto text-sm ${
          formatoAtivo === 'txt' ? 'font-mono' : ''
        }`}>
          <code>{relatoriosExemplo[formatoAtivo]}</code>
        </pre>

        {/* Overlay para animação de geração */}
        {!gerado && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
            <div className="bg-white p-4 rounded-md flex flex-col items-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-2"></div>
              <p className="text-sm font-medium text-gray-700">Gerando relatório...</p>
            </div>
          </div>
        )}
      </div>

      {/* Lógica de geração */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Lógica de Geração</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-blue-600">Para formato JSON</h3>
            <p className="text-gray-700 mb-4">
              O formato JSON é ideal para integração com sistemas e APIs:
            </p>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
              <code>{`import json

# Filtrar dados do período desejado
dados_filtrados = [d for d in dados if filtro_data(d)]

# Criar estrutura do documento
relatorio = {
  "meta": {
    "data_geracao": data_atual,
    "periodo": periodo,
    "versao": "1.0"
  },
  "dados": dados_filtrados,
  "sumario": calcular_sumario(dados_filtrados)
}

# Salvar arquivo JSON
with open("relatorio_ans.json", "w") as f:
    json.dump(relatorio, f, indent=2)
`}</code>
            </pre>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2 text-blue-600">Para formato TXT</h3>
            <p className="text-gray-700 mb-4">
              O formato TXT é mais legível para humanos e pode ser impresso:
            </p>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
              <code>{`def gerar_relatorio_txt(dados, periodo):
    cabecalho = "=" * 58
    cabecalho += "\\nRELATÓRIO DE STATUS ANS - CONSOLIDADO DIÁRIO"
    cabecalho += f"\\nData de Geração: {data_atual}"
    cabecalho += f"\\nPeríodo: {periodo}"
    cabecalho += "\\n" + "=" * 58
    
    # Construir conteúdo do relatório
    conteudo = cabecalho + "\\n\\n"
    conteudo += "RESUMO GERAL:\\n"
    # ... adicionar dados de resumo ...
    
    # Salvar em arquivo TXT
    with open("relatorio_ans.txt", "w") as f:
        f.write(conteudo)
`}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Casos de uso */}
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200 mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Casos de Uso dos Relatórios</h2>
        
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 text-lg font-bold">1</span>
            </div>
            <div>
              <h3 className="text-md font-semibold text-blue-700">Auditoria e Compliance</h3>
              <p className="text-gray-700">
                Geração automática de evidências do cumprimento dos ANS para auditorias internas e externas.
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 text-lg font-bold">2</span>
            </div>
            <div>
              <h3 className="text-md font-semibold text-blue-700">Histórico de Desempenho</h3>
              <p className="text-gray-700">
                Armazenamento de relatórios diários para análise histórica e identificação de padrões sazonais.
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 text-lg font-bold">3</span>
            </div>
            <div>
              <h3 className="text-md font-semibold text-blue-700">Compartilhamento com Stakeholders</h3>
              <p className="text-gray-700">
                Relatórios em TXT podem ser facilmente enviados por e-mail para gestores e diretores.
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 text-lg font-bold">4</span>
            </div>
            <div>
              <h3 className="text-md font-semibold text-blue-700">Integração com outros Sistemas</h3>
              <p className="text-gray-700">
                Relatórios em JSON permitem integração automatizada com outros sistemas de BI e análise.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dicas de implementação */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-yellow-800">Dicas para Implementação</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Utilize formatos padronizados para garantir compatibilidade com diferentes sistemas</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Implemente versionamento dos relatórios para rastrear mudanças no formato ao longo do tempo</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Automatize o envio dos relatórios por e-mail ou armazenamento em repositório compartilhado</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Adicione metadados como timestamp de geração, versão e informações de contato</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ExtratorRelatorios;