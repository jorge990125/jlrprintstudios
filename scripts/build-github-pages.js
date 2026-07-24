#!/usr/bin/env node
/**
 * Build the JLR Print Studios site for GitHub Pages.
 *
 * The app is built normally, then the production server handler is used to
 * prerender each public route into a static HTML file. GitHub Pages does not
 * support SPA fallback, so we also copy index.html to 404.html so unknown
 * routes are handled by the client-side router.
 *
 * For project sites (https://username.github.io/repo-name/) set the
 * VITE_BASE_PATH env var to "/repo-name/" before running this script so asset
 * paths resolve correctly.
 */
import { mkdir, writeFile, copyFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const distClient = join(root, "dist", "client");
const serverPath = join(root, "dist", "server", "index.mjs");

const basePath = process.env.VITE_BASE_PATH || "/";
console.log(`Building for GitHub Pages with base path: ${basePath}`);

execSync("bun run build", { cwd: root, stdio: "inherit" });

await mkdir(distClient, { recursive: true });

const routes = ["/", "/servicios", "/precios", "/pedido", "/contacto"];

const { default: server } = await import(serverPath);
const waitUntil = () => {};

for (const route of routes) {
  const url = `http://localhost${basePath === "/" ? "" : basePath}${route}`;
  const response = await server.fetch(new Request(url), {}, { waitUntil });
  const html = await response.text();

  const filePath =
    route === "/"
      ? join(distClient, "index.html")
      : join(distClient, route, "index.html");

  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, html);
  console.log(`Prerendered ${route} -> ${filePath}`);
}

// SPA fallback for GitHub Pages
await copyFile(join(distClient, "index.html"), join(distClient, "404.html"));
console.log("Copied dist/client/index.html -> dist/client/404.html");
console.log("Deploy the contents of dist/client to GitHub Pages.");
