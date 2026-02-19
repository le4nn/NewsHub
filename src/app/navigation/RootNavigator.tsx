import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { useSession } from '../../processes/session/model/useSession';
import { AuthStack } from './AuthStack';
import { MainStack } from './MainStack';

export function RootNavigator() {
  const { user, initializing } = useSession();

  if (initializing) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator />
      </View>
    );
  }

  return <NavigationContainer>{user ? <MainStack /> : <AuthStack />}</NavigationContainer>;
}

const styles = StyleSheet.create({
  loader: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
