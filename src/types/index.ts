// Tipos utilizados na aplicação

// Tipo para representar um Acordo de Nível de Serviço (ANS)
export interface ANS {
  id: number;
  superintendencia: string;
  servico: string;
  sla: number; // valor em percentual
  meta: number;
  status: 'Dentro do esperado' | 'Atenção' | 'Crítico';
  data: string;
}

// Tipo para representar uma etapa do fluxo de processo
export interface EtapaProcesso {
  id: number;
  nome: string;
  descricao: string;
  responsavel: string;
  icone: string;
}

// Tipo para armazenar dados históricos de ANS
export interface DadoHistorico {
  data: string;
  superintendencia: string;
  sla: number;
}

// Tipo para representar um alerta
export interface Alerta {
  id: number;
  superintendencia: string;
  servico: string;
  sla: number;
  meta: number;
  data: string;
  mensagem: string;
  tipo: 'info' | 'atencao' | 'critico';
}