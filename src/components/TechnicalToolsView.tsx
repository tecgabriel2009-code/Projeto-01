import React, { useState } from 'react';
import { sampleTechnicalDocs } from '../data/initialData';
import { 
  ArrowLeft, 
  Calculator, 
  FileText, 
  Search, 
  Sliders, 
  ExternalLink,
  Ruler,
  Database,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Layers,
  ArrowRight,
  Info,
  Download
} from 'lucide-react';
import { RetentoresCatalogView } from './RetentoresCatalogView';
import { getRetentoresStats } from '../services/retentoresService';

interface Props {
  onBack: () => void;
  initialSubModule?: 'retentores' | 'calculators' | 'catalogs' | null;
}

export type TechnicalSubModule = 'retentores' | 'calculators' | 'catalogs' | null;

export function TechnicalToolsView({ onBack, initialSubModule = null }: Props) {
  // Sub-módulo selecionado (null = menu de seleção de módulos de Ferramentas Técnicas)
  const [selectedSubModule, setSelectedSubModule] = useState<TechnicalSubModule>(initialSubModule);

  // Stats do banco de retentores para exibição no card modular
  const retentoresStats = getRetentoresStats();

  // Search filter no menu de módulos
  const [moduleSearch, setModuleSearch] = useState('');

  // ----------------------------------------------------
  // CALCULADORAS DE ENGENHARIA STATE
  // ----------------------------------------------------
  // Calculadora 1: Torque & Potência
  const [torque, setTorque] = useState<number>(320); // Nm
  const [rpm, setRpm] = useState<number>(1750); // RPM
  const calculatedPowerKw = (torque * rpm) / 9550;
  const calculatedPowerCv = calculatedPowerKw * 1.3596;

  // Calculadora 2: Vazão & Diâmetro de Tubulação
  const [pipeDiameterMm, setPipeDiameterMm] = useState<number>(100); // mm
  const [flowVelocity, setFlowVelocity] = useState<number>(2.0); // m/s
  const pipeRadiusM = pipeDiameterMm / 2000;
  const areaM2 = Math.PI * Math.pow(pipeRadiusM, 2);
  const flowRateM3h = 3600 * flowVelocity * areaM2;

  // Calculadora 3: Relação de Redutores
  const [zPinhao, setZPinhao] = useState<number>(14);
  const [zCoroa, setZCoroa] = useState<number>(56);
  const ratioI = zCoroa / (zPinhao || 1);

  // ----------------------------------------------------
  // MANUAIS & CATÁLOGOS STATE
  // ----------------------------------------------------
  const [searchDoc, setSearchDoc] = useState('');
  const filteredDocs = sampleTechnicalDocs.filter(d => 
    d.title.toLowerCase().includes(searchDoc.toLowerCase()) ||
    d.equipmentType.toLowerCase().includes(searchDoc.toLowerCase())
  );

  // ----------------------------------------------------
  // 1. RENDERIZAÇÃO DO MÓDULO SEPARADO: CATÁLOGO ARCA × SABÓ
  // ----------------------------------------------------
  if (selectedSubModule === 'retentores') {
    return (
      <div className="flex flex-col min-h-full">
        {/* Barra de alternância rápida superior entre sub-módulos */}
        <div className="bg-[#52007a] text-white px-4 py-2 flex items-center justify-between text-xs border-b border-purple-800">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full">
            <button
              onClick={() => setSelectedSubModule(null)}
              className="px-2 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-purple-100 font-semibold text-[11px] shrink-0 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              Módulos
            </button>
            <span className="text-[10px] text-purple-300 mx-0.5">|</span>
            <button
              onClick={() => setSelectedSubModule('retentores')}
              className="px-2.5 py-1 rounded-lg bg-white text-[#670099] font-extrabold text-[11px] shadow-2xs shrink-0 flex items-center gap-1 cursor-pointer"
            >
              <Database className="w-3 h-3 text-[#670099]" />
              Catálogo ARCA × SABÓ
            </button>
            <button
              onClick={() => setSelectedSubModule('calculators')}
              className="px-2.5 py-1 rounded-lg bg-purple-900/60 hover:bg-white/10 text-white font-semibold text-[11px] shrink-0 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Calculator className="w-3 h-3 text-purple-200" />
              Calculadoras
            </button>
            <button
              onClick={() => setSelectedSubModule('catalogs')}
              className="px-2.5 py-1 rounded-lg bg-purple-900/60 hover:bg-white/10 text-white font-semibold text-[11px] shrink-0 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <FileText className="w-3 h-3 text-purple-200" />
              Manuais
            </button>
          </div>
        </div>

        <RetentoresCatalogView 
          onBack={() => setSelectedSubModule(null)} 
          onNavigateSubModule={(mod) => setSelectedSubModule(mod)}
        />
      </div>
    );
  }

  // ----------------------------------------------------
  // 2. RENDERIZAÇÃO DO MÓDULO SEPARADO: CALCULADORAS
  // ----------------------------------------------------
  if (selectedSubModule === 'calculators') {
    return (
      <div className="flex flex-col min-h-full pb-10 bg-[#f4f5f8]">
        {/* Cabeçalho do Módulo de Calculadoras */}
        <header className="bg-[#670099] text-white px-4 pt-3 pb-3 sticky top-0 z-30 shadow-md">
          <div className="flex items-center gap-1.5 text-[11px] text-purple-200/90 mb-1.5 font-medium">
            <button 
              onClick={() => setSelectedSubModule(null)}
              className="hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Ferramentas Técnicas</span>
            </button>
            <ChevronRight className="w-3 h-3 text-purple-300 shrink-0" />
            <span className="text-white font-bold bg-white/15 px-2 py-0.5 rounded text-[10px] uppercase tracking-wide">
              Calculadoras de Engenharia
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <button 
                onClick={() => setSelectedSubModule(null)}
                className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 active:bg-white/35 flex items-center justify-center transition-colors text-white cursor-pointer shrink-0"
                aria-label="Voltar para Ferramentas Técnicas"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-white/20 text-purple-100">
                  Módulo de Dimensionamento
                </span>
                <h1 className="text-base font-extrabold tracking-tight text-white leading-tight">
                  CALCULADORAS INDUSTRIAIS
                </h1>
              </div>
            </div>

            <button
              onClick={() => setSelectedSubModule('retentores')}
              className="px-2.5 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-[11px] font-bold flex items-center gap-1.5 transition-colors border border-white/10"
              title="Ir para o Catálogo de Retentores"
            >
              <Database className="w-3.5 h-3.5 text-amber-300" />
              <span>ARCA × SABÓ</span>
            </button>
          </div>
        </header>

        {/* Conteúdo das Calculadoras */}
        <div className="px-4 py-4 space-y-4">
          {/* Calculator 1: Potência & Torque */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80">
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-[#670099]">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Potência & Torque</h3>
                  <span className="text-[11px] text-slate-500 font-mono">P = (T · n) / 9550</span>
                </div>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded bg-purple-50 text-[#670099] font-medium">Mecânica</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Torque (N·m)</label>
                <input
                  type="number"
                  value={torque}
                  onChange={(e) => setTorque(Number(e.target.value))}
                  className="w-full px-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#670099] font-mono"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Rotação (RPM)</label>
                <input
                  type="number"
                  value={rpm}
                  onChange={(e) => setRpm(Number(e.target.value))}
                  className="w-full px-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#670099] font-mono"
                />
              </div>
            </div>

            <div className="bg-[#670099]/5 rounded-xl p-3 border border-[#670099]/15 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-600 block font-medium">Potência Necessária:</span>
                <span className="text-lg font-extrabold text-[#670099]">
                  {calculatedPowerKw.toFixed(2)} <span className="text-xs font-semibold">kW</span>
                </span>
              </div>
              <div className="text-right border-l border-[#670099]/20 pl-4">
                <span className="text-[11px] text-slate-600 block font-medium">Em Cavalos:</span>
                <span className="text-base font-bold text-slate-800">
                  {calculatedPowerCv.toFixed(2)} <span className="text-xs text-slate-600">CV</span>
                </span>
              </div>
            </div>
          </div>

          {/* Calculator 2: Vazão de Tubulação */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80">
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700">
                  <Calculator className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Vazão & Velocidade</h3>
                  <span className="text-[11px] text-slate-500 font-mono">Q = 3600 · v · A</span>
                </div>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-medium">Hidráulica</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Ø Interno (mm)</label>
                <input
                  type="number"
                  value={pipeDiameterMm}
                  onChange={(e) => setPipeDiameterMm(Number(e.target.value))}
                  className="w-full px-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#670099] font-mono"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Velocidade (m/s)</label>
                <input
                  type="number"
                  step="0.1"
                  value={flowVelocity}
                  onChange={(e) => setFlowVelocity(Number(e.target.value))}
                  className="w-full px-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#670099] font-mono"
                />
              </div>
            </div>

            <div className="bg-blue-50/70 rounded-xl p-3 border border-blue-200/60 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-600 block font-medium">Vazão Volumétrica:</span>
                <span className="text-lg font-extrabold text-blue-900">
                  {flowRateM3h.toFixed(1)} <span className="text-xs font-semibold">m³/h</span>
                </span>
              </div>
              <div className="text-right border-l border-blue-200 pl-4">
                <span className="text-[11px] text-slate-600 block font-medium">Em Litros/seg:</span>
                <span className="text-base font-bold text-slate-800">
                  {(flowRateM3h / 3.6).toFixed(1)} <span className="text-xs text-slate-600">L/s</span>
                </span>
              </div>
            </div>
          </div>

          {/* Calculator 3: Relação de Redutores */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80">
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Relação de Redução (i)</h3>
                  <span className="text-[11px] text-slate-500 font-mono">i = Z₂ (Coroa) / Z₁ (Pinhão)</span>
                </div>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-medium">Redutores</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Dentes Pinhão (Z₁)</label>
                <input
                  type="number"
                  value={zPinhao}
                  onChange={(e) => setZPinhao(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#670099] font-mono"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Dentes Coroa (Z₂)</label>
                <input
                  type="number"
                  value={zCoroa}
                  onChange={(e) => setZCoroa(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#670099] font-mono"
                />
              </div>
            </div>

            <div className="bg-amber-50/70 rounded-xl p-3 border border-amber-200/60 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-600 block font-medium">Relação Cinemática:</span>
                <span className="text-lg font-extrabold text-amber-900">
                  1 : {ratioI.toFixed(2)}
                </span>
              </div>
              <div className="text-right border-l border-amber-200 pl-4">
                <span className="text-[11px] text-slate-600 block font-medium">Exemplo a 1750 RPM:</span>
                <span className="text-base font-bold text-slate-800">
                  {(1750 / ratioI).toFixed(1)} <span className="text-xs text-slate-600">RPM saída</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // 3. RENDERIZAÇÃO DO MÓDULO SEPARADO: MANUAIS
  // ----------------------------------------------------
  if (selectedSubModule === 'catalogs') {
    return (
      <div className="flex flex-col min-h-full pb-10 bg-[#f4f5f8]">
        {/* Cabeçalho do Módulo de Manuais */}
        <header className="bg-[#670099] text-white px-4 pt-3 pb-3 sticky top-0 z-30 shadow-md">
          <div className="flex items-center gap-1.5 text-[11px] text-purple-200/90 mb-1.5 font-medium">
            <button 
              onClick={() => setSelectedSubModule(null)}
              className="hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Ferramentas Técnicas</span>
            </button>
            <ChevronRight className="w-3 h-3 text-purple-300 shrink-0" />
            <span className="text-white font-bold bg-white/15 px-2 py-0.5 rounded text-[10px] uppercase tracking-wide">
              Biblioteca de Manuais
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <button 
                onClick={() => setSelectedSubModule(null)}
                className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 active:bg-white/35 flex items-center justify-center transition-colors text-white cursor-pointer shrink-0"
                aria-label="Voltar para Ferramentas Técnicas"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-white/20 text-purple-100">
                  Documentação Técnica
                </span>
                <h1 className="text-base font-extrabold tracking-tight text-white leading-tight">
                  MANUAIS & CATÁLOGOS
                </h1>
              </div>
            </div>

            <button
              onClick={() => setSelectedSubModule('retentores')}
              className="px-2.5 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-[11px] font-bold flex items-center gap-1.5 transition-colors border border-white/10"
              title="Ir para o Catálogo de Retentores"
            >
              <Database className="w-3.5 h-3.5 text-amber-300" />
              <span>ARCA × SABÓ</span>
            </button>
          </div>
        </header>

        {/* Conteúdo de Manuais */}
        <div className="px-4 py-4 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchDoc}
              onChange={(e) => setSearchDoc(e.target.value)}
              placeholder="Buscar manual, catálogo ou norma técnica..."
              className="w-full pl-9 pr-3 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#670099] shadow-xs font-medium"
            />
          </div>

          <div className="space-y-2.5">
            {filteredDocs.map((doc) => (
              <div key={doc.id} className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-xs flex items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#670099]/10 text-[#670099] flex items-center justify-center shrink-0 mt-0.5">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 leading-snug">{doc.title}</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {doc.equipmentType} · <span className="font-mono">{doc.fileSize}</span> · {doc.updateDate}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => alert(`Acessando documento: ${doc.title}`)}
                  className="p-2 rounded-xl bg-slate-50 hover:bg-[#670099]/10 text-[#670099] transition-colors shrink-0 cursor-pointer"
                  title="Visualizar documento"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // 4. MENU PRINCIPAL DE FERRAMENTAS TÉCNICAS (HUB DOS MÓDULOS)
  // ----------------------------------------------------
  return (
    <div className="flex flex-col min-h-full pb-10 bg-[#f4f5f8]">
      
      {/* Top Header Corporativo Roxo #670099 */}
      <header className="bg-[#670099] text-white px-4 py-4 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white/15 active:bg-white/30 flex items-center justify-center transition-colors text-white cursor-pointer"
            aria-label="Voltar ao Menu Principal da Gestão Industrial"
            title="Voltar ao Menu Principal"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-white/20 text-purple-100">
                Engenharia & Manutenção
              </span>
              <span className="text-[10px] text-purple-200 font-semibold">
                3 Módulos
              </span>
            </div>
            <h1 className="text-base font-extrabold tracking-tight text-white leading-tight">
              FERRAMENTAS TÉCNICAS
            </h1>
          </div>
        </div>

        {/* Botão de Exportação .ZIP do Projeto */}
        <a
          href="/gestao-industrial-arca-sabo.zip"
          download="gestao-industrial-arca-sabo.zip"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 active:scale-95 text-white text-xs font-bold transition-all border border-white/20 shadow-xs"
          title="Baixar Projeto Completo em .ZIP (Compilado + Fontes)"
        >
          <Download className="w-3.5 h-3.5 text-amber-300" />
          <span>Exportar .ZIP</span>
        </a>
      </header>

      {/* Banner de Apresentação dos Módulos */}
      <div className="bg-gradient-to-r from-[#590085] via-[#670099] to-[#7d00ba] text-white px-4 pt-3 pb-4 shadow-xs">
        <h2 className="text-sm font-extrabold text-white">Módulos Especializados</h2>
        <p className="text-[11px] text-purple-100/90 mt-0.5">
          Selecione a ferramenta técnica para cálculos, vedações ou documentação.
        </p>
      </div>

      {/* Lista de Módulos Separados */}
      <div className="px-4 py-4 space-y-3.5 -mt-2">
        
        {/* ======================================================== */}
        {/* MÓDULO 1 DESTAQUE: CATÁLOGO DE RETENTORES ARCA × SABÓ    */}
        {/* ======================================================== */}
        <div 
          onClick={() => setSelectedSubModule('retentores')}
          className="bg-white rounded-3xl p-4 shadow-[0_4px_16px_rgba(103,0,153,0.08)] border-2 border-[#670099]/30 hover:border-[#670099] hover:shadow-lg transition-all cursor-pointer group active:scale-[0.99] relative overflow-hidden"
        >
          {/* Faixa decorativa no topo do card */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-[#670099] to-cyan-400"></div>

          <div className="flex items-start justify-between gap-2 mb-2 pt-1">
            <div className="flex items-center gap-2.5">
              {/* Ícone de Retentor / Vedação Industrial */}
              <div className="w-12 h-12 rounded-2xl bg-[#670099] text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                <Database className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                    Módulo Separado
                  </span>
                  <span className="text-[10px] font-extrabold font-mono bg-purple-100 text-purple-900 px-2 py-0.5 rounded-full">
                    {retentoresStats.total} itens
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#670099] transition-colors leading-tight mt-0.5">
                  Catálogo de Retentores
                </h3>
              </div>
            </div>

            {/* Identificação Visual ARCA x SABÓ */}
            <div className="flex items-center gap-1 bg-slate-900 text-white px-2 py-1 rounded-xl text-[10px] font-bold font-mono shrink-0 shadow-2xs">
              <span className="text-amber-400">ARCA</span>
              <span className="text-slate-400 text-[8px]">✕</span>
              <span className="text-cyan-400">SABÓ</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-snug font-normal mb-3">
            Ferramenta técnica especializada para pesquisa dimensional (Øi × Øe × b), verificação de perfis e intercâmbio direto de códigos entre catálogos ARCA e SABÓ.
          </p>

          {/* Destaques das Funcionalidades do Módulo */}
          <div className="grid grid-cols-2 gap-2 mb-3 text-[11px]">
            <div className="bg-purple-50/70 border border-purple-100 rounded-xl p-2 flex items-center gap-2 text-slate-700">
              <Ruler className="w-3.5 h-3.5 text-[#670099] shrink-0" />
              <span className="font-semibold text-[10px] truncate">Busca Dimensional mm</span>
            </div>
            <div className="bg-purple-50/70 border border-purple-100 rounded-xl p-2 flex items-center gap-2 text-slate-700">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="font-semibold text-[10px] truncate">Equivalência Cruzada</span>
            </div>
            <div className="bg-purple-50/70 border border-purple-100 rounded-xl p-2 flex items-center gap-2 text-slate-700">
              <Layers className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
              <span className="font-semibold text-[10px] truncate">Fichas com Cotas</span>
            </div>
            <div className="bg-purple-50/70 border border-purple-100 rounded-xl p-2 flex items-center gap-2 text-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="font-semibold text-[10px] truncate">Tolerância Industrial</span>
            </div>
          </div>

          {/* Botão de Ação Destacado */}
          <div className="bg-[#670099] group-hover:bg-[#52007a] text-white py-2.5 px-4 rounded-2xl text-xs font-bold flex items-center justify-between shadow-sm transition-colors">
            <span className="tracking-wide">ACESSAR MÓDULO CATÁLOGO ARCA × SABÓ</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* ======================================================== */}
        {/* MÓDULO 2: CALCULADORAS DE ENGENHARIA                     */}
        {/* ======================================================== */}
        <div 
          onClick={() => setSelectedSubModule('calculators')}
          className="bg-white rounded-3xl p-4 shadow-[0_4px_14px_rgba(0,0,0,0.05)] border border-slate-200/80 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer group active:scale-[0.99]"
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2.5">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#670099] flex items-center justify-center shrink-0 shadow-2xs group-hover:bg-purple-100 transition-colors">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    Módulo de Cálculo
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">3 Fórmulas</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#670099] transition-colors leading-tight mt-0.5">
                  Calculadoras de Engenharia
                </h3>
              </div>
            </div>

            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#670099] group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
          </div>

          <p className="text-xs text-slate-600 leading-snug font-normal mb-3">
            Cálculo rápido de potência motora & torque (kW / CV), dimensionamento de velocidade de fluido em tubulação e relação cinemática de redutores.
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
            <span className="text-[11px] font-mono font-medium text-slate-500">
              Potência · Vazão · Redução
            </span>
            <span className="font-bold text-[#670099] flex items-center gap-1">
              Abrir Calculadoras <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* MÓDULO 3: BIBLIOTECA DE MANUAIS & CATÁLOGOS              */}
        {/* ======================================================== */}
        <div 
          onClick={() => setSelectedSubModule('catalogs')}
          className="bg-white rounded-3xl p-4 shadow-[0_4px_14px_rgba(0,0,0,0.05)] border border-slate-200/80 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer group active:scale-[0.99]"
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2.5">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#670099] flex items-center justify-center shrink-0 shadow-2xs group-hover:bg-purple-100 transition-colors">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    Documentação
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">24 Manuais</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#670099] transition-colors leading-tight mt-0.5">
                  Biblioteca de Manuais & Normas
                </h3>
              </div>
            </div>

            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#670099] group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
          </div>

          <p className="text-xs text-slate-600 leading-snug font-normal mb-3">
            Manuais de operação e catálogos técnicos de fabricantes industriais (WEG, Falk, KSB, SEW), diagramas esquemáticos e procedimentos de lubrificação.
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
            <span className="text-[11px] font-mono font-medium text-slate-500">
              PDFs · Fichas de Montagem
            </span>
            <span className="font-bold text-[#670099] flex items-center gap-1">
              Ver Biblioteca <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
