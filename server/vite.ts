import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { type Server } from "http";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  if (process.env.NODE_ENV === 'production') {
    return serveStatic(app);
  }

  try {
    const { createServer } = await import('vite');
    const vite = await createServer({
      root: path.resolve(__dirname, "../client"),
      server: {
        middlewareMode: true,
        hmr: { server },
      },
      appType: 'custom',
      logLevel: 'info'
    });

    app.use(vite.middlewares);
    app.use("*", async (req, res, next) => {
      try {
        const url = req.originalUrl;
        const template = await fs.promises.readFile(
          path.resolve(__dirname, "../client/index.html"),
          "utf-8"
        );
        const html = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(html);
      } catch (e) {
        const error = e as Error;
        console.error(error);
        next(error);
      }
    });
  } catch (e) {
    console.error("Failed to initialize Vite:", e);
    throw e;
  }
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "../client/dist");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the client build directory: ${distPath}. Make sure to build the client first with 'npm run build' in the client directory.`
    );
  }

  app.use(express.static(distPath, {
    index: false,
    immutable: true,
    cacheControl: true,
    maxAge: '30d'
  }));

  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
