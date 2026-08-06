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
 * Plus the following extended operations:
 *  - Modulo         (%, mod)          -- remainder of a divided by b
 *  - Exponentiation (^, **, pow)      -- base raised to the exponent
 *  - Square root    (sqrt)            -- unary operation, guards against negative input
 *
 * Usage:
 *   node calculator.js <number> <operator> <number>
 *   node calculator.js sqrt <number>          (unary operation)
 *
 * Examples:
 *   node calculator.js 4 + 5
 *   node calculator.js 10 / 2
 *   node calculator.js 3 x 7
 *   node calculator.js 10 % 3
 *   node calculator.js 2 ^ 8
 *   node calculator.js sqrt 16
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
  '%': '%',
  mod: '%',
  '^': '^',
  '**': '^',
  pow: '^',
};

// Aliases that identify the unary square root operation.
const SQRT_ALIASES = new Set(['sqrt', 'sqrt(', '√']);

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

/** Modulo: remainder of a divided by b (throws on division by zero) */
function modulo(a, b) {
  if (b === 0) {
    throw new Error('Division by zero is not allowed.');
  }
  return a % b;
}

/** Exponentiation: base raised to the power of exponent */
function power(base, exponent) {
  return base ** exponent;
}

/** Square root: returns the square root of n (throws on negative input) */
function squareRoot(n) {
  if (n < 0) {
    throw new Error('Cannot compute the square root of a negative number.');
  }
  return Math.sqrt(n);
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
    case '%':
      return modulo(a, b);
    case '^':
      return power(a, b);
    default:
      throw new Error(
        `Unsupported operator "${operator}". Use one of: + - * / % ^ (or add, sub, mul, div, mod, pow).`
      );
  }
}

function printUsage() {
  console.log('Usage: node calculator.js <number> <operator> <number>');
  console.log('       node calculator.js sqrt <number>   (unary operation)');
  console.log(
    'Operators: + (add), - (subtract), * (multiply), / (divide), % (modulo), ^ (power), sqrt (square root)'
  );
  console.log('Example:   node calculator.js 4 + 5');
  console.log('Example:   node calculator.js sqrt 16');
}

function main() {
  const args = process.argv.slice(2);

  // Unary square root: `node calculator.js sqrt <number>`
  if (args.length === 2 && SQRT_ALIASES.has(args[0].toLowerCase())) {
    const n = Number(args[1]);
    if (Number.isNaN(n)) {
      console.error('Error: operand must be a valid number.');
      process.exit(1);
    }
    try {
      console.log(squareRoot(n));
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
    return;
  }

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

module.exports = { add, subtract, multiply, divide, modulo, power, squareRoot, calculate };
