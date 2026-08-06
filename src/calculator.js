#!/usr/bin/env node

/**
 * Node.js CLI Calculator
 *
 * Supports the four basic arithmetic operations:
 *  - Addition       (+, add, plus)
 *  - Subtraction    (-, sub, minus)
 *  - Multiplication (*, x, mul, times)
 *  - Division       (/, div)  -- guards against division by zero
 *
 * Usage:
 *   node calculator.js <number> <operator> <number>
 *
 * Examples:
 *   node calculator.js 4 + 5
 *   node calculator.js 10 / 2
 *   node calculator.js 3 x 7
 */

// Maps accepted operator aliases to a single canonical symbol.
const OPERATOR_ALIASES = {
  '+': '+',
  add: '+',
  plus: '+',
  '-': '-',
  sub: '-',
  minus: '-',
  '*': '*',
  x: '*',
  X: '*',
  mul: '*',
  times: '*',
  '/': '/',
  div: '/',
};

/** Addition: a + b */
function add(a, b) {
  return a + b;
}

/** Subtraction: a - b */
function subtract(a, b) {
  return a - b;
}

/** Multiplication: a * b */
function multiply(a, b) {
  return a * b;
}

/** Division: a / b (throws on division by zero) */
function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero is not allowed.');
  }
  return a / b;
}

/**
 * Performs the requested arithmetic operation on two numbers.
 * @param {number} a - The first operand.
 * @param {string} operator - One of +, -, *, / (or their aliases).
 * @param {number} b - The second operand.
 * @returns {number} The result of the operation.
 */
function calculate(a, operator, b) {
  const symbol = OPERATOR_ALIASES[operator];

  switch (symbol) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '*':
      return multiply(a, b);
    case '/':
      return divide(a, b);
    default:
      throw new Error(
        `Unsupported operator "${operator}". Use one of: + - * / (or add, sub, mul, div).`
      );
  }
}

function printUsage() {
  console.log('Usage: node calculator.js <number> <operator> <number>');
  console.log('Operators: + (add), - (subtract), * (multiply), / (divide)');
  console.log('Example:   node calculator.js 4 + 5');
}

function main() {
  const args = process.argv.slice(2);

  if (args.length !== 3) {
    printUsage();
    process.exit(1);
  }

  const [rawA, operator, rawB] = args;
  const a = Number(rawA);
  const b = Number(rawB);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    console.error('Error: both operands must be valid numbers.');
    process.exit(1);
  }

  try {
    const result = calculate(a, operator, b);
    console.log(result);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

// Only run the CLI when this file is executed directly (not when imported/required).
if (require.main === module) {
  main();
}

module.exports = { add, subtract, multiply, divide, calculate };
