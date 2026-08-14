import { access, cp, mkdir } from "node:fs/promises";

const standaloneDirectory = new URL("../.next/standalone/", import.meta.url);

try {
  await access(standaloneDirectory);
} catch {
  process.exit(0);
}

await mkdir(new URL("./public/", standaloneDirectory), { recursive: true });
await mkdir(new URL("./.next/static/", standaloneDirectory), { recursive: true });
await cp(new URL("../public/", import.meta.url), new URL("./public/", standaloneDirectory), { recursive: true });
await cp(new URL("../.next/static/", import.meta.url), new URL("./.next/static/", standaloneDirectory), { recursive: true });
