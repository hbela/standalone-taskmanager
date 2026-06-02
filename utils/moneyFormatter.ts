import { formatCurrency } from 'react-native-format-currency';

const ZERO_DECIMAL_CURRENCIES = new Set(['HUF', 'JPY', 'KRW', 'VND', 'IDR', 'CLP', 'ISK', 'UGX']);

const CURRENCY_INPUT_FORMAT_MAP: Record<string, { delimiter: string; separator: string }> = {
  USD: { delimiter: ' ', separator: '.' },
  GBP: { delimiter: ' ', separator: '.' },
  EUR: { delimiter: ' ', separator: ',' },
  HUF: { delimiter: ' ', separator: '' },
};

const LOCALE_FORMAT_MAP: Record<string, { delimiter: string; separator: string }> = {
  en: { delimiter: ',', separator: '.' },
  hu: { delimiter: '\u00a0', separator: ',' },
  fr: { delimiter: '\u00a0', separator: ',' },
  de: { delimiter: '.', separator: ',' },
};

const DEFAULT_FORMAT = { delimiter: ',', separator: '.' };

export function decimalsFor(currency: string): number {
  return ZERO_DECIMAL_CURRENCIES.has(currency.toUpperCase()) ? 0 : 2;
}

export function getInputFormat(lang: string, currency?: string): { delimiter: string; separator: string } {
  if (currency) {
    const currencyFormat = CURRENCY_INPUT_FORMAT_MAP[currency.toUpperCase()];
    if (currencyFormat) {
      return currencyFormat;
    }
  }

  const code = lang.slice(0, 2).toLowerCase();
  return LOCALE_FORMAT_MAP[code] ?? DEFAULT_FORMAT;
}

function stripThousandsSeparators(formatted: string, decimalSeparator: string): string {
  if (decimalSeparator === ',') {
    return formatted.replace(/\./g, '');
  }

  if (decimalSeparator === '.') {
    return formatted.replace(/,/g, '');
  }

  return formatted.replace(/[.,]/g, '');
}

function trimZeroDecimalCurrency(formatted: string): string {
  return formatted.replace(/([.,])\d{2}(?=\s*\D*$)/, '');
}

function groupIntegerPart(integerPart: string, delimiter: string): string {
  if (!delimiter) {
    return integerPart;
  }

  return integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
}

export function formatMoneyInputValue(value: number | null, lang: string, currency: string): string {
  if (value === null) {
    return '';
  }

  const decimals = decimalsFor(currency);
  const { delimiter, separator } = getInputFormat(lang, currency);
  if (decimals === 0) {
    return groupIntegerPart(String(Math.trunc(value)), delimiter);
  }

  const normalized = value.toFixed(decimals).replace('.', separator);
  const [integerPart, decimalPart] = normalized.split(separator);
  const groupedInteger = groupIntegerPart(integerPart, delimiter);

  if (decimals === 0 || decimalPart === undefined) {
    return groupedInteger;
  }

  return `${groupedInteger}${separator}${decimalPart.slice(0, decimals)}`;
}

export function formatMoney(amount: number, _lang: string, currency: string): string {
  const upper = currency.toUpperCase();
  const decimals = decimalsFor(upper);
  const { delimiter, separator } = getInputFormat('', upper);
  const amountToFormat = decimals === 0 ? Math.round(amount) : amount;
  const [formatted] = formatCurrency({ amount: amountToFormat, code: upper });
  const withoutDecimals = decimals === 0 ? trimZeroDecimalCurrency(formatted) : formatted;
  const withoutPackageThousands = stripThousandsSeparators(withoutDecimals, separator);
  const numberPattern = decimals === 0 ? /\d+/ : new RegExp(`\\d+(?:\\${separator}\\d+)?`);

  return withoutPackageThousands.replace(numberPattern, (value) => {
    if (decimals === 0) {
      return groupIntegerPart(value, delimiter);
    }

    const [integerPart, decimalPart] = value.split(separator);
    const groupedInteger = groupIntegerPart(integerPart, delimiter);
    return decimalPart === undefined ? groupedInteger : `${groupedInteger}${separator}${decimalPart}`;
  });
}

export function sanitizeMoneyInput(text: string, lang: string, currency: string): string {
  const { delimiter, separator } = getInputFormat(lang, currency);
  const decimals = decimalsFor(currency);
  let sanitized = '';
  let hasSeparator = false;

  for (const char of text) {
    if (/\d/.test(char)) {
      sanitized += char;
      continue;
    }

    if (char === delimiter || char === '\u00a0') {
      continue;
    }

    if (decimals === 0 && (char === '.' || char === ',')) {
      break;
    }

    if (decimals > 0 && !hasSeparator && (char === separator || (separator === ',' && char === '.'))) {
      sanitized += separator;
      hasSeparator = true;
    }
  }

  if (decimals === 0) {
    return groupIntegerPart(sanitized, delimiter);
  }

  const [integerPart, decimalPart] = sanitized.split(separator);
  const groupedInteger = groupIntegerPart(integerPart, delimiter);
  if (decimalPart === undefined) {
    return groupedInteger;
  }

  return `${groupedInteger}${separator}${decimalPart.slice(0, decimals)}`;
}

export function parseMoneyInput(text: string, lang: string, currency: string): number | null {
  const sanitized = sanitizeMoneyInput(text, lang, currency);
  const { delimiter, separator } = getInputFormat(lang, currency);

  if (!sanitized || sanitized === separator) {
    return null;
  }

  const withoutDelimiters = delimiter ? sanitized.replace(new RegExp(`[${delimiter}\\u00a0\\s]`, 'g'), '') : sanitized;
  const normalized = separator ? withoutDelimiters.replace(separator, '.') : withoutDelimiters;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

export function parseLocaleNumber(text: string, lang: string): number {
  const { delimiter, separator } = getInputFormat(lang);
  const escapedDelimiter = delimiter === '.' ? '\\.' : delimiter === '\u00a0' ? '\\s' : delimiter;
  const normalized = text
    .replace(new RegExp(escapedDelimiter, 'g'), '')
    .replace(separator, '.');
  return parseFloat(normalized);
}
