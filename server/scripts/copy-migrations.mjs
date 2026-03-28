import { cp, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sourceDirectory = path.resolve(__dirname, "../src/db/migrations");
const targetDirectory = path.resolve(__dirname, "../../dist-server/server/src/db/migrations");

await mkdir(targetDirectory, { recursive: true });
await cp(sourceDirectory, targetDirectory, { recursive: true });
