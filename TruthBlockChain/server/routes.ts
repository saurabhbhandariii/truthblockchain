import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertVideoAnalysisSchema } from "@shared/schema";
import { z } from "zod";
import multer from "multer";

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only video files are allowed'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.status(201).json({ 
        success: true, 
        message: "Thank you for your message! We'll get back to you within 24 hours.",
        id: contact.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Please check your form data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "An error occurred while sending your message. Please try again." 
        });
      }
    }
  });

  // Get all contacts (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to retrieve contacts" 
      });
    }
  });

  // Video upload and analysis
  app.post("/api/video/upload", upload.single('video'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No video file provided"
        });
      }

      // Simulate AI analysis process
      const analysis = await storage.createVideoAnalysis({
        userId: null, // For now, allow anonymous uploads
        fileName: req.file.originalname,
        fileSize: req.file.size,
        analysisStatus: "processing",
        truthScore: null,
        aiConfidence: null,
        deepfakeDetected: false,
        manipulationSources: null,
        blockchainHash: null,
        analysisResults: null,
        completedAt: null
      });

      // Simulate analysis completion after 3 seconds
      setTimeout(async () => {
        const truthScore = Math.floor(Math.random() * 40) + 60; // 60-100%
        const aiConfidence = Math.floor(Math.random() * 20) + 80; // 80-100%
        const deepfakeDetected = truthScore < 75;
        
        const sources = [
          "Original metadata verification",
          "Pixel-level consistency analysis", 
          "Temporal coherence detection",
          "Audio-visual synchronization check",
          "Blockchain timestamp validation"
        ];

        await storage.updateVideoAnalysis(analysis.id, {
          analysisStatus: "completed",
          truthScore,
          aiConfidence,
          deepfakeDetected,
          manipulationSources: deepfakeDetected ? 
            ["Face swapping detection", "Background inconsistency"] : [],
          blockchainHash: `0x${Math.random().toString(16).substr(2, 64)}`,
          analysisResults: {
            technicalDetails: {
              frameRate: "30fps",
              resolution: "1920x1080",
              codec: "H.264",
              bitrate: "5000kbps"
            },
            verificationSources: sources,
            confidenceBreakdown: {
              visualConsistency: truthScore + Math.floor(Math.random() * 10) - 5,
              audioAuthenticity: truthScore + Math.floor(Math.random() * 10) - 5,
              metadataIntegrity: truthScore + Math.floor(Math.random() * 10) - 5,
              blockchainVerification: truthScore + Math.floor(Math.random() * 10) - 5
            }
          },
          completedAt: new Date()
        });
      }, 3000);

      res.json({
        success: true,
        analysisId: analysis.id,
        message: "Video uploaded successfully. Analysis in progress..."
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to process video upload"
      });
    }
  });

  // Get analysis results
  app.get("/api/video/analysis/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const analysis = await storage.getVideoAnalysis(id);
      
      if (!analysis) {
        return res.status(404).json({
          success: false,
          message: "Analysis not found"
        });
      }

      res.json({
        success: true,
        analysis
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve analysis"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
