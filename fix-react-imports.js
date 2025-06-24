const fs = require("fs");
const path = require("path");

const reactImportPattern = /^import\s+\*\s+as\s+React\s+from\s+["']react["'];?\s*$/gm;
const fileExtensions = [".tsx", ".ts"];

function collectFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap(entry => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return collectFiles(fullPath);
    if (entry.isFile() && fileExtensions.includes(path.extname(fullPath))) return [fullPath];
    return [];
  });
}

function transform(content) {
  if (!content.includes("import * as React from")) return null;
  let modified = content.replace(reactImportPattern, "");

  const needs = [];

  if (/React\.forwardRef\b/.test(modified)) needs.push("forwardRef");
  if (/React\.useRef\b/.test(modified)) needs.push("useRef");
  if (/React\.useEffect\b/.test(modified)) needs.push("useEffect");
  if (/React\.useState\b/.test(modified)) needs.push("useState");
  if (/React\.Fragment\b/.test(modified)) needs.push("Fragment");
  if (/React\.ElementRef\b/.test(modified)) needs.push("ElementRef");
  if (/React\.ComponentPropsWithoutRef\b/.test(modified)) needs.push("ComponentPropsWithoutRef");
  if (/React\.ReactElement\b/.test(modified)) needs.push("ReactElement");

  // Replace React.X usage with direct references
  modified = modified
    .replace(/\bReact\.forwardRef\b/g, "forwardRef")
    .replace(/\bReact\.useRef\b/g, "useRef")
    .replace(/\bReact\.useEffect\b/g, "useEffect")
    .replace(/\bReact\.useState\b/g, "useState")
    .replace(/\bReact\.Fragment\b/g, "Fragment")
    .replace(/\bReact\.ElementRef\b/g, "ElementRef")
    .replace(/\bReact\.ComponentPropsWithoutRef\b/g, "ComponentPropsWithoutRef")
    .replace(/\bReact\.ReactElement\b/g, "ReactElement");

  const importLine = needs.length
    ? `import { ${[...new Set(needs)].join(", ")} } from "react";\n`
    : "";

  return importLine + modified;
}

function fixAll() {
  const files = collectFiles(path.join(__dirname, "src"));
  let count = 0;
  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    const result = transform(content);
    if (result && result !== content) {
      fs.writeFileSync(file, result, "utf8");
      console.log(`✅ Updated: ${file}`);
      count++;
    }
  }
  console.log(`\n🎉 Done! ${count} files updated.`);
}

fixAll();
