// Generates one image with the OpenAI Images API and saves it under public/images/.
// Usage: npm run image -- --name <file-name> --size <landscape|portrait|square> --prompt "<prompt>"
// Requires OPENAI_API_KEY (read from .env.local by the npm script). IMAGE_MODEL overrides the model.

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parseArgs } from "node:util";

const sizes = { landscape: "1536x1024", portrait: "1024x1536", square: "1024x1024" };

const { values } = parseArgs({
  options: {
    name: { type: "string" },
    prompt: { type: "string" },
    size: { type: "string", default: "landscape" },
    quality: { type: "string", default: "high" },
    overwrite: { type: "boolean", default: false },
  },
});

function fail(message) {
  console.error(`error: ${message}`);
  process.exit(1);
}

if (!values.name || !/^[a-z0-9-]+$/.test(values.name)) {
  fail("--name is required and may contain only lowercase letters, digits and dashes");
}
if (!values.prompt) fail("--prompt is required");
if (!sizes[values.size]) fail(`--size must be one of: ${Object.keys(sizes).join(", ")}`);
if (!process.env.OPENAI_API_KEY) fail("OPENAI_API_KEY is not set (add it to .env.local)");

const outDir = join(process.cwd(), "public", "images");
const outFile = join(outDir, `${values.name}.jpg`);
if (existsSync(outFile) && !values.overwrite) {
  fail(`${outFile} already exists (pass --overwrite to replace it)`);
}

const response = await fetch("https://api.openai.com/v1/images/generations", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: process.env.IMAGE_MODEL ?? "gpt-image-1",
    prompt: values.prompt,
    size: sizes[values.size],
    quality: values.quality,
    output_format: "jpeg",
    output_compression: 85,
    n: 1,
  }),
});

const body = await response.json().catch(() => null);
if (!response.ok) {
  fail(`API ${response.status}: ${body?.error?.message ?? response.statusText}`);
}

const b64 = body?.data?.[0]?.b64_json;
if (!b64) fail("API response contained no image data");

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, Buffer.from(b64, "base64"));
console.log(`saved ${outFile} (${sizes[values.size]})`);
