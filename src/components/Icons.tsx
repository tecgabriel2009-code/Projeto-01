import React from 'react';

// Exact Corosiro circular logo from the screenshot
export function CorosiroEmblem({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none">
        {/* Outer subtle ring */}
        <circle cx="50" cy="50" r="48" stroke="#670099" strokeWidth="2.5" strokeOpacity="0.25" fill="#ffffff" />
        <circle cx="50" cy="50" r="44" stroke="#670099" strokeWidth="2" strokeOpacity="0.85" />
        
        {/* Gear teeth ring */}
        <g stroke="#670099" strokeWidth="1.5" strokeLinecap="round">
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="50"
              y1="8"
              x2="50"
              y2="12"
              transform={`rotate(${deg} 50 50)`}
            />
          ))}
        </g>

        {/* Central emblem: Stylized bull/ram with industrial gear */}
        <path
          d="M32 36C32 30 38 24 50 24C62 24 68 30 68 36C68 44 60 52 50 56C40 52 32 44 32 36Z"
          fill="#670099"
          fillOpacity="0.12"
        />
        
        {/* Stylized Horns / Gear Silhouette */}
        <path
          d="M26 34C28 26 36 22 42 26C38 28 36 32 36 38C32 38 28 37 26 34Z"
          fill="#670099"
        />
        <path
          d="M74 34C72 26 64 22 58 26C62 28 64 32 64 38C68 38 72 37 74 34Z"
          fill="#670099"
        />

        {/* Monogram / Center Ram Face */}
        <path
          d="M40 38C40 32 44 28 50 28C56 28 60 32 60 38C60 46 52 52 50 53C48 52 40 46 40 38Z"
          fill="#670099"
        />
        <circle cx="46" cy="36" r="1.8" fill="#ffffff" />
        <circle cx="54" cy="36" r="1.8" fill="#ffffff" />

        {/* Inner lower gear segment */}
        <path
          d="M38 58C42 61 46 62 50 62C54 62 58 61 62 58"
          stroke="#670099"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Banner with text "COROSIRO" */}
        <rect x="20" y="69" width="60" height="15" rx="3" fill="#ffffff" stroke="#670099" strokeWidth="1" />
        <text
          x="50"
          y="80"
          textAnchor="middle"
          fontSize="8.5"
          fontWeight="800"
          letterSpacing="0.8"
          fill="#670099"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          COROSIRO
        </text>
      </svg>
    </div>
  );
}

// Stylized mascot doll figure seen on top right of the user card
export function OperatorMascot({ className = "w-6 h-6 text-[#670099]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      {/* Head */}
      <circle cx="12" cy="5" r="3" />
      {/* Arms raised happily */}
      <path d="M4 11C6 8 8 9 12 11C16 9 18 8 20 11" />
      {/* Body & legs */}
      <path d="M12 11V16" />
      <path d="M9 21L12 16L15 21" />
    </svg>
  );
}

// Crossed wrench and screwdriver for "Ferramentas Técnicas"
export function WrenchToolsIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      {/* Wrench */}
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      {/* Screwdriver crossed */}
      <path d="M19 19L11 11" />
      <path d="M5 21L3 19" />
    </svg>
  );
}

// Test tube / Erlenmeyer flask with wrench for "Laboratório / Testes"
export function LabFlaskIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      {/* Test tube on left */}
      <path d="M6 3H10" />
      <path d="M8 3V17C8 19.2 9.8 21 12 21C14.2 21 16 19.2 16 17V3" />
      {/* Liquid level */}
      <path d="M8 12C9 13 11 13 12 12C13 11 15 11 16 12" strokeWidth="1.8" />
      {/* Letter 'E' or markings inside */}
      <path d="M10 7H13" strokeWidth="1.5" />
      <path d="M10 9H12" strokeWidth="1.5" />
      <path d="M10 15H14" strokeWidth="1.5" />
      {/* Small wrench accent on the right */}
      <path d="M17 7L21 11L19 13L15 9" strokeWidth="2" fill="currentColor" fillOpacity="0.2" />
    </svg>
  );
}

// Droplet icon for "Bombas"
export function DropletIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  );
}

