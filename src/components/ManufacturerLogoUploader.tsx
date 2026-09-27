import React, { useRef } from 'react';
import { PRESET_MANUFACTURERS } from '../data/manufacturerLogos';
import { Upload, X, Image as ImageIcon, Sparkles } from 'lucide-react';

interface Props {
  value?: string;
  onChange: (logoDataUrl: string | undefined) => void;
  currentManufacturerName?: string;
}

export function ManufacturerLogoUploader({
  value,
  onChange,
  currentManufacturerName,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle image file upload (PNG transparent, JPG, SVG, WebP)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione um arquivo de imagem válido (PNG, SVG, JPG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onChange(result);
      }
    };
    reader.readAsDataURL(file);

    // Reset input so same file can be re-selected if needed
    e.target.value = '';
  };

  return (
    <div className="space-y-2 bg-slate-50/80 p-3 rounded-2xl border border-slate-200">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-[#670099]" />
          <span>Logo do Fabricante</span>
        </label>
        {value && (
          <button
            type="button"
            onClick={() => onChange(undefined)}
            className="text-[10px] font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            Remover Logo
          </button>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* 64 × 64 px Preview Frame */}
        <div
          className="w-16 h-16 min-w-[64px] min-h-[64px] rounded-xl border-2 border-dashed border-purple-200 bg-white flex items-center justify-center p-1 shadow-2xs overflow-hidden relative group"
        >
          {value ? (
            <img
              src={value}
              alt="Logo do Fabricante"
              className="w-full h-full object-contain pointer-events-none"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400 text-center p-1">
              <ImageIcon className="w-5 h-5 text-slate-300 mb-0.5" />
              <span className="text-[8px] leading-tight text-slate-400">64×64</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex-1 space-y-1.5">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-xl bg-[#670099] hover:bg-[#52007a] text-white text-[11px] font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{value ? 'Substituir Imagem' : 'Enviar Imagem'}</span>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/svg+xml,image/webp"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <p className="text-[10px] text-slate-500 leading-tight">
            Padronizada para 64×64 px. Mantém a proporção e preserva fundo transparente.
          </p>
        </div>
      </div>

      {/* Quick Presets of Industrial Manufacturer Logos */}
      <div className="pt-2 border-t border-slate-200/80">
        <span className="text-[10px] text-slate-500 font-semibold block mb-1.5 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#670099]" />
          Logos de Fabricantes Industriais Prontos:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {PRESET_MANUFACTURERS.map((preset) => {
            const isSelected = value === preset.logoSvgDataUri;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => onChange(preset.logoSvgDataUri)}
                className={`px-2 py-1 rounded-lg text-[10px] font-semibold border transition-all flex items-center gap-1 ${
                  isSelected
                    ? 'bg-[#670099] text-white border-[#670099] shadow-2xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-purple-300 hover:bg-purple-50/50'
                }`}
              >
                <div className="w-3.5 h-3.5 shrink-0 overflow-hidden">
                  <img
                    src={preset.logoSvgDataUri}
                    alt={preset.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span>{preset.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
