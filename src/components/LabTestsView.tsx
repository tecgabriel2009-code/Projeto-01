import React, { useState } from 'react';
import { sampleLabTests } from '../data/initialData';
import { LabTest } from '../types';
import { ArrowLeft, Plus, CheckCircle2, Clock, XCircle, ShieldCheck, Microscope, Filter, X } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export function LabTestsView({ onBack }: Props) {
  const [tests, setTests] = useState<LabTest[]>(sampleLabTests);
  const [filterResult, setFilterResult] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New test form state
  const [newToolCode, setNewToolCode] = useState('');
  const [newToolName, setNewToolName] = useState('');
  const [newTestType, setNewTestType] = useState<LabTest['testType']>('Dureza Rockwell');
  const [newStandardSpec, setNewStandardSpec] = useState('');
  const [newMeasuredValue, setNewMeasuredValue] = useState('');
  const [newResult, setNewResult] = useState<LabTest['result']>('Aprovado');
  const [newNotes, setNewNotes] = useState('');

  const filteredTests = tests.filter(t => {
    if (filterResult === 'all') return true;
    return t.result === filterResult;
  });

  const handleCreateTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newToolCode || !newToolName) return;

    const newTest: LabTest = {
      id: `tst-${Date.now()}`,
      toolCode: newToolCode,
      toolName: newToolName,
      testType: newTestType,
      standardSpec: newStandardSpec || 'Conforme especificação interna',
      measuredValue: newMeasuredValue || 'Validado em bancada',
      result: newResult,
      testedBy: 'Operador / Lab Testes',
      date: 'Hoje',
      notes: newNotes || 'Ensaio executado conforme procedimento de pré-produção.',
    };

    setTests([newTest, ...tests]);
    setIsAddModalOpen(false);
    // Reset form
    setNewToolCode('');
    setNewToolName('');
    setNewStandardSpec('');
    setNewMeasuredValue('');
    setNewNotes('');
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
            <h1 className="text-base font-bold tracking-tight">Laboratório / Testes</h1>
            <p className="text-[11px] text-purple-200">Validação e Ensaio de Pré-Produção</p>
          </div>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-2.5 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 active:scale-95 text-xs font-semibold text-white flex items-center gap-1.5 transition-all shadow-xs"
        >
          <Plus className="w-4 h-4" />
          Novo Ensaio
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="px-4 pt-3 pb-1 grid grid-cols-3 gap-2">
        <div className="bg-white rounded-xl p-2.5 border border-slate-200 shadow-xs text-center">
          <span className="text-[10px] text-slate-500 font-semibold uppercase block">Total</span>
          <span className="text-base font-extrabold text-slate-900">{tests.length}</span>
        </div>
        <div className="bg-emerald-50 rounded-xl p-2.5 border border-emerald-100 shadow-xs text-center">
          <span className="text-[10px] text-emerald-700 font-semibold uppercase block">Aprovados</span>
          <span className="text-base font-extrabold text-emerald-800">
            {tests.filter(t => t.result === 'Aprovado').length}
          </span>
        </div>
        <div className="bg-amber-50 rounded-xl p-2.5 border border-amber-100 shadow-xs text-center">
          <span className="text-[10px] text-amber-700 font-semibold uppercase block">Em Análise</span>
          <span className="text-base font-extrabold text-amber-800">
            {tests.filter(t => t.result === 'Em Análise').length}
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-4 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {['all', 'Aprovado', 'Em Análise', 'Reprovado'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterResult(status)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              filterResult === status
                ? 'bg-[#670099] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            {status === 'all' ? 'Todos os Ensaios' : status}
          </button>
        ))}
      </div>

      {/* List of tests */}
      <div className="px-4 space-y-3">
        {filteredTests.map((test) => (
          <div key={test.id} className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#670099]/10 text-[#670099]">
                  {test.toolCode}
                </span>
                <span className="text-[11px] font-medium text-slate-500">
                  {test.testType}
                </span>
              </div>
              <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                test.result === 'Aprovado' ? 'bg-emerald-100 text-emerald-800' :
                test.result === 'Em Análise' ? 'bg-amber-100 text-amber-800' :
                'bg-rose-100 text-rose-800'
              }`}>
                {test.result === 'Aprovado' && <CheckCircle2 className="w-3 h-3" />}
                {test.result === 'Em Análise' && <Clock className="w-3 h-3" />}
                {test.result === 'Reprovado' && <XCircle className="w-3 h-3" />}
                {test.result}
              </span>
            </div>

            <h3 className="text-sm font-bold text-slate-900 mb-1">{test.toolName}</h3>

            <div className="grid grid-cols-2 gap-2 my-2.5 p-2.5 bg-slate-50 rounded-xl text-xs">
              <div>
                <span className="text-[10px] text-slate-500 block">Especificação Alvo:</span>
                <span className="font-semibold text-slate-700">{test.standardSpec}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Valor Medido:</span>
                <span className="font-bold text-[#670099]">{test.measuredValue}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
              <span>{test.testedBy}</span>
              <span>Data: {test.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* New Test Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl">
            <div className="bg-[#670099] px-4 py-3 text-white flex items-center justify-between">
              <h2 className="text-sm font-bold">Novo Registro de Ensaio</h2>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTest} className="p-4 space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Código da Ferramenta</label>
                <input
                  type="text"
                  placeholder="Ex: FER-COR-092"
                  value={newToolCode}
                  onChange={(e) => setNewToolCode(e.target.value)}
                  required
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#670099]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Nome / Descrição da Ferramenta</label>
                <input
                  type="text"
                  placeholder="Ex: Rotor de Turbina ou Inserto Metal Duro"
                  value={newToolName}
                  onChange={(e) => setNewToolName(e.target.value)}
                  required
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#670099]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">Tipo de Teste</label>
                  <select
                    value={newTestType}
                    onChange={(e) => setNewTestType(e.target.value as any)}
                    className="w-full px-2 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#670099]"
                  >
                    <option value="Dureza Rockwell">Dureza Rockwell</option>
                    <option value="Estanqueidade Hidráulica">Estanqueidade</option>
                    <option value="Vibração & Balanceamento">Vibração</option>
                    <option value="Trifásica & Carga">Carga / Elétrico</option>
                    <option value="Dimensional">Dimensional</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">Resultado</label>
                  <select
                    value={newResult}
                    onChange={(e) => setNewResult(e.target.value as any)}
                    className="w-full px-2 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#670099]"
                  >
                    <option value="Aprovado">Aprovado</option>
                    <option value="Em Análise">Em Análise</option>
                    <option value="Reprovado">Reprovado</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Valor Medido</label>
                <input
                  type="text"
                  placeholder="Ex: 62.5 HRC ou 0.95 mm/s"
                  value={newMeasuredValue}
                  onChange={(e) => setNewMeasuredValue(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#670099]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Observações do Ensaio</label>
                <textarea
                  rows={2}
                  placeholder="Notas sobre bancada de ensaios..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
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
                  Salvar Ensaio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
