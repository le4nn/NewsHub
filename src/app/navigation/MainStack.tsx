import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from './types';
import { AuthedWebScreen } from '../../screens/AuthedWebScreen';
import { DetailWebScreen } from '../../screens/DetailWebScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AuthedWeb" component={AuthedWebScreen} options={{ title: 'Новости' }} />
      <Stack.Screen
        name="DetailWeb"
        component={DetailWebScreen}
        options={({ route }) => ({ title: route.params.title ?? 'Детали' })}
      />
    </Stack.Navigator>
  );
}
