import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen } from '../pages/Home/HomeScreen';
import { CharacterScreen } from '../pages/Character/CharacterScreen';
import { MissionStack } from './MissionStack';
import { SettingsScreen } from '../pages/Settings/SettingsScreen';
import { MyPageScreen } from '../pages/MyPage/MyPageScreen';
import { RankingScreen } from '../pages/Ranking/RankingScreen';

const Tab = createBottomTabNavigator();
const MyStack = createNativeStackNavigator();

const MyStackNavigator = () => {
  return (
    <MyStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MyStack.Screen name="MyPage" component={MyPageScreen} />
      <MyStack.Screen name="Settings" component={SettingsScreen} />
    </MyStack.Navigator>
  );
};

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Mission') {
              iconName = focused ? 'flag' : 'flag-outline';
            } else if (route.name === 'Character') {
              iconName = focused ? 'leaf' : 'leaf-outline';
            } else if (route.name === 'Ranking') {
              iconName = focused ? 'trophy' : 'trophy-outline';
            } else {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#6bbf76',
          tabBarInactiveTintColor: '#99a1af',
          tabBarStyle: {
            height: 90,
            paddingTop: 12,
            paddingBottom: 12,
            borderTopWidth: 0.7,
            borderTopColor: '#000',
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '400',
            marginTop: 4,
          },
          tabBarIconStyle: {
            marginTop: 0,
          },
          headerShown: false,
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: '홈',
          }}
        />
        <Tab.Screen
          name="Mission"
          component={MissionStack}
          options={{
            tabBarLabel: '미션',
          }}
        />
        <Tab.Screen
          name="Character"
          component={CharacterScreen}
          options={{
            tabBarLabel: '캐릭터',
          }}
        />
        <Tab.Screen
          name="Ranking"
          component={RankingScreen}
          options={{
            tabBarLabel: '랭킹',
          }}
        />
        <Tab.Screen
          name="My"
          component={MyStackNavigator}
          options={{
            tabBarLabel: 'MY',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

