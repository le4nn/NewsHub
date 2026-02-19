import Constants from 'expo-constants';

const extra = (Constants.expoConfig?.extra ?? {}) as Record<string, string | undefined>;

export function getEnv(key: string): string | undefined {
  return extra[key] ?? (process.env as Record<string, string | undefined>)[key];
}

export const env = {
  firebase: {
    apiKey: getEnv('EXPO_PUBLIC_FIREBASE_API_KEY'),
    authDomain: getEnv('EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN'),
    projectId: getEnv('EXPO_PUBLIC_FIREBASE_PROJECT_ID'),
    storageBucket: getEnv('EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: getEnv('EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'),
    appId: getEnv('EXPO_PUBLIC_FIREBASE_APP_ID'),
  },
  news: {
    apiKey: getEnv('EXPO_PUBLIC_NEWSAPI_KEY'),
    country: getEnv('EXPO_PUBLIC_NEWS_COUNTRY') ?? 'kz',
  },
} as const;
