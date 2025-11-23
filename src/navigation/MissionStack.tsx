import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MissionScreen } from '../pages/Mission/MissionScreen';
import { MissionDetailScreen } from '../pages/Mission/MissionDetailScreen';
import { PointScreen } from '../pages/Point/PointScreen';
import { PointUseScreen } from '../pages/Point/PointUseScreen';
import { PointDonateScreen } from '../pages/Point/PointDonateScreen';

const Stack = createNativeStackNavigator();

export const MissionStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MissionList" component={MissionScreen} />
      <Stack.Screen name="MissionDetail" component={MissionDetailScreen} />
      <Stack.Screen name="Point" component={PointScreen} />
      <Stack.Screen name="PointUse" component={PointUseScreen} />
      <Stack.Screen name="PointDonate" component={PointDonateScreen} />
    </Stack.Navigator>
  );
};

