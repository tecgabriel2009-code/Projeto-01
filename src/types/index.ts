export interface IndustrialModule {
  id: string;
  title: string;
  badgeDot?: 'circle' | 'gear' | 'zap' | 'flame' | 'shield' | 'none';
  description: string;
  iconName: string;
  accentBadgeColor?: string;
  category: 'core' | 'equipment' | 'auxiliary' | 'inspection';
  countBadge?: number;
  statusSummary?: string;
}

export interface UserProfile {
  name: string;
  role: string;
  department: string;
  status: 'Online' | 'Ocupado' | 'Ausente';
  avatarEmblemText: string;
  shift: string;
  idNumber: string;
}

export interface BaseEquipmentRecord {
  id: string;
  tag: string;
  manufacturer: string;
  manufacturerLogo?: string; // Logo do fabricante (64x64px, data URL ou link)
  model: string;
}

export interface PumpEquipment extends BaseEquipmentRecord {
  name: string;
  category: 'Bombas Gerais' | 'Destilaria' | 'NETZSCH' | 'Bombas de Vácuo';
  flowRate: string; // m³/h
  headPressure: string; // mca ou bar
  motorPower: string; // cv ou kW
  rpm: number;
  status: 'Em Operação' | 'Manutenção' | 'Stand-by' | 'Alerta';
  location: string;
  lastMaintenance: string;
  nextMaintenance: string;
}

export interface CentrifugalPump extends BaseEquipmentRecord {
  // Identificação
  area: string;
  operationalSector: string;
  serialNumber: string;

  // Características da bomba
  rotorDiameter: string; // Ex: 254 mm
  pumpedFluid: string; // Ex: Vinhaça / Mosto / Água
  lubricant: string; // Ex: Óleo ISO VG 68 Mineral / Graxa NLGI 2

  // Componentes mecânicos
  frontBearing: string; // Rolamento dianteiro
  rearBearing: string; // Rolamento traseiro
  thrustBearing: string; // Rolamento axial
  frontSealRing: string; // Retentor dianteiro
  rearSealRing: string; // Retentor traseiro
  mechanicalSeal: string; // Selo mecânico
  packingSeal: string; // Gaxeta
  coupling: string; // Acoplamento

  // Observações Técnicas
  technicalNotes: string;

  // Status e metadados
  status: 'Em Operação' | 'Manutenção' | 'Stand-by';
  updatedAt: string;
}

export interface ReducerEquipment extends BaseEquipmentRecord {
  name: string;
  type: 'Helicoidal' | 'Cônica-Helicoidal' | 'Planetário' | 'Coroa e Sem-Fim';
  ratio: string; // ex: 1:42.5
  inputRpm: number;
  outputRpm: number;
  oilType: string; // ex: ISO VG 220 Sintético
  oilCapacityLiters: number;
  status: 'Em Operação' | 'Manutenção' | 'Stand-by' | 'Alerta';
  bearingTemp: number; // °C
  lastOilChange: string;
  location: string;
}

export interface GenericEquipment extends BaseEquipmentRecord {
  moduleId: string; // 'esteiras' | 'centrifugas-fermento' | 'exaustores' | 'torre-refrigeracao' etc.
  name: string;
  area: string;
  sector: string;
  serialNumber?: string;
  specifications: string;
  status: 'Em Operação' | 'Manutenção' | 'Stand-by' | 'Alerta';
  lastMaintenance: string;
  nextMaintenance: string;
  notes?: string;
}

export interface LabTest {
  id: string;
  toolCode: string;
  toolName: string;
  testType: 'Dureza Rockwell' | 'Estanqueidade Hidráulica' | 'Vibração & Balanceamento' | 'Trifásica & Carga' | 'Dimensional';
  standardSpec: string;
  measuredValue: string;
  result: 'Aprovado' | 'Em Análise' | 'Reprovado';
  testedBy: string;
  date: string;
  notes: string;
}

export interface TechnicalDoc {
  id: string;
  title: string;
  type: 'Catálogo' | 'Ficha Técnica' | 'Manual' | 'Procedimento';
  equipmentType: string;
  fileSize: string;
  updateDate: string;
}