// Industrial robotic arm / mechanical actuator for "Redutores"
export function RoboticArmIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      {/* Base */}
      <path d="M4 20H12" />
      <path d="M6 20V16H10V20" fill="currentColor" fillOpacity="0.2" />
      {/* Arm lower link */}
      <path d="M8 16L12 10" />
      <circle cx="8" cy="16" r="2" fill="currentColor" />
      <circle cx="12" cy="10" r="2" fill="currentColor" />
      {/* Arm upper link */}
      <path d="M12 10L17 7" />
      {/* Gripper / end effector */}
      <circle cx="17" cy="7" r="1.5" fill="currentColor" />
      <path d="M17 5C19 5 21 6 21 7C21 8 19 9 17 9" />
      <path d="M21 5V9" strokeWidth="2" />
    </svg>
  );
}

// Conveyor belt icon for "Esteiras"
export function ConveyorBeltIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      {/* Belt loop */}
      <rect x="2" y="7" width="20" height="10" rx="5" />
      {/* Roller wheels */}
      <circle cx="7" cy="12" r="2.5" fill="currentColor" />
      <circle cx="17" cy="12" r="2.5" fill="currentColor" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
    </svg>
  );
}

// Centrifuge / Disc separator for "Centrífugas de Fermento"
export function CentrifugeIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      {/* Outer bowl conic chamber */}
      <path d="M5 6H19L16 17H8L5 6Z" fill="currentColor" fillOpacity="0.1" />
      <path d="M4 6H20" strokeWidth="2.4" />
      <path d="M5 6L8 17H16L19 6" strokeWidth="2.2" />
      {/* Rotor shaft */}
      <line x1="12" y1="3" x2="12" y2="19" strokeWidth="2" />
      {/* Centrifugal disc plates stack */}
      <path d="M8 10L12 12L16 10" strokeWidth="1.8" />
      <path d="M8.5 13L12 15L15.5 13" strokeWidth="1.8" />
      {/* Bottom collection outlet */}
      <path d="M10 17V21H14V17" strokeWidth="2" />
    </svg>
  );
}

// Industrial Exhaust Fan / Blower for "Exaustores"
export function ExhaustFanIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      {/* Fan outer circular housing */}
      <circle cx="12" cy="12" r="9" strokeWidth="2" />
      {/* Central hub */}
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      {/* Impeller blades */}
      <path d="M12 9.5C12 5.5 15 5 15 5C15 8 13.5 9.5 12 9.5Z" fill="currentColor" fillOpacity="0.3" />
      <path d="M14.5 12C18.5 12 19 15 19 15C16 15 14.5 13.5 14.5 12Z" fill="currentColor" fillOpacity="0.3" />
      <path d="M12 14.5C12 18.5 9 19 9 19C9 16 10.5 14.5 12 14.5Z" fill="currentColor" fillOpacity="0.3" />
      <path d="M9.5 12C5.5 12 5 9 5 9C8 9 9.5 10.5 9.5 12Z" fill="currentColor" fillOpacity="0.3" />
    </svg>
  );
}

// Cooling Tower / Heat Exchanger for "Torre de refrigeração"
export function CoolingTowerIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      {/* Hyperbolic cooling tower profile */}
      <path d="M6 21H18L16.5 12C16.2 10 16 7 17 4H7C8 7 7.8 10 7.5 12L6 21Z" fill="currentColor" fillOpacity="0.1" />
      <path d="M7 4H17" strokeWidth="2" />
      <path d="M5 21H19" strokeWidth="2.4" />
      <path d="M7 4C7.8 7 7.8 10 7.5 12L6 21" strokeWidth="2.2" />
      <path d="M17 4C16.2 7 16.2 10 16.5 12L18 21" strokeWidth="2.2" />
      {/* Water vapor plumes / droplets */}
      <path d="M10 2C10 3 11 3.5 11 4" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 1.5C14 2.8 13.2 3.2 13 4" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// Background contour topographic lines
export function BackgroundContours() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 select-none">
      <svg className="w-full h-full" viewBox="0 0 400 800" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M-50 120C80 90 180 220 320 180C420 150 450 210 480 250" stroke="#670099" strokeWidth="1" strokeDasharray="3 3" opacity="0.35" />
        <path d="M-80 300C40 280 140 400 280 360C400 320 460 420 500 450" stroke="#670099" strokeWidth="1.2" opacity="0.25" />
        <path d="M-20 540C120 510 210 650 350 610C440 580 470 660 520 700" stroke="#670099" strokeWidth="1" opacity="0.25" />
        <path d="M-60 720C70 680 180 820 310 770C430 730 480 810 520 850" stroke="#670099" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.3" />
        <circle cx="350" cy="120" r="120" stroke="#670099" strokeWidth="0.8" opacity="0.15" />
        <circle cx="50" cy="460" r="160" stroke="#670099" strokeWidth="0.8" opacity="0.15" />
      </svg>
    </div>
  );
}
