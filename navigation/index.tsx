import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Play } from '../screens';
import { RootStackParamList } from '../types';
import BottomTab from './BottomTab';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator >
      <Stack.Group screenOptions={{ headerShown: false, gestureEnabled: false }}>
        <Stack.Screen name="Main" component={BottomTab} />
        <Stack.Screen name="Play" component={Play} />
      </Stack.Group>
    </Stack.Navigator>
  );
}