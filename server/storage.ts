import {
  users, type User, type InsertUser,
  plantDiseases, type PlantDisease, type InsertPlantDisease,
  diseaseOutbreaks, type DiseaseOutbreak, type InsertDiseaseOutbreak,
  treatments, type Treatment, type InsertTreatment,
  preventionMethods, type PreventionMethod, type InsertPreventionMethod,
  newsArticles, type NewsArticle, type InsertNewsArticle
} from "@shared/schema";
import { DiseaseDetectionResult, DiseaseForecast, MapMarker } from "@shared/types";

// Full storage interface with all CRUD operations needed
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Plant Disease methods
  getAllDiseases(): Promise<PlantDisease[]>;
  getDiseaseById(id: number): Promise<PlantDisease | undefined>;
  getDiseasesByCategory(category: string): Promise<PlantDisease[]>;
  createDisease(disease: InsertPlantDisease): Promise<PlantDisease>;

  // Disease Outbreak methods
  getAllOutbreaks(): Promise<DiseaseOutbreak[]>;
  getOutbreaksByRegion(region: string): Promise<DiseaseOutbreak[]>;
  createOutbreak(outbreak: InsertDiseaseOutbreak): Promise<DiseaseOutbreak>;

  // Treatment methods
  getTreatmentsByDiseaseId(diseaseId: number): Promise<Treatment[]>;
  createTreatment(treatment: InsertTreatment): Promise<Treatment>;

  // Prevention methods
  getPreventionsByDiseaseId(diseaseId: number): Promise<PreventionMethod[]>;
  createPreventionMethod(method: InsertPreventionMethod): Promise<PreventionMethod>;

  // News Article methods
  getAllNewsArticles(): Promise<NewsArticle[]>;
  getLatestNewsArticles(limit: number): Promise<NewsArticle[]>;
  createNewsArticle(article: InsertNewsArticle): Promise<NewsArticle>;

  // Mock disease detection method
  detectDisease(imageBase64: string): Promise<DiseaseDetectionResult>;

  // Get disease forecasts
  getDiseaseForecasts(): Promise<DiseaseForecast[]>;

  // Get map markers
  getMapMarkers(): Promise<MapMarker[]>;
}

