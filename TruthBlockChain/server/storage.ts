import { 
  contacts, 
  videoAnalysis,
  users,
  type Contact, 
  type InsertContact,
  type VideoAnalysis,
  type InsertVideoAnalysis,
  type User,
  type UpsertUser
} from "@shared/schema";

export interface IStorage {
  // Contact operations
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  
  // User operations (for authentication)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Video analysis operations
  createVideoAnalysis(analysis: InsertVideoAnalysis): Promise<VideoAnalysis>;
  getVideoAnalysis(id: number): Promise<VideoAnalysis | undefined>;
  getUserVideoAnalyses(userId: string): Promise<VideoAnalysis[]>;
  updateVideoAnalysis(id: number, updates: Partial<VideoAnalysis>): Promise<VideoAnalysis | undefined>;
}

export class MemStorage implements IStorage {
  private contacts: Map<number, Contact>;
  private users: Map<string, User>;
  private videoAnalyses: Map<number, VideoAnalysis>;
  private currentContactId: number;
  private currentVideoId: number;

  constructor() {
    this.contacts = new Map();
    this.users = new Map();
    this.videoAnalyses = new Map();
    this.currentContactId = 1;
    this.currentVideoId = 1;
  }

  // Contact operations
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = { 
      ...insertContact,
      company: insertContact.company || null,
      id, 
      createdAt: new Date() 
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const user: User = {
      id: userData.id!,
      email: userData.email || null,
      firstName: userData.firstName || null,
      lastName: userData.lastName || null,
      profileImageUrl: userData.profileImageUrl || null,
      createdAt: userData.createdAt || new Date(),
      updatedAt: new Date(),
    };
    this.users.set(user.id, user);
    return user;
  }

  // Video analysis operations
  async createVideoAnalysis(insertAnalysis: InsertVideoAnalysis): Promise<VideoAnalysis> {
    const id = this.currentVideoId++;
    const analysis: VideoAnalysis = {
      id,
      userId: insertAnalysis.userId || null,
      fileName: insertAnalysis.fileName,
      fileSize: insertAnalysis.fileSize,
      analysisStatus: insertAnalysis.analysisStatus || "processing",
      truthScore: insertAnalysis.truthScore || null,
      aiConfidence: insertAnalysis.aiConfidence || null,
      deepfakeDetected: insertAnalysis.deepfakeDetected || false,
      manipulationSources: insertAnalysis.manipulationSources || null,
      blockchainHash: insertAnalysis.blockchainHash || null,
      analysisResults: insertAnalysis.analysisResults || null,
      createdAt: new Date(),
      completedAt: insertAnalysis.completedAt || null,
    };
    this.videoAnalyses.set(id, analysis);
    return analysis;
  }

  async getVideoAnalysis(id: number): Promise<VideoAnalysis | undefined> {
    return this.videoAnalyses.get(id);
  }

  async getUserVideoAnalyses(userId: string): Promise<VideoAnalysis[]> {
    return Array.from(this.videoAnalyses.values()).filter(
      analysis => analysis.userId === userId
    );
  }

  async updateVideoAnalysis(id: number, updates: Partial<VideoAnalysis>): Promise<VideoAnalysis | undefined> {
    const existing = this.videoAnalyses.get(id);
    if (!existing) return undefined;
    
    const updated: VideoAnalysis = { ...existing, ...updates };
    this.videoAnalyses.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
