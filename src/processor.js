import {
  getMinifiedName,
  minfiyFunctionDeclaration,
  minifyExpressionStatement,
  minifyVariableDeclaration,
} from "./minfier.js";

export function processAST(node) {
  if (!node.body) {
    console.log(`No Body Found for child ${node?.type ?? ""}`);
    return;
  }

  let childNodes = node.body;

  if (!Array.isArray(childNodes) && typeof childNodes === "object") {
    childNodes = [childNodes];
  }

  for (const childNode of childNodes) {
    switch (childNode.type) {
      case "FunctionDeclaration":
        minfiyFunctionDeclaration(childNode);
        break;
      case "VariableDeclaration":
        minifyVariableDeclaration(childNode);
        break;
      case "ExpressionStatement":
        minifyExpressionStatement(childNode);
        break;
    }
    processAST(childNode);
  }
}
