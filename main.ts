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

if (chars < 1 || chars > 120 || LABEL.trim().length === 0) {
  console.error(`invalid label: ${chars} characters (must be 1-120, not only whitespace)`);
  process.exit(1);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LABEL + "\n", "utf8");
console.log(`wrote ${chars}-character label to /output/entry.txt`);
