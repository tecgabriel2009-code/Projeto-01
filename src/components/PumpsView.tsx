import React, { useState } from 'react';
import { samplePumps } from '../data/initialData';
import { PumpEquipment } from '../types';
import { CentrifugalPumpsView } from './CentrifugalPumpsView';
import { ManufacturerLogo } from './ManufacturerLogo';
import { ManufacturerLogoUploader } from './ManufacturerLogoUploader';
import { findPresetLogo } from '../data/manufacturerLogos';
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Activity, 
  Droplets, 
  CheckCircle, 
  Wrench, 
  X, 
  SlidersHorizontal,
  Layers,
  ChevronRight
} from 'lucide-react';

interface Props {
  onBack: () => void;
}

export function PumpsView({ onBack }: Props) {
  // Active sub-module within Bombas: 'centrifugas' by default or 'geral'
  const [activeSubModule, setActiveSubModule] = useState<'centrifugas' | 'outras'>('centrifugas');

  // General pumps state (for other pumps like NETZSCH, Vácuo, etc.)
  const [pumps, setPumps] = useState<PumpEquipment[]>(samplePumps);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New general pump form
  const [newTag, setNewTag] = useState('');
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<PumpEquipment['category']>('Destilaria');
  const [newManufacturer, setNewManufacturer] = useState('KSB Bombas');
  const [newManufacturerLogo, setNewManufacturerLogo] = useState<string | undefined>(findPresetLogo('KSB Bombas'));
  const [newModel, setNewModel] = useState('');
  const [newFlowRate, setNewFlowRate] = useState('');
  const [newHeadPressure, setNewHeadPressure] = useState('');
  const [newStatus, setNewStatus] = useState<PumpEquipment['status']>('Em Operação');

  const categories = ['Todas', 'Destilaria', 'NETZSCH', 'Bombas de Vácuo', 'Bombas Gerais'];

  const filteredPumps = pumps.filter(p => {
    const matchesCategory = selectedCategory === 'Todas' || p.category === selectedCategory;
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddPump = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTag || !newName) return;

    const newPump: PumpEquipment = {
      id: `pmp-${Date.now()}`,
      tag: newTag.toUpperCase(),
      name: newName,
      category: newCategory,
      model: newModel || 'Padrão Industrial',
      manufacturer: newManufacturer || 'Fabricante Industrial',
      manufacturerLogo: newManufacturerLogo || findPresetLogo(newManufacturer),
      flowRate: newFlowRate || '100 m³/h',
      headPressure: newHeadPressure || '35 mca',
      motorPower: '25 CV',
      rpm: 1750,
      status: newStatus,
      location: 'Planta Principal',
      lastMaintenance: 'Hoje',
      nextMaintenance: '90 dias',
    };

    setPumps([newPump, ...pumps]);
    setIsAddModalOpen(false);
    setNewTag('');
    setNewName('');
    setNewModel('');
    setNewFlowRate('');
    setNewHeadPressure('');
    setNewManufacturerLogo(findPresetLogo('KSB Bombas'));
  };

  return (
    <div className="flex flex-col min-h-full pb-10 bg-[#f4f5f8]">
      {/* Sub-module Switcher Bar right under header */}
      <div className="bg-[#52007a] text-white px-3 py-2 flex items-center justify-between shadow-xs sticky top-0 z-40 border-b border-purple-900/30">
        <div className="flex items-center gap-2">
          <button 
            onClick={onBack}
            className="w-8 h-8 rounded-full bg-white/15 active:bg-white/30 flex items-center justify-center transition-colors text-white"
            aria-label="Voltar aos Módulos"
            title="Voltar aos Módulos"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold text-white tracking-wide uppercase">
            Módulo Bombas
          </span>
        </div>

        {/* Toggle sub-modules */}
        <div className="flex items-center bg-black/30 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setActiveSubModule('centrifugas')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              activeSubModule === 'centrifugas'
                ? 'bg-[#670099] text-white shadow-xs'
                : 'text-purple-200 hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-purple-300"></span>
            Bombas Centrífugas
          </button>
          <button
            onClick={() => setActiveSubModule('outras')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              activeSubModule === 'outras'
                ? 'bg-[#670099] text-white shadow-xs'
                : 'text-purple-200 hover:text-white'
            }`}
          >
            Outras Tecnologias
          </button>
        </div>
      </div>

      {/* When activeSubModule is 'centrifugas', render the complete Centrifugal Pumps module */}
      {activeSubModule === 'centrifugas' ? (
        <CentrifugalPumpsView />
      ) : (
        /* Outras Tecnologias (NETZSCH, Vácuo, etc.) */
        <div className="flex flex-col flex-1">
          {/* Top Header */}
          <div className="bg-[#670099] text-white px-4 py-3.5 flex items-center justify-between shadow-md">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-200"></span>
                <h1 className="text-base font-bold tracking-tight">Outras Tecnologias de Bombas</h1>
              </div>
              <p className="text-[11px] text-purple-200">Cavidade Progressiva NETZSCH, Bombas de Vácuo & Especiais</p>
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-2.5 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 active:scale-95 text-xs font-semibold text-white flex items-center gap-1.5 transition-all shadow-xs"
            >
              <Plus className="w-4 h-4" />
              Cadastrar
            </button>
          </div>

          {/* Quick link banner to Bombas Centrífugas */}
          <div className="px-4 pt-3 pb-1">
            <div 
              onClick={() => setActiveSubModule('centrifugas')}
              className="bg-white rounded-2xl p-3 border border-purple-200 shadow-2xs flex items-center justify-between cursor-pointer hover:border-[#670099] transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#670099]/10 text-[#670099] flex items-center justify-center font-bold">
                  BC
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 group-hover:text-[#670099] transition-colors">
                    Acessar Módulo Bombas Centrífugas
                  </h3>
                  <p className="text-[10px] text-slate-500">
                    Fichas técnicas completas, componentes mecânicos e vedações
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#670099] group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="px-4 pt-2 pb-1 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#670099] text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="px-4 py-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filtrar por TAG, nome ou setor..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#670099] shadow-xs"
              />
            </div>
          </div>

          {/* Pumps List */}
          <div className="px-4 space-y-3">
            {filteredPumps.map((pump) => (
              <div key={pump.id} className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <ManufacturerLogo 
                      logo={pump.manufacturerLogo} 
                      manufacturer={pump.manufacturer} 
                      size={64} 
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#670099]/10 text-[#670099]">
                          {pump.tag}
                        </span>
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                          {pump.category}
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-700 block mt-1">
                        {pump.manufacturer}
                      </span>
                    </div>
                  </div>

                  <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    pump.status === 'Em Operação' ? 'bg-emerald-100 text-emerald-800' :
                    pump.status === 'Stand-by' ? 'bg-blue-100 text-blue-800' :
                    pump.status === 'Manutenção' ? 'bg-amber-100 text-amber-800' :
                    'bg-rose-100 text-rose-800'
                  }`}>
                    {pump.status === 'Em Operação' && <CheckCircle className="w-3 h-3" />}
                    {pump.status === 'Stand-by' && <Activity className="w-3 h-3" />}
                    {pump.status === 'Manutenção' && <Wrench className="w-3 h-3" />}
                    {pump.status}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900">{pump.name}</h3>
                <p className="text-[11px] text-slate-500 mb-2.5">
                  {pump.model} · <span className="text-slate-700 font-medium">{pump.location}</span>
                </p>

                {/* Technical metrics */}
                <div className="grid grid-cols-3 gap-2 p-2.5 bg-slate-50 rounded-xl text-xs mb-2">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Vazão:</span>
                    <span className="font-bold text-[#670099]">{pump.flowRate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Pressão / Altura:</span>
                    <span className="font-bold text-slate-800">{pump.headPressure}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Potência / RPM:</span>
                    <span className="font-semibold text-slate-700">{pump.motorPower} · {pump.rpm}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                  <span>Última revisão: {pump.lastMaintenance}</span>
                  <span className="font-medium text-[#670099]">Próxima: {pump.nextMaintenance}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Add Modal */}
          {isAddModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
              <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl">
                <div className="bg-[#670099] px-4 py-3 text-white flex items-center justify-between">
                  <h2 className="text-sm font-bold">Cadastrar Equipamento</h2>
                  <button 
                    onClick={() => setIsAddModalOpen(false)}
                    className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleAddPump} className="p-4 space-y-3 max-h-[85vh] overflow-y-auto">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">TAG</label>
                      <input
                        type="text"
                        placeholder="BOM-07-DES"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        required
                        className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#670099]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">Categoria</label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value as any)}
                        className="w-full px-2 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#670099]"
                      >
                        <option value="Bombas Gerais">Bombas Gerais</option>
                        <option value="Destilaria">Destilaria</option>
                        <option value="NETZSCH">NETZSCH</option>
                        <option value="Bombas de Vácuo">Bombas de Vácuo</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">Nome do Equipamento</label>
                    <input
                      type="text"
                      placeholder="Ex: Bomba Dosadora Helicoidal"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      required
                      className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#670099]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">Fabricante</label>
                      <input
                        type="text"
                        placeholder="Ex: NETZSCH, KSB, Sulzer"
                        value={newManufacturer}
                        onChange={(e) => {
                          const mfr = e.target.value;
                          setNewManufacturer(mfr);
                          if (!newManufacturerLogo) {
                            setNewManufacturerLogo(findPresetLogo(mfr));
                          }
                        }}
                        className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#670099]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">Modelo</label>
                      <input
                        type="text"
                        placeholder="Ex: NM076BY01L06B"
                        value={newModel}
                        onChange={(e) => setNewModel(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#670099]"
                      />
                    </div>
                  </div>

                  {/* Logo do Fabricante 64x64px */}
                  <ManufacturerLogoUploader
                    value={newManufacturerLogo}
                    onChange={setNewManufacturerLogo}
                    currentManufacturerName={newManufacturer}
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">Vazão Nominal</label>
                      <input
                        type="text"
                        placeholder="Ex: 140 m³/h"
                        value={newFlowRate}
                        onChange={(e) => setNewFlowRate(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#670099]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">Pressão (mca/bar)</label>
                      <input
                        type="text"
                        placeholder="Ex: 48 mca"
                        value={newHeadPressure}
                        onChange={(e) => setNewHeadPressure(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#670099]"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddModalOpen(false)}
                      className="flex-1 py-2 text-xs font-semibold rounded-lg bg-slate-100 text-slate-700"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 text-xs font-semibold rounded-lg bg-[#670099] text-white"
                    >
                      Cadastrar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
