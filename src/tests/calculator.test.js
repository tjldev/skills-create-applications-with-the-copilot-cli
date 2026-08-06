/**
 * Unit tests for src/calculator.js
 *
 * Covers the four basic arithmetic operations exposed by the calculator
 * module (addition, subtraction, multiplication, division), using the
 * example operations from images/calc-basic-operations.png as a base,
 * expanded with additional edge cases (negatives, decimals, zero,
 * and division by zero).
 */

const { add, subtract, multiply, divide, calculate } = require('../calculator');

describe('add', () => {
  test('2 + 3 = 5 (image example)', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('adds two positive numbers', () => {
    expect(add(10, 15)).toBe(25);
  });

  test('adds negative numbers', () => {
    expect(add(-5, -7)).toBe(-12);
  });

  test('adds a positive and a negative number', () => {
    expect(add(10, -4)).toBe(6);
  });

  test('adds decimals', () => {
    expect(add(1.5, 2.25)).toBeCloseTo(3.75);
  });

  test('adding zero returns the other operand', () => {
    expect(add(0, 8)).toBe(8);
  });
});

describe('subtract', () => {
  test('10 - 4 = 6 (image example)', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test('subtracts two positive numbers resulting in a negative', () => {
    expect(subtract(4, 10)).toBe(-6);
  });

  test('subtracts negative numbers', () => {
    expect(subtract(-5, -7)).toBe(2);
  });

  test('subtracts decimals', () => {
    expect(subtract(5.5, 2.2)).toBeCloseTo(3.3);
  });

  test('subtracting zero returns the original number', () => {
    expect(subtract(9, 0)).toBe(9);
  });
});

describe('multiply', () => {
  test('45 * 2 = 90 (image example)', () => {
    expect(multiply(45, 2)).toBe(90);
  });

  test('multiplies two positive numbers', () => {
    expect(multiply(6, 7)).toBe(42);
  });

  test('multiplies negative numbers', () => {
    expect(multiply(-3, -4)).toBe(12);
  });

  test('multiplies a positive and a negative number', () => {
    expect(multiply(-3, 4)).toBe(-12);
  });

  test('multiplying by zero returns zero', () => {
    expect(multiply(123, 0)).toBe(0);
  });

  test('multiplies decimals', () => {
    expect(multiply(1.5, 2)).toBeCloseTo(3);
  });
});

describe('divide', () => {
  test('20 / 5 = 4 (image example)', () => {
    expect(divide(20, 5)).toBe(4);
  });

  test('divides two positive numbers', () => {
    expect(divide(10, 2)).toBe(5);
  });

  test('divides negative numbers', () => {
    expect(divide(-10, -2)).toBe(5);
  });

  test('divides a positive by a negative number', () => {
    expect(divide(10, -2)).toBe(-5);
  });

  test('division resulting in a decimal', () => {
    expect(divide(7, 2)).toBeCloseTo(3.5);
  });

  test('zero divided by a number returns zero', () => {
    expect(divide(0, 5)).toBe(0);
  });

  test('throws an error when dividing by zero', () => {
    expect(() => divide(20, 0)).toThrow('Division by zero is not allowed.');
  });
});

describe('calculate (operator dispatch)', () => {
  test.each([
    ['2', '+', '3', 5],
    ['10', '-', '4', 6],
    ['45', '*', '2', 90],
    ['20', '/', '5', 4],
  ])('calculate(%s, %s, %s) = %d (image examples)', (a, op, b, expected) => {
    expect(calculate(Number(a), op, Number(b))).toBe(expected);
  });

  test('supports operator aliases (add, sub, mul, div)', () => {
    expect(calculate(2, 'add', 3)).toBe(5);
    expect(calculate(10, 'sub', 4)).toBe(6);
    expect(calculate(45, 'mul', 2)).toBe(90);
    expect(calculate(20, 'div', 5)).toBe(4);
  });

  test('supports the "x" alias for multiplication', () => {
    expect(calculate(3, 'x', 7)).toBe(21);
  });

  test('throws on an unsupported operator', () => {
    expect(() => calculate(1, '%', 2)).toThrow(/Unsupported operator/);
  });

  test('throws on division by zero via calculate', () => {
    expect(() => calculate(20, '/', 0)).toThrow('Division by zero is not allowed.');
  });
});
