import { describe, expect, it } from 'vitest';
import DocumentHelper from './document.helper';

describe('removePunctuation method', () => {
  it('should removes all dots, hyphen and slashs', () => {
    const documentNoPunctuation = DocumentHelper.removePunctuation('123.456-789/01');
    expect(documentNoPunctuation).toEqual('12345678901');
  });
});

describe('validateCpf method', () => {
  it('should return false when providing invalid cpf', () => {
    const invalidCPF = DocumentHelper.validateCpf('123.456-789-01');
    expect(invalidCPF).toBe(false);
  });

  it('should return true when providing valid cpf', () => {
    const validCPF = DocumentHelper.validateCpf('209.909.850-67');
    expect(validCPF).toBe(true);
  });
});

describe('validateCnpj method', () => {
  it('should return false when providing invalid cnpj', () => {
    const invalidCPF = DocumentHelper.validateCnpj('12.345.678/0001-09');
    expect(invalidCPF).toBe(false);
  });

  it('should return true when providing valid cnpj', () => {
    const validCPF = DocumentHelper.validateCnpj('48.944.115/0001-60');
    expect(validCPF).toBe(true);
  });
});

describe('validateCpfOrCnpj method', () => {
  it('should return false when providing invalid cnpj', () => {
    const invalidCPF = DocumentHelper.validateCpfOrCnpj('12.345.678/0001-09');
    expect(invalidCPF).toBe(false);
  });

  it('should return true when providing valid cnpj', () => {
    const validCPF = DocumentHelper.validateCpfOrCnpj('48.944.115/0001-60');
    expect(validCPF).toBe(true);
  });

  it('should return false when providing invalid cpf', () => {
    const invalidCPF = DocumentHelper.validateCpfOrCnpj('123.456-789-01');
    expect(invalidCPF).toBe(false);
  });

  it('should return true when providing valid cpf', () => {
    const validCPF = DocumentHelper.validateCpfOrCnpj('209.909.850-67');
    expect(validCPF).toBe(true);
  });
});
