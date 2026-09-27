import retentoresData from '../data/banco-retentores-arca-sabo.json';
import { RetentorRegistro, RetentoresDatabase } from '../types/retentores';

const db = retentoresData as unknown as RetentoresDatabase;

export interface RetentoresFilterOptions {
  query?: string;
  catalogo?: 'TODOS' | 'ARCA' | 'SABÓ';
  material?: string;
  diametroInterno?: number | null;
  diametroExterno?: number | null;
  altura?: number | null;
  toleranceMm?: number; // tolerance in mm for dimension matching (default 0.3)
  exactDimensionsOnly?: boolean;
}

export interface EquivalenceMatch {
  retentor: RetentorRegistro;
  tipoEquivalencia: 'DIMENSAO_EXATA' | 'DIMENSAO_COMPATIVEL' | 'CODIGO_CRUZADO';
  diferencaMm: number;
}

/**
 * Retorna todos os retentores cadastrados no banco de dados local.
 */
export function getAllRetentores(): RetentorRegistro[] {
  return db.retentores;
}

/**
 * Retorna estatísticas reais do banco de dados ARCA x SABÓ.
 */
export function getRetentoresStats() {
  const total = db.retentores.length;
  const arcaCount = db.retentores.filter(r => r.catalogo === 'ARCA').length;
  const saboCount = db.retentores.filter(r => r.catalogo === 'SABÓ').length;

  const materials = Array.from(new Set(db.retentores.map(r => r.material).filter(Boolean)));
  const tipos = Array.from(new Set(db.retentores.map(r => r.tipo).filter(Boolean))).sort();

  return {
    total,
    arcaCount,
    saboCount,
    materials,
    tipos,
    versao: db.versao,
    nomeArquivo: db.nome_arquivo,
    estatisticasOriginais: db.estatisticas
  };
}

/**
 * Localiza equivalentes do catálogo oposto (ARCA <-> SABÓ)
 * com base na compatibilidade dimensional e referências cruzadas.
 */
export function findEquivalentsFor(item: RetentorRegistro): EquivalenceMatch[] {
  const targetBrand = item.catalogo === 'ARCA' ? 'SABÓ' : 'ARCA';
  const results: EquivalenceMatch[] = [];

  for (const other of db.retentores) {
    if (other.id === item.id) continue;
    if (other.catalogo !== targetBrand) continue;

    // 1. Verificação por chave dimensional idêntica
    if (other.chave_dimensional && item.chave_dimensional && other.chave_dimensional === item.chave_dimensional) {
      results.push({
        retentor: other,
        tipoEquivalencia: 'DIMENSAO_EXATA',
        diferencaMm: 0
      });
      continue;
    }

    // 2. Verificação por dimensões aproximadas (tolerância industrial de montagem)
    if (
      item.diametro_interno_mm != null && other.diametro_interno_mm != null &&
      item.diametro_externo_mm != null && other.diametro_externo_mm != null
    ) {
      const diffInt = Math.abs(item.diametro_interno_mm - other.diametro_interno_mm);
      const diffExt = Math.abs(item.diametro_externo_mm - other.diametro_externo_mm);
      const diffAlt = (item.altura_mm != null && other.altura_mm != null) 
        ? Math.abs(item.altura_mm - other.altura_mm) 
        : 0;

      // Diâmetro interno e externo com tolerância de até 0.4mm (conversões métrico/polegada)
      // e altura de até 1.0mm
      if (diffInt <= 0.4 && diffExt <= 0.4 && diffAlt <= 1.5) {
        const totalDiff = diffInt + diffExt + (diffAlt * 0.5);
        results.push({
          retentor: other,
          tipoEquivalencia: totalDiff === 0 ? 'DIMENSAO_EXATA' : 'DIMENSAO_COMPATIVEL',
          diferencaMm: Number(totalDiff.toFixed(2))
        });
      }
    }
  }

  // Ordena pelos mais exatos
  return results.sort((a, b) => a.diferencaMm - b.diferencaMm);
}

/**
 * Realiza pesquisa principal e dimensional no banco de retentores.
 */
export function searchRetentores(filters: RetentoresFilterOptions): RetentorRegistro[] {
  const {
    query = '',
    catalogo = 'TODOS',
    material = 'TODOS',
    diametroInterno,
    diametroExterno,
    altura,
    toleranceMm = 0.3,
    exactDimensionsOnly = false
  } = filters;

  const cleanQuery = query.trim().toLowerCase();

  return db.retentores.filter((item) => {
    // 1. Filtro por Catálogo (ARCA / SABÓ)
    if (catalogo !== 'TODOS' && item.catalogo !== catalogo) {
      return false;
    }

    // 2. Filtro por Material
    if (material !== 'TODOS' && item.material.toLowerCase() !== material.toLowerCase()) {
      return false;
    }

    // 3. Pesquisa Principal (código, referência original, tipo, chave dimensional, observações)
    if (cleanQuery) {
      const matchesCodigo = item.codigo?.toLowerCase().includes(cleanQuery);
      const matchesRef = item.referencia_original?.toLowerCase().includes(cleanQuery);
      const matchesTipo = item.tipo?.toLowerCase().includes(cleanQuery);
      const matchesChave = item.chave_dimensional?.toLowerCase().includes(cleanQuery);
      const matchesObs = item.observacoes?.toLowerCase().includes(cleanQuery);
      const matchesEstria = item.estria?.toLowerCase().includes(cleanQuery);

      // Também busca no equivalente se disponível
      const equivalentes = findEquivalentsFor(item);
      const matchesEquiv = equivalentes.some(eq => eq.retentor.codigo.toLowerCase().includes(cleanQuery));

      if (!matchesCodigo && !matchesRef && !matchesTipo && !matchesChave && !matchesObs && !matchesEstria && !matchesEquiv) {
        return false;
      }
    }

    // 4. Pesquisa Dimensional
    const tol = exactDimensionsOnly ? 0.05 : toleranceMm;

    // Diâmetro Interno
    if (diametroInterno != null && !isNaN(diametroInterno) && diametroInterno > 0) {
      if (item.diametro_interno_mm == null) return false;
      if (Math.abs(item.diametro_interno_mm - diametroInterno) > tol) {
        return false;
      }
    }

    // Diâmetro Externo
    if (diametroExterno != null && !isNaN(diametroExterno) && diametroExterno > 0) {
      if (item.diametro_externo_mm == null) return false;
      if (Math.abs(item.diametro_externo_mm - diametroExterno) > tol) {
        return false;
      }
    }

    // Altura / Largura
    if (altura != null && !isNaN(altura) && altura > 0) {
      if (item.altura_mm == null) return false;
      if (Math.abs(item.altura_mm - altura) > tol) {
        return false;
      }
    }

    return true;
  });
}
