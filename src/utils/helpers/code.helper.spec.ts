import { describe, expect, it } from 'vitest';
import CodeHelper from './code.helper';

describe('generate method', () => {
  it('should return a code with length equals 4', () => {
    const { code } = CodeHelper.generate(0);

    expect(code).toHaveLength(4);
  });

  it('should return a string code that contains only numbers', () => {
    const { code } = CodeHelper.generate(0);

    expect(Number(code)).not.toBeNaN();
  });

  it('should return a code that expires in 10 minutes', () => {
    const { codeExpiresIn } = CodeHelper.generate(10);
    const now = new Date();
    const tenMinutesLater = new Date(now.setMinutes(now.getMinutes() + 10));

    expect(codeExpiresIn.getMinutes()).toBe(tenMinutesLater.getMinutes());
  });
});


describe('isExpired method', () => {
  it('should return false when sending a future date', () => {
    const now = new Date();
    const futureDate = new Date(now.setMinutes(now.getMinutes() + 10));

    expect(CodeHelper.isExpired(futureDate)).toBe(false);
  });

  it('should return true when sending the current date', () => {
    const now = new Date();

    expect(CodeHelper.isExpired(now)).toBe(true);
  });

  it('should return true when sending a past date', () => {
    const now = new Date();
    const pastDate = new Date(now.setMinutes(now.getMinutes() - 10));

    expect(CodeHelper.isExpired(pastDate)).toBe(true);
  });
});
