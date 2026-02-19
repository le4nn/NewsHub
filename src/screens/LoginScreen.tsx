import React, { useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../app/navigation/types';
import { Card } from '../shared/ui/kit/Card';
import { TextField } from '../shared/ui/kit/TextField';
import { Button } from '../shared/ui/kit/Button';
import { Divider } from '../shared/ui/kit/Divider';
import { useLogin } from '../features/auth-by-email/model/useLogin';
import { useBiometricLogin } from '../features/auth-by-biometrics/model/useBiometricLogin';
import { BiometricLoginButton } from '../features/auth-by-biometrics/ui/BiometricLoginButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const { email, setEmail, password, setPassword, passwordVisible, setPasswordVisible, loading, isValid, onLogin } = useLogin();

  const onBiometricLogin = useBiometricLogin();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logo} />
        <Text style={styles.headerTitle}>Добро пожаловать в NewsHub</Text>
        <Text style={styles.headerSubtitle}>Ваш ежедневный источник качественных новостей</Text>
      </View>

      <Card style={styles.card}>
        <TextField
          value={email}
          onChangeText={setEmail}
          placeholder="Эл. почта"
          autoCapitalize="none"
          keyboardType="email-address"
          leftIcon="email"
        />

        <TextField
          value={password}
          onChangeText={setPassword}
          placeholder="Пароль"
          secureTextEntry={!passwordVisible}
          leftIcon="lock"
          rightIcon={passwordVisible ? 'visibility-off' : 'visibility'}
          onRightIconPress={() => setPasswordVisible(v => !v)}
        />

        <Button title="Войти" onPress={onLogin} disabled={!isValid} loading={loading} />

        <Divider label="или" />

        <BiometricLoginButton onPress={onBiometricLogin} />
      </Card>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Нет аккаунта? </Text>
        <Text style={styles.footerLink} onPress={() => navigation.navigate('Register')}>
          Зарегистрироваться
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 18, paddingTop: 60, backgroundColor: '#F3F4F6' },
  header: { alignItems: 'center', marginBottom: 28 },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: '#0B0B0B',
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
  },
  headerTitle: { fontSize: 28, fontWeight: '700', color: '#111', marginBottom: 8, textAlign: 'center' },
  headerSubtitle: { fontSize: 14, color: '#6B7280', textAlign: 'center' },
  card: {},
  outlineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#111',
    borderRadius: 18,
    paddingVertical: 14,
  },
  outlinePressed: { opacity: 0.85 },
  outlineIcon: { marginRight: 10 },
  outlineText: { color: '#111', fontSize: 15, fontWeight: '600' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 18 },
  footerText: { color: '#6B7280', fontSize: 14 },
  footerLink: { color: '#111', fontSize: 14, fontWeight: '700' },
});
