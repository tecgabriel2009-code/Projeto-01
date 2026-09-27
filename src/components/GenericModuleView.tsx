import React, { useState } from 'react';
import { IndustrialModule, GenericEquipment } from '../types';
import { sampleGenericEquipments } from '../data/initialData';
import { ManufacturerLogo } from './ManufacturerLogo';
import { ManufacturerLogoUploader } from './ManufacturerLogoUploader';
import { findPresetLogo } from '../data/manufacturerLogos';
import { 
  ArrowLeft, 
  Activity, 
  ShieldCheck, 
  AlertCircle, 
  Wrench, 
  Plus, 
  CheckCircle, 
  Sliders, 
  RefreshCw, 
  Search, 
  Edit3, 
  Trash2, 
  X,
  FileText,
  AlertTriangle
} from 'lucide-react';

interface Props {
  module: IndustrialModule;
  onBack: () => void;
}

export function GenericModuleView({ module, onBack }: Props) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [telemetryTime, setTelemetryTime] = useState('Agora');
  const [searchQuery, setSearchQuery] = useState('');

  // Equipment list for this specific module
  const [equipments, setEquipments] = useState<GenericEquipment[]>(() => {
    return sampleGenericEquipments.filter(e => e.moduleId === module.id);
  });

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingEquipmentId, setEditingEquipmentId] = useState<string | null>(null);
  const [deletingEquipment, setDeletingEquipment] = useState<GenericEquipment | null>(null);

  // Form state
  const [formData, setFormData] = useState<{
    tag: string;
    name: string;
    model: string;
    manufacturer: string;
    manufacturerLogo?: string;
    area: string;
    sector: string;
    serialNumber: string;
    specifications: string;
    status: GenericEquipment['status'];
    notes: string;
  }>({
    tag: '',
    name: '',
    model: '',
    manufacturer: '',
    manufacturerLogo: undefined,
    area: '',
    sector: '',
    serialNumber: '',
    specifications: '',
    status: 'Em Operação',
    notes: '',
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setTelemetryTime('Atualizado agora');
    }, 500);
  };

  // Filtered equipment list
  const filteredEquipments = equipments.filter(eq => {
    const query = searchQuery.toLowerCase();
    return (
      eq.tag.toLowerCase().includes(query) ||
      eq.name.toLowerCase().includes(query) ||
      eq.model.toLowerCase().includes(query) ||
      eq.manufacturer.toLowerCase().includes(query) ||
      eq.area.toLowerCase().includes(query) ||
      eq.sector.toLowerCase().includes(query)
    );
  });

  // Open Create Modal
  const handleOpenCreate = () => {
    setEditingEquipmentId(null);
    let defaultMfr = 'Fabricante Industrial';
    if (module.id === 'esteiras') defaultMfr = 'Goodyear / Continental';
    else if (module.id === 'centrifugas-fermento') defaultMfr = 'Alfa Laval';
    else if (module.id === 'exaustores') defaultMfr = 'Twin City / Aerovent';
    else if (module.id === 'torre-refrigeracao') defaultMfr = 'SPX / Marley Tower';

    setFormData({
      tag: '',
      name: '',
      model: '',
      manufacturer: defaultMfr,
      manufacturerLogo: findPresetLogo(defaultMfr),
      area: '',
      sector: '',
      serialNumber: '',
      specifications: '',
      status: 'Em Operação',
      notes: '',
    });
    setIsFormModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (eq: GenericEquipment) => {
    setEditingEquipmentId(eq.id);
    setFormData({
      tag: eq.tag,
      name: eq.name,
      model: eq.model,
      manufacturer: eq.manufacturer,
      manufacturerLogo: eq.manufacturerLogo,
      area: eq.area,
      sector: eq.sector,
      serialNumber: eq.serialNumber || '',
      specifications: eq.specifications,
      status: eq.status,
      notes: eq.notes || '',
    });
    setIsFormModalOpen(true);
  };

  // Save Equipment (Create or Edit)
  const handleSaveEquipment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.tag.trim()) {
      alert('Por favor, informe a TAG do equipamento.');
      return;
    }

    if (editingEquipmentId) {
      // Edit
      setEquipments(equipments.map(eq => {
        if (eq.id === editingEquipmentId) {
          return {
            ...eq,
            ...formData,
            tag: formData.tag.toUpperCase().trim(),
          };
        }
        return eq;
      }));
    } else {
      // Create
      const newEq: GenericEquipment = {
        id: `${module.id}-${Date.now()}`,
        moduleId: module.id,
        ...formData,
        tag: formData.tag.toUpperCase().trim(),
        lastMaintenance: 'Hoje',
        nextMaintenance: '90 dias',
      };
      setEquipments([newEq, ...equipments]);
    }

    setIsFormModalOpen(false);
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    if (!deletingEquipment) return;
    setEquipments(equipments.filter(e => e.id !== deletingEquipment.id));
    setDeletingEquipment(null);
  };

  return (
    <div className="flex flex-col min-h-full pb-10 bg-[#f4f5f8]">
      {/* Top Header */}
      <div className="bg-[#670099] text-white px-4 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white/15 active:bg-white/30 flex items-center justify-center transition-colors text-white"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-base font-bold tracking-tight">{module.title}</h1>
            <p className="text-[11px] text-purple-200">Gestão e Cadastro de TAGs</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleOpenCreate}
            className="px-2.5 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 active:scale-95 text-xs font-bold text-white flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Cadastrar</span>
          </button>
          <button
            onClick={handleRefresh}
            className="w-9 h-9 rounded-full bg-white/15 active:bg-white/30 flex items-center justify-center transition-colors text-white"
            title="Atualizar telemetria"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="px-4 py-3 space-y-3.5">
        {/* Module overview card */}
        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-[#670099] bg-[#670099]/10 px-2.5 py-0.5 rounded-full">
              Status Operacional
            </span>
            <span className="text-[11px] text-slate-500">{telemetryTime}</span>
          </div>

          <h2 className="text-base font-bold text-slate-900 mb-1">{module.title}</h2>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            {module.description}
          </p>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Total Cadastrado</span>
              <span className="text-lg font-black text-slate-900">{equipments.length} equipamentos</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-emerald-600 uppercase font-semibold block">Disponibilidade</span>
              <span className="text-base font-bold text-emerald-700">
                {equipments.length > 0 
                  ? `${Math.round((equipments.filter(e => e.status === 'Em Operação').length / equipments.length) * 100)}%`
                  : '100%'}
              </span>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar por TAG, nome, fabricante ou setor..."
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

        {/* Equipment TAG Cards list with 64x64 Manufacturer Logo */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Equipamentos Cadastrados ({filteredEquipments.length})
            </h3>
          </div>

          {filteredEquipments.map((eq) => (
            <div
              key={eq.id}
              className="bg-white rounded-3xl p-4 shadow-[0_4px_16px_rgba(0,0,0,0.05)] border border-slate-100 hover:border-purple-300 transition-all group"
            >
              {/* Header: TAG, Manufacturer Logo (64x64px), Status */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <ManufacturerLogo 
                    logo={eq.manufacturerLogo} 
                    manufacturer={eq.manufacturer} 
                    size={64} 
                  />
                  <div>
                    <span className="px-2.5 py-0.5 rounded-xl text-xs font-mono font-extrabold bg-[#670099]/10 text-[#670099] border border-[#670099]/20 shadow-2xs inline-block">
                      {eq.tag}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-700 block mt-1">
                      {eq.manufacturer}
                    </span>
                  </div>
                </div>

                <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full shrink-0 ${
                  eq.status === 'Em Operação' ? 'bg-emerald-100 text-emerald-800' :
                  eq.status === 'Stand-by' ? 'bg-blue-100 text-blue-800' :
                  'bg-amber-100 text-amber-800'
                }`}>
                  {eq.status === 'Em Operação' && <CheckCircle className="w-3 h-3" />}
                  {eq.status === 'Stand-by' && <Activity className="w-3 h-3" />}
                  {eq.status === 'Manutenção' && <Wrench className="w-3 h-3" />}
                  {eq.status}
                </span>
              </div>

              {/* Title & Model */}
              <h4 className="text-sm font-bold text-slate-900 mb-1">{eq.name}</h4>
              <p className="text-[11px] text-slate-500 mb-2">
                {eq.model} · <span className="text-slate-700 font-medium">{eq.area} / {eq.sector}</span>
              </p>

              {/* Specs & Notes */}
              {eq.specifications && (
                <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-700 mb-2">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-0.5">Especificações:</span>
                  <span className="font-medium text-slate-800">{eq.specifications}</span>
                </div>
              )}

              {eq.notes && (
                <p className="text-[11px] text-slate-500 italic mb-2 line-clamp-2">
                  "{eq.notes}"
                </p>
              )}

              {/* Bottom row actions */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                <span>Próxima revisão: {eq.nextMaintenance}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(eq)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-[#670099] hover:bg-purple-50 transition-colors"
                    title="Editar equipamento"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeletingEquipment(eq)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Excluir equipamento"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredEquipments.length === 0 && (
            <div className="bg-white rounded-3xl p-8 text-center text-slate-500 shadow-sm border border-slate-200">
              <p className="text-xs font-medium">Nenhum equipamento cadastrado com os filtros aplicados.</p>
              <button
                onClick={handleOpenCreate}
                className="mt-3 px-4 py-2 rounded-xl bg-[#670099] text-white text-xs font-bold shadow-md hover:bg-[#52007a] transition-colors"
              >
                + Cadastrar Novo Equipamento
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FORM MODAL (CADASTRO / EDIÇÃO COM LOGO DO FABRICANTE 64X64PX)            */}
      {/* ========================================================================= */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl w-full max-w-lg max-h-[92vh] flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 border border-purple-100">
            
            {/* Header */}
            <div className="bg-[#670099] text-white px-5 py-3.5 flex items-center justify-between shrink-0 shadow-md">
              <div>
                <h2 className="text-sm font-bold tracking-tight">
                  {editingEquipmentId ? `Editar ${module.title}` : `Cadastrar ${module.title}`}
                </h2>
                <p className="text-[11px] text-purple-200">
                  Preencha a identificação técnica e logo do fabricante
                </p>
              </div>

              <button
                onClick={() => setIsFormModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 active:scale-95 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveEquipment} className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      TAG <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: EST-103-CNA"
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

                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Nome / Descrição do Equipamento <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Mesa Alimentadora de Cana 02"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#670099]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      Modelo do Equipamento
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: EP 800/4 ou NC-8400"
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
                      placeholder="Ex: Goodyear, Alfa Laval, Twin City"
                      value={formData.manufacturer}
                      onChange={(e) => {
                        const mfr = e.target.value;
                        const autoLogo = !formData.manufacturerLogo ? findPresetLogo(mfr) : formData.manufacturerLogo;
                        setFormData({
                          ...formData,
                          manufacturer: mfr,
                          manufacturerLogo: autoLogo || formData.manufacturerLogo,
                        });
                      }}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#670099]"
                    />
                  </div>
                </div>

                {/* Campo Padronizado: Logo do Fabricante (64x64px, transparente, upload ou presets) */}
                <ManufacturerLogoUploader
                  value={formData.manufacturerLogo}
                  onChange={(logo) => setFormData({ ...formData, manufacturerLogo: logo })}
                  currentManufacturerName={formData.manufacturer}
                />

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      Área
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Moenda, Destilaria, Utilidades"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#670099]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      Setor
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Recepção, Tiragem, Centrifugação"
                      value={formData.sector}
                      onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#670099]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Especificações Técnicas
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Largura 1800mm, 4800 RPM, Vazão 1200 m³/h..."
                    value={formData.specifications}
                    onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#670099]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Observações / Notas
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Histórico de manutenção, pontos de inspeção..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#670099]"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsFormModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#670099] hover:bg-[#52007a] text-white font-bold text-xs shadow-md transition-all active:scale-95"
                >
                  {editingEquipmentId ? 'Salvar Alterações' : 'Salvar Equipamento'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CONFIRM DELETE MODAL                                                     */}
      {/* ========================================================================= */}
      {deletingEquipment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl p-5 text-center border border-rose-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 mx-auto flex items-center justify-center mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-base font-bold text-slate-900 mb-1">Excluir Equipamento?</h3>
            <p className="text-xs text-slate-600 mb-4">
              Você está prestes a excluir o registro de <strong className="text-slate-900 font-mono">{deletingEquipment.tag}</strong> ({deletingEquipment.name}).
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setDeletingEquipment(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
