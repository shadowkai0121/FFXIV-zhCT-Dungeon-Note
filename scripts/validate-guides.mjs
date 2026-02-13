import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const guidesRoot = path.resolve("src/content/guides");

const requiredFields = [
  "title",
  "slug",
  "dutyType",
  "patch",
  "encounter",
  "summary",
  "tags",
  "lastVerifiedAt",
  "status",
  "sources",
];

const dutyTypes = new Set(["ultimate", "savage", "extreme"]);
const statuses = new Set(["published", "draft", "archived"]);
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

async function listMarkdownFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listMarkdownFiles(fullPath)));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }

  return files;
}

function pushError(errors, file, message) {
  const relativePath = path.relative(process.cwd(), file).replace(/\\/g, "/");
  errors.push(`[${relativePath}] ${message}`);
}

function validateGuide(data, file, errors, slugMap) {
  for (const field of requiredFields) {
    if (data[field] === undefined || data[field] === null || data[field] === "") {
      pushError(errors, file, `missing required field: ${field}`);
    }
  }

  if (typeof data.slug !== "string" || !slugPattern.test(data.slug)) {
    pushError(errors, file, "slug must be kebab-case");
  }

  if (typeof data.slug === "string") {
    const existing = slugMap.get(data.slug);
    if (existing) {
      pushError(errors, file, `duplicate slug with ${existing}`);
    } else {
      slugMap.set(data.slug, path.relative(process.cwd(), file).replace(/\\/g, "/"));
    }
  }

  if (!dutyTypes.has(data.dutyType)) {
    pushError(errors, file, "dutyType must be one of: ultimate, savage, extreme");
  }

  if (!statuses.has(data.status)) {
    pushError(errors, file, "status must be one of: published, draft, archived");
  }

  if (Number.isNaN(Date.parse(data.lastVerifiedAt))) {
    pushError(errors, file, "lastVerifiedAt must be a valid date string");
  }

  if (!Array.isArray(data.tags) || data.tags.length === 0) {
    pushError(errors, file, "tags must be a non-empty array");
  }

  if (!Array.isArray(data.sources) || data.sources.length === 0) {
    pushError(errors, file, "sources must be a non-empty array");
  } else {
    for (const [index, source] of data.sources.entries()) {
      if (!source || typeof source !== "object") {
        pushError(errors, file, `sources[${index}] must be an object`);
        continue;
      }

      if (typeof source.title !== "string" || source.title.trim() === "") {
        pushError(errors, file, `sources[${index}].title is required`);
      }

      if (typeof source.url !== "string") {
        pushError(errors, file, `sources[${index}].url is required`);
      } else {
        try {
          new URL(source.url);
        } catch {
          pushError(errors, file, `sources[${index}].url is not a valid URL`);
        }
      }

      if (!["official", "community", "video"].includes(source.source)) {
        pushError(errors, file, `sources[${index}].source must be official/community/video`);
      }
    }
  }
}

async function main() {
  const files = await listMarkdownFiles(guidesRoot);
  if (files.length === 0) {
    console.error("No markdown files found under src/content/guides");
    process.exit(1);
  }

  const errors = [];
  const slugMap = new Map();

  for (const file of files) {
    const raw = await readFile(file, "utf8");
    const { data } = matter(raw);
    validateGuide(data, file, errors, slugMap);
  }

  if (errors.length > 0) {
    console.error("Guide validation failed:");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log(`Validated ${files.length} guide markdown file(s).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
