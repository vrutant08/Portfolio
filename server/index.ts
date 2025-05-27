import express, { type Request, Response, NextFunction } from "express";
import cors from 'cors';
import { config } from 'dotenv';
import { registerRoutes } from "./routes.js";

// Load environment variables
config();

const app = express();
const log = (message: string) => console.log(`[Server] ${message}`);

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? [process.env.CLIENT_URL || 'https://your-frontend-domain.vercel.app']
    : 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      try {
        if (capturedJsonResponse) {
          const jsonStr = JSON.stringify(capturedJsonResponse);
          logLine += ` :: ${jsonStr.length > 50 ? jsonStr.slice(0, 47) + '...' : jsonStr}`;
        }
      } catch (error) {
        logLine += ' :: [Error stringifying response]';
      }
      log(logLine);
    }
  });

  next();
});

// Register routes and initialize the app
const initializeApp = async () => {
  await registerRoutes(app);

  // Error handling middleware
  app.use((err: Error & { status?: number; statusCode?: number }, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
  });
};

// Initialize the app
initializeApp().catch(console.error);

// Export the Express app for Vercel serverless deployment
export default app;
