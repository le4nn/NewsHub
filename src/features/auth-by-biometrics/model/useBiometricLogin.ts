import { useCallback } from 'react';
import { Alert } from 'react-native';

import { authenticateWithBiometrics, canUseBiometrics } from '../../../shared/lib/biometrics';
import { getRefreshToken, isBiometricEnabled } from '../../../shared/lib/secure-store/authStorage';

type Params = {
  onBiometricsVerified?: () => void;
};

export function useBiometricLogin({ onBiometricsVerified }: Params = {}) {
  return useCallback(async () => {
    const enabled = await isBiometricEnabled();
    if (!enabled) {
      Alert.alert('Вход по биометрии не включён');
      return;
    }

    const token = await getRefreshToken();
    if (!token) {
      Alert.alert('Нет сохранённой сессии. Сначала войдите по email и паролю.');
      return;
    }

    const supported = await canUseBiometrics();
    if (!supported) {
      Alert.alert('Биометрия недоступна');
      return;
    }

    const ok = await authenticateWithBiometrics('Подтвердите вход');
    if (!ok) return;

    Alert.alert('Биометрия подтверждена', 'Теперь войдите один раз по email и паролю, чтобы обновить сессию.');
    onBiometricsVerified?.();
  }, [onBiometricsVerified]);
}
