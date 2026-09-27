import React, { useState } from 'react';
import { industrialModules, currentUser } from './data/initialData';
import { IndustrialModule, UserProfile } from './types';
import { 
  CorosiroEmblem, 
  OperatorMascot, 
  WrenchToolsIcon, 
  LabFlaskIcon, 
  DropletIcon, 
  RoboticArmIcon,
  ConveyorBeltIcon,
  CentrifugeIcon,
  ExhaustFanIcon,
  CoolingTowerIcon,
  BackgroundContours 
} from './components/Icons';
import { TechnicalToolsView } from './components/TechnicalToolsView';
import { LabTestsView } from './components/LabTestsView';
import { PumpsView } from './components/PumpsView';
import { ReducersView } from './components/ReducersView';
import { GenericModuleView } from './components/GenericModuleView';
import { SettingsModal } from './components/SettingsModal';
import { UserProfileModal } from './components/UserProfileModal';
import { 
  Settings, 
  LogOut, 
  Search, 
  Wifi, 
  Battery, 
  Smartphone, 
  Maximize2, 
  SlidersHorizontal,
  ChevronRight,
  Info
} from 'lucide-react';

export default function App() {
  const [user, setUser] = useState<UserProfile>(currentUser);
  const [selectedModule, setSelectedModule] = useState<IndustrialModule | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [deviceMockupMode, setDeviceMockupMode] = useState<boolean>(true);
  const [searchFilter, setSearchFilter] = useState('');
  const [currentTime, setCurrentTime] = useState('16:00');

  // Filter modules
  const filteredModules = industrialModules.filter(m => 
    m.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    m.description.toLowerCase().includes(searchFilter.toLowerCase())
  );

  // Icon renderer matching screenshot icons
  const renderModuleIcon = (iconName: string) => {
    switch (iconName) {
      case 'WrenchTools':
        return <WrenchToolsIcon className="w-8 h-8 text-[#670099]" />;
      case 'LabFlask':
        return <LabFlaskIcon className="w-8 h-8 text-[#670099]" />;
      case 'Droplet':
        return <DropletIcon className="w-8 h-8 text-[#670099]" />;
      case 'RoboticArm':
        return <RoboticArmIcon className="w-8 h-8 text-[#670099]" />;
      case 'ConveyorBelt':
        return <ConveyorBeltIcon className="w-8 h-8 text-[#670099]" />;
      case 'Centrifuge':
        return <CentrifugeIcon className="w-8 h-8 text-[#670099]" />;
      case 'ExhaustFan':
        return <ExhaustFanIcon className="w-8 h-8 text-[#670099]" />;
      case 'CoolingTower':
        return <CoolingTowerIcon className="w-8 h-8 text-[#670099]" />;
      default:
        return <SlidersHorizontal className="w-7 h-7 text-[#670099]" />;
    }
  };

  const handleLogout = () => {
    if (confirm('Deseja realmente encerrar a sessão de ' + user.name + '?')) {
      alert('Sessão encerrada com sucesso.');
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1e24] text-slate-900 flex flex-col items-center justify-start py-0 md:py-6 px-0 md:px-4 font-sans selection:bg-[#670099] selection:text-white">
      
      {/* Top Device Bar for Desktop Users */}
      <header className="hidden md:flex items-center justify-between w-full max-w-md mb-3 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-2xl text-xs text-white/90 border border-white/10 shadow-lg">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#670099] border border-purple-300"></span>
          <span className="font-semibold tracking-wide">Gestão Industrial</span>
          <span className="text-[10px] text-white/50 bg-white/10 px-1.5 py-0.5 rounded">Roxo #670099</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDeviceMockupMode(!deviceMockupMode)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/15 hover:bg-white/25 active:scale-95 transition-all text-[11px] font-medium"
            title="Alternar entre moldura de smartphone e visão tela cheia"
          >
            {deviceMockupMode ? (
              <>
                <Maximize2 className="w-3 h-3 text-purple-300" />
                <span>Expandir</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3 h-3 text-purple-300" />
                <span>Moldura Celular</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Container - Either phone mockup or full width container */}
      <main className={`w-full transition-all duration-300 ${
        deviceMockupMode 
          ? 'max-w-[420px] md:rounded-[44px] md:border-[10px] md:border-[#2d2d38] md:shadow-[0_25px_60px_rgba(0,0,0,0.65)] overflow-hidden' 
          : 'max-w-2xl md:rounded-3xl shadow-2xl overflow-hidden'
      } bg-[#eceef2] flex flex-col min-h-screen md:min-h-[860px] relative`}>

        {/* Dynamic content rendering: Detail View or Main Menu Screen */}
        {selectedModule ? (
          (selectedModule.id === 'ferramenta-tecnica' || selectedModule.id === 'ferramentas-tecnicas') ? (
            <TechnicalToolsView onBack={() => setSelectedModule(null)} />
          ) : (selectedModule.id === 'laboratorio-teste' || selectedModule.id === 'laboratorio-testes') ? (
            <LabTestsView onBack={() => setSelectedModule(null)} />
          ) : selectedModule.id === 'bombas' ? (
            <PumpsView onBack={() => setSelectedModule(null)} />
          ) : selectedModule.id === 'redutores' ? (
            <ReducersView onBack={() => setSelectedModule(null)} />
          ) : (
            <GenericModuleView module={selectedModule} onBack={() => setSelectedModule(null)} />
          )
        ) : (
          <div className="flex flex-col flex-1 relative overflow-y-auto">
            
            {/* Top Phone Status Bar (Exact to the uploaded photo) */}
            <div className="bg-[#670099] text-white px-5 pt-3 pb-1 flex items-center justify-between text-xs font-semibold select-none">
              <span className="tracking-tight text-[13px]">{currentTime}</span>

              {/* Front Camera Hole Punch */}
              <div className="w-4 h-4 rounded-full bg-black/90 border border-purple-900/60 shadow-inner flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1b1c24]/90"></div>
              </div>

              {/* Status Icons */}
              <div className="flex items-center gap-1.5 text-white/95">
                {/* 4-bar signal */}
                <div className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 h-1.5 bg-white rounded-xs"></span>
                  <span className="w-0.5 h-2 bg-white rounded-xs"></span>
                  <span className="w-0.5 h-2.5 bg-white rounded-xs"></span>
                  <span className="w-0.5 h-3 bg-white rounded-xs"></span>
                </div>
                <Wifi className="w-3.5 h-3.5" />
                <div className="w-5 h-2.5 border border-white/90 rounded-xs p-0.5 flex items-center">
                  <div className="w-full h-full bg-white rounded-2xs"></div>
                </div>
              </div>
            </div>

            {/* App Header (Exact to screenshot: "GESTÃO INDUSTRIAL" with Settings and Logout) */}
            <div className="bg-[#670099] text-white px-5 pt-1.5 pb-4 flex items-center justify-between shadow-md select-none sticky top-0 z-20">
              <h1 className="text-xl font-extrabold tracking-wide font-sans text-white drop-shadow-xs">
                GESTÃO INDUSTRIAL
              </h1>

              <div className="flex items-center gap-3">
                {/* Settings Gear Button */}
                <button
                  onClick={() => setIsSettingsOpen(true)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white hover:bg-white/15 active:scale-95 transition-all"
                  aria-label="Configurações"
                  title="Configurações do Sistema"
                >
                  <Settings className="w-5 h-5 text-white" />
                </button>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white hover:bg-white/15 active:scale-95 transition-all"
                  aria-label="Sair"
                  title="Encerrar Sessão"
                >
                  <LogOut className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Scrollable Body Content */}
            <div className="flex-1 px-4 pt-4 pb-8 space-y-4 relative">
              {/* Subtle background contour watermark lines */}
              <BackgroundContours />

              {/* USER IDENTIFICATION CARD (Exact layout from the image) */}
              <div 
                onClick={() => setIsProfileOpen(true)}
                className="bg-white rounded-3xl p-3.5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-slate-100 flex items-center justify-between cursor-pointer hover:shadow-md hover:border-purple-200 transition-all active:scale-[0.99] relative z-10 group"
              >
                <div className="flex items-center gap-3">
                  {/* Corosiro Circular Emblem */}
                  <CorosiroEmblem className="w-14 h-14" />

                  {/* User info */}
                  <div>
                    <h2 className="text-[17px] font-bold text-slate-900 group-hover:text-[#670099] transition-colors leading-tight">
                      {user.name}
                    </h2>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {user.role} <span className="text-slate-400">•</span> {user.department}
                    </p>
                  </div>
                </div>

                {/* Right side: Mascot doll figure + Online pill badge */}
                <div className="flex flex-col items-center gap-1">
                  <div className="text-[#670099] drop-shadow-xs">
                    <OperatorMascot className="w-6 h-6 text-[#670099]" />
                  </div>
                  <span className="bg-[#dcfce7] text-[#15803d] font-bold text-[11px] px-3 py-0.5 rounded-full border border-[#86efac]/40 shadow-2xs">
                    {user.status}
                  </span>
                </div>
              </div>

              {/* Quick Search Bar (Optional filter for fast access) */}
              <div className="relative z-10">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Pesquisar módulo ou equipamento..."
                  className="w-full pl-9.5 pr-4 py-2 text-xs bg-white/90 backdrop-blur-xs border border-slate-200/80 rounded-2xl focus:outline-none focus:border-[#670099] shadow-xs text-slate-800 placeholder-slate-400"
                />
              </div>

              {/* SECTION HEADER: MÓDULOS DE EQUIPAMENTOS */}
              <div className="pt-1 select-none relative z-10">
                <h2 className="text-xs font-bold text-slate-600 tracking-wider uppercase pl-1">
                  MÓDULOS DE EQUIPAMENTOS
                </h2>
              </div>

              {/* VERTICAL MODULE CARDS (Exact match to screenshot) */}
              <div className="space-y-3.5 relative z-10">
                {filteredModules.map((module) => (
                  <div
                    key={module.id}
                    onClick={() => setSelectedModule(module)}
                    className="bg-white rounded-3xl p-4 shadow-[0_4px_14px_rgba(0,0,0,0.05)] border border-slate-100/90 flex items-center gap-3.5 cursor-pointer hover:shadow-md hover:border-purple-200 active:scale-[0.985] transition-all group"
                  >
                    {/* Left Icon Container: Rounded square with light purple bg and #670099 icon */}
                    <div className="w-14 h-14 rounded-2xl bg-[#f0e6f7] flex items-center justify-center text-[#670099] shrink-0 group-hover:bg-[#e9d6f5] transition-colors shadow-2xs">
                      {renderModuleIcon(module.iconName)}
                    </div>

                    {/* Card Content: Title with optional purple bullet, and descriptive subtitle */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        {/* Purple circle bullet for Bombas */}
                        {module.badgeDot === 'circle' && (
                          <span className="w-3.5 h-3.5 rounded-full bg-[#670099] inline-block shrink-0"></span>
                        )}

                        {/* Purple gear bullet for Redutores */}
                        {module.badgeDot === 'gear' && (
                          <span className="text-[#670099] font-bold text-sm inline-block shrink-0">
                            ⚙
                          </span>
                        )}

                        {/* Purple zap bullet for Motores */}
                        {module.badgeDot === 'zap' && (
                          <span className="text-[#670099] font-bold text-sm inline-block shrink-0">
                            ⚡
                          </span>
                        )}

                        {/* Purple flame bullet for Caldeiras */}
                        {module.badgeDot === 'flame' && (
                          <span className="text-[#670099] font-bold text-sm inline-block shrink-0">
                            🔥
                          </span>
                        )}

                        {/* Purple shield bullet for Preditiva */}
                        {module.badgeDot === 'shield' && (
                          <span className="text-[#670099] font-bold text-sm inline-block shrink-0">
                            🛡️
                          </span>
                        )}

                        <h3 className="text-[17px] font-bold text-slate-900 group-hover:text-[#670099] transition-colors leading-tight">
                          {module.title}
                        </h3>
                      </div>

                      <p className="text-xs text-slate-600 leading-snug font-normal line-clamp-2">
                        {module.description}
                      </p>
                    </div>
                  </div>
                ))}

                {filteredModules.length === 0 && (
                  <div className="bg-white rounded-3xl p-6 text-center text-slate-500 shadow-sm border border-slate-200">
                    <p className="text-xs font-medium">Nenhum módulo encontrado com "{searchFilter}".</p>
                    <button
                      onClick={() => setSearchFilter('')}
                      className="mt-2 text-xs font-bold text-[#670099] hover:underline"
                    >
                      Limpar filtro
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Android Navigation Bar at Bottom (Exact replica of bottom phone bar) */}
            <div className="bg-[#eceef2] py-2.5 px-10 flex items-center justify-between text-slate-500 select-none border-t border-slate-200/60 sticky bottom-0 z-20 backdrop-blur-md">
              {/* Square / Recent apps */}
              <button 
                onClick={() => setSelectedModule(null)}
                className="w-7 h-7 rounded-sm flex items-center justify-center hover:bg-slate-300/40 active:scale-90 transition-all text-slate-600"
                title="Aplicativos Recentes"
              >
                <div className="w-3.5 h-3.5 rounded-xs bg-slate-600"></div>
              </button>

              {/* Circle / Home button */}
              <button 
                onClick={() => {
                  setSelectedModule(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-9 h-9 rounded-full border-2 border-slate-600 flex items-center justify-center hover:bg-slate-300/40 active:scale-90 transition-all"
                title="Tela Inicial"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
              </button>

              {/* Triangle / Back button */}
              <button 
                onClick={() => setSelectedModule(null)}
                className="w-7 h-7 flex items-center justify-center hover:bg-slate-300/40 active:scale-90 transition-all text-slate-600"
                title="Voltar"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-slate-600">
                  <path d="M19 19L5 12L19 5V19Z" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Settings Modal */}
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        onLogout={handleLogout} 
      />

      {/* User Profile Modal */}
      <UserProfileModal
        user={user}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onStatusChange={(status) => setUser({ ...user, status })}
      />
    </div>
  );
}
