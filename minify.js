/*
   Logic:
   
1. Construct AST as regex is bad as you dont know if its a value or a function/variable declaration

2. Traverse the AST and now get all the declarations and map it to a function

3. Once its done you have an AST with all the replacements

4. Now convert the AST to javascript and

5. Save the Stringified version to a file


Doubts Hanging Currently

1. What about function parameters ?
2. what if we run out of alphabets in captial and small ?

*/

import * as acorn from "acorn";
import fs from "fs";

const jsFile = "./sampleJs.js";
const jsCode = fs.readFileSync(jsFile, "utf-8");

const ast = acorn.parse(jsCode, { ecmaVersion: 2022, locations: true });

// This is a  hashmap which contains mappings with minfiedName==>orginalName

const sourceMap = new Map();

function getMinifiedName(orginalName) {
  const alphabets = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (const letter of alphabets) {
    if (sourceMap.has(letter)) continue;
    else {
      sourceMap.set(letter, orginalName);
      return letter;
    }
  }
  throw new Error(
    "I guess the alphabets have been exhausted!!Rethink this logic"
  );
}

function processAST(ast) {
  const body = ast.body;
  if (!body) return;

  //! dont know what we call in ast. need to rename this variable later appropriately

  //Only Minifies Function Names for now.

  for (const declaration of body) {
    console.log("Here");
    if (declaration.type === "FunctionDeclaration") {
      const functionName = declaration.id.name;

      const minifiedName = getMinifiedName(functionName);

      declaration.id.name = minifiedName;
    }
  }
}

fs.writeFileSync("./ast.json", JSON.stringify(ast), "utf-8");

processAST(ast);
