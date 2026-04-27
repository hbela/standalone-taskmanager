import React from 'react';
import { TextStyle } from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import { TextInput, useTheme } from 'react-native-paper';
import { useTranslation } from '../hooks/useTranslation';
import { decimalsFor, getInputFormat } from '../utils/moneyFormatter';

interface AmountInputProps {
  value: number | null;
  onChangeValue: (value: number | null) => void;
  currency?: string;
  label?: string;
  error?: boolean;
  disabled?: boolean;
  style?: object;
}

export default function AmountInput({
  value,
  onChangeValue,
  currency = 'USD',
  label,
  error = false,
  disabled = false,
  style,
}: AmountInputProps) {
  const { locale } = useTranslation();
  const theme = useTheme();
  const { delimiter, separator } = getInputFormat(locale);
  const precision = decimalsFor(currency);

  return (
    <TextInput
      mode="outlined"
      label={label}
      error={error}
      disabled={disabled}
      style={[{ flex: 1 }, style]}
      render={(props) => (
        <CurrencyInput
          value={value}
          onChangeValue={onChangeValue}
          delimiter={delimiter}
          separator={separator}
          precision={precision}
          minValue={0}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          editable={!disabled}
          style={[
            props.style as TextStyle,
            {
              color: theme.colors.onSurface,
              paddingHorizontal: 14,
              paddingVertical: 8,
              fontSize: 16,
            },
          ]}
          placeholderTextColor={theme.colors.onSurfaceVariant}
        />
      )}
    />
  );
}
