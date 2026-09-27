import React, { useState } from 'react';
import { X, Settings, Bell, Palette, Globe, Shield, LogOut, Check, Download, FileArchive } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export function SettingsModal({ isOpen, onClose, onLogout }: Props) {
  const [vibrationAlerts, setVibrationAlerts] = useState(true);
  const [temperatureAlerts, setTemperatureAlerts] = useState(true);
  const [pressureAlerts, setPressureAlerts] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activeShift, setActiveShift] = useState('Turno A (06:00 - 14:00)');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#670099] px-4 py-3.5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-purple-200" />
            <h2 className="text-sm font-bold tracking-tight">Configurações do Sistema</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 active:bg-white/30 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
          {/* Brand & Palette */}
          <div className="p-3 bg-purple-50/60 rounded-2xl border border-purple-100">
            <div className="flex items-center gap-2 mb-2">
              <Palette className="w-4 h-4 text-[#670099]" />
              <span className="font-bold text-slate-900">Identidade Visual Oficial</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-600 mb-1">
              <span className="w-4 h-4 rounded-full bg-[#670099] border-2 border-white shadow-xs inline-block"></span>
              <span className="font-mono font-bold text-[#670099]">#670099</span>
              <span>(RGB 103, 0, 153)</span>
            </div>
            <p className="text-[10px] text-slate-500">
              Padrão corporativo fixado para cabeçalhos, destaques e cartões industriais.
            </p>
          </div>

          {/* Shift selector */}
          <div>
            <label className="font-bold text-slate-800 block mb-1.5">Turno Operacional</label>
            <div className="space-y-1.5">
              {[
                'Turno A (06:00 - 14:00)',
                'Turno B (14:00 - 22:00)',
                'Turno C (22:00 - 06:00)',
              ].map((shift) => (
                <button
                  key={shift}
                  onClick={() => setActiveShift(shift)}
                  className={`w-full px-3 py-2 rounded-xl text-left font-medium transition-all flex items-center justify-between ${
                    activeShift === shift
                      ? 'bg-[#670099] text-white shadow-xs font-semibold'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                  }`}
                >
                  <span>{shift}</span>
                  {activeShift === shift && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>

          {/* Telemetry Alerts */}
          <div>
            <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-2">
              <Bell className="w-4 h-4 text-[#670099]" />
              <span>Alarmes Críticos de Telemetria</span>
            </div>
            <div className="space-y-2 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-slate-700">Vibração excessiva em mancais</span>
                <input
                  type="checkbox"
                  checked={vibrationAlerts}
                  onChange={(e) => setVibrationAlerts(e.target.checked)}
                  className="accent-[#670099] w-4 h-4 rounded"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-slate-700">Temperatura de óleo &gt; 80°C</span>
                <input
                  type="checkbox"
                  checked={temperatureAlerts}
                  onChange={(e) => setTemperatureAlerts(e.target.checked)}
                  className="accent-[#670099] w-4 h-4 rounded"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-slate-700">Queda de pressão na rede (&lt; 6 bar)</span>
                <input
                  type="checkbox"
                  checked={pressureAlerts}
                  onChange={(e) => setPressureAlerts(e.target.checked)}
                  className="accent-[#670099] w-4 h-4 rounded"
                />
              </label>
            </div>
          </div>

          {/* App Info */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/70 text-[11px] text-slate-500 space-y-1">
            <div className="flex justify-between">
              <span>Versão do Aplicativo:</span>
              <span className="font-mono font-semibold text-slate-700">v3.4.1-IND</span>
            </div>
            <div className="flex justify-between">
              <span>Sincronização Planta:</span>
              <span className="text-emerald-700 font-semibold">Online (Tempo Real)</span>
            </div>
          </div>

          {/* Export Project .ZIP */}
          <div className="p-3 bg-purple-50/70 rounded-2xl border border-purple-200/80">
            <div className="flex items-center gap-2 mb-1.5">
              <FileArchive className="w-4 h-4 text-[#670099]" />
              <span className="font-bold text-slate-900">Exportar Projeto (.ZIP)</span>
            </div>
            <p className="text-[10px] text-slate-600 mb-2.5">
              Baixe o pacote compilado e código-fonte completo com o Catálogo ARCA × SABÓ e banco de dados.
            </p>
            <a
              href="/gestao-industrial-arca-sabo.zip"
              download="gestao-industrial-arca-sabo.zip"
              className="w-full py-2 px-3 rounded-xl bg-[#670099] hover:bg-[#52007a] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar Arquivo .ZIP (262 KB)</span>
            </a>
          </div>

          {/* Logout button */}
          <button
            onClick={() => {
              onClose();
              onLogout();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold flex items-center justify-center gap-2 border border-rose-200 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Encerrar Sessão do Operador
          </button>
        </div>
      </div>
    </div>
  );
}
