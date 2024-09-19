import { beforeAll, describe, expect, it } from 'vitest';
import PasswordHelper from './password.helper';

describe('comparePasswordAndConfirmation method', () => {
  it('should return false when comparing two differents passwords', () => {
    const isMatch = PasswordHelper.comparePasswordAndConfirmation('Diff', 'diff');

    expect(isMatch).toBe(false);
  });

  it('should return true when comparing two identical passwords', () => {
    const isMatch = PasswordHelper.comparePasswordAndConfirmation('same', 'same');

    expect(isMatch).toBe(true);
  });
});


describe('comparePasswordAndHash method', () => {
  let hashPass01: string;
  let hashPass02: string;

  beforeAll(() => {
    hashPass01 = PasswordHelper.hash('pass01');
    hashPass02 = PasswordHelper.hash('pass02');
  });

  it('should return true when comparing a plain password and its hash', () => {
    const isMatch = PasswordHelper.comparePasswordAndHash('pass01', hashPass01);

    expect(isMatch).toBe(true);
  });

  it('should return false when comparing a plain password and another hash', () => {
    const isMatch = PasswordHelper.comparePasswordAndHash('pass01', hashPass02);

    expect(isMatch).toBe(false);
  });
});


describe('generate method', () => {
  it('should generate a random password with 8 characters', () => {
    const password = PasswordHelper.generate();

    expect(password.length).toEqual(8);
  });
});


describe('hash method', () => {
  it('should hash the password', () => {
    const password = 'plainPassword';
    const hashedPassword = PasswordHelper.hash(password);

    expect(hashedPassword).not.toEqual(password);
  });
});
