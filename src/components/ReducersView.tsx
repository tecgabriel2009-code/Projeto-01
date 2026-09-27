import React, { useState } from 'react';
import { sampleReducers } from '../data/initialData';
import { ReducerEquipment } from '../types';
import { ManufacturerLogo } from './ManufacturerLogo';
import { ManufacturerLogoUploader } from './ManufacturerLogoUploader';
import { findPresetLogo } from '../data/manufacturerLogos';
import { ArrowLeft, Plus, Search, Cog, Thermometer, ShieldCheck, Wrench, CheckCircle, X } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export function ReducersView({ onBack }: Props) {
  const [reducers, setReducers] = useState<ReducerEquipment[]>(sampleReducers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('Todos');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form states
  const [newTag, setNewTag] = useState('');
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState<ReducerEquipment['type']>('Helicoidal');
  const [newManufacturer, setNewManufacturer] = useState('SEW-Eurodrive');
  const [newManufacturerLogo, setNewManufacturerLogo] = useState<string | undefined>(findPresetLogo('SEW-Eurodrive'));
  const [newRatio, setNewRatio] = useState('1:45.0');
  const [newOilType, setNewOilType] = useState('ISO VG 220 Sintético');

  const types = ['Todos', 'Helicoidal', 'Cônica-Helicoidal', 'Planetário', 'Coroa e Sem-Fim'];

  const filtered = reducers.filter(r => {
    const matchesType = selectedType === 'Todos' || r.type === selectedType;
    const matchesSearch = 
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.manufacturer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleAddReducer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTag || !newName) return;

    const newRed: ReducerEquipment = {
      id: `red-${Date.now()}`,
      tag: newTag.toUpperCase(),
      name: newName,
      type: newType,
      manufacturer: newManufacturer,
      manufacturerLogo: newManufacturerLogo || findPresetLogo(newManufacturer),
      model: 'Modelo Redutor Industrial',
      ratio: newRatio,
      inputRpm: 1750,
      outputRpm: Math.round(1750 / (parseFloat(newRatio.split(':')[1]) || 40)),
      oilType: newOilType,
      oilCapacityLiters: 18.0,
      status: 'Em Operação',
      bearingTemp: 55,
      lastOilChange: 'Hoje',
      location: 'Linha Geral de Acionamentos',
    };

    setReducers([newRed, ...reducers]);
    setIsAddModalOpen(false);
    setNewTag('');
    setNewName('');
    setNewManufacturerLogo(findPresetLogo('SEW-Eurodrive'));
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
            <div className="flex items-center gap-1.5">
              <Cog className="w-4 h-4 text-purple-200" />
              <h1 className="text-base font-bold tracking-tight">Redutores & Eixos</h1>
            </div>
            <p className="text-[11px] text-purple-200">Engrenagens, Relações e Lubrificação</p>
          </div>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-2.5 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 active:scale-95 text-xs font-semibold text-white flex items-center gap-1.5 transition-all shadow-xs"
        >
          <Plus className="w-4 h-4" />
          Cadastrar
        </button>
      </div>

      {/* Type filter */}
      <div className="px-4 pt-3 pb-1 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedType(t)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedType === t
                ? 'bg-[#670099] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            {t}
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
            placeholder="Filtrar redutor, fabricante ou setor..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#670099] shadow-xs"
          />
        </div>
      </div>

      {/* List of Reducers */}
      <div className="px-4 space-y-3">
        {filtered.map((red) => (
          <div key={red.id} className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2.5">
                <ManufacturerLogo 
                  logo={red.manufacturerLogo} 
                  manufacturer={red.manufacturer} 
                  size={64} 
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#670099]/10 text-[#670099]">
                      {red.tag}
                    </span>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {red.type}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-700 block mt-1">
                    {red.manufacturer}
                  </span>
                </div>
              </div>

              <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                red.status === 'Em Operação' ? 'bg-emerald-100 text-emerald-800' :
                red.status === 'Stand-by' ? 'bg-blue-100 text-blue-800' :
                'bg-amber-100 text-amber-800'
              }`}>
                {red.status === 'Em Operação' ? <CheckCircle className="w-3 h-3" /> : <Wrench className="w-3 h-3" />}
                {red.status}
              </span>
            </div>

            <h3 className="text-sm font-bold text-slate-900">{red.name}</h3>
            <p className="text-[11px] text-slate-500 mb-2">
              {red.model} · <span className="text-slate-700 font-medium">{red.location}</span>
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 p-2.5 bg-slate-50 rounded-xl text-xs mb-2">
              <div>
                <span className="text-[10px] text-slate-500 block">Relação (i):</span>
                <span className="font-bold text-[#670099]">{red.ratio}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Saída RPM:</span>
                <span className="font-bold text-slate-800">{red.outputRpm} rpm</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Temp. Mancal:</span>
                <span className={`font-bold flex items-center gap-1 ${
                  red.bearingTemp > 75 ? 'text-rose-600' : 'text-emerald-700'
                }`}>
                  <Thermometer className="w-3 h-3" />
                  {red.bearingTemp}°C
                </span>
              </div>
            </div>

            {/* Oil spec */}
            <div className="bg-purple-50/50 rounded-lg p-2 text-[11px] border border-purple-100/80 mb-2">
              <span className="text-slate-500 block text-[10px]">Especificação de Lubrificante:</span>
              <span className="font-semibold text-slate-800">{red.oilType} · ({red.oilCapacityLiters} Litros)</span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
              <span>Última troca de óleo: {red.lastOilChange}</span>
              <button 
                onClick={() => alert(`Histórico de vibração e análises do redutor ${red.tag} atualizado.`)}
                className="text-[#670099] font-semibold hover:underline"
              >
                Ver Histórico
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl">
            <div className="bg-[#670099] px-4 py-3 text-white flex items-center justify-between">
              <h2 className="text-sm font-bold">Cadastrar Redutor</h2>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddReducer} className="p-4 space-y-3 max-h-[85vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">TAG</label>
                  <input
                    type="text"
                    placeholder="RED-105-EST"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    required
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#670099]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">Tipo de Engrenagem</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full px-2 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#670099]"
                  >
                    <option value="Helicoidal">Helicoidal</option>
                    <option value="Cônica-Helicoidal">Cônica-Helicoidal</option>
                    <option value="Planetário">Planetário</option>
                    <option value="Coroa e Sem-Fim">Coroa e Sem-Fim</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Nome do Equipamento</label>
                <input
                  type="text"
                  placeholder="Ex: Redutor da Rosca Transportadora"
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
                    placeholder="SEW-Eurodrive"
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
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">Relação de Redução (i)</label>
                  <input
                    type="text"
                    placeholder="Ex: 1:52.4"
                    value={newRatio}
                    onChange={(e) => setNewRatio(e.target.value)}
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

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Óleo Recomendado</label>
                <input
                  type="text"
                  placeholder="Ex: ISO VG 220 Sintético"
                  value={newOilType}
                  onChange={(e) => setNewOilType(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#670099]"
                />
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
                  Cadastrar Redutor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
