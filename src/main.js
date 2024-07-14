/*
   Logic:
   
1. Construct AST as regex is bad as you dont know if its a value or a function/variable declaration

2. Traverse the AST and now get all the declarations and map it to a function

3. Once its done you have an AST with all the replacements

4. Now convert the AST to javascript and

5. Save the Stringified version to a file


Doubts Hanging Currently

1. Handle Built In object Properties and Inbuilt Functions 

*/

import * as acorn from "acorn";
import escodegen from "escodegen";
import fs from "fs";

import { processAST } from "./processor.js";
import { format } from "path";

const jsFile = "../index.js";
const jsCode = fs.readFileSync(jsFile, "utf-8");

const ast = acorn.parse(jsCode, { ecmaVersion: 2022 });

fs.writeFileSync("./ast.json", JSON.stringify(ast), "utf-8");

processAST(ast);

const minifiedCode = escodegen.generate(ast, { format: { compact: true } });

fs.writeFileSync("../index.min.js", minifiedCode, "utf-8");
