import type { VercelRequest, VercelResponse } from "@vercel/node";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

type ServerHandler = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverHandlerPromise: Promise<ServerHandler> | undefined;

const CLIENT_DIR = path.join(process.cwd(), "dist", "client");

const MIME_TYPES: Record<string, string> = {
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".map": "application/json; charset=utf-8",
};

// In production Vercel's CDN serves dist/client (see routes in vercel.json) and
// this never runs. But `vercel dev` ignores outputDirectory for static files, so
// we serve the built client assets directly as a fallback. Returns true if handled.
function tryServeClientAsset(req: VercelRequest, res: VercelResponse): boolean {
  const urlPath = decodeURIComponent((req.url ?? "/").split("?")[0]);
  if (!urlPath.startsWith("/assets/")) return false;

  const filePath = path.join(CLIENT_DIR, urlPath);
  // Prevent path traversal outside the client directory.
  if (!filePath.startsWith(CLIENT_DIR)) return false;
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) return false;

  res.status(200);
  res.setHeader("content-type", MIME_TYPES[path.extname(filePath)] ?? "application/octet-stream");
  res.setHeader("cache-control", "public, max-age=31536000, immutable");
  res.send(fs.readFileSync(filePath));
  return true;
}

// The TanStack Start SSR bundle is emitted to dist/server/server.js and imports
// its own chunks from dist/server/assets/*. The whole dist/server tree is shipped
// with this function via the `includeFiles` glob in vercel.json, so it lives next
// to the deployment root at runtime (process.cwd() === /var/task on Vercel).
function getServerHandler(): Promise<ServerHandler> {
  if (!serverHandlerPromise) {
    const entryPath = path.join(process.cwd(), "dist", "server", "server.js");
    serverHandlerPromise = import(pathToFileURL(entryPath).href)
      .then((mod) => (mod.default ?? mod) as ServerHandler)
      .catch((err) => {
        serverHandlerPromise = undefined;
        console.error("Failed to load SSR bundle:", err);
        throw new Error(
          "SSR bundle not found at dist/server/server.js. Run `npm run build` before deploying.",
        );
      });
  }
  return serverHandlerPromise;
}

function firstHeaderValue(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

function buildRequestUrl(req: VercelRequest): string {
  const proto = firstHeaderValue(req.headers["x-forwarded-proto"]) ?? "https";
  const host =
    firstHeaderValue(req.headers["x-forwarded-host"]) ??
    firstHeaderValue(req.headers.host) ??
    "localhost";
  return `${proto}://${host}${req.url ?? "/"}`;
}

function toRequestHeaders(req: VercelRequest): Headers {
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      for (const v of value) headers.append(key, v);
    } else {
      headers.set(key, value);
    }
  }
  return headers;
}

// Headers that describe the on-the-wire encoding/length of the upstream stream.
// We buffer the body ourselves, so let Vercel recompute these to avoid mismatches.
const STRIPPED_RESPONSE_HEADERS = new Set([
  "content-length",
  "content-encoding",
  "transfer-encoding",
]);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Fallback static serving for `vercel dev` (no-op in production — the CDN
    // serves dist/client before a request ever reaches this function).
    if (tryServeClientAsset(req, res)) return;

    const handlerEntry = await getServerHandler();

    let body: BodyInit | undefined;
    if (
      req.method !== "GET" &&
      req.method !== "HEAD" &&
      req.body !== undefined &&
      req.body !== null
    ) {
      body = typeof req.body === "string" ? req.body : JSON.stringify(req.body);
    }

    const request = new Request(buildRequestUrl(req), {
      method: req.method,
      headers: toRequestHeaders(req),
      body,
    });

    const response = await handlerEntry.fetch(request, {}, {});

    res.status(response.status);
    response.headers.forEach((value, key) => {
      if (!STRIPPED_RESPONSE_HEADERS.has(key.toLowerCase())) {
        res.setHeader(key, value);
      }
    });

    const buffer = Buffer.from(await response.arrayBuffer());
    res.send(buffer);
  } catch (error) {
    console.error("SSR error:", error);
    if (!res.headersSent) {
      res.status(500).setHeader("content-type", "text/plain; charset=utf-8");
    }
    res.end("Internal Server Error");
  }
}
