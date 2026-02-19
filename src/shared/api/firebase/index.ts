import { initializeApp, getApps } from 'firebase/app';
import { getAuth, initializeAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import { env } from '../../config/env';

const firebaseConfig = {
  apiKey: env.firebase.apiKey,
  authDomain: env.firebase.authDomain,
  projectId: env.firebase.projectId,
  storageBucket: env.firebase.storageBucket,
  messagingSenderId: env.firebase.messagingSenderId,
  appId: env.firebase.appId,
};

if (
  !firebaseConfig.apiKey ||
  !firebaseConfig.authDomain ||
  !firebaseConfig.projectId ||
  !firebaseConfig.storageBucket ||
  !firebaseConfig.messagingSenderId ||
  !firebaseConfig.appId
) {
  throw new Error(
    'Firebase config is missing. Ensure EXPO_PUBLIC_FIREBASE_* are set in app.json (expo.extra) or environment variables.'
  );
}

export const firebaseApp = getApps().length ? getApps()[0]! : initializeApp(firebaseConfig);

export const auth = (() => {
  try {
    return initializeAuth(firebaseApp, {
      persistence: {
        type: 'LOCAL',
        _isAvailable: async () => true,
        _set: (key: string, value: string) => ReactNativeAsyncStorage.setItem(key, value),
        _get: (key: string) => ReactNativeAsyncStorage.getItem(key),
        _remove: (key: string) => ReactNativeAsyncStorage.removeItem(key),
      } as any,
    });
  } catch {
    return getAuth(firebaseApp);
  }
})();
