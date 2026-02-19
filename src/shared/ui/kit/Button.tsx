import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';

type Variant = 'primary' | 'outline';

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: Variant;
  style?: ViewStyle;
};

export function Button({ title, onPress, disabled, loading, variant = 'primary', style }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        variant === 'primary' ? styles.primary : styles.outline,
        pressed && styles.pressed,
        (disabled || loading) && styles.disabled,
        style,
      ]}
    >
      <Text style={[styles.text, variant === 'primary' ? styles.primaryText : styles.outlineText]}>
        {loading ? 'Загрузка...' : title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: { backgroundColor: '#0B0B0B' },
  outline: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#111' },
  text: { fontSize: 16, fontWeight: '700' },
  primaryText: { color: '#fff' },
  outlineText: { color: '#111' },
  pressed: { opacity: 0.9 },
  disabled: { opacity: 0.5 },
});
