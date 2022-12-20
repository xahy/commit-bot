#! /usr/bin/env node
import { execSync } from "child_process";
import clipboard from "clipboardy";

const CONVENTIONAL_REQUEST = `following conventional commit (<type>: <subject>)`;

let diff = "";
try {
  diff = execSync("git diff --cached").toString();
  if (!diff) {
    console.log("No changes to commit.");
    process.exit(0);
  }
} catch (e) {
  console.log("There was an error while getting the diff.", String(e));
  process.exit(1);
}

async function main(diff: string) {
  const command =
    `Suggest me a few good commit messages for my commit ${CONVENTIONAL_REQUEST}.\n` +
    "```\n" +
    diff +
    "\n" +
    "```\n\n" +
    `Output results as a list, not more than 6 items.`;

  clipboard.writeSync(command);

  console.log(
    "Request copied to clipboard. Open https://chat.openai.com/chat and paste it there."
  );
}

main(diff)
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    console.log("Error: " + e.message);
    if ((e as any).details) {
      console.log((e as any).details);
    }
    process.exit(1);
  });
