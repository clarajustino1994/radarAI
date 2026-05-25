import { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

let serverHandler: any;

async function getServerHandler() {
  if (!serverHandler) {
    try {
      // @ts-ignore - file created during build
      const entry = await import('../dist/server/server.js');
      serverHandler = entry.default || entry;
    } catch (err) {
      console.error('Failed to load server entry:', err);
      throw new Error('Server entry not found. Make sure to run npm run build first.');
    }
  }
  return serverHandler;
}

function getProtocol(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-proto'];
  return forwarded ? (Array.isArray(forwarded) ? forwarded[0] : forwarded) : 'https';
}

function getHost(req: VercelRequest): string {
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  return host ? (Array.isArray(host) ? host[0] : host) : 'localhost';
}

function getMimeType(filePath: string): string {
  const ext = path.extname(filePath);
  const mimes: Record<string, string> = {
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.html': 'text/html',
    '.json': 'application/json',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
  };
  return mimes[ext] || 'application/octet-stream';
}

function serveStatic(filePath: string, res: VercelResponse): boolean {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath);
      res.setHeader('Content-Type', getMimeType(filePath));
      res.setHeader('Cache-Control', 'public, immutable, max-age=31536000');
      res.send(content);
      return true;
    }
  } catch (err) {
    console.error('Static file error:', err);
  }
  return false;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Serve static assets
    if (req.url?.startsWith('/assets/')) {
      const filePath = path.join(__dirname, `../dist/client${req.url}`);
      if (serveStatic(filePath, res)) return;
    }

    // SSR for everything else
    const handler = await getServerHandler();

    const protocol = getProtocol(req);
    const host = getHost(req);
    const url = `${protocol}://${host}${req.url}`;

    const headers: Record<string, string> = {};
    Object.entries(req.headers).forEach(([key, value]: [string, any]) => {
      if (Array.isArray(value)) {
        headers[key] = value[0];
      } else if (value) {
        headers[key] = value;
      }
    });

    let body: BodyInit | undefined;
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      body = req.body ? (typeof req.body === 'string' ? req.body : JSON.stringify(req.body)) : undefined;
    }

    const request = new Request(url, {
      method: req.method,
      headers,
      body,
    });

    const response = await handler.fetch(request, {}, {});

    res.status(response.status);

    response.headers.forEach((value: string, key: string) => {
      res.setHeader(key, value);
    });

    const responseBody = await response.text();
    res.send(responseBody);
  } catch (error) {
    console.error('SSR Error:', error);
    res.status(500).send('Internal Server Error');
  }
}
