#!/usr/bin/env node
/**
 * Build the JLR Print Studios site for GitHub Pages.
 *
 * The app is a client-side SPA. GitHub Pages does not support SPA fallback,
 * so after the production build we generate dist/client/index.html and
 * dist/client/404.html. GitHub serves the 404 page for unknown routes and
 * the React Router app takes over.
 *
 * For project sites (https://username.github.io/repo-name/) set the
 * VITE_BASE_PATH env var to "/repo-name/" before running this script so asset
 * paths resolve correctly.
 */
import { mkdir, readdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const distClient = join(root, "dist", "client");
const assetsDir = join(distClient, "assets");

const basePath = process.env.VITE_BASE_PATH || "/";
console.log(`Building for GitHub Pages with base path: ${basePath}`);

execSync("bun run build", { cwd: root, stdio: "inherit" });

await mkdir(distClient, { recursive: true });

const assetFiles = await readdir(assetsDir);
const mainJs = assetFiles.find((f) => /^index-[A-Za-z0-9_-]+\.js$/.test(f));
const stylesCss = assetFiles.find((f) => /^styles-[A-Za-z0-9_-]+\.css$/.test(f));

if (!mainJs) {
  throw new Error("Could not find the main JS entry in dist/client/assets");
}

const scriptPath = `${basePath}assets/${mainJs}`.replace(/\/+/g, "/");
const stylePath = stylesCss ? `${basePath}assets/${stylesCss}`.replace(/\/+/g, "/") : null;

const html = `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>JLR Print Studios | Impresión de fotos y documentos</title>
    <meta name="description" content="JLR Print Studios: impresión profesional de fotos y documentos con pedidos online. Calidad corporativa, precios claros y entrega rápida." />
    <link rel="icon" href="${basePath}favicon.ico" type="image/x-icon" />
    ${stylePath ? `<link rel="stylesheet" href="${stylePath}" />` : ""}
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="${scriptPath}"></script>
  </body>
</html>
`;

await writeFile(join(distClient, "index.html"), html);
await writeFile(join(distClient, "404.html"), html);

console.log("Generated dist/client/index.html");
console.log("Generated dist/client/404.html");
console.log(`Main entry: assets/${mainJs}`);
if (stylesCss) console.log(`Styles: assets/${stylesCss}`);
console.log("Deploy the contents of dist/client to GitHub Pages.");
