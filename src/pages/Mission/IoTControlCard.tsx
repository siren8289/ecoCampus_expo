import React from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MissionDevice } from '../../types';

interface IoTControlCardProps {
  devices: MissionDevice[];
  isConnected: boolean;
  onDeviceToggle: (deviceId: string) => void;
  onStartMission: () => void;
  onViewAll: () => void;
}

export const IoTControlCard: React.FC<IoTControlCardProps> = ({
  devices,
  isConnected,
  onDeviceToggle,
  onStartMission,
  onViewAll,
}) => {
  const getDeviceIcon = (type: string) => {
    if (type === 'light') return 'bulb-outline';
    if (type === 'heating' || type === 'cooling') return 'snow-outline';
    return 'cube-outline';
  };

  const getDeviceIconColor = (type: string) => {
    if (type === 'light') return '#fff8ae';
    if (type === 'heating' || type === 'cooling') return '#bfdbfe';
    return '#e5e5e5';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>IoT 스마트 제어</Text>
          <Text style={styles.connectionStatus}>
            {isConnected ? 'BLE 연결됨' : 'BLE 연결 안됨'}
          </Text>
        </View>
        <TouchableOpacity onPress={onViewAll} activeOpacity={0.7}>
          <Text style={styles.viewAllText}>전체 보기</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>현재 강의실의 기기를 제어하세요.</Text>

      {devices.map((device) => (
        <View key={device.id} style={styles.deviceRow}>
          <View style={[styles.deviceIcon, { backgroundColor: getDeviceIconColor(device.type) }]}>
            <Ionicons name={getDeviceIcon(device.type)} size={24} color="#000" />
          </View>
          <Text style={styles.deviceName}>{device.name}</Text>
          <Switch
            value={device.status === 'on'}
            onValueChange={() => onDeviceToggle(device.id)}
            trackColor={{ false: '#cbced4', true: '#6bbf76' }}
            thumbColor="#fff"
          />
        </View>
      ))}

      <TouchableOpacity style={styles.missionButton} onPress={onStartMission} activeOpacity={0.7}>
        <Text style={styles.missionButtonText}>10분 절전 미션 시작하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 0.7,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    padding: 25,
    marginHorizontal: 16,
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleContainer: {
    gap: 4,
  },
  title: {
    fontSize: 24,
    color: '#000',
    fontWeight: '400',
    letterSpacing: -0.31,
  },
  connectionStatus: {
    fontSize: 20,
    color: '#04993a',
    fontWeight: '300',
    letterSpacing: -0.31,
  },
  viewAllText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
  },
  description: {
    fontSize: 16,
    color: '#4a5565',
    marginBottom: 16,
    letterSpacing: -0.31,
  },
  deviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  deviceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deviceName: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    marginLeft: 12,
    fontWeight: '400',
  },
  missionButton: {
    backgroundColor: '#81d18a',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  missionButtonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
    letterSpacing: -0.15,
  },
});
