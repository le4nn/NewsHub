import React, { useCallback, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { signOut } from 'firebase/auth';

import { RootStackParamList } from '../app/navigation/types';
import { auth } from '../firebase';
import { canUseBiometrics, authenticateWithBiometrics } from '../shared/lib/biometrics';
import { isBiometricEnabled, setBiometricEnabled, saveRefreshToken } from '../shared/lib/secure-store/authStorage';

type Props = NativeStackScreenProps<RootStackParamList, 'AuthedWeb'>;

export function HomeScreen({ navigation }: Props) {
  const [url, setUrl] = useState('https://example.com');
  const [bioEnabled, setBioEnabledState] = useState(false);

  const load = useCallback(async () => {
    const enabled = await isBiometricEnabled();
    setBioEnabledState(enabled);
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const onEnableBiometrics = useCallback(async () => {
    const supported = await canUseBiometrics();
    if (!supported) {
      Alert.alert('Biometrics not available');
      return;
    }

    const ok = await authenticateWithBiometrics('Enable biometric login');
    if (!ok) return;

    const token = (auth.currentUser as any)?.stsTokenManager?.refreshToken as string | undefined;
    if (!token) {
      Alert.alert('Token not found');
      return;
    }

    await saveRefreshToken(token);
    await setBiometricEnabled(true);
    setBioEnabledState(true);
  }, []);

  const onDisableBiometrics = useCallback(async () => {
    await setBiometricEnabled(false);
    setBioEnabledState(false);
  }, []);

  const onLogout = useCallback(async () => {
    await signOut(auth);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.subtitle}>Signed in as: {auth.currentUser?.email ?? 'unknown'}</Text>

      <View style={styles.spacer} />

      <TextInput value={url} onChangeText={setUrl} placeholder="https://..." style={styles.input} />
      <Button title="Open detail (WebView)" onPress={() => navigation.navigate('DetailWeb', { url, title: 'Web' })} />

      <View style={styles.spacer} />

      {bioEnabled ? (
        <Button title="Disable Face ID / Touch ID" onPress={onDisableBiometrics} />
      ) : (
        <Button title="Enable Face ID / Touch ID" onPress={onEnableBiometrics} />
      )}

      <View style={styles.spacer} />

      <Button title="Logout" onPress={onLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 4, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#555', textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8 },
  spacer: { height: 12 },
});
