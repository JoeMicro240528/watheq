const fs = require('fs');
const path = require('path');

const guidePath = path.join(__dirname, 'app/[locale]/guide/page.tsx');
const snippetsPath = path.join(__dirname, 'lib/snippets.ts');

let content = fs.readFileSync(guidePath, 'utf-8');

// Find the start and end of snippets
const startMarker = '// ─── Step 1: Generate Keys and CSR';
const endMarker = '// --- Helper Components ---';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error("Markers not found");
  process.exit(1);
}

// Extract the snippets block
let snippetsBlock = content.substring(startIndex, endIndex);

// Replace "const step" with "export const step"
snippetsBlock = snippetsBlock.replace(/const step/g, 'export const step');

// Fix the malformed Java snippet in step7
snippetsBlock = snippetsBlock.replace(
  `        System.out.println(client.send(request, HttpResponse.BodyHandlers.ofString()).body());\n    }\nurl = "YOUR_HUB_URL/api/documents/verify"\npayload = { "docId": doc_id }\nheaders = {'Content-Type': 'application/json'}\n\nresponse = requests.post(url, json=payload, headers=headers)\nprint("Verification Result:", json.dumps(response.json(), indent=2))\`\n  }\n]`,
  `        System.out.println(client.send(request, HttpResponse.BodyHandlers.ofString()).body());\n    }\n}\`\n  }\n]`
);

fs.writeFileSync(snippetsPath, snippetsBlock);

// Replace the block in guide page with an import
const importStatement = `import { step1Snippets, step2Snippets, step2bSnippets, step3Snippets, step4aSnippets, step4bSnippets, step5aSnippets, step5bSnippets, step6Snippets, step7Snippets } from '@/lib/snippets'\n\n`;

const newContent = content.substring(0, startIndex) + importStatement + content.substring(endIndex);

fs.writeFileSync(guidePath, newContent);
console.log("Successfully extracted snippets!");
