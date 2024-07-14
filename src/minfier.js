// This is a  hashmap which contains mappings with minfiedName==>orginalName

const sourceMap = new Map();
const originalNameMap = new Map();
let alphabets = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function getMinifiedName(orginalName) {
  // Check If there is any mapping that already exists. If exists just return that minfied Name
  // If doesnt exist, create minified name, update sourcemap, then return the minified name

  if (originalNameMap.has(orginalName)) {
    return originalNameMap.get(orginalName);
  }

  if (alphabets == "") {
    throw new Error(
      "Used all the 52 characters. This Minifier Currently doesnt support letters other than 52"
    );
  }

  const minfiedName = alphabets[0];
  sourceMap.set(minfiedName, orginalName);
  originalNameMap.set(orginalName, minfiedName);
  alphabets = alphabets.slice(1);
  return minfiedName;
}

export function minfiyFunctionDeclaration(node) {
  console.log(node);
  const functionName = node.id?.name;

  const minifiedName = getMinifiedName(functionName);
  node.id.name = minifiedName;
  const functionParameters = node.params;

  for (const param of functionParameters) {
    minifyIndentifier(param);
  }

  return;
}

export function minifyVariableDeclaration(node) {
  const declarations = node.declarations;

  for (const declaration of declarations) {
    const id = declaration.id;
    minifyIndentifier(id);
  }
}

export function minifyIndentifier(node) {
  if (node.type !== "Identifier") throw new Error("Identifier Not Found!!");
  const variableName = node.name;
  const minifiedName = getMinifiedName(variableName);
  node.name = minifiedName;
}

export function minifyExpressionStatement(node) {
  if (node.type !== "ExpressionStatement")
    throw new Error("Expression Statement type is called in wrong function");

  const expression = node.expression;

  switch (expression.type) {
    case "CallExpression":
      minifyFunctionCallExpression(node.expression);
  }
}

export function minifyFunctionCallExpression(node) {
  if (node.type !== "CallExpression")
    throw new Error("Call Expression Minifier is called for Wrong Node type ");

  const callee = node.callee;
  minifyIndentifier(callee);

  const calleeArgs = node.arguments;

  for (const arg of calleeArgs) {
    minifyIndentifier(arg);
  }
}
