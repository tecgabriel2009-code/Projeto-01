import React from 'react';

interface Props {
  logo?: string;
  manufacturer?: string;
  className?: string;
  size?: number; // default 64
}

/**
 * Standard Manufacturer Logo Component (64 × 64 px, object-contain, transparent)
 * Rule 9: If no logo is registered, returns null to avoid awkward empty layout gaps.
 */
export function ManufacturerLogo({
  logo,
  manufacturer = 'Fabricante',
  className = '',
  size = 64,
}: Props) {
  if (!logo) {
    return null;
  }

  return (
    <div
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`shrink-0 flex items-center justify-center rounded-xl bg-slate-50/70 border border-slate-200/60 p-1 shadow-2xs overflow-hidden ${className}`}
      title={`Fabricante: ${manufacturer}`}
    >
      <img
        src={logo}
        alt={`Logo ${manufacturer}`}
        className="w-full h-full object-contain pointer-events-none select-none"
        loading="lazy"
      />
    </div>
  );
}
