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
3. What if  there are multiple javascript function parameters with same name? [I guess we can replace all the instances since thats within the same context so we should be safe]

*/

import * as acorn from "acorn";
import escodegen from "escodegen";
import fs from "fs";

import { processAST } from "./processor.js";

const jsFile = "../index.js";
const jsCode = fs.readFileSync(jsFile, "utf-8");

const ast = acorn.parse(jsCode, { ecmaVersion: 2022 });

fs.writeFileSync("./ast.json", JSON.stringify(ast), "utf-8");

processAST(ast);

const minifiedCode = escodegen.generate(ast);

fs.writeFileSync("../index.min.js", minifiedCode, "utf-8");
