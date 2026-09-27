export interface RetentorRegistro {
  id: string;
  catalogo: 'ARCA' | 'SABÓ';
  codigo: string;
  referencia_original: string | null;
  tipo: string;
  material: string;
  diametro_interno_mm: number | null;
  diametro_externo_mm: number | null;
  diametro_externo_2_mm?: number | null;
  altura_mm: number | null;
  altura_2_mm?: number | null;
  estria?: string | null;
  orientacao?: string | null;
  chave_dimensional: string;
  observacoes?: string | null;
}

export interface RetentoresDatabase {
  nome_arquivo: string;
  versao: string;
  status: string;
  regras: {
    pesquisa_principal: string[];
    pesquisa_dimensional: string[];
    priorizar_tipo_material: string;
    cruzamento: string;
    nao_inventar_dados: boolean;
  };
  retentores: RetentorRegistro[];
  estatisticas?: {
    arca_registros_extraidos?: number;
    sabo_registros_extraidos?: number;
    total_registros?: number;
    sabo_codigos_unicos?: number;
    observacao?: string;
  };
}

export interface RetentorEquivalencia {
  retentor: RetentorRegistro;
  equivalentes: RetentorRegistro[];
}
