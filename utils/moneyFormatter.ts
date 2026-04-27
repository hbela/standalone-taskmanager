const ZERO_DECIMAL_CURRENCIES = new Set(['HUF', 'JPY', 'KRW', 'VND', 'IDR', 'CLP', 'ISK', 'UGX']);

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$', EUR: '€', GBP: '£', HUF: 'Ft', JPY: '¥', KRW: '₩',
  SEK: 'kr', NOK: 'kr', DKK: 'kr', PLN: 'zł', CZK: 'Kč',
  RON: 'lei', BGN: 'лв', CHF: 'CHF', CAD: 'CA$', AUD: 'A$', INR: '₹', CNY: '¥',
};

const SUFFIX_CURRENCIES = new Set(['HUF', 'SEK', 'NOK', 'DKK', 'PLN', 'CZK', 'RON', 'BGN']);

const LOCALE_FORMAT_MAP: Record<string, { delimiter: string; separator: string }> = {
  en: { delimiter: ',', separator: '.' },
  hu: { delimiter: ' ', separator: ',' },
  fr: { delimiter: ' ', separator: ',' },
  de: { delimiter: '.', separator: ',' },
};

const DEFAULT_FORMAT = { delimiter: ',', separator: '.' };

export function decimalsFor(currency: string): number {
  return ZERO_DECIMAL_CURRENCIES.has(currency.toUpperCase()) ? 0 : 2;
}

export function getInputFormat(lang: string): { delimiter: string; separator: string } {
  const code = lang.slice(0, 2).toLowerCase();
  return LOCALE_FORMAT_MAP[code] ?? DEFAULT_FORMAT;
}

function getCurrencySymbol(currency: string): string {
  return CURRENCY_SYMBOLS[currency.toUpperCase()] ?? currency.toUpperCase();
}

export function formatMoney(amount: number, lang: string, currency: string): string {
  const upper = currency.toUpperCase();
  const { delimiter, separator } = getInputFormat(lang);
  const decimals = decimalsFor(upper);
  const sign = amount < 0 ? '-' : '';

  const fixed = Math.abs(amount).toFixed(decimals);
  const [intPart, fracPart] = fixed.split('.');
  const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
  const numStr = decimals > 0 ? `${grouped}${separator}${fracPart}` : grouped;
  const symbol = getCurrencySymbol(upper);

  if (SUFFIX_CURRENCIES.has(upper)) {
    return `${sign}${numStr} ${symbol}`;
  }
  return `${sign}${symbol}${numStr}`;
}

export function parseLocaleNumber(text: string, lang: string): number {
  const { delimiter, separator } = getInputFormat(lang);
  const escapedDelimiter = delimiter === '.' ? '\\.' : delimiter === ' ' ? '\\s' : delimiter;
  const normalized = text
    .replace(new RegExp(escapedDelimiter, 'g'), '')
    .replace(separator, '.');
  return parseFloat(normalized);
}
