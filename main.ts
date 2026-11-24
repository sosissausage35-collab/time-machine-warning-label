// Funniest Time Machine Warning Label — make.fun bounty
// u-eager-stork-81-9647-funniest-time-machine-warning-f8add151
//
// Writes one warning label (max 120 characters) to /output/entry.txt.
// The label is a single deadpan safety notice: the butterfly effect meets
// the grandfather paradox, with the punchline saved for the last words.

import { mkdirSync, writeFileSync } from "node:fs";

const LABEL =
  "WARNING: Do not step on any butterflies. Your grandfather is standing on one of them.";

const chars = [...LABEL].length;

// The label must be exactly one line: reject control characters and any
// embedded newline/carriage return so a multi-line or binary payload can
// never slip into the entry file.
const hasControlChars = /[\u0000-\u001F\u007F]/.test(LABEL);
const hasEmbeddedNewline = LABEL.includes("\n") || LABEL.includes("\r");

if (chars < 1 || chars > 120 || LABEL.trim().length === 0) {
  console.error(`invalid label: ${chars} characters (must be 1-120, not only whitespace)`);
  process.exit(1);
}
if (hasControlChars) {
  console.error("invalid label: contains control characters");
  process.exit(1);
}
if (hasEmbeddedNewline) {
  console.error("invalid label: must be exactly one line (no embedded newline)");
  process.exit(1);
}

mkdirSync("/output", { recursive: true });
// Exactly one trailing newline: strip any trailing newline first, then add
// one, so the file always ends with a single "\n" and nothing more.
const out = LABEL.replace(/\n+$/, "") + "\n";
writeFileSync("/output/entry.txt", out, "utf8");
console.log(`wrote ${chars}-character label to /output/entry.txt`);
