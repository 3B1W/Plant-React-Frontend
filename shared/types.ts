// These types represent more complex data structures or responses

export interface DiseaseDetectionResult {
  detected: boolean;
  diseaseName: string;
  confidence: number;
  diseaseId?: number;
}

export interface DiseaseForecast {
  diseaseName: string;
  riskLevel: 'Low' | 'Moderate' | 'High';
  riskPercentage: number;
}

export interface MapMarker {
  id: number;
  lat: number;
  lng: number;
  diseaseId: number;
  diseaseName: string;
  severity: string;
  reportCount: number;
  region: string;
}

export interface DiseaseCategory {
  id: string;
  name: string;
}

export interface ResourceLink {
  title: string;
  description: string;
  icon: string;
  url: string;
}

export enum DiseaseType {
  FUNGAL = 'Fungal',
  BACTERIAL = 'Bacterial',
  VIRAL = 'Viral',
  PEST = 'Pest Damage',
  NUTRITIONAL = 'Nutritional',
  OTHER = 'Other'
}

export enum DiseaseSeverity {
  LOW = 'Low',
  MODERATE = 'Moderate',
  HIGH = 'High',
  SEVERE = 'Severe'
}

export enum TreatmentType {
  ORGANIC = 'Organic',
  CHEMICAL = 'Chemical',
  BIOLOGICAL = 'Biological',
  MECHANICAL = 'Mechanical'
}

export enum PlantCategory {
  ALL = 'All',
  VEGETABLES = 'Vegetables',
  FRUITS = 'Fruits',
  ORNAMENTALS = 'Ornamentals',
  HOUSEPLANTS = 'Houseplants'
}
