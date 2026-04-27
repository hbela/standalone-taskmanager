import { useTranslation } from './useTranslation';
import { formatMoney } from '../utils/moneyFormatter';

export function useFormattedAmount(amount: number | null | undefined, currency: string = 'USD'): string {
  const { locale, _key } = useTranslation();
  void _key;
  if (amount == null) return '';
  return formatMoney(amount, locale, currency);
}

export function useMoneyFormatter(currency: string = 'USD'): (amount: number) => string {
  const { locale, _key } = useTranslation();
  void _key;
  return (amount: number) => formatMoney(amount, locale, currency);
}
