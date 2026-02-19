import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../app/navigation/types';
import { Card } from '../shared/ui/kit/Card';
import { TextField } from '../shared/ui/kit/TextField';
import { Button } from '../shared/ui/kit/Button';
import { useRegister } from '../features/auth-by-email/model/useRegister';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export function RegisterScreen({ navigation }: Props) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    passwordVisible,
    setPasswordVisible,
    confirmPasswordVisible,
    setConfirmPasswordVisible,
    loading,
    passwordError,
    confirmPasswordError,
    isValid,
    onRegister,
  } = useRegister();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logo} />
        <Text style={styles.headerTitle}>Создать аккаунт</Text>
        <Text style={styles.headerSubtitle}>Зарегистрируйтесь, чтобы читать качественные новости</Text>
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

        {!!passwordError && <Text style={styles.validationText}>{passwordError}</Text>}

        <TextField
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Повторите пароль"
          secureTextEntry={!confirmPasswordVisible}
          leftIcon="lock"
          rightIcon={confirmPasswordVisible ? 'visibility-off' : 'visibility'}
          onRightIconPress={() => setConfirmPasswordVisible(v => !v)}
        />

        {!!confirmPasswordError && <Text style={styles.validationText}>{confirmPasswordError}</Text>}

        <Button title="Зарегистрироваться" onPress={onRegister} disabled={!isValid} loading={loading} />
      </Card>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Уже есть аккаунт? </Text>
        <Text style={styles.footerLink} onPress={() => navigation.navigate('Login')}>
          Войти
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
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 18 },
  footerText: { color: '#6B7280', fontSize: 14 },
  footerLink: { color: '#111', fontSize: 14, fontWeight: '700' },
  validationText: { color: '#B00020', fontSize: 12, marginTop: -6, marginBottom: 10, marginLeft: 4 },
});
