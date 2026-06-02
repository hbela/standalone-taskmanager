/* global describe, expect, it */

import {
  decimalsFor,
  formatMoney,
  formatMoneyInputValue,
  getInputFormat,
  parseMoneyInput,
  sanitizeMoneyInput,
} from '../../utils/moneyFormatter';

describe('moneyFormatter', () => {
  describe('currency input format', () => {
    it('uses space thousands separator and no decimal separator for HUF', () => {
      expect(getInputFormat('en', 'HUF')).toEqual({ delimiter: ' ', separator: '' });
      expect(decimalsFor('HUF')).toBe(0);
    });

    it.each(['USD', 'GBP'])('uses space thousands separator and dot decimals for %s', (currency) => {
      expect(getInputFormat('hu', currency)).toEqual({ delimiter: ' ', separator: '.' });
      expect(decimalsFor(currency)).toBe(2);
    });

    it('uses space thousands separator and comma decimals for EUR', () => {
      expect(getInputFormat('en', 'EUR')).toEqual({ delimiter: ' ', separator: ',' });
      expect(decimalsFor('EUR')).toBe(2);
    });
  });

  describe('formatMoneyInputValue', () => {
    it('formats input values with space thousands separators', () => {
      expect(formatMoneyInputValue(120000.2, 'en', 'USD')).toBe('120 000.20');
      expect(formatMoneyInputValue(120000.2, 'en', 'GBP')).toBe('120 000.20');
      expect(formatMoneyInputValue(120000.2, 'en', 'EUR')).toBe('120 000,20');
      expect(formatMoneyInputValue(120000.2, 'en', 'HUF')).toBe('120 000');
    });
  });

  describe('parseMoneyInput', () => {
    it.each(['USD', 'GBP'])('parses typed whole units for %s without shifting cents', (currency) => {
      expect(parseMoneyInput('12', 'en', currency)).toBe(12);
    });

    it.each(['USD', 'GBP'])('parses dot decimals and space thousands for %s', (currency) => {
      expect(parseMoneyInput('120 000.20', 'hu', currency)).toBe(120000.2);
      expect(sanitizeMoneyInput('120000.20', 'hu', currency)).toBe('120 000.20');
      expect(sanitizeMoneyInput('12,34', 'hu', currency)).toBe('1 234');
      expect(parseMoneyInput('12,34', 'hu', currency)).toBe(1234);
    });

    it('parses comma decimals and space thousands for EUR', () => {
      expect(parseMoneyInput('120 000,20', 'en', 'EUR')).toBe(120000.2);
      expect(sanitizeMoneyInput('120000,20', 'en', 'EUR')).toBe('120 000,20');
      expect(sanitizeMoneyInput('12.34', 'en', 'EUR')).toBe('12,34');
      expect(parseMoneyInput('12.34', 'en', 'EUR')).toBe(12.34);
    });

    it('keeps HUF as whole grouped units', () => {
      expect(parseMoneyInput('120 000', 'hu', 'HUF')).toBe(120000);
      expect(sanitizeMoneyInput('120000', 'hu', 'HUF')).toBe('120 000');
      expect(sanitizeMoneyInput('12,34', 'hu', 'HUF')).toBe('12');
      expect(parseMoneyInput('12,34', 'hu', 'HUF')).toBe(12);
    });

    it('returns null for empty input', () => {
      expect(parseMoneyInput('', 'en', 'USD')).toBeNull();
    });
  });

  describe('formatMoney', () => {
    it('formats USD with space thousands separator and dot decimals', () => {
      expect(formatMoney(120000.2, 'en', 'USD')).toBe('$120 000.20');
    });

    it('formats GBP with space thousands separator and dot decimals', () => {
      expect(formatMoney(120000.2, 'en', 'GBP')).toBe('\u00a3120 000.20');
    });

    it('formats EUR with space thousands separator and comma decimals', () => {
      expect(formatMoney(120000.2, 'en', 'EUR')).toBe('\u20ac120 000,20');
    });

    it('formats HUF with space thousands separator and no decimals', () => {
      expect(formatMoney(120000.2, 'hu', 'HUF')).toBe('120 000 Ft');
    });
  });
});
