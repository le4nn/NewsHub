import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
  onPress: () => void;
};

export function BiometricLoginButton({ onPress }: Props) {
  return (
    <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={onPress}>
      <MaterialIcons name="fingerprint" size={20} color="#111" style={styles.icon} />
      <Text style={styles.text}>Войти через Face ID / Touch ID</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#111',
    borderRadius: 18,
    paddingVertical: 14,
  },
  pressed: { opacity: 0.85 },
  icon: { marginRight: 10 },
  text: { color: '#111', fontSize: 15, fontWeight: '600' },
});
