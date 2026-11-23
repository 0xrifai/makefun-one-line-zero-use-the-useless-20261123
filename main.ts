import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The one line. A superpower that works perfectly and helps nobody.
const line =
  "I can summon any object I own \u2014 as long as it's already in my hand.";

// The gate is strict on purpose: a blank or padded line is not a joke.
if (line.length < 1 || line.length > 200) {
  throw new Error(`Line must be 1-200 characters, got ${line.length}.`);
}
if (line.trim().length === 0) {
  throw new Error("Line must not be only whitespace.");
}
if (line !== line.trim()) {
  throw new Error("Line must not have leading or trailing whitespace.");
}
if (line.includes("\n") || line.includes("\r")) {
  throw new Error("Line must not contain a newline.");
}

const outPath = "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, line, "utf8");

// Read it back and prove the file on disk is exactly the line, byte for byte.
import { readFileSync } from "node:fs";
const written = readFileSync(outPath, "utf8");
if (written !== line) {
  throw new Error("Output file does not match the line exactly.");
}
if (written.endsWith("\n")) {
  throw new Error("Output file must not end with a newline.");
}
console.log(`Wrote ${line.length} characters to ${outPath}`);
