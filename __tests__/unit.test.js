// unit.test.js

import {
  isPhoneNumber,
  isEmail,
  isStrongPassword,
  isDate,
  isHexColor,
} from '../code-to-unit-test/unit-test-me';

describe('isPhoneNumber', () => {
  test('accepts local 7-digit form with dash', () => {
    expect(isPhoneNumber('555-1234')).toBe(true);
  });
  test('accepts area code with dash prefix', () => {
    expect(isPhoneNumber('408-555-1234')).toBe(true);
  });
  test('rejects plain text', () => {
    expect(isPhoneNumber('not-a-phone-number')).toBe(false);
  });
  test('rejects incomplete trailing digits', () => {
    expect(isPhoneNumber('555-123')).toBe(false);
  });
});

describe('isEmail', () => {
  test('accepts simple user and 3-letter TLD', () => {
    expect(isEmail('user@site.com')).toBe(true);
  });
  test('accepts underscore in local part', () => {
    expect(isEmail('a_b@mail.org')).toBe(true);
  });
  test('rejects missing @', () => {
    expect(isEmail('userexample.com')).toBe(false);
  });
  test('rejects TLD shorter than two letters', () => {
    expect(isEmail('x@y.c')).toBe(false);
  });
});

describe('isStrongPassword', () => {
  test('accepts minimum length (4 chars) starting with letter', () => {
    expect(isStrongPassword('Ab12')).toBe(true);
  });
  test('accepts 15-character password matching pattern', () => {
    expect(isStrongPassword('A12345678901234')).toBe(true);
  });
  test('rejects password starting with a digit', () => {
    expect(isStrongPassword('1abc')).toBe(false);
  });
  test('rejects too short password', () => {
    expect(isStrongPassword('Ab1')).toBe(false);
  });
});

describe('isDate', () => {
  test('accepts single-digit month and day', () => {
    expect(isDate('1/5/2024')).toBe(true);
  });
  test('accepts two-digit month and day with 4-digit year', () => {
    expect(isDate('12/31/1999')).toBe(true);
  });
  test('rejects wrong separator', () => {
    expect(isDate('12-31-1999')).toBe(false);
  });
  test('rejects two-digit year', () => {
    expect(isDate('1/5/24')).toBe(false);
  });
});

describe('isHexColor', () => {
  test('accepts 3-digit hex without hash', () => {
    expect(isHexColor('a1F')).toBe(true);
  });
  test('accepts 6-digit hex with hash', () => {
    expect(isHexColor('#00FFaa')).toBe(true);
  });
  test('rejects invalid hex character', () => {
    expect(isHexColor('#00gg00')).toBe(false);
  });
  test('rejects wrong length (5 hex digits)', () => {
    expect(isHexColor('#abcde')).toBe(false);
  });
});