// Implementation with in-memory storage
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private diseases: Map<number, PlantDisease>;
  private outbreaks: Map<number, DiseaseOutbreak>;
  private treatments: Map<number, Treatment>;
  private preventions: Map<number, PreventionMethod>;
  private news: Map<number, NewsArticle>;
  
  private userId: number;
  private diseaseId: number;
  private outbreakId: number;
  private treatmentId: number;
  private preventionId: number;
  private newsId: number;

  constructor() {
    this.users = new Map();
    this.diseases = new Map();
    this.outbreaks = new Map();
    this.treatments = new Map();
    this.preventions = new Map();
    this.news = new Map();
    
    this.userId = 1;
    this.diseaseId = 1;
    this.outbreakId = 1;
    this.treatmentId = 1;
    this.preventionId = 1;
    this.newsId = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Plant Disease methods
  async getAllDiseases(): Promise<PlantDisease[]> {
    return Array.from(this.diseases.values());
  }

  async getDiseaseById(id: number): Promise<PlantDisease | undefined> {
    return this.diseases.get(id);
  }

  async getDiseasesByCategory(category: string): Promise<PlantDisease[]> {
    if (category === 'All') {
      return Array.from(this.diseases.values());
    }
    
    return Array.from(this.diseases.values()).filter(disease => 
      disease.affectedPlants.some(plant => plant.includes(category))
    );
  }

  async createDisease(disease: InsertPlantDisease): Promise<PlantDisease> {
    const id = this.diseaseId++;
    const newDisease: PlantDisease = { ...disease, id };
    this.diseases.set(id, newDisease);
    return newDisease;
  }

  // Disease Outbreak methods
  async getAllOutbreaks(): Promise<DiseaseOutbreak[]> {
    return Array.from(this.outbreaks.values());
  }

  async getOutbreaksByRegion(region: string): Promise<DiseaseOutbreak[]> {
    return Array.from(this.outbreaks.values()).filter(
      outbreak => outbreak.region === region
    );
  }

  async createOutbreak(outbreak: InsertDiseaseOutbreak): Promise<DiseaseOutbreak> {
    const id = this.outbreakId++;
    const newOutbreak: DiseaseOutbreak = { ...outbreak, id };
    this.outbreaks.set(id, newOutbreak);
    return newOutbreak;
  }

  // Treatment methods
  async getTreatmentsByDiseaseId(diseaseId: number): Promise<Treatment[]> {
    return Array.from(this.treatments.values()).filter(
      treatment => treatment.diseaseId === diseaseId
    );
  }

  async createTreatment(treatment: InsertTreatment): Promise<Treatment> {
    const id = this.treatmentId++;
    const newTreatment: Treatment = { ...treatment, id };
    this.treatments.set(id, newTreatment);
    return newTreatment;
  }

  // Prevention methods
  async getPreventionsByDiseaseId(diseaseId: number): Promise<PreventionMethod[]> {
    return Array.from(this.preventions.values()).filter(
      prevention => prevention.diseaseId === diseaseId
    );
  }

  async createPreventionMethod(method: InsertPreventionMethod): Promise<PreventionMethod> {
    const id = this.preventionId++;
    const newMethod: PreventionMethod = { ...method, id };
    this.preventions.set(id, newMethod);
    return newMethod;
  }

  // News Article methods
  async getAllNewsArticles(): Promise<NewsArticle[]> {
    return Array.from(this.news.values());
  }

  async getLatestNewsArticles(limit: number): Promise<NewsArticle[]> {
    return Array.from(this.news.values())
      .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
      .slice(0, limit);
  }

  async createNewsArticle(article: InsertNewsArticle): Promise<NewsArticle> {
    const id = this.newsId++;
    const newArticle: NewsArticle = { ...article, id };
    this.news.set(id, newArticle);
    return newArticle;
  }

  // Mock disease detection method
  async detectDisease(imageBase64: string): Promise<DiseaseDetectionResult> {
    // This simulates AI detection - in a real app this would call ML model
    const diseases = Array.from(this.diseases.values());
    const randomIndex = Math.floor(Math.random() * diseases.length);
    const disease = diseases[randomIndex];
    
    return {
      detected: true,
      diseaseName: disease.name,
      confidence: Math.floor(Math.random() * 30) + 70, // Random 70-99%
      diseaseId: disease.id
    };
  }

  // Get disease forecasts
  async getDiseaseForecasts(): Promise<DiseaseForecast[]> {
    const diseases = Array.from(this.diseases.values()).slice(0, 3);
    
    return diseases.map((disease, index) => {
      let riskLevel: 'Low' | 'Moderate' | 'High';
      let riskPercentage: number;
      
      if (index === 0) {
        riskLevel = 'High';
        riskPercentage = 85;
      } else if (index === 1) {
        riskLevel = 'Moderate';
        riskPercentage = 60;
      } else {
        riskLevel = 'Low';
        riskPercentage = 25;
      }
      
      return {
        diseaseName: disease.name,
        riskLevel,
        riskPercentage
      };
    });
  }

  // Get map markers
  async getMapMarkers(): Promise<MapMarker[]> {
    const outbreaks = Array.from(this.outbreaks.values());
    
    return outbreaks.map(outbreak => {
      const disease = this.diseases.get(outbreak.diseaseId);
      
      return {
        id: outbreak.id,
        lat: parseFloat(outbreak.latitude),
        lng: parseFloat(outbreak.longitude),
        diseaseId: outbreak.diseaseId,
        diseaseName: disease?.name || 'Unknown Disease',
        severity: disease?.severity || 'Unknown',
        reportCount: outbreak.reportCount,
        region: outbreak.region
      };
    });
  }

  // Initialize with sample data for the application
  private initializeSampleData() {
    // Add sample plant diseases
    const powderyMildew: InsertPlantDisease = {
      name: "Powdery Mildew",
      type: "Fungal",
      severity: "Moderate",
      description: "A fungal disease that affects a wide range of plants including vegetables, ornamentals, and fruits.",
      symptoms: "White powdery spots that eventually spread to cover the leaf surface. Severely infected leaves may turn yellow and drop.",
      images: ["https://images.unsplash.com/photo-1523348837708-15d4a09cfac2"],
      affectedPlants: ["Cucumbers", "Squash", "Roses", "Grapes", "Apples", "Melons", "Zinnias"]
    };
    
    const blackSpot: InsertPlantDisease = {
      name: "Black Spot",
      type: "Fungal",
      severity: "Moderate",
      description: "A common fungal disease that primarily affects roses and other ornamentals.",
      symptoms: "Circular black spots with fringed margins forming on upper leaf surfaces. Infected leaves may yellow and drop prematurely.",
      images: ["https://images.unsplash.com/photo-1598512219780-fe7116237768"],
      affectedPlants: ["Roses", "Other ornamentals"]
    };
    
    const lateBlight: InsertPlantDisease = {
      name: "Late Blight",
      type: "Fungal",
      severity: "Severe",
      description: "A serious fungal disease that can destroy entire crops rapidly, especially in wet conditions.",
      symptoms: "Water-soaked spots on leaves that quickly turn brown. White mold may appear under moist conditions. Can destroy plants rapidly.",
      images: ["https://images.unsplash.com/photo-1624768911018-9cafe157053e"],
      affectedPlants: ["Tomatoes", "Potatoes"]
    };
    
    const powderyMildewDisease = this.createDisease(powderyMildew);
    const blackSpotDisease = this.createDisease(blackSpot);
    const lateBlightDisease = this.createDisease(lateBlight);

    // Add sample disease outbreaks
    const lateBlightOutbreak: InsertDiseaseOutbreak = {
      diseaseId: 3, // Late Blight
      region: "Northeast Region",
      latitude: "42.36",
      longitude: "-71.05",
      detectedDate: new Date("2023-05-28T00:00:00Z"),
      reportCount: 15,
      status: "active"
    };
    
    const powderyMildewOutbreak: InsertDiseaseOutbreak = {
      diseaseId: 1, // Powdery Mildew
      region: "Western Region",
      latitude: "37.77",
      longitude: "-122.41",
      detectedDate: new Date("2023-06-05T00:00:00Z"),
      reportCount: 8,
      status: "active"
    };
    
    const blackSpotOutbreak: InsertDiseaseOutbreak = {
      diseaseId: 2, // Black Spot
      region: "Southern Region",
      latitude: "29.76",
      longitude: "-95.36",
      detectedDate: new Date("2023-06-01T00:00:00Z"),
      reportCount: 12,
      status: "active"
    };
    
    this.createOutbreak(lateBlightOutbreak);
    this.createOutbreak(powderyMildewOutbreak);
    this.createOutbreak(blackSpotOutbreak);

    // Add treatments for Powdery Mildew
    const organicTreatment: InsertTreatment = {
      diseaseId: 1,
      name: "Baking Soda Solution",
      type: "Organic",
      description: "An effective organic solution for controlling powdery mildew",
      instructions: "Mix 1 tablespoon baking soda with 1 gallon of water and a few drops of liquid soap. Spray on affected plants weekly."
    };
    
    const milkTreatment: InsertTreatment = {
      diseaseId: 1,
      name: "Milk Spray",
      type: "Organic",
      description: "Milk contains compounds that can help fight powdery mildew",
      instructions: "Diluted milk spray (1 part milk to 9 parts water) applied weekly."
    };
    
    const neemTreatment: InsertTreatment = {
      diseaseId: 1,
      name: "Neem Oil",
      type: "Organic",
      description: "A natural fungicide and insecticide",
      instructions: "Neem oil solution following product instructions."
    };
    
    const chemicalTreatment: InsertTreatment = {
      diseaseId: 1,
      name: "Sulfur-based Fungicide",
      type: "Chemical",
      description: "Chemical fungicide effective against powdery mildew",
      instructions: "Apply sulfur-based fungicide as directed on product labels, typically at first sign of disease."
    };
    
    this.createTreatment(organicTreatment);
    this.createTreatment(milkTreatment);
    this.createTreatment(neemTreatment);
    this.createTreatment(chemicalTreatment);

    // Add prevention methods for Powdery Mildew
    const preventionMethods = [
      {
        diseaseId: 1,
        name: "Improve Air Circulation",
        description: "Space plants properly and prune to increase airflow around leaves and stems.",
        icon: "wind"
      },
      {
        diseaseId: 1,
        name: "Avoid Overhead Watering",
        description: "Water at the base of plants early in the day to minimize leaf wetness.",
        icon: "tint-slash"
      },
      {
        diseaseId: 1,
        name: "Sunlight Exposure",
        description: "Plant in areas with adequate sunlight as shade can promote fungal growth.",
        icon: "sun"
      },
      {
        diseaseId: 1,
        name: "Resistant Varieties",
        description: "Choose plant varieties that have been bred for resistance to powdery mildew.",
        icon: "seedling"
      },
      {
        diseaseId: 1,
        name: "Sanitation",
        description: "Remove and destroy infected plant parts. Don't compost infected material.",
        icon: "broom"
      },
      {
        diseaseId: 1,
        name: "Preventative Spraying",
        description: "Apply preventative treatments before disease appears in susceptible plants.",
        icon: "calendar-alt"
      }
    ];
    
    preventionMethods.forEach(method => this.createPreventionMethod(method));

    // Add news articles
    const newsArticles: InsertNewsArticle[] = [
      {
        title: "Breakthrough in Fighting Tomato Blight",
        description: "Scientists have discovered a new organic compound that effectively prevents tomato blight without harmful chemicals...",
        content: "Scientists at the University of Agriculture have discovered a new organic compound derived from plant extracts that has shown remarkable efficacy in preventing tomato blight. In field trials, plants treated with the compound showed 90% less infection compared to untreated plants, even under high-pressure disease conditions.\n\nThe compound, named 'NaturalShield-TB', works by strengthening the plant's natural immune responses rather than directly attacking the pathogen. This approach is considered more sustainable as it reduces the likelihood of pathogen resistance developing over time.\n\n'This is a game-changer for organic tomato growers,' says Dr. Elena Martinez, lead researcher on the project. 'The compound is completely non-toxic to beneficial insects, leaves no harmful residues, and can be produced at scale from renewable plant sources.'",
        image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc",
        category: "New Research",
        publishedDate: new Date("2023-06-15T00:00:00Z")
      },
      {
        title: "New Citrus Disease Spreading in Western Regions",
        description: "Agricultural authorities are warning about a new citrus disease that has been detected in several western states...",
        content: "Agricultural authorities are issuing an urgent alert about a new citrus disease that has been detected in several western states. The disease, identified as Citrus Chlorotic Mottle Virus (CCMV), causes yellowing of leaves, stunted growth, and eventually leads to severely reduced fruit production.\n\nFirst detected in California last month, the disease has now been confirmed in orchards across three additional states. Early reports suggest it is spread primarily by the Asian citrus psyllid, an insect that has become increasingly common in the region.\n\n'We're asking all citrus growers and even homeowners with citrus trees to inspect their plants regularly,' says Mark Johnson, spokesperson for the Regional Agricultural Authority. 'Early detection is crucial for containing this outbreak. If you see symptoms, please report them immediately to your local agricultural extension office.'",
        image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2",
        category: "Alert",
        publishedDate: new Date("2023-06-10T00:00:00Z")
      },
      {
        title: "5 Common Garden Diseases and How to Prevent Them",
        description: "Learn how to identify and prevent the most common plant diseases that can devastate your garden this season...",
        content: "As the growing season gets into full swing, gardeners should be on the lookout for common plant diseases that can quickly spread and damage plants. Here are five of the most common garden diseases and proven prevention strategies:\n\n1. Powdery Mildew: This fungal disease appears as white powdery spots on leaves. Prevent it by ensuring good air circulation, avoiding overhead watering, and applying preventative treatments like diluted milk spray.\n\n2. Black Spot: Common on roses, this fungus creates black spots with yellowing around them. Remove infected leaves, ensure proper spacing, and consider resistant varieties.\n\n3. Late Blight: This devastating disease affects tomatoes and potatoes. Prevent by using certified disease-free seed potatoes and tomato plants, practicing crop rotation, and keeping foliage dry.\n\n4. Downy Mildew: Often confused with powdery mildew, it appears as yellow spots on upper leaf surfaces with gray fuzz underneath. Good air circulation and morning watering help prevent it.\n\n5. Bacterial Leaf Spot: Causing water-soaked spots that turn brown with yellow halos. Avoid working with wet plants and disinfect garden tools regularly to prevent spread.",
        image: "https://images.unsplash.com/photo-1598512199776-e0aa5163481a",
        category: "Tips",
        publishedDate: new Date("2023-06-05T00:00:00Z")
      }
    ];
    
    newsArticles.forEach(article => this.createNewsArticle(article));
  }
}

export const storage = new MemStorage();
