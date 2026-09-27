import React from 'react';
import { UserProfile } from '../types';
import { CorosiroEmblem, OperatorMascot } from './Icons';
import { X, ShieldCheck, Clock, Award, Briefcase, CheckCircle, Radio } from 'lucide-react';

interface Props {
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (status: UserProfile['status']) => void;
}

export function UserProfileModal({ user, isOpen, onClose, onStatusChange }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#670099] px-5 pt-6 pb-5 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/20 active:bg-white/30 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-20 h-20 mx-auto bg-white rounded-full p-1 shadow-lg mb-2 flex items-center justify-center">
            <CorosiroEmblem className="w-16 h-16" />
          </div>

          <h2 className="text-lg font-extrabold tracking-tight">{user.name}</h2>
          <p className="text-xs text-purple-200 font-medium">
            {user.role} • {user.department}
          </p>

          <div className="inline-flex items-center gap-1.5 mt-2.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-200 text-xs font-bold border border-emerald-400/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Status: {user.status}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3.5 text-xs max-h-[70vh] overflow-y-auto">
          {/* Status selector */}
          <div>
            <label className="font-bold text-slate-800 block mb-1.5">Alterar Disponibilidade</label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['Online', 'Ocupado', 'Ausente'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => onStatusChange(st)}
                  className={`py-2 px-1 text-center rounded-xl font-bold transition-all text-[11px] ${
                    user.status === st
                      ? 'bg-[#670099] text-white shadow-xs'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Identification Info */}
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-[#670099]" />
                Matrícula:
              </span>
              <span className="font-mono font-bold text-slate-800">{user.idNumber}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#670099]" />
                Escala Ativa:
              </span>
              <span className="font-semibold text-slate-800">{user.shift}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-[#670099]" />
                Planta / Unidade:
              </span>
              <span className="font-semibold text-slate-800">Unidade Fabril Corosiro</span>
            </div>
          </div>

          {/* Active safety certifications */}
          <div>
            <label className="font-bold text-slate-800 block mb-1.5">Habilitações & Normas Regulamentadoras</label>
            <div className="space-y-1.5">
              {[
                { code: 'NR-12', name: 'Segurança em Máquinas e Equipamentos', valid: 'Válido até 2027' },
                { code: 'NR-13', name: 'Caldeiras, Vasos de Pressão e Tubulações', valid: 'Válido até 2027' },
                { code: 'NR-10', name: 'Segurança em Instalações Elétricas', valid: 'Válido até 2027' },
                { code: 'NR-35', name: 'Trabalho em Altura Industrial', valid: 'Válido até 2026' },
              ].map((nr) => (
                <div key={nr.code} className="p-2 rounded-xl bg-purple-50/40 border border-purple-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-[#670099] text-white font-mono font-bold text-[10px]">
                      {nr.code}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-800">{nr.name}</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-bold shrink-0">{nr.valid}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-[#670099] text-white font-bold text-xs shadow-md active:scale-98 transition-transform"
          >
            Concluir
          </button>
        </div>
      </div>
    </div>
  );
}
