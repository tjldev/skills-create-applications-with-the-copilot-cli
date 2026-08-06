#!/usr/bin/env node

/**
 * calculator.js
 *
 * A simple Node.js CLI calculator supporting the four basic math operations:
 *   - Addition:       a + b
 *   - Subtraction:    a - b
 *   - Multiplication: a * b
 *   - Division:       a / b (includes handling for division by zero)
 *
 * Usage:
 *   node calculator.js <number> <operator> <number>
 *
 * Examples:
 *   node calculator.js 5 + 3
 *   node calculator.js 10 - 4
 *   node calculator.js 6 x 7
 *   node calculator.js 8 / 2
 *
 * Supported operators: +, -, *, x, /
 */

// Performs addition: a + b
function add(a, b) {
  return a + b;
}

// Performs subtraction: a - b
function subtract(a, b) {
  return a - b;
}

// Performs multiplication: a * b
function multiply(a, b) {
  return a * b;
}

// Performs division: a / b, guarding against division by zero
function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero is not allowed.');
  }
  return a / b;
}

// Maps supported operator symbols to their corresponding function
const operations = {
  '+': add,
  '-': subtract,
  '*': multiply,
  x: multiply,
  X: multiply,
  '/': divide,
};

function printUsage() {
  console.log('Usage: node calculator.js <number> <operator> <number>');
  console.log('Supported operators: + (add), - (subtract), * or x (multiply), / (divide)');
  console.log('Example: node calculator.js 5 + 3');
}

function main(argv) {
  const args = argv.slice(2);

  if (args.length !== 3) {
    printUsage();
    process.exit(1);
  }

  const [rawA, operator, rawB] = args;
  const a = Number(rawA);
  const b = Number(rawB);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    console.error('Error: Both operands must be valid numbers.');
    printUsage();
    process.exit(1);
  }

  const operation = operations[operator];

  if (!operation) {
    console.error(`Error: Unsupported operator "${operator}".`);
    printUsage();
    process.exit(1);
  }

  try {
    const result = operation(a, b);
    console.log(result);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

// Only run the CLI when this file is executed directly (not when required,
// e.g. by the test suite).
if (require.main === module) {
  main(process.argv);
}

module.exports = { add, subtract, multiply, divide };
