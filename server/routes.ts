import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage.js";
import path from "path";
import fs from "fs";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint for the contact form
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      
      // Validate required fields
      if (!name || !email || !message) {
        return res.status(400).json({ 
          message: 'Please fill in all required fields' 
        });
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ 
          message: 'Please provide a valid email address' 
        });
      }
      
      // In a real implementation, you'd save the contact form data or
      // send an email using a service like Nodemailer
      // For now, we'll just return a success response
      
      return res.status(200).json({ 
        message: 'Message received! Thank you for reaching out.'
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      return res.status(500).json({ 
        message: 'An error occurred while processing your request.'
      });
    }
  });

  // Create and return the HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
