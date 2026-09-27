import React, { useState } from 'react';
import { CentrifugalPump } from '../types';
import { sampleCentrifugalPumps } from '../data/initialData';
import { ManufacturerLogo } from './ManufacturerLogo';
import { ManufacturerLogoUploader } from './ManufacturerLogoUploader';
import { findPresetLogo } from '../data/manufacturerLogos';
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Filter, 
  FileText, 
  Edit3, 
  Trash2, 
  CheckCircle, 
  Clock, 
  Wrench, 
  X, 
  Layers, 
  Activity, 
  ShieldCheck, 
  Sliders, 
  Disc, 
  Droplet, 
  Share2, 
  Printer, 
  AlertTriangle,
  ChevronRight,
  Info
} from 'lucide-react';

interface Props {
  onBack?: () => void;
}

export function CentrifugalPumpsView({ onBack }: Props) {
  const [pumps, setPumps] = useState<CentrifugalPump[]>(sampleCentrifugalPumps);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAreaFilter, setSelectedAreaFilter] = useState('Todas');
  
  // Selected pump for Technical Sheet Modal (Ficha Técnica)
  const [viewingPump, setViewingPump] = useState<CentrifugalPump | null>(null);

  // Form modal (Create / Edit)
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingPumpId, setEditingPumpId] = useState<string | null>(null);

  // Delete confirmation
  const [deletingPump, setDeletingPump] = useState<CentrifugalPump | null>(null);

  // Active form section tab for clean mobile form usability
  const [formTab, setFormTab] = useState<'id' | 'specs' | 'components' | 'notes'>('id');

  // Form state
  const [formData, setFormData] = useState<Omit<CentrifugalPump, 'id' | 'updatedAt'>>({
    tag: '',
    area: '',
    operationalSector: '',
    model: '',
    manufacturer: '',
    manufacturerLogo: '',
    serialNumber: '',
    rotorDiameter: '',
    pumpedFluid: '',
    lubricant: '',
    frontBearing: '',
    rearBearing: '',
    thrustBearing: '',
    frontSealRing: '',
    rearSealRing: '',
    mechanicalSeal: '',
    packingSeal: '',
    coupling: '',
    technicalNotes: '',
    status: 'Em Operação',
  });

  // Extract unique areas for quick filtering
  const areas = ['Todas', ...Array.from(new Set(pumps.map(p => p.area).filter(Boolean)))];

  // Filter pumps
  const filteredPumps = pumps.filter(p => {
    const matchesArea = selectedAreaFilter === 'Todas' || p.area === selectedAreaFilter;
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      p.tag.toLowerCase().includes(query) ||
      p.model.toLowerCase().includes(query) ||
      p.manufacturer.toLowerCase().includes(query) ||
      p.area.toLowerCase().includes(query) ||
      p.operationalSector.toLowerCase().includes(query) ||
      p.pumpedFluid.toLowerCase().includes(query);
    return matchesArea && matchesSearch;
  });

  // Open create form
  const handleOpenCreate = () => {
    setEditingPumpId(null);
    setFormData({
      tag: '',
      area: '',
      operationalSector: '',
      model: '',
      manufacturer: 'KSB Bombas',
      manufacturerLogo: findPresetLogo('KSB Bombas') || '',
      serialNumber: '',
      rotorDiameter: '',
      pumpedFluid: '',
      lubricant: 'Óleo Mineral ISO VG 68',
      frontBearing: '',
      rearBearing: '',
      thrustBearing: '',
      frontSealRing: '',
      rearSealRing: '',
      mechanicalSeal: '',
      packingSeal: 'N/A',
      coupling: '',
      technicalNotes: '',
      status: 'Em Operação',
    });
    setFormTab('id');
    setIsFormModalOpen(true);
  };

  // Open edit form
  const handleOpenEdit = (pump: CentrifugalPump, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingPumpId(pump.id);
    setFormData({
      tag: pump.tag,
      area: pump.area,
      operationalSector: pump.operationalSector,
      model: pump.model,
      manufacturer: pump.manufacturer,
      manufacturerLogo: pump.manufacturerLogo || '',
      serialNumber: pump.serialNumber,
      rotorDiameter: pump.rotorDiameter,
      pumpedFluid: pump.pumpedFluid,
      lubricant: pump.lubricant,
      frontBearing: pump.frontBearing,
      rearBearing: pump.rearBearing,
      thrustBearing: pump.thrustBearing,
      frontSealRing: pump.frontSealRing,
      rearSealRing: pump.rearSealRing,
      mechanicalSeal: pump.mechanicalSeal,
      packingSeal: pump.packingSeal,
      coupling: pump.coupling,
      technicalNotes: pump.technicalNotes,
      status: pump.status,
    });
    setFormTab('id');
    setIsFormModalOpen(true);
  };

  // Save pump (Create or Update)
  const handleSavePump = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.tag.trim() || !formData.model.trim()) {
      alert('Por favor, preencha ao menos o TAG e o Modelo do equipamento.');
      return;
    }

    const todayDate = new Date().toLocaleDateString('pt-BR');

    if (editingPumpId) {
      // Update existing
      const updatedList = pumps.map(p => {
        if (p.id === editingPumpId) {
          return {
            ...p,
            ...formData,
            tag: formData.tag.toUpperCase().trim(),
            updatedAt: todayDate,
          };
        }
        return p;
      });
      setPumps(updatedList);
      if (viewingPump && viewingPump.id === editingPumpId) {
        setViewingPump({
          ...viewingPump,
          ...formData,
          tag: formData.tag.toUpperCase().trim(),
          updatedAt: todayDate,
        });
      }
    } else {
      // Create new
      const newPump: CentrifugalPump = {
        id: `bc-${Date.now()}`,
        ...formData,
        tag: formData.tag.toUpperCase().trim(),
        updatedAt: todayDate,
      };
      setPumps([newPump, ...pumps]);
    }

    setIsFormModalOpen(false);
  };

  // Delete pump
  const handleConfirmDelete = () => {
    if (!deletingPump) return;
    setPumps(pumps.filter(p => p.id !== deletingPump.id));
    if (viewingPump?.id === deletingPump.id) {
      setViewingPump(null);
    }
    setDeletingPump(null);
  };

  return (
    <div className="flex flex-col min-h-full pb-10 bg-[#f4f5f8]">
      {/* Module Header in official #670099 */}
      <div className="bg-[#670099] text-white px-4 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          {onBack && (
            <button 
              onClick={onBack}
              className="w-9 h-9 rounded-full bg-white/15 active:bg-white/30 flex items-center justify-center transition-colors text-white"
              aria-label="Voltar"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-white shadow-xs"></span>
              <h1 className="text-base font-bold tracking-tight text-white">Bombas Centrífugas</h1>
            </div>
            <p className="text-[11px] text-purple-200">Cadastro & Fichas Técnicas Mecânicas</p>
          </div>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 active:scale-95 text-xs font-bold text-white flex items-center gap-1.5 transition-all shadow-xs border border-white/20"
        >
          <Plus className="w-4 h-4" />
          <span>Cadastrar</span>
        </button>
      </div>

      {/* Summary KPI Strip */}
      <div className="px-4 pt-3.5 pb-1 grid grid-cols-3 gap-2">
        <div className="bg-white rounded-2xl p-2.5 border border-slate-200 shadow-2xs text-center">
          <span className="text-[10px] text-slate-500 font-semibold uppercase block">Total</span>
          <span className="text-base font-extrabold text-[#670099]">{pumps.length}</span>
        </div>
        <div className="bg-white rounded-2xl p-2.5 border border-slate-200 shadow-2xs text-center">
          <span className="text-[10px] text-emerald-600 font-semibold uppercase block">Em Operação</span>
          <span className="text-base font-extrabold text-emerald-700">
            {pumps.filter(p => p.status === 'Em Operação').length}
          </span>
        </div>
        <div className="bg-white rounded-2xl p-2.5 border border-slate-200 shadow-2xs text-center">
          <span className="text-[10px] text-amber-600 font-semibold uppercase block">Em Manutenção</span>
          <span className="text-base font-extrabold text-amber-700">
            {pumps.filter(p => p.status === 'Manutenção').length}
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 pt-2.5 pb-1">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar TAG, modelo, fabricante, área..."
            className="w-full pl-9.5 pr-8 py-2 text-xs bg-white border border-slate-200/90 rounded-2xl focus:outline-none focus:border-[#670099] shadow-xs text-slate-800 placeholder-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Area Filter Tags */}
      {areas.length > 1 && (
        <div className="px-4 py-1.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {areas.map((area) => (
            <button
              key={area}
              onClick={() => setSelectedAreaFilter(area)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedAreaFilter === area
                  ? 'bg-[#670099] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-purple-200'
              }`}
            >
              {area}
            </button>
          ))}
        </div>
      )}

      {/* List of Centrifugal Pumps (Cards showing mainly TAG, model, manufacturer, area and sector) */}
      <div className="px-4 pt-2 space-y-3">
        {filteredPumps.map((pump) => (
          <div
            key={pump.id}
            onClick={() => setViewingPump(pump)}
            className="bg-white rounded-3xl p-4 shadow-[0_4px_16px_rgba(0,0,0,0.05)] border border-slate-100/90 hover:border-purple-300 hover:shadow-md cursor-pointer transition-all active:scale-[0.99] group relative"
          >
            {/* Header of Card: TAG badge, Manufacturer logo & name, & Status */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2.5">
                <ManufacturerLogo 
                  logo={pump.manufacturerLogo} 
                  manufacturer={pump.manufacturer} 
                  size={64} 
                />
                <div>
                  <span className="px-2.5 py-1 rounded-xl text-xs font-mono font-extrabold bg-[#670099]/10 text-[#670099] border border-[#670099]/20 shadow-2xs inline-block">
                    {pump.tag}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-600 block mt-1">
                    {pump.manufacturer}
                  </span>
                </div>
              </div>

              {/* Status pill badge */}
              <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full shrink-0 ${
                pump.status === 'Em Operação' ? 'bg-emerald-100 text-emerald-800' :
                pump.status === 'Stand-by' ? 'bg-blue-100 text-blue-800' :
                'bg-amber-100 text-amber-800'
              }`}>
                {pump.status === 'Em Operação' && <CheckCircle className="w-3 h-3" />}
                {pump.status === 'Stand-by' && <Activity className="w-3 h-3" />}
                {pump.status === 'Manutenção' && <Wrench className="w-3 h-3" />}
                {pump.status}
              </span>
            </div>

            {/* Equipment Model */}
            <h2 className="text-sm font-bold text-slate-900 group-hover:text-[#670099] transition-colors mb-1.5">
              {pump.model}
            </h2>

            {/* Area and Operational Sector */}
            <div className="grid grid-cols-2 gap-2 p-2.5 bg-slate-50 rounded-2xl text-xs mb-3 border border-slate-100">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Área:</span>
                <span className="font-bold text-slate-700 truncate block">{pump.area || '—'}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Setor Operacional:</span>
                <span className="font-bold text-slate-700 truncate block">{pump.operationalSector || '—'}</span>
              </div>
            </div>

            {/* Key mechanical highlights preview */}
            <div className="flex items-center justify-between text-[11px] text-slate-500 pb-2 border-b border-slate-100 mb-2">
              <span className="truncate max-w-[190px]">
                <strong className="text-slate-700">Fluido:</strong> {pump.pumpedFluid || 'Água Industrial'}
              </span>
              <span className="text-slate-600 font-mono text-[10px] shrink-0">
                Ø Rotor: {pump.rotorDiameter || 'Padrão'}
              </span>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-[#670099] font-bold flex items-center gap-1 group-hover:underline">
                <FileText className="w-3.5 h-3.5" />
                Ver Ficha Técnica
              </span>

              <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={(e) => handleOpenEdit(pump, e)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-[#670099] hover:bg-purple-50 transition-colors"
                  title="Editar bomba"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeletingPump(pump);
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Excluir bomba"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredPumps.length === 0 && (
          <div className="bg-white rounded-3xl p-8 text-center text-slate-500 shadow-sm border border-slate-200">
            <Droplet className="w-10 h-10 text-purple-300 mx-auto mb-2 opacity-60" />
            <h3 className="text-sm font-bold text-slate-800">Nenhuma bomba centrífuga encontrada</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              {searchQuery ? `Nenhum resultado para "${searchQuery}".` : 'Cadastre a primeira bomba centrífuga do setor.'}
            </p>
            <button
              onClick={handleOpenCreate}
              className="mt-3.5 px-4 py-2 rounded-xl bg-[#670099] text-white text-xs font-bold shadow-md hover:bg-[#52007a] transition-colors"
            >
              + Cadastrar Nova Bomba
            </button>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: FICHA TÉCNICA DETALHADA DA BOMBA SELECIONADA                    */}
      {/* ========================================================================= */}
      {viewingPump && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 border border-purple-100">
            
            {/* Header */}
            <div className="bg-[#670099] text-white px-5 py-4 flex items-center justify-between shrink-0 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center text-white">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-sm bg-white/20 px-2 py-0.5 rounded-md">
                      {viewingPump.tag}
                    </span>
                    <span className="text-xs text-purple-200 font-medium">Ficha Técnica</span>
                  </div>
                  <h2 className="text-sm font-bold text-white mt-0.5">{viewingPump.model}</h2>
                </div>
              </div>

              <button
                onClick={() => setViewingPump(null)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 active:scale-95 flex items-center justify-center text-white transition-colors"
                aria-label="Fechar ficha"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Body organized into: Identificação, Características da Bomba, Componentes Mecânicos, Observações */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">

              {/* SECTION 1: IDENTIFICAÇÃO */}
              <div className="bg-white rounded-2xl p-3.5 border border-purple-100 shadow-2xs">
                <div className="flex items-center gap-2 mb-2.5 pb-1.5 border-b border-purple-100/80">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#670099]"></div>
                  <h3 className="font-bold text-xs uppercase tracking-wide text-slate-900">
                    1. Identificação do Equipamento
                  </h3>
                </div>

                {/* Fabricante com Logo 64x64px padronizada */}
                <div className="flex items-center gap-3 mb-3 bg-purple-50/40 p-2.5 rounded-2xl border border-purple-100/70">
                  <ManufacturerLogo 
                    logo={viewingPump.manufacturerLogo} 
                    manufacturer={viewingPump.manufacturer} 
                    size={64} 
                  />
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">Fabricante:</span>
                    <span className="font-bold text-slate-900 text-sm">{viewingPump.manufacturer || '—'}</span>
                    <span className="font-mono text-xs text-slate-500 block">Série: {viewingPump.serialNumber || 'N/I'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-slate-50 p-2 rounded-xl">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">TAG:</span>
                    <span className="font-mono font-bold text-[#670099] text-xs">{viewingPump.tag}</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">Modelo:</span>
                    <span className="font-bold text-slate-800 text-xs">{viewingPump.model || '—'}</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">Área:</span>
                    <span className="font-semibold text-slate-800 text-xs">{viewingPump.area || '—'}</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">Setor Operacional:</span>
                    <span className="font-semibold text-slate-800 text-xs">{viewingPump.operationalSector || '—'}</span>
                  </div>
                </div>
              </div>

              {/* SECTION 2: CARACTERÍSTICAS DA BOMBA */}
              <div className="bg-white rounded-2xl p-3.5 border border-purple-100 shadow-2xs">
                <div className="flex items-center gap-2 mb-2.5 pb-1.5 border-b border-purple-100/80">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#670099]"></div>
                  <h3 className="font-bold text-xs uppercase tracking-wide text-slate-900">
                    2. Características da Bomba
                  </h3>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded-xl bg-purple-50/50 border border-purple-100/60">
                    <span className="text-slate-600 font-medium">Diâmetro do Rotor:</span>
                    <span className="font-bold text-slate-900 font-mono">{viewingPump.rotorDiameter || 'Não informado'}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-purple-50/50 border border-purple-100/60">
                    <span className="text-slate-600 font-medium">Fluido Bombeado:</span>
                    <span className="font-bold text-[#670099]">{viewingPump.pumpedFluid || 'Não informado'}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-purple-50/50 border border-purple-100/60">
                    <span className="text-slate-600 font-medium">Lubrificante:</span>
                    <span className="font-bold text-slate-900">{viewingPump.lubricant || 'Não informado'}</span>
                  </div>
                </div>
              </div>

              {/* SECTION 3: COMPONENTES MECÂNICOS */}
              <div className="bg-white rounded-2xl p-3.5 border border-purple-100 shadow-2xs">
                <div className="flex items-center gap-2 mb-2.5 pb-1.5 border-b border-purple-100/80">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#670099]"></div>
                  <h3 className="font-bold text-xs uppercase tracking-wide text-slate-900">
                    3. Componentes Mecânicos
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Rolamento Dianteiro:</span>
                    <span className="font-mono font-bold text-slate-800">{viewingPump.frontBearing || '—'}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Rolamento Traseiro:</span>
                    <span className="font-mono font-bold text-slate-800">{viewingPump.rearBearing || '—'}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Rolamento Axial:</span>
                    <span className="font-mono font-bold text-slate-800">{viewingPump.thrustBearing || '—'}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Retentor Dianteiro:</span>
                    <span className="font-mono text-slate-800">{viewingPump.frontSealRing || '—'}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Retentor Traseiro:</span>
                    <span className="font-mono text-slate-800">{viewingPump.rearSealRing || '—'}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Selo Mecânico:</span>
                    <span className="font-bold text-[#670099]">{viewingPump.mechanicalSeal || '—'}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Gaxeta:</span>
                    <span className="text-slate-800">{viewingPump.packingSeal || 'N/A'}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Acoplamento:</span>
                    <span className="font-semibold text-slate-800">{viewingPump.coupling || '—'}</span>
                  </div>
                </div>
              </div>

              {/* SECTION 4: OBSERVAÇÕES TÉCNICAS */}
              <div className="bg-white rounded-2xl p-3.5 border border-purple-100 shadow-2xs">
                <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-purple-100/80">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#670099]"></div>
                  <h3 className="font-bold text-xs uppercase tracking-wide text-slate-900">
                    4. Observações Técnicas
                  </h3>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 leading-relaxed text-xs">
                  {viewingPump.technicalNotes ? (
                    <p className="whitespace-pre-line">{viewingPump.technicalNotes}</p>
                  ) : (
                    <span className="text-slate-400 italic">Nenhuma observação técnica registrada até o momento.</span>
                  )}
                </div>

                <div className="mt-2 text-[10px] text-slate-400 text-right">
                  Última atualização da ficha: {viewingPump.updatedAt}
                </div>
              </div>
            </div>

            {/* Footer with action buttons */}
            <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0 gap-2">
              <button
                onClick={() => {
                  setDeletingPump(viewingPump);
                }}
                className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center gap-1.5 transition-colors border border-rose-200"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Excluir</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handleOpenEdit(viewingPump);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-[#670099] hover:bg-[#52007a] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Editar Ficha</span>
                </button>

                <button
                  onClick={() => setViewingPump(null)}
                  className="px-3.5 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-300 transition-colors"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: CADASTRO E EDIÇÃO DE BOMBA CENTRÍFUGA                           */}
      {/* ========================================================================= */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl w-full max-w-lg max-h-[92vh] flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 border border-purple-100">
            
            {/* Header */}
            <div className="bg-[#670099] text-white px-5 py-3.5 flex items-center justify-between shrink-0 shadow-md">
              <div>
                <h2 className="text-sm font-bold tracking-tight">
                  {editingPumpId ? 'Editar Bomba Centrífuga' : 'Cadastrar Bomba Centrífuga'}
                </h2>
                <p className="text-[11px] text-purple-200">
                  Preencha os campos da ficha técnica
                </p>
              </div>

              <button
                onClick={() => setIsFormModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 active:scale-95 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Stepper / Tabs for friendly mobile form navigation */}
            <div className="px-4 pt-3 pb-1 border-b border-slate-100 bg-slate-50/50 flex gap-1">
              {[
                { id: 'id', label: '1. Identificação' },
                { id: 'specs', label: '2. Características' },
                { id: 'components', label: '3. Componentes' },
                { id: 'notes', label: '4. Observações' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFormTab(tab.id as any)}
                  className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all ${
                    formTab === tab.id
                      ? 'bg-[#670099] text-white shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-200/60'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSavePump} className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
                
                {/* TAB 1: IDENTIFICAÇÃO */}
                {formTab === 'id' && (
                  <div className="space-y-3 animate-in fade-in duration-150">
                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">
                          TAG <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ex: BC-103-DES"
                          value={formData.tag}
                          onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#670099] font-mono font-bold uppercase"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">
                          Status Operacional
                        </label>
                        <select
                          value={formData.status}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#670099]"
                        >
                          <option value="Em Operação">Em Operação</option>
                          <option value="Stand-by">Stand-by</option>
                          <option value="Manutenção">Manutenção</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">
                          Área
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Destilaria, Moenda, Utilidades"
                          value={formData.area}
                          onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#670099]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">
                          Setor Operacional
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Fermentação, ETA, Evaporação"
                          value={formData.operationalSector}
                          onChange={(e) => setFormData({ ...formData, operationalSector: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#670099]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">
                          Modelo do Equipamento <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ex: MEGAPRO 80-250 ou CPK 125-315"
                          value={formData.model}
                          onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#670099]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">
                          Fabricante
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: KSB Bombas, IMBIL, Sulzer"
                          value={formData.manufacturer}
                          onChange={(e) => {
                            const newMfr = e.target.value;
                            // Auto-suggest preset logo if none selected yet
                            const autoLogo = !formData.manufacturerLogo ? findPresetLogo(newMfr) : formData.manufacturerLogo;
                            setFormData({ 
                              ...formData, 
                              manufacturer: newMfr,
                              manufacturerLogo: autoLogo || formData.manufacturerLogo,
                            });
                          }}
                          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#670099]"
                        />
                      </div>
                    </div>

                    {/* Campo Logo do Fabricante padronizado 64x64px */}
                    <ManufacturerLogoUploader
                      value={formData.manufacturerLogo}
                      onChange={(logo) => setFormData({ ...formData, manufacturerLogo: logo })}
                      currentManufacturerName={formData.manufacturer}
                    />

                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        Número de Série
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: KSB-2026-90412"
                        value={formData.serialNumber}
                        onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#670099] font-mono"
                      />
                    </div>
                  </div>
                )}

                {/* TAB 2: CARACTERÍSTICAS DA BOMBA */}
                {formTab === 'specs' && (
                  <div className="space-y-3 animate-in fade-in duration-150">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        Diâmetro do Rotor
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: 254 mm (Usinado) ou 315 mm"
                        value={formData.rotorDiameter}
                        onChange={(e) => setFormData({ ...formData, rotorDiameter: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#670099]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        Fluido Bombeado
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Vinho devedorado, Caldo clarificado, Vinhaça"
                        value={formData.pumpedFluid}
                        onChange={(e) => setFormData({ ...formData, pumpedFluid: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#670099]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        Lubrificante
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Óleo Mineral ISO VG 68 ou Graxa NLGI 2"
                        value={formData.lubricant}
                        onChange={(e) => setFormData({ ...formData, lubricant: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#670099]"
                      />
                    </div>
                  </div>
                )}

                {/* TAB 3: COMPONENTES MECÂNICOS */}
                {formTab === 'components' && (
                  <div className="space-y-3 animate-in fade-in duration-150">
                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">
                          Rolamento Dianteiro
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: 6308 C3"
                          value={formData.frontBearing}
                          onChange={(e) => setFormData({ ...formData, frontBearing: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#670099]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">
                          Rolamento Traseiro
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: 7308 BECBJ"
                          value={formData.rearBearing}
                          onChange={(e) => setFormData({ ...formData, rearBearing: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#670099]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        Rolamento Axial
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: 7308 BECBJ Duplo Angular ou N/A"
                        value={formData.thrustBearing}
                        onChange={(e) => setFormData({ ...formData, thrustBearing: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#670099]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">
                          Retentor Dianteiro
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Sabó 45 x 65 x 10 mm"
                          value={formData.frontSealRing}
                          onChange={(e) => setFormData({ ...formData, frontSealRing: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#670099]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">
                          Retentor Traseiro
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Sabó 40 x 62 x 10 mm"
                          value={formData.rearSealRing}
                          onChange={(e) => setFormData({ ...formData, rearSealRing: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#670099]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">
                          Selo Mecânico
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Cartucho Duplo 50mm SiC"
                          value={formData.mechanicalSeal}
                          onChange={(e) => setFormData({ ...formData, mechanicalSeal: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#670099]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">
                          Gaxeta
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Teflon 3/8' ou N/A"
                          value={formData.packingSeal}
                          onChange={(e) => setFormData({ ...formData, packingSeal: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#670099]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        Acoplamento
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Falk Steelflex 1060T10 ou Pneu HRC 150"
                        value={formData.coupling}
                        onChange={(e) => setFormData({ ...formData, coupling: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#670099]"
                      />
                    </div>
                  </div>
                )}

                {/* TAB 4: OBSERVAÇÕES TÉCNICAS */}
                {formTab === 'notes' && (
                  <div className="space-y-3 animate-in fade-in duration-150">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        Observações Técnicas do Equipamento
                      </label>
                      <textarea
                        rows={6}
                        placeholder="Detalhes sobre folgas radiais e axiais, histórico de revisões, notas de balanceamento, especificações do plano de selagem (API Plan), temperatura operacional média..."
                        value={formData.technicalNotes}
                        onChange={(e) => setFormData({ ...formData, technicalNotes: e.target.value })}
                        className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#670099] leading-relaxed"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Form Navigation / Submit Footer */}
              <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
                <div className="flex gap-1.5">
                  {formTab !== 'id' && (
                    <button
                      type="button"
                      onClick={() => {
                        if (formTab === 'notes') setFormTab('components');
                        else if (formTab === 'components') setFormTab('specs');
                        else if (formTab === 'specs') setFormTab('id');
                      }}
                      className="px-3 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-300 transition-colors"
                    >
                      Voltar
                    </button>
                  )}
                  {formTab !== 'notes' && (
                    <button
                      type="button"
                      onClick={() => {
                        if (formTab === 'id') setFormTab('specs');
                        else if (formTab === 'specs') setFormTab('components');
                        else if (formTab === 'components') setFormTab('notes');
                      }}
                      className="px-3.5 py-2 rounded-xl bg-purple-100 text-[#670099] font-bold text-xs hover:bg-purple-200 transition-colors flex items-center gap-1"
                    >
                      <span>Avançar</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsFormModalOpen(false)}
                    className="px-3 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs hover:bg-slate-200 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#670099] hover:bg-[#52007a] text-white font-bold text-xs shadow-md transition-all active:scale-95"
                  >
                    {editingPumpId ? 'Salvar Alterações' : 'Salvar Bomba'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: CONFIRMAÇÃO DE EXCLUSÃO                                         */}
      {/* ========================================================================= */}
      {deletingPump && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl p-5 text-center border border-rose-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 mx-auto flex items-center justify-center mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-base font-bold text-slate-900 mb-1">Excluir Bomba Centrífuga?</h3>
            <p className="text-xs text-slate-600 mb-4">
              Você está prestes a excluir o registro da bomba <strong className="text-slate-900 font-mono">{deletingPump.tag}</strong> ({deletingPump.model}). Essa ação removerá a ficha técnica do sistema.
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setDeletingPump(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-colors"
              >
                Confirmar Exclusão
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
