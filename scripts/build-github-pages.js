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
import { mkdir, writeFile, copyFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

async function exists(p) {
  try { await access(p); return true; } catch { return false; }
}

// Nitro output location varies by version of @lovable.dev/vite-tanstack-config:
// older builds emit to dist/{client,server}, newer builds emit to .output/{public,server}.
const candidates = [
  { outputDir: join(root, ".output", "public"), serverPath: join(root, ".output", "server", "index.mjs") },
  { outputDir: join(root, "dist", "client"),    serverPath: join(root, "dist", "server", "index.mjs") },
];

const basePath = process.env.VITE_BASE_PATH || "/";
console.log(`Building for GitHub Pages with base path: ${basePath}`);

execSync("bun run build", { cwd: root, stdio: "inherit" });

let outputDir;
let serverPath;
for (const c of candidates) {
  if (await exists(c.serverPath)) {
    outputDir = c.outputDir;
    serverPath = c.serverPath;
    break;
  }
}
if (!serverPath) {
  console.error("Could not locate Nitro server output. Checked:", candidates);
  process.exit(1);
}
console.log(`Using server bundle: ${serverPath}`);
console.log(`Writing static site to: ${outputDir}`);
await mkdir(outputDir, { recursive: true });

const routes = ["/", "/servicios", "/precios", "/pedido", "/contacto"];

const { default: server } = await import(serverPath);
const waitUntil = () => {};

for (const route of routes) {
  const url = `http://localhost${basePath === "/" ? "" : basePath}${route}`;
  const response = await server.fetch(new Request(url), {}, { waitUntil });
  const html = await response.text();

  const filePath =
    route === "/"
      ? join(outputDir, "index.html")
      : join(outputDir, route, "index.html");

  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, html);
  console.log(`Prerendered ${route} -> ${filePath}`);
}

// SPA fallback for GitHub Pages
await copyFile(join(outputDir, "index.html"), join(outputDir, "404.html"));
console.log(`Copied ${outputDir}/index.html -> ${outputDir}/404.html`);

// Mirror the output to a stable ./site directory so CI/deploy configs don't
// need to know whether the underlying build wrote to dist/ or .output/.
const siteDir = join(root, "site");
await mkdir(siteDir, { recursive: true });
execSync(`cp -R "${outputDir}/." "${siteDir}/"`, { stdio: "inherit" });
console.log(`Mirrored ${outputDir} -> ${siteDir}`);
console.log("Deploy the contents of ./site to GitHub Pages.");
