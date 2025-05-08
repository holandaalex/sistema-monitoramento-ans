import React, { useState } from 'react';
import { Code, PlayCircle, PauseCircle, CopyCheck } from 'lucide-react';

// Componente para demonstrar a automação da coleta de dados
const AutomacaoDados: React.FC = () => {
  const [codigoAtivo, setCodigoAtivo] = useState('extracao');
  const [executando, setExecutando] = useState(false);
  const [execucaoConcluida, setExecucaoConcluida] = useState(false);
  const [copiado, setCopiado] = useState(false);

  // Exemplos de código Python em português
  const codigosExemplo = {
    extracao: `# Código de extração de dados de planilhas Excel
import pandas as pd
import os

def extrair_dados_excel(caminho_pasta):
    """
    Função para extrair dados de planilhas Excel em uma pasta específica.
    
    Args:
        caminho_pasta (str): Caminho para a pasta contendo as planilhas Excel
        
    Returns:
        pandas.DataFrame: DataFrame consolidado com todos os dados
    """
    # Lista para armazenar os dados de cada planilha
    dados_consolidados = []
    
    # Listar todos os arquivos na pasta
    arquivos = os.listdir(caminho_pasta)
    
    # Filtrar apenas arquivos Excel
    arquivos_excel = [arquivo for arquivo in arquivos if arquivo.endswith('.xlsx') or arquivo.endswith('.xls')]
    
    print(f"Encontrados {len(arquivos_excel)} arquivos Excel para processamento.")
    
    # Processar cada arquivo Excel
    for arquivo in arquivos_excel:
        caminho_completo = os.path.join(caminho_pasta, arquivo)
        print(f"Processando arquivo: {arquivo}")
        
        try:
            # Carregar dados do Excel em um DataFrame
            df = pd.read_excel(caminho_completo)
            
            # Adicionar coluna com o nome do arquivo para identificação
            df['arquivo_origem'] = arquivo
            
            # Adicionar à lista de dados consolidados
            dados_consolidados.append(df)
            
            print(f"Arquivo {arquivo} processado com sucesso. {len(df)} linhas extraídas.")
        except Exception as e:
            print(f"Erro ao processar o arquivo {arquivo}: {str(e)}")
    
    # Verificar se algum dado foi extraído
    if not dados_consolidados:
        print("Nenhum dado foi extraído dos arquivos.")
        return None
    
    # Consolidar todos os DataFrames em um único
    dados_final = pd.concat(dados_consolidados, ignore_index=True)
    
    print(f"Extração concluída. Total de {len(dados_final)} registros consolidados.")
    
    return dados_final

# Exemplo de uso
caminho_pasta = "C:/Dados/Superintendencias"
dados_ans = extrair_dados_excel(caminho_pasta)

# Exibir os primeiros registros
if dados_ans is not None:
    print(dados_ans.head())
`,
    validacao: `# Código de validação dos dados extraídos
import pandas as pd
import numpy as np
from datetime import datetime

def validar_dados_ans(df):
    """
    Função para validar dados de ANS extraídos.
    
    Args:
        df (pandas.DataFrame): DataFrame com os dados de ANS
        
    Returns:
        tuple: (DataFrame com dados válidos, DataFrame com dados inválidos)
    """
    print("Iniciando validação dos dados...")
    
    # Criar uma cópia para não modificar o original
    df_validacao = df.copy()
    
    # Lista para armazenar problemas encontrados
    problemas = []
    
    # Verificar colunas obrigatórias
    colunas_obrigatorias = ['superintendencia', 'servico', 'sla', 'data']
    colunas_faltantes = [col for col in colunas_obrigatorias if col not in df_validacao.columns]
    
    if colunas_faltantes:
        raise ValueError(f"Dados inválidos: Colunas obrigatórias faltando: {colunas_faltantes}")
    
    # Adicionar coluna de validação
    df_validacao['valido'] = True
    df_validacao['motivo_invalidez'] = ''
    
    # Validar valores de SLA (devem ser números entre 0 e 100)
    indices_sla_invalido = df_validacao[(df_validacao['sla'] < 0) | (df_validacao['sla'] > 100)].index
    df_validacao.loc[indices_sla_invalido, 'valido'] = False
    df_validacao.loc[indices_sla_invalido, 'motivo_invalidez'] += "SLA fora do intervalo (0-100); "
    problemas.append(f"Encontrados {len(indices_sla_invalido)} registros com SLA fora do intervalo permitido.")
    
    # Validar datas (devem estar em formato válido e não no futuro)
    hoje = datetime.now().date()
    
    # Converter a coluna de data para datetime, se ainda não estiver nesse formato
    if not pd.api.types.is_datetime64_any_dtype(df_validacao['data']):
        df_validacao['data_dt'] = pd.to_datetime(df_validacao['data'], errors='coerce')
    else:
        df_validacao['data_dt'] = df_validacao['data']
    
    # Verificar datas inválidas (NaT - Not a Time)
    indices_data_invalida = df_validacao[df_validacao['data_dt'].isna()].index
    df_validacao.loc[indices_data_invalida, 'valido'] = False
    df_validacao.loc[indices_data_invalida, 'motivo_invalidez'] += "Data em formato inválido; "
    problemas.append(f"Encontrados {len(indices_data_invalida)} registros com data em formato inválido.")
    
    # Verificar datas futuras
    indices_data_futura = df_validacao[df_validacao['data_dt'].dt.date > hoje].index
    df_validacao.loc[indices_data_futura, 'valido'] = False
    df_validacao.loc[indices_data_futura, 'motivo_invalidez'] += "Data no futuro; "
    problemas.append(f"Encontrados {len(indices_data_futura)} registros com data no futuro.")
    
    # Separar dados válidos e inválidos
    dados_validos = df_validacao[df_validacao['valido']].drop(['valido', 'motivo_invalidez', 'data_dt'], axis=1)
    dados_invalidos = df_validacao[~df_validacao['valido']].drop('data_dt', axis=1)
    
    # Exibir resumo da validação
    print(f"Validação concluída.")
    print(f"Total de registros: {len(df_validacao)}")
    print(f"Registros válidos: {len(dados_validos)}")
    print(f"Registros inválidos: {len(dados_invalidos)}")
    
    for problema in problemas:
        print(f"- {problema}")
    
    return dados_validos, dados_invalidos

# Exemplo de uso
# dados_validos, dados_invalidos = validar_dados_ans(dados_ans)
`,
    consolidacao: `# Código de consolidação e exportação dos dados
import pandas as pd
import json
from datetime import datetime

def consolidar_e_exportar(dados_validos, caminho_saida):
    """
    Função para consolidar dados de ANS e exportar para arquivo JSON.
    
    Args:
        dados_validos (pandas.DataFrame): DataFrame com dados válidos
        caminho_saida (str): Caminho para salvar o arquivo JSON
        
    Returns:
        str: Caminho do arquivo JSON gerado
    """
    print("Iniciando consolidação e exportação de dados...")
    
    # Criar uma cópia para não modificar o original
    df_consolidado = dados_validos.copy()
    
    # Adicionar data de processamento
    data_hora_atual = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    df_consolidado['data_processamento'] = data_hora_atual
    
    # Calcular status do ANS com base no valor do SLA
    def calcular_status(sla):
        if sla >= 95:
            return "Dentro do esperado"
        elif sla >= 85:
            return "Atenção"
        else:
            return "Crítico"
    
    df_consolidado['status'] = df_consolidado['sla'].apply(calcular_status)
    
    # Criar nome do arquivo com timestamp
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    nome_arquivo = f"ans_consolidado_{timestamp}.json"
    caminho_completo = f"{caminho_saida}/{nome_arquivo}"
    
    # Exportar para JSON
    try:
        # Converter DataFrame para formato JSON mais amigável
        registros_json = df_consolidado.to_dict(orient='records')
        
        # Criar estrutura do documento
        documento_json = {
            "meta": {
                "data_geracao": data_hora_atual,
                "total_registros": len(registros_json),
                "versao": "1.0"
            },
            "dados": registros_json
        }
        
        # Salvar arquivo JSON
        with open(caminho_completo, 'w', encoding='utf-8') as arquivo:
            json.dump(documento_json, arquivo, ensure_ascii=False, indent=2)
        
        print(f"Arquivo JSON gerado com sucesso: {caminho_completo}")
        print(f"Total de {len(registros_json)} registros exportados.")
        
        return caminho_completo
    
    except Exception as e:
        print(f"Erro ao exportar dados para JSON: {str(e)}")
        return None

# Exemplo de uso
# caminho_saida = "C:/Dados/Consolidado"
# arquivo_json = consolidar_e_exportar(dados_validos, caminho_saida)
`,
    agendamento: `# Código para agendamento da execução automática
import schedule
import time
import os
import logging
from datetime import datetime

# Configurar logging para monitoramento das execuções
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('automacao_ans.log'),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger('AutomacaoANS')

def executar_processamento_completo():
    """
    Função principal que executa todo o fluxo de processamento dos ANS.
    """
    logger.info("Iniciando execução automática do processamento de ANS")
    
    try:
        # Registrar início da execução
        hora_inicio = datetime.now()
        logger.info(f"Processo iniciado em: {hora_inicio.strftime('%Y-%m-%d %H:%M:%S')}")
        
        # Definir caminhos
        caminho_entrada = "C:/Dados/Superintendencias"
        caminho_saida = "C:/Dados/Consolidado"
        
        # Verificar se as pastas existem, criar se não existirem
        for pasta in [caminho_entrada, caminho_saida]:
            if not os.path.exists(pasta):
                os.makedirs(pasta)
                logger.info(f"Pasta criada: {pasta}")
        
        # Aqui importaríamos e chamaríamos as funções definidas anteriormente
        # (extrair_dados_excel, validar_dados_ans, consolidar_e_exportar)
        
        logger.info("Extraindo dados das planilhas Excel...")
        # dados_ans = extrair_dados_excel(caminho_entrada)
        
        logger.info("Validando dados extraídos...")
        # dados_validos, dados_invalidos = validar_dados_ans(dados_ans)
        
        logger.info("Consolidando e exportando dados...")
        # arquivo_json = consolidar_e_exportar(dados_validos, caminho_saida)
        
        # Simulação do resultado
        arquivo_json = f"{caminho_saida}/ans_consolidado_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        
        # Calcular tempo de execução
        hora_fim = datetime.now()
        duracao = (hora_fim - hora_inicio).total_seconds()
        
        logger.info(f"Processamento concluído com sucesso em {duracao:.2f} segundos")
        logger.info(f"Arquivo gerado: {arquivo_json}")
        
        return True
    
    except Exception as e:
        logger.error(f"Erro durante o processamento: {str(e)}")
        return False

# Configurar agendamento para execução diária
def configurar_agendamento():
    """
    Configura o agendamento para execução diária do processamento.
    """
    # Agendar para todos os dias às 08:00
    schedule.every().day.at("08:00").do(executar_processamento_completo)
    
    logger.info("Agendamento configurado: execução diária às 08:00")
    
    # Executar uma vez imediatamente para testar
    logger.info("Executando processo imediatamente para teste...")
    executar_processamento_completo()
    
    # Loop para manter o agendador rodando
    while True:
        schedule.run_pending()
        time.sleep(60)  # Verificar a cada minuto

# Iniciar o agendamento
if __name__ == "__main__":
    logger.info("Iniciando sistema de automação de ANS")
    configurar_agendamento()
`,
  };

  // Função que simula a execução do código
  const simularExecucao = () => {
    setExecutando(true);
    setExecucaoConcluida(false);
    
    // Simular um delay para mostrar que está executando
    setTimeout(() => {
      setExecutando(false);
      setExecucaoConcluida(true);
      
      // Resetar após alguns segundos
      setTimeout(() => {
        setExecucaoConcluida(false);
      }, 5000);
    }, 3000);
  };

  // Função para copiar o código
  const copiarCodigo = () => {
    navigator.clipboard.writeText(codigosExemplo[codigoAtivo as keyof typeof codigosExemplo]);
    setCopiado(true);
    
    setTimeout(() => {
      setCopiado(false);
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Automação da Coleta de Dados</h1>
        <p className="text-gray-600 mb-4">
          Aprenda como automatizar a coleta, validação e consolidação de dados de ANS utilizando Python.
          Todos os exemplos estão em português para facilitar o aprendizado.
        </p>
      </div>

      {/* Abas para os diferentes códigos */}
      <div className="mb-8">
        <div className="flex flex-wrap border-b border-gray-200">
          <button
            className={`px-4 py-2 text-sm font-medium ${
              codigoAtivo === 'extracao'
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-500'
            }`}
            onClick={() => setCodigoAtivo('extracao')}
          >
            1. Extração de Dados
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              codigoAtivo === 'validacao'
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-500'
            }`}
            onClick={() => setCodigoAtivo('validacao')}
          >
            2. Validação
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              codigoAtivo === 'consolidacao'
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-500'
            }`}
            onClick={() => setCodigoAtivo('consolidacao')}
          >
            3. Consolidação
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              codigoAtivo === 'agendamento'
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-500'
            }`}
            onClick={() => setCodigoAtivo('agendamento')}
          >
            4. Agendamento
          </button>
        </div>

        {/* Bloco de código com ações */}
        <div className="mt-4 relative">
          <div className="bg-gray-800 text-white p-2 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center">
              <Code size={18} className="mr-2" />
              <span className="text-sm font-medium">
                {codigoAtivo === 'extracao' && 'extrator_dados.py'}
                {codigoAtivo === 'validacao' && 'validador_dados.py'}
                {codigoAtivo === 'consolidacao' && 'consolidador_dados.py'}
                {codigoAtivo === 'agendamento' && 'agendador.py'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={copiarCodigo}
                className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded flex items-center"
                title="Copiar código"
              >
                {copiado ? <CopyCheck size={14} className="mr-1" /> : <span className="mr-1">📋</span>}
                {copiado ? 'Copiado!' : 'Copiar'}
              </button>
              <button
                onClick={simularExecucao}
                disabled={executando}
                className={`text-xs px-2 py-1 rounded flex items-center ${
                  executando
                    ? 'bg-yellow-600'
                    : execucaoConcluida
                    ? 'bg-green-600'
                    : 'bg-blue-600 hover:bg-blue-500'
                }`}
                title={executando ? 'Executando...' : 'Executar código'}
              >
                {executando ? (
                  <>
                    <PauseCircle size={14} className="mr-1" /> Executando...
                  </>
                ) : execucaoConcluida ? (
                  <>
                    <CheckCircle size={14} className="mr-1" /> Concluído!
                  </>
                ) : (
                  <>
                    <PlayCircle size={14} className="mr-1" /> Executar
                  </>
                )}
              </button>
            </div>
          </div>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-b-lg overflow-x-auto text-sm leading-relaxed">
            <code>{codigosExemplo[codigoAtivo as keyof typeof codigosExemplo]}</code>
          </pre>
        </div>
      </div>

      {/* Informações sobre RPA */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Automação RPA</h2>
        <p className="text-gray-700 mb-4">
          Além do Python, é possível utilizar ferramentas de RPA (Robotic Process Automation) para automatizar 
          a coleta de dados, especialmente quando existem sistemas legados sem APIs disponíveis.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-blue-600">Ferramentas Recomendadas</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li><span className="font-medium">Robocorp:</span> Plataforma open-source para automação baseada em Python</li>
              <li><span className="font-medium">UiPath:</span> Plataforma completa de RPA com versão gratuita para aprendizado</li>
              <li><span className="font-medium">Power Automate:</span> Solução da Microsoft, integrada ao pacote Office</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2 text-blue-600">Casos de Uso</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Extração de dados de sistemas legados que não possuem APIs</li>
              <li>Preenchimento automático de formulários web</li>
              <li>Automação de tarefas repetitivas em interfaces gráficas</li>
              <li>Integração entre sistemas diferentes sem conectividade nativa</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Dicas e melhores práticas */}
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Dicas e Melhores Práticas</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-md font-semibold text-blue-700">1. Tratamento de Erros</h3>
            <p className="text-gray-700">
              Sempre utilize blocos try/except para capturar e tratar erros de forma adequada,
              garantindo que falhas em um registro não interrompam todo o processamento.
            </p>
          </div>
          
          <div>
            <h3 className="text-md font-semibold text-blue-700">2. Logs Detalhados</h3>
            <p className="text-gray-700">
              Implemente logs detalhados para facilitar o diagnóstico de problemas e o monitoramento
              do processo de automação.
            </p>
          </div>
          
          <div>
            <h3 className="text-md font-semibold text-blue-700">3. Validação de Dados</h3>
            <p className="text-gray-700">
              Sempre valide os dados extraídos antes de processá-los, verificando formato, valores
              permitidos e consistência entre diferentes fontes.
            </p>
          </div>
          
          <div>
            <h3 className="text-md font-semibold text-blue-700">4. Versionamento de Código</h3>
            <p className="text-gray-700">
              Utilize controle de versão (como Git) para acompanhar mudanças no código de automação
              e permitir rollback em caso de problemas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomacaoDados;