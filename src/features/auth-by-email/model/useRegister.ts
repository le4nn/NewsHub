import { useCallback, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../../../shared/api/firebase';
import { getConfirmPasswordError, getPasswordError, isEmailValid } from './validators';

export function useRegister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordError = useMemo(() => getPasswordError(password), [password]);
  const confirmPasswordError = useMemo(
    () => getConfirmPasswordError(password, confirmPassword),
    [confirmPassword, password]
  );

  const isValid = useMemo(() => {
    return (
      isEmailValid(email) &&
      !passwordError &&
      !confirmPasswordError &&
      password.length > 0 &&
      confirmPassword.length > 0
    );
  }, [confirmPassword.length, confirmPasswordError, email, password.length, passwordError]);

  const onRegister = useCallback(async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
    } catch (e: any) {
      Alert.alert('Ошибка регистрации', e?.message ?? 'Неизвестная ошибка');
    } finally {
      setLoading(false);
    }
  }, [email, password]);

  return {
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
  };
}
