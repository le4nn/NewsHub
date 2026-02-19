import { useCallback, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../../../shared/api/firebase';
import { isEmailValid } from './validators';

export function useLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const isValid = useMemo(() => isEmailValid(email) && password.length >= 6, [email, password.length]);

  const onLogin = useCallback(async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (e: any) {
      Alert.alert('Ошибка входа', e?.message ?? 'Неизвестная ошибка');
    } finally {
      setLoading(false);
    }
  }, [email, password]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    passwordVisible,
    setPasswordVisible,
    loading,
    isValid,
    onLogin,
  };
}
