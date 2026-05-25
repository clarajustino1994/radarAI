import { VercelRequest, VercelResponse } from '@vercel/node';

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
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
