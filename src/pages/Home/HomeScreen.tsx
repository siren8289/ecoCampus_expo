import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { TopBar } from '../../components/common/TopBar';
import { HomeHeader } from './HomeHeader';
import { LocationSection } from './LocationSection';
import { DeviceCard } from './DeviceCard';
import { SavingsCard } from './SavingsCard';
import { CharacterCard } from './CharacterCard';
import {
  MissionDevice,
  SavingsData,
  CharacterData,
  LocationData,
} from '../../types';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  const [devices, setDevices] = useState<MissionDevice[]>([
    {
      id: '1',
      name: '냉난방기',
      status: 'off',
      icon: 'snow',
      temperature: 23.5,
      type: 'cooling',
    },
    {
      id: '2',
      name: '전등',
      status: 'off',
      icon: 'bulb',
      powerUsage: 1.2,
      type: 'light',
    },
  ]);

  const [locationData, setLocationData] = useState<LocationData>({
    currentLocation: 'pc22실',
    totalPowerUsage: 1.2,
  });

  const [savingsData, setSavingsData] = useState<SavingsData>({
    todaySavings: 0.7,
    participatedMissions: 2,
    acquiredPoints: 120,
    departmentAverage: 12,
  });

  const [characterData] = useState<CharacterData>({
    level: 2,
    growthRate: 4,
  });

  // 전력 사용량 자동 업데이트 시뮬레이션
  useEffect(() => {
    const interval = setInterval(() => {
      setDevices((prevDevices) => {
        const updatedDevices = prevDevices.map((device) => {
          if (device.status === 'on' && device.powerUsage !== undefined) {
            // 켜져있을 때 전력 사용량 약간 증가
            return {
              ...device,
              powerUsage: (device.powerUsage || 0) + Math.random() * 0.01,
            };
          }
          return device;
        });

        // 총 전력 사용량 업데이트
        const totalPower = updatedDevices.reduce((sum, device) => {
          return sum + (device.powerUsage || 0);
        }, 0);
        
        if (totalPower > 0) {
          setLocationData((prev) => ({
            ...prev,
            totalPowerUsage: totalPower,
          }));
        }

        return updatedDevices;
      });
    }, 5000); // 5초마다 업데이트

    return () => clearInterval(interval);
  }, []);

  const handleDeviceToggle = (deviceId: string) => {
    setDevices((prevDevices) => {
      const updatedDevices = prevDevices.map((device) => {
        if (device.id === deviceId) {
          const newStatus: 'on' | 'off' = device.status === 'on' ? 'off' : 'on';
          
          // 절약량 업데이트 (꺼면 절약량 증가)
          if (newStatus === 'off' && device.status === 'on') {
            setSavingsData((prev) => ({
              ...prev,
              todaySavings: prev.todaySavings + 0.1,
              acquiredPoints: prev.acquiredPoints + 10,
            }));
          }
          
          return {
            ...device,
            status: newStatus,
            powerUsage:
              newStatus === 'on'
                ? (device.powerUsage || 0) + 0.5
                : Math.max(0, (device.powerUsage || 0) - 0.3),
          };
        }
        return device;
      });

      // 총 전력 사용량 업데이트
      const totalPower = updatedDevices.reduce((sum, device) => {
        return sum + (device.powerUsage || 0);
      }, 0);
      
      setLocationData((prev) => ({
        ...prev,
        totalPowerUsage: totalPower,
      }));

      return updatedDevices;
    });
  };

  const handlePowerControlPress = () => {
    Alert.alert('전력 제어', '전력 제어 화면으로 이동합니다.');
  };

  const handleNotificationPress = () => {
    Alert.alert('알림', '새로운 알림이 없습니다.');
  };

  const handleSettingsPress = () => {
    // @ts-ignore - React Navigation type issue
    navigation.navigate('My', { screen: 'Settings' });
  };

  const handlePointsPress = () => {
    // @ts-ignore - React Navigation type issue
    navigation.navigate('Mission', { screen: 'Point' });
  };


  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TopBar
          onNotificationPress={handleNotificationPress}
          onSettingsPress={handleSettingsPress}
        />
        <HomeHeader />
        <LocationSection
          locationData={locationData}
          onPowerControlPress={handlePowerControlPress}
        />
        
        <View style={styles.devicesContainer}>
          {devices.map((device) => (
            <DeviceCard
              key={device.id}
              device={device}
              onToggle={() => handleDeviceToggle(device.id)}
            />
          ))}
        </View>

        <SavingsCard data={savingsData} onPointsPress={handlePointsPress} />
        <CharacterCard data={characterData} />
        
        {/* 하단 네비게이션을 위한 여백 */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  devicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 16,
    gap: 12,
  },
  bottomSpacer: {
    height: 80,
  },
});

