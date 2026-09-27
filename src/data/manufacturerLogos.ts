// Industrial Manufacturer Logos (Transparent SVG Data URLs, formatted for 64x64 container)

export interface PresetManufacturer {
  id: string;
  name: string;
  keywords: string[];
  logoSvgDataUri: string;
}

// Crisp, transparent SVGs with authentic industrial brand marks
export const PRESET_MANUFACTURERS: PresetManufacturer[] = [
  {
    id: 'ksb',
    name: 'KSB Bombas',
    keywords: ['ksb', 'megapro', 'cpk', 'wkl', 'eta'],
    logoSvgDataUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="16" fill="%230b4279" fill-opacity="0.08"/><path d="M22 28h13v20l17-20h17L49 46l21 26H52L35 51v21H22V28z" fill="%23004b91"/><circle cx="78" cy="34" r="5" fill="%23e30613"/><text x="50" y="90" font-family="Arial,sans-serif" font-weight="900" font-size="13" fill="%23004b91" text-anchor="middle" letter-spacing="1">KSB</text></svg>`,
  },
  {
    id: 'sew',
    name: 'SEW-Eurodrive',
    keywords: ['sew', 'eurodrive', 'redutor', 'movitrac', 'rxf'],
    logoSvgDataUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="16" fill="%23e2001a" fill-opacity="0.08"/><path d="M18 36h64v8H18z" fill="%23e2001a"/><path d="M18 56h64v8H18z" fill="%23e2001a"/><path d="M24 40c0-6 4-10 10-10h32c6 0 10 4 10 10v20c0 6-4 10-10 10H34c-6 0-10-4-10-10V40z" fill="none" stroke="%23e2001a" stroke-width="4"/><text x="50" y="55" font-family="Arial,sans-serif" font-weight="900" font-size="18" fill="%231a1a1a" text-anchor="middle" letter-spacing="0.5">SEW</text><text x="50" y="85" font-family="Arial,sans-serif" font-weight="800" font-size="8.5" fill="%23e2001a" text-anchor="middle">EURODRIVE</text></svg>`,
  },
  {
    id: 'imbil',
    name: 'IMBIL Soluções',
    keywords: ['imbil', 'eta', 'bomba'],
    logoSvgDataUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="16" fill="%23006837" fill-opacity="0.08"/><polygon points="20,70 50,22 80,70" fill="none" stroke="%23006837" stroke-width="6" stroke-linejoin="round"/><circle cx="50" cy="52" r="10" fill="%23006837"/><text x="50" y="88" font-family="Arial,sans-serif" font-weight="900" font-size="14" fill="%23006837" text-anchor="middle" letter-spacing="1">IMBIL</text></svg>`,
  },
  {
    id: 'sulzer',
    name: 'Sulzer Pumps',
    keywords: ['sulzer', 'iso-pro', 'bomba'],
    logoSvgDataUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="16" fill="%23005f9e" fill-opacity="0.08"/><path d="M22 34h56v10H38c-3 0-5 2-5 5s2 5 5 5h24c8 0 16 6 16 14s-8 14-16 14H22V72h40c3 0 5-2 5-5s-2-5-5-5H38c-8 0-16-6-16-14s8-14 16-14z" fill="%23005f9e"/><text x="50" y="93" font-family="Arial,sans-serif" font-weight="900" font-size="11" fill="%23005f9e" text-anchor="middle" letter-spacing="1">SULZER</text></svg>`,
  },
  {
    id: 'weg',
    name: 'WEG Equipamentos',
    keywords: ['weg', 'cestari', 'motor', 'redutor'],
    logoSvgDataUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="16" fill="%23005596" fill-opacity="0.08"/><rect x="20" y="28" width="60" height="38" rx="8" fill="%23005596"/><text x="50" y="55" font-family="Impact,Arial Black,sans-serif" font-weight="900" font-size="24" fill="%23ffffff" text-anchor="middle" letter-spacing="1">weg</text><text x="50" y="84" font-family="Arial,sans-serif" font-weight="800" font-size="10" fill="%23005596" text-anchor="middle">BRASIL</text></svg>`,
  },
  {
    id: 'netzsch',
    name: 'NETZSCH do Brasil',
    keywords: ['netzsch', 'nemo', 'helicoidal', 'cavidade'],
    logoSvgDataUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="16" fill="%23008542" fill-opacity="0.08"/><circle cx="50" cy="45" r="24" fill="none" stroke="%23008542" stroke-width="5"/><path d="M38 52l12-14 12 14" fill="none" stroke="%23008542" stroke-width="4" stroke-linecap="round"/><text x="50" y="84" font-family="Arial,sans-serif" font-weight="900" font-size="11" fill="%23008542" text-anchor="middle" letter-spacing="1">NETZSCH</text></svg>`,
  },
  {
    id: 'flender',
    name: 'Flender / Siemens',
    keywords: ['flender', 'siemens', 'redutor', 'b3sh'],
    logoSvgDataUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="16" fill="%2300646e" fill-opacity="0.08"/><g stroke="%2300646e" stroke-width="4" fill="none"><circle cx="50" cy="42" r="18"/><line x1="50" y1="20" x2="50" y2="28"/><line x1="50" y1="56" x2="50" y2="64"/><line x1="28" y1="42" x2="36" y2="42"/><line x1="64" y1="42" x2="72" y2="42"/></g><text x="50" y="84" font-family="Arial,sans-serif" font-weight="900" font-size="11.5" fill="%2300646e" text-anchor="middle" letter-spacing="1">FLENDER</text></svg>`,
  },
  {
    id: 'falk',
    name: 'Falk Rexnord',
    keywords: ['falk', 'rexnord', 'acoplamento', 'steelflex'],
    logoSvgDataUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="16" fill="%232d3748" fill-opacity="0.08"/><path d="M26 30h48v12H40v8h30v11H40v17H26V30z" fill="%23c53030"/><text x="50" y="87" font-family="Arial,sans-serif" font-weight="900" font-size="12" fill="%232d3748" text-anchor="middle" letter-spacing="1.5">FALK</text></svg>`,
  },
  {
    id: 'alfalaval',
    name: 'Alfa Laval',
    keywords: ['alfa', 'laval', 'centrifuga', 'separadora', 'disco'],
    logoSvgDataUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="16" fill="%23002f6c" fill-opacity="0.08"/><circle cx="50" cy="44" r="22" fill="none" stroke="%23002f6c" stroke-width="4.5"/><path d="M38 52l12-16 12 16" fill="none" stroke="%23002f6c" stroke-width="4"/><text x="50" y="84" font-family="Arial,sans-serif" font-weight="900" font-size="9" fill="%23002f6c" text-anchor="middle" letter-spacing="0.8">ALFA LAVAL</text></svg>`,
  },
  {
    id: 'spx',
    name: 'SPX / Marley Tower',
    keywords: ['spx', 'marley', 'torre', 'alpina', 'cooling'],
    logoSvgDataUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="16" fill="%230284c7" fill-opacity="0.08"/><path d="M30 65L40 30h20l10 35H30z" fill="none" stroke="%230284c7" stroke-width="4"/><path d="M42 22c3 3 5 4 8 4s5-1 8-4" stroke="%230284c7" stroke-width="3" fill="none"/><text x="50" y="85" font-family="Arial,sans-serif" font-weight="900" font-size="10.5" fill="%230284c7" text-anchor="middle" letter-spacing="1">SPX COOL</text></svg>`,
  },
  {
    id: 'goodyear',
    name: 'Goodyear / Continental',
    keywords: ['goodyear', 'continental', 'esteira', 'correia', 'sempertrans'],
    logoSvgDataUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="16" fill="%23d97706" fill-opacity="0.08"/><ellipse cx="50" cy="42" rx="30" ry="14" fill="none" stroke="%23d97706" stroke-width="4"/><circle cx="34" cy="42" r="5" fill="%23d97706"/><circle cx="66" cy="42" r="5" fill="%23d97706"/><text x="50" y="82" font-family="Arial,sans-serif" font-weight="900" font-size="9" fill="%23d97706" text-anchor="middle" letter-spacing="1">CONVEYOR</text></svg>`,
  },
  {
    id: 'twincity',
    name: 'Twin City / Chicago Blower',
    keywords: ['twin city', 'chicago', 'exaustor', 'ventilador', 'blower'],
    logoSvgDataUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="16" fill="%234f46e5" fill-opacity="0.08"/><circle cx="50" cy="42" r="20" fill="none" stroke="%234f46e5" stroke-width="4"/><path d="M50 30c0 12 10 12 10 12s-10 0-10 12c0-12-10-12-10-12s10 0 10-12z" fill="%234f46e5"/><text x="50" y="83" font-family="Arial,sans-serif" font-weight="900" font-size="9.5" fill="%234f46e5" text-anchor="middle" letter-spacing="0.8">AIR BLOWER</text></svg>`,
  },
];

// Helper to find a preset logo by manufacturer string
export function findPresetLogo(manufacturerName?: string): string | undefined {
  if (!manufacturerName) return undefined;
  const lower = manufacturerName.toLowerCase();
  const match = PRESET_MANUFACTURERS.find(p => 
    p.name.toLowerCase() === lower || 
    p.keywords.some(k => lower.includes(k))
  );
  return match?.logoSvgDataUri;
}
