import { apiRequest } from "./queryClient";
import type { PlantDisease, Treatment, PreventionMethod, NewsArticle, DiseaseOutbreak } from "@shared/schema";
import type { DiseaseDetectionResult, MapMarker, DiseaseForecast } from "@shared/types";

// Diseases APIs
export const fetchAllDiseases = async (): Promise<PlantDisease[]> => {
  const res = await fetch("/api/diseases", { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch diseases");
  return await res.json();
};

export const fetchDiseaseById = async (id: number): Promise<PlantDisease> => {
  const res = await fetch(`/api/diseases/${id}`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch disease");
  return await res.json();
};

export const fetchDiseasesByCategory = async (category: string): Promise<PlantDisease[]> => {
  const res = await fetch(`/api/diseases/category/${category}`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch diseases by category");
  return await res.json();
};

// Treatments APIs
export const fetchTreatmentsByDiseaseId = async (diseaseId: number): Promise<Treatment[]> => {
  const res = await fetch(`/api/diseases/${diseaseId}/treatments`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch treatments");
  return await res.json();
};

// Prevention methods APIs
export const fetchPreventionsByDiseaseId = async (diseaseId: number): Promise<PreventionMethod[]> => {
  const res = await fetch(`/api/diseases/${diseaseId}/prevention`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch prevention methods");
  return await res.json();
};

// Rename this for consistency with component imports
export const fetchPreventionMethodsByDiseaseId = fetchPreventionsByDiseaseId;

// Outbreaks APIs
export const fetchAllOutbreaks = async (): Promise<DiseaseOutbreak[]> => {
  const res = await fetch("/api/outbreaks", { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch outbreaks");
  return await res.json();
};

// News APIs
export const fetchLatestNews = async (limit: number = 3): Promise<NewsArticle[]> => {
  const res = await fetch(`/api/news?limit=${limit}`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch news");
  return await res.json();
};

// Map APIs
export const fetchMapMarkers = async (): Promise<MapMarker[]> => {
  const res = await fetch("/api/map/markers", { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch map markers");
  return await res.json();
};

// Forecast APIs
export const fetchForecasts = async (): Promise<DiseaseForecast[]> => {
  const res = await fetch("/api/forecasts", { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch forecasts");
  return await res.json();
};

// Disease detection API
export const detectDisease = async (imageBase64: string): Promise<DiseaseDetectionResult> => {
  const res = await apiRequest("POST", "/api/detect", { image: imageBase64 });
  return await res.json();
};
