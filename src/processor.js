import {
  getMinifiedName,
  minfiyFunctionDeclaration,
  minifyExpressionStatement,
  minifyIndentifier,
  minifyVariableDeclaration,
} from "./minfier.js";

export function processAST(node) {
  if (!node?.type) return;

  switch (node.type) {
    case "Identifier":
      minifyIndentifier(node);
  }

  const keys = Object.keys(node);

  for (const key of keys) {
    if (typeof node[key] !== "object") continue;

    if (Array.isArray(node[key])) {
      node[key].forEach((childNode) => processAST(childNode));
    }
    processAST(node[key]);
  }
}
