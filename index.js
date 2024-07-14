// VariableDeclaration, VariableDeclarator, Identifier, Literal
let numberOne = 5,
  numberTwo = 10,
  result;

// FunctionDeclaration, Identifier, BlockStatement, ReturnStatement, BinaryExpression
function addNumbers(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}

// FunctionExpression, CallExpression
const multiplyNumbers = function (firstNumber, secondNumber) {
  return firstNumber * secondNumber;
};

// ArrowFunctionExpression
const divideNumbers = (firstNumber, secondNumber) => firstNumber / secondNumber;

// IfStatement, BinaryExpression, BlockStatement
if (numberOne < numberTwo) {
  // AssignmentExpression
  result = addNumbers(numberOne, numberTwo);
} else {
  // AssignmentExpression
  result = multiplyNumbers(numberOne, numberTwo);
}

// ForStatement, UpdateExpression, BlockStatement, ExpressionStatement
for (let index = 0; index < 5; index++) {
  // UnaryExpression
  result++;
}

// WhileStatement, LogicalExpression
while (numberOne < numberTwo && result > 0) {
  // AssignmentExpression, BinaryExpression
  numberOne = addNumbers(numberOne, 1);
}

// ObjectExpression, Property, Identifier, Literal
const person = {
  name: "John Doe",
  age: 30,
};

// ArrayExpression, Literal
const numbers = [1, 2, 3, 4, 5];

// MemberExpression, AssignmentExpression
numbers[0] = 10;

// Will Break for all the inbuilt javascript objects. Need a way to figure out the

// // TryStatement, CatchClause, ThrowStatement
// try {
//   if (numbers.length > 5) {
//     throw new Error("Array too large");
//   }
// } catch (error) {
//   // Identifier
//   let errorMessage = error.message;
// }

// TemplateLiteral, TemplateElement, TaggedTemplateExpression
const greet = function (strings, name) {
  return `${strings[0]}${name}${strings[1]}`;
};
const greeting = greet`Hello, ${person.name}!`;
