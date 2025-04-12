import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertPlantDiseaseSchema, insertDiseaseOutbreakSchema } from "@shared/schema";

const imageUploadSchema = z.object({
  image: z.string()
});

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes, all prefixed with /api
  
  // Get all diseases
  app.get("/api/diseases", async (req: Request, res: Response) => {
    const diseases = await storage.getAllDiseases();
    res.json(diseases);
  });
  
  // Get disease by id
  app.get("/api/diseases/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid disease ID" });
    }
    
    const disease = await storage.getDiseaseById(id);
    if (!disease) {
      return res.status(404).json({ message: "Disease not found" });
    }
    
    res.json(disease);
  });
  
  // Get diseases by category
  app.get("/api/diseases/category/:category", async (req: Request, res: Response) => {
    const category = req.params.category;
    const diseases = await storage.getDiseasesByCategory(category);
    res.json(diseases);
  });
  
  // Get treatments for a disease
  app.get("/api/diseases/:id/treatments", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid disease ID" });
    }
    
    const treatments = await storage.getTreatmentsByDiseaseId(id);
    res.json(treatments);
  });
  
  // Get prevention methods for a disease
  app.get("/api/diseases/:id/prevention", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid disease ID" });
    }
    
    const preventionMethods = await storage.getPreventionsByDiseaseId(id);
    res.json(preventionMethods);
  });
  
  // Get all disease outbreaks for map
  app.get("/api/outbreaks", async (req: Request, res: Response) => {
    const outbreaks = await storage.getAllOutbreaks();
    res.json(outbreaks);
  });
  
  // Get map markers
  app.get("/api/map/markers", async (req: Request, res: Response) => {
    const markers = await storage.getMapMarkers();
    res.json(markers);
  });
  
  // Get disease forecasts
  app.get("/api/forecasts", async (req: Request, res: Response) => {
    const forecasts = await storage.getDiseaseForecasts();
    res.json(forecasts);
  });
  
  // Get latest news articles
  app.get("/api/news", async (req: Request, res: Response) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 3;
    const news = await storage.getLatestNewsArticles(limit);
    res.json(news);
  });
  
  // Detect plant disease from uploaded image
  app.post("/api/detect", async (req: Request, res: Response) => {
    try {
      const { image } = imageUploadSchema.parse(req.body);
      const result = await storage.detectDisease(image);
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid image data", errors: error.errors });
      }
      
      res.status(500).json({ message: "Error processing image" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
