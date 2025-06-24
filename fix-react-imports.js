const fs = require("fs");
const path = require("path");

const targetDir = path.join(__dirname, "src", "components", "ui");

const reactImportRegex = /^import\s+((\*\s+as\s+)?React|\{.*?\})\s+from\s+['"]react['"];?\s*$/gm;

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  // Find all react imports
  const matches = [...content.matchAll(reactImportRegex)];

  if (matches.length === 0) return;

  // Remove all React imports at top
  content = content.replace(reactImportRegex, "");

  // Collect which named imports were used
  const namedUsage = [];
  if (content.includes("forwardRef")) namedUsage.push("forwardRef");
  if (content.includes("useState")) namedUsage.push("useState");
  if (content.includes("useEffect")) namedUsage.push("useEffect");
  if (content.includes("createContext")) namedUsage.push("createContext");
  if (content.includes("useRef")) namedUsage.push("useRef");
  if (content.includes("Fragment")) namedUsage.push("Fragment");
  if (content.match(/ElementRef\b/)) namedUsage.push("ElementRef");
  if (content.match(/ComponentPropsWithoutRef\b/)) namedUsage.push("ComponentPropsWithoutRef");
  if (content.match(/HTMLAttributes\b/)) namedUsage.push("HTMLAttributes");

  if (namedUsage.length > 0) {
    const importLine = `import { ${namedUsage.sort().join(", ")} } from "react";\n`;
    content = importLine + content.trimStart();
  }

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`✅ Cleaned: ${path.relative(__dirname, filePath)}`);
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const res = path.resolve(dir, entry.name);
    if (entry.isDirectory()) {
      walk(res);
    } else if (entry.isFile() && res.endsWith(".tsx")) {
      fixFile(res);
    }
  }
}

walk(targetDir);
