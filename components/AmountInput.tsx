import React from 'react';
import { TextInput as NativeTextInput, TextStyle } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import { useTranslation } from '../hooks/useTranslation';
import {
  decimalsFor,
  formatMoneyInputValue,
  getInputFormat,
  parseMoneyInput,
  sanitizeMoneyInput,
} from '../utils/moneyFormatter';

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
  const { separator } = getInputFormat(locale, currency);
  const precision = decimalsFor(currency);
  const [text, setText] = React.useState(formatMoneyInputValue(value, locale, currency));

  React.useEffect(() => {
    if (precision === 0 && value !== null && !Number.isInteger(value)) {
      onChangeValue(Math.trunc(value));
      return;
    }

    if (parseMoneyInput(text, locale, currency) === value) {
      return;
    }

    setText(formatMoneyInputValue(value, locale, currency));
  }, [currency, locale, onChangeValue, precision, separator, text, value]);

  const handleChangeText = React.useCallback((nextText: string) => {
    const sanitized = sanitizeMoneyInput(nextText, locale, currency);
    setText(sanitized);
    onChangeValue(parseMoneyInput(sanitized, locale, currency));
  }, [currency, locale, onChangeValue]);

  return (
    <TextInput
      mode="outlined"
      label={label}
      error={error}
      disabled={disabled}
      style={[{ flex: 1 }, style]}
      render={(props) => (
        <NativeTextInput
          {...props}
          value={text}
          onChangeText={handleChangeText}
          keyboardType={precision === 0 ? 'number-pad' : 'decimal-pad'}
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
