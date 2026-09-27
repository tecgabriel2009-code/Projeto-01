import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Search, 
  SlidersHorizontal, 
  Ruler, 
  RotateCcw, 
  Database, 
  Layers, 
  ShieldCheck, 
  Copy, 
  Check, 
  X, 
  ChevronRight, 
  Compass, 
  Sparkles,
  Info,
  Maximize2
} from 'lucide-react';
import { RetentorRegistro } from '../types/retentores';
import { 
  getAllRetentores, 
  getRetentoresStats, 
  searchRetentores, 
  findEquivalentsFor,
  EquivalenceMatch
} from '../services/retentoresService';

interface Props {
  onBack: () => void;
  onNavigateSubModule?: (subModule: 'calculators' | 'catalogs') => void;
}

export function RetentoresCatalogView({ onBack, onNavigateSubModule }: Props) {
  // Stats
  const stats = useMemo(() => getRetentoresStats(), []);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<'TODOS' | 'ARCA' | 'SABÓ'>('TODOS');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('TODOS');
  
  // Dimensional Search States
  const [showDimensionSearch, setShowDimensionSearch] = useState(true);
  const [diametroInterno, setDiametroInterno] = useState<string>('');
  const [diametroExterno, setDiametroExterno] = useState<string>('');
  const [altura, setAltura] = useState<string>('');
  const [exactMatch, setExactMatch] = useState<boolean>(false);

  // Selected Retentor for Ficha Técnica Modal
  const [selectedRetentor, setSelectedRetentor] = useState<RetentorRegistro | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Filtered results
  const results = useMemo(() => {
    return searchRetentores({
      query: searchQuery,
      catalogo: selectedBrand,
      material: selectedMaterial,
      diametroInterno: diametroInterno ? parseFloat(diametroInterno) : null,
      diametroExterno: diametroExterno ? parseFloat(diametroExterno) : null,
      altura: altura ? parseFloat(altura) : null,
      toleranceMm: exactMatch ? 0.05 : 0.4,
      exactDimensionsOnly: exactMatch
    });
  }, [searchQuery, selectedBrand, selectedMaterial, diametroInterno, diametroExterno, altura, exactMatch]);

  // Copy code handler
  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Reset all filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedBrand('TODOS');
    setSelectedMaterial('TODOS');
    setDiametroInterno('');
    setDiametroExterno('');
    setAltura('');
    setExactMatch(false);
  };

  const hasActiveFilters = searchQuery !== '' || 
    selectedBrand !== 'TODOS' || 
    selectedMaterial !== 'TODOS' || 
    diametroInterno !== '' || 
    diametroExterno !== '' || 
    altura !== '';

  return (
    <div className="flex flex-col min-h-full pb-14 bg-[#f4f5f8]">
      
      {/* 1. CABEÇALHO ROXO PADRÃO #670099 COM BREADCRUMB MODULAR */}
      <header className="bg-[#670099] text-white px-4 pt-3 pb-3 sticky top-0 z-30 shadow-md">
        {/* Breadcrumb de navegação modular */}
        <div className="flex items-center gap-1.5 text-[11px] text-purple-200/90 mb-1.5 font-medium">
          <button 
            onClick={onBack}
            className="hover:text-white flex items-center gap-1 transition-colors cursor-pointer group"
            title="Voltar para a seleção de módulos de Ferramentas Técnicas"
          >
            <span>Ferramentas Técnicas</span>
          </button>
          <ChevronRight className="w-3 h-3 text-purple-300 shrink-0" />
          <span className="text-white font-bold bg-white/15 px-2 py-0.5 rounded text-[10px] uppercase tracking-wide">
            Módulo Catálogo ARCA × SABÓ
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button 
              onClick={onBack}
              className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 active:bg-white/35 flex items-center justify-center transition-colors text-white cursor-pointer shrink-0"
              aria-label="Voltar para Ferramentas Técnicas"
              title="Voltar aos Módulos"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/25 border border-emerald-400/30 text-emerald-200">
                  Módulo Separado
                </span>
                <span className="text-[11px] text-purple-200 font-semibold flex items-center gap-1">
                  <Database className="w-3 h-3" /> {stats.total} retentores
                </span>
              </div>
              <h1 className="text-base font-extrabold tracking-tight text-white leading-tight">
                CATÁLOGO DE RETENTORES
              </h1>
            </div>
          </div>

          {/* Identificação Visual ARCA x SABÓ no Topo */}
          <div className="flex items-center gap-1.5 bg-black/25 px-2.5 py-1.5 rounded-xl border border-white/15 text-xs font-bold font-mono shadow-xs">
            <span className="text-amber-300">ARCA</span>
            <span className="text-white/60 text-[10px]">✕</span>
            <span className="text-cyan-300">SABÓ</span>
          </div>
        </div>
      </header>

      {/* 2. SUBTÍTULO & IDENTIFICAÇÃO VISUAL ARCA x SABÓ BANNER */}
      <section className="bg-gradient-to-r from-[#590085] via-[#670099] to-[#7d00ba] text-white px-4 pt-3 pb-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black tracking-wide text-white">ARCA × SABÓ</h2>
              <span className="text-[10px] bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 px-2 py-0.5 rounded-full font-bold">
                Banco Real Ativo
              </span>
            </div>
            <p className="text-[11px] text-purple-100/90 mt-0.5">
              Pesquisa técnica de retentores por código, referência e dimensões.
            </p>
          </div>
        </div>

        {/* Indicadores Quantitativos do Banco */}
        <div className="grid grid-cols-3 gap-2 mt-3 text-center">
          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2 border border-white/15">
            <span className="block text-[10px] uppercase font-bold text-purple-200">Total Banco</span>
            <span className="text-sm font-extrabold font-mono text-white">{stats.total} registros</span>
          </div>
          <div className="bg-amber-500/20 backdrop-blur-xs rounded-xl p-2 border border-amber-300/30">
            <span className="block text-[10px] uppercase font-bold text-amber-200">Catálogo ARCA</span>
            <span className="text-sm font-extrabold font-mono text-amber-300">{stats.arcaCount} itens</span>
          </div>
          <div className="bg-cyan-500/20 backdrop-blur-xs rounded-xl p-2 border border-cyan-300/30">
            <span className="block text-[10px] uppercase font-bold text-cyan-200">Catálogo SABÓ</span>
            <span className="text-sm font-extrabold font-mono text-cyan-300">{stats.saboCount} itens</span>
          </div>
        </div>
      </section>

      {/* 3. PESQUISA PRINCIPAL & DIMENSIONAL */}
      <div className="px-4 -mt-2 space-y-3 z-10">
        
        {/* Campo Principal de Pesquisa */}
        <div className="bg-white rounded-2xl p-3 shadow-sm border border-slate-200/80">
          <label className="text-[11px] font-bold text-slate-700 block mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-[#670099]" />
              Pesquisa Principal por Código ou Referência
            </span>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="text-[10px] text-purple-700 font-bold hover:underline cursor-pointer"
              >
                Limpar
              </button>
            )}
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Digite código ARCA, código SABÓ, tipo (ex: 5001, 00005B, BR, VB)..."
              className="w-full pl-9 pr-8 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#670099] focus:bg-white transition-all font-mono font-medium text-slate-800"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center absolute right-2.5 top-1/2 -translate-y-1/2 hover:bg-slate-300"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
          <p className="text-[10px] text-slate-400 mt-1.5">
            Localiza registros mesmo que você digite apenas parte do código ou tipo.
          </p>
        </div>

        {/* Sistema de Pesquisa por Dimensões */}
        <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-200/80">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#670099]/10 text-[#670099] flex items-center justify-center">
                <Ruler className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-800">Pesquisa por Dimensões (mm)</h3>
                <span className="text-[10px] text-slate-500 font-mono">Øi × Øe × Largura</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setExactMatch(!exactMatch)}
                className={`px-2 py-0.5 text-[10px] font-bold rounded-md transition-colors ${
                  exactMatch 
                    ? 'bg-[#670099] text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                title="Alternar entre busca exata e tolerância industrial"
              >
                {exactMatch ? 'Exato' : 'Tolerância (±0.4mm)'}
              </button>
            </div>
          </div>

          {/* Inputs das 3 Dimensões */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[10px] font-bold text-slate-600 block mb-1">
                Ø Interno <span className="font-mono text-purple-700">(d1)</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={diametroInterno}
                  onChange={(e) => setDiametroInterno(e.target.value)}
                  placeholder="ex: 52.4"
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#670099] font-mono font-bold text-slate-800"
                />
                <span className="text-[9px] text-slate-400 absolute right-2 top-1/2 -translate-y-1/2">mm</span>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-600 block mb-1">
                Ø Externo <span className="font-mono text-purple-700">(d2)</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={diametroExterno}
                  onChange={(e) => setDiametroExterno(e.target.value)}
                  placeholder="ex: 81.0"
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#670099] font-mono font-bold text-slate-800"
                />
                <span className="text-[9px] text-slate-400 absolute right-2 top-1/2 -translate-y-1/2">mm</span>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-600 block mb-1">
                Largura <span className="font-mono text-purple-700">(b)</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={altura}
                  onChange={(e) => setAltura(e.target.value)}
                  placeholder="ex: 11.5"
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#670099] font-mono font-bold text-slate-800"
                />
                <span className="text-[9px] text-slate-400 absolute right-2 top-1/2 -translate-y-1/2">mm</span>
              </div>
            </div>
          </div>

          {/* Atalhos Rápidos com Exemplos Reais do Banco */}
          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-1 overflow-x-auto">
            <span className="text-[10px] font-semibold text-slate-400 whitespace-nowrap">Exemplos:</span>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[10px]">
              <button
                onClick={() => { setDiametroInterno('52.4'); setDiametroExterno('81'); setAltura('11.5'); }}
                className="px-2 py-0.5 rounded-full bg-slate-100 hover:bg-[#670099]/10 text-slate-700 hover:text-[#670099] font-mono whitespace-nowrap transition-colors"
              >
                52.4×81×11.5 (ARCA ↔ SABÓ)
              </button>
              <button
                onClick={() => { setDiametroInterno('30'); setDiametroExterno('62'); setAltura('10'); }}
                className="px-2 py-0.5 rounded-full bg-slate-100 hover:bg-[#670099]/10 text-slate-700 hover:text-[#670099] font-mono whitespace-nowrap transition-colors"
              >
                30×62×10
              </button>
              <button
                onClick={() => { setDiametroInterno('38'); setDiametroExterno('52'); setAltura('10'); }}
                className="px-2 py-0.5 rounded-full bg-slate-100 hover:bg-[#670099]/10 text-slate-700 hover:text-[#670099] font-mono whitespace-nowrap transition-colors"
              >
                38×52×10
              </button>
            </div>
          </div>
        </div>

        {/* Filtros por Marca e Ações Rápidas */}
        <div className="flex items-center justify-between gap-2">
          {/* Marca / Catálogo */}
          <div className="flex items-center bg-white rounded-xl p-1 border border-slate-200/80 shadow-2xs">
            <button
              onClick={() => setSelectedBrand('TODOS')}
              className={`px-3 py-1 text-[11px] font-bold rounded-lg transition-colors ${
                selectedBrand === 'TODOS'
                  ? 'bg-[#670099] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos ({stats.total})
            </button>
            <button
              onClick={() => setSelectedBrand('ARCA')}
              className={`px-3 py-1 text-[11px] font-bold rounded-lg transition-colors ${
                selectedBrand === 'ARCA'
                  ? 'bg-amber-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ARCA ({stats.arcaCount})
            </button>
            <button
              onClick={() => setSelectedBrand('SABÓ')}
              className={`px-3 py-1 text-[11px] font-bold rounded-lg transition-colors ${
                selectedBrand === 'SABÓ'
                  ? 'bg-cyan-700 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              SABÓ ({stats.saboCount})
            </button>
          </div>

          {/* Reset button if filters are active */}
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-200/80 hover:bg-slate-300 text-[11px] font-bold text-slate-700 transition-colors cursor-pointer shrink-0"
            >
              <RotateCcw className="w-3 h-3" />
              Limpar Filtros
            </button>
          )}
        </div>

      </div>

      {/* 4. ÁREA DE RESULTADOS */}
      <section className="px-4 mt-3 space-y-2.5">
        
        {/* Header da lista de resultados */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Resultados</h3>
            <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-slate-200 text-slate-800 font-mono">
              {results.length} retentores
            </span>
          </div>

          {hasActiveFilters && (
            <span className="text-[10px] text-[#670099] font-bold bg-[#670099]/10 px-2 py-0.5 rounded-md">
              Filtro ativo
            </span>
          )}
        </div>

        {/* Lista de Cards de Resultados */}
        {results.length > 0 ? (
          <div className="space-y-3">
            {results.map((item) => {
              const equivalentes = findEquivalentsFor(item);
              const hasEquiv = equivalentes.length > 0;

              return (
                <div 
                  key={item.id} 
                  className={`bg-white rounded-2xl p-4 shadow-sm border transition-all ${
                    hasEquiv 
                      ? 'border-purple-300/80 ring-1 ring-purple-100' 
                      : 'border-slate-200/80'
                  }`}
                >
                  {/* Topo do Card: Marca, Código e Badge de Equivalência */}
                  <div className="flex items-start justify-between gap-2 mb-2 pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      {/* Logo / Badge do Catálogo */}
                      <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wide font-mono ${
                        item.catalogo === 'ARCA'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-cyan-100 text-cyan-900 border border-cyan-300'
                      }`}>
                        {item.catalogo}
                      </span>
                      
                      {/* Código do Retentor */}
                      <div>
                        <h4 className="text-base font-extrabold text-slate-900 font-mono tracking-tight leading-none">
                          {item.codigo}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-medium">
                          Ref: {item.referencia_original || item.tipo}
                        </span>
                      </div>
                    </div>

                    {/* Badge destacado caso tenha equivalência ARCA <-> SABÓ */}
                    {hasEquiv && (
                      <div className="text-right">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                          <Sparkles className="w-3 h-3 text-emerald-600" />
                          Equivalência {item.catalogo === 'ARCA' ? 'SABÓ' : 'ARCA'}
                        </span>
                        <div className="text-[10px] font-mono font-bold text-slate-700 mt-0.5">
                          {equivalentes[0].retentor.codigo}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Informações Centrais: Dimensões em destaque */}
                  <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 grid grid-cols-3 gap-2 text-center mb-3">
                    <div>
                      <span className="block text-[9px] uppercase font-bold text-slate-400">Ø Interno (d1)</span>
                      <span className="text-xs font-black text-slate-800 font-mono">
                        {item.diametro_interno_mm != null ? `${item.diametro_interno_mm} mm` : '--'}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase font-bold text-slate-400">Ø Externo (d2)</span>
                      <span className="text-xs font-black text-slate-800 font-mono">
                        {item.diametro_externo_mm != null ? `${item.diametro_externo_mm} mm` : '--'}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase font-bold text-slate-400">Largura (b)</span>
                      <span className="text-xs font-black text-[#670099] font-mono">
                        {item.altura_mm != null ? `${item.altura_mm} mm` : '--'}
                      </span>
                    </div>
                  </div>

                  {/* Detalhes Técnicos: Perfil, Material, Estria */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-3 text-[11px]">
                    <span className="px-2 py-0.5 rounded-md bg-purple-50 text-[#670099] font-semibold border border-purple-100">
                      Perfil: <strong className="font-mono">{item.tipo}</strong>
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                      Material: <strong className="font-mono">{item.material || 'NBR'}</strong>
                    </span>
                    {item.estria && item.estria !== '--' && (
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                        Estria: <strong className="font-mono">{item.estria}</strong>
                      </span>
                    )}
                    {item.orientacao && (
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                        Sentido: <strong className="font-mono">{item.orientacao}</strong>
                      </span>
                    )}
                  </div>

                  {/* Ação Principal: Botão VER FICHA TÉCNICA */}
                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
                    <span className="text-[10px] text-slate-400 font-mono truncate max-w-[170px]">
                      {item.chave_dimensional}
                    </span>

                    <button
                      onClick={() => setSelectedRetentor(item)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#670099] hover:bg-[#52007a] active:bg-[#400060] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>VER FICHA TÉCNICA</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Estado Vazio */
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-200/80 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-purple-50 text-[#670099] flex items-center justify-center mx-auto mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-800">Nenhum retentor compatível encontrado</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              Verifique os valores de diâmetro e código informados ou tente ampliar a tolerância dimensional.
            </p>
            <button
              onClick={handleClearFilters}
              className="mt-4 px-4 py-2 bg-[#670099] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#52007a] transition-colors cursor-pointer"
            >
              Redefinir Filtros
            </button>
          </div>
        )}
      </section>

      {/* 5. MODAL DA FICHA TÉCNICA DETALHADA */}
      {selectedRetentor && (
        <FichaTecnicaModal 
          retentor={selectedRetentor} 
          onClose={() => setSelectedRetentor(null)} 
          onCopy={handleCopy}
          copiedCode={copiedCode}
        />
      )}

    </div>
  );
}

/**
 * Componente da Ficha Técnica Detalhada do Retentor.
 * Exibe todos os dados do banco e destaca a equivalência ARCA x SABÓ.
 */
interface FichaProps {
  retentor: RetentorRegistro;
  onClose: () => void;
  onCopy: (code: string) => void;
  copiedCode: string | null;
}

function FichaTecnicaModal({ retentor, onClose, onCopy, copiedCode }: FichaProps) {
  const equivalentes = useMemo(() => findEquivalentsFor(retentor), [retentor]);
  const hasEquiv = equivalentes.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
      <div 
        className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Cabeçalho da Ficha Técnica Roxo #670099 */}
        <div className="bg-[#670099] text-white px-5 py-4 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center font-mono font-black text-sm">
              {retentor.catalogo === 'ARCA' ? 'AR' : 'SB'}
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-200">
                Ficha Técnica de Engenharia
              </span>
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                {retentor.catalogo} {retentor.codigo}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 active:bg-white/35 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Fechar ficha técnica"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conteúdo com Rolagem */}
        <div className="p-5 space-y-4 overflow-y-auto">

          {/* DESTAQUE DE EQUIVALÊNCIA ARCA x SABÓ */}
          {hasEquiv ? (
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Relação de Equivalência Cruzada
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                  {equivalentes[0].tipoEquivalencia === 'DIMENSAO_EXATA' ? 'Dimensional Idêntico' : 'Compatível'}
                </span>
              </div>

              {/* Comparativo Lado a Lado ARCA x SABÓ */}
              <div className="grid grid-cols-2 gap-2 mt-2">
                {/* Item Atual */}
                <div className="bg-white p-2.5 rounded-xl border border-emerald-200 text-center">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block">{retentor.catalogo}</span>
                  <span className="text-sm font-extrabold font-mono text-slate-900 block">{retentor.codigo}</span>
                  <span className="text-[10px] text-slate-600 font-mono">
                    {retentor.diametro_interno_mm} × {retentor.diametro_externo_mm} × {retentor.altura_mm} mm
                  </span>
                </div>

                {/* Equivalente Cruzado */}
                <div className="bg-emerald-600 text-white p-2.5 rounded-xl shadow-xs text-center">
                  <span className="text-[9px] uppercase font-bold text-emerald-100 block">
                    {equivalentes[0].retentor.catalogo} (Equivalente)
                  </span>
                  <span className="text-sm font-extrabold font-mono text-white block">
                    {equivalentes[0].retentor.codigo}
                  </span>
                  <span className="text-[10px] text-emerald-100 font-mono">
                    {equivalentes[0].retentor.diametro_interno_mm} × {equivalentes[0].retentor.diametro_externo_mm} × {equivalentes[0].retentor.altura_mm} mm
                  </span>
                </div>
              </div>

              <p className="text-[10px] text-emerald-700 mt-2 text-center font-medium">
                Retentor 100% intercambiável dimensionalmente com montagem industrial equivalente.
              </p>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-center">
              <span className="text-[11px] text-slate-500 font-medium">
                Sem registro cruzado de equivalência direta cadastrado para este dimensional no banco local.
              </span>
            </div>
          )}

          {/* Diagrama Esquemático de Dimensões Industriais */}
          <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Esquema de Montagem & Cotas
            </span>

            <div className="relative flex items-center justify-center py-2 bg-white rounded-xl border border-slate-100">
              {/* Ilustração Técnica SVG do Retentor com cotas */}
              <svg viewBox="0 0 280 100" className="w-full h-24">
                {/* Eixo central */}
                <line x1="20" y1="50" x2="260" y2="50" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 4" />
                
                {/* Seção do Retentor Superior */}
                <rect x="70" y="15" width="40" height="25" rx="3" fill="#670099" fillOpacity="0.15" stroke="#670099" strokeWidth="1.5" />
                <rect x="170" y="15" width="40" height="25" rx="3" fill="#670099" fillOpacity="0.15" stroke="#670099" strokeWidth="1.5" />

                {/* Seção do Retentor Inferior */}
                <rect x="70" y="60" width="40" height="25" rx="3" fill="#670099" fillOpacity="0.15" stroke="#670099" strokeWidth="1.5" />
                <rect x="170" y="60" width="40" height="25" rx="3" fill="#670099" fillOpacity="0.15" stroke="#670099" strokeWidth="1.5" />

                {/* Cota Ø Interno (d1) */}
                <line x1="60" y1="40" x2="60" y2="60" stroke="#670099" strokeWidth="1.5" />
                <text x="52" y="53" textAnchor="end" fontSize="9" fontWeight="bold" fill="#670099" fontFamily="monospace">
                  Øi {retentor.diametro_interno_mm}
                </text>

                {/* Cota Ø Externo (d2) */}
                <line x1="220" y1="15" x2="220" y2="85" stroke="#0284c7" strokeWidth="1.5" />
                <text x="228" y="53" textAnchor="start" fontSize="9" fontWeight="bold" fill="#0284c7" fontFamily="monospace">
                  Øe {retentor.diametro_externo_mm}
                </text>

                {/* Cota Largura (b) */}
                <line x1="70" y1="8" x2="110" y2="8" stroke="#d97706" strokeWidth="1.5" />
                <text x="90" y="6" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#d97706" fontFamily="monospace">
                  b {retentor.altura_mm} mm
                </text>
              </svg>
            </div>
          </div>

          {/* Tabela de Dados Completos do Registro */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="bg-slate-50 px-3.5 py-2 border-b border-slate-200 text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>Especificações Técnicas</span>
              <span className="font-mono text-[10px] text-slate-400">ID: {retentor.id}</span>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              <div className="flex justify-between p-2.5">
                <span className="text-slate-500 font-medium">Catálogo / Marca:</span>
                <span className="font-extrabold text-slate-800 font-mono">{retentor.catalogo}</span>
              </div>
              <div className="flex justify-between p-2.5 bg-slate-50/50">
                <span className="text-slate-500 font-medium">Código do Fabricante:</span>
                <span className="font-extrabold text-[#670099] font-mono">{retentor.codigo}</span>
              </div>
              <div className="flex justify-between p-2.5">
                <span className="text-slate-500 font-medium">Tipo de Vedação / Perfil:</span>
                <span className="font-bold text-slate-800 font-mono">{retentor.tipo}</span>
              </div>
              <div className="flex justify-between p-2.5 bg-slate-50/50">
                <span className="text-slate-500 font-medium">Material do Elastômero:</span>
                <span className="font-bold text-slate-800 font-mono">{retentor.material || 'NBR (Nitrílica)'}</span>
              </div>
              <div className="flex justify-between p-2.5">
                <span className="text-slate-500 font-medium">Diâmetro Interno (d1):</span>
                <span className="font-extrabold text-slate-900 font-mono">
                  {retentor.diametro_interno_mm != null ? `${retentor.diametro_interno_mm} mm` : '--'}
                </span>
              </div>
              <div className="flex justify-between p-2.5 bg-slate-50/50">
                <span className="text-slate-500 font-medium">Diâmetro Externo (d2):</span>
                <span className="font-extrabold text-slate-900 font-mono">
                  {retentor.diametro_externo_mm != null ? `${retentor.diametro_externo_mm} mm` : '--'}
                </span>
              </div>
              {retentor.diametro_externo_2_mm != null && (
                <div className="flex justify-between p-2.5">
                  <span className="text-slate-500 font-medium">Diâmetro Externo Secundário (d3):</span>
                  <span className="font-bold text-slate-800 font-mono">{retentor.diametro_externo_2_mm} mm</span>
                </div>
              )}
              <div className="flex justify-between p-2.5">
                <span className="text-slate-500 font-medium">Largura / Altura (b1):</span>
                <span className="font-extrabold text-[#670099] font-mono">
                  {retentor.altura_mm != null ? `${retentor.altura_mm} mm` : '--'}
                </span>
              </div>
              {retentor.altura_2_mm != null && (
                <div className="flex justify-between p-2.5 bg-slate-50/50">
                  <span className="text-slate-500 font-medium">Largura Secundária (b2):</span>
                  <span className="font-bold text-slate-800 font-mono">{retentor.altura_2_mm} mm</span>
                </div>
              )}
              <div className="flex justify-between p-2.5 bg-slate-50/50">
                <span className="text-slate-500 font-medium">Estria Hidrodinâmica:</span>
                <span className="font-bold text-slate-800 font-mono">{retentor.estria || 'Sem estria (--)'}</span>
              </div>
              <div className="flex justify-between p-2.5">
                <span className="text-slate-500 font-medium">Orientação de Rotação:</span>
                <span className="font-bold text-slate-800 font-mono">{retentor.orientacao || 'Bidirecional (padrão)'}</span>
              </div>
              <div className="flex justify-between p-2.5 bg-slate-50/50">
                <span className="text-slate-500 font-medium">Chave Dimensional:</span>
                <span className="font-mono text-xs text-slate-600">{retentor.chave_dimensional}</span>
              </div>
              {retentor.referencia_original && (
                <div className="flex justify-between p-2.5">
                  <span className="text-slate-500 font-medium">Referência Original:</span>
                  <span className="font-mono text-slate-800">{retentor.referencia_original}</span>
                </div>
              )}
              {retentor.observacoes && (
                <div className="flex flex-col p-2.5 bg-amber-50/50">
                  <span className="text-slate-500 font-medium mb-1">Observações Técnicas:</span>
                  <span className="text-xs text-slate-700">{retentor.observacoes}</span>
                </div>
              )}
            </div>
          </div>

          {/* Botões de Ação na Ficha */}
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => onCopy(`${retentor.catalogo} ${retentor.codigo} (${retentor.diametro_interno_mm}x${retentor.diametro_externo_mm}x${retentor.altura_mm} mm)`)}
              className="flex-1 py-2.5 px-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedCode ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500" />
                  <span>Copiar Especificação</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="flex-1 py-2.5 px-3 rounded-xl bg-[#670099] hover:bg-[#52007a] text-white text-xs font-bold transition-colors shadow-xs cursor-pointer text-center"
            >
              Fechar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
