import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MissionDevice } from '../../types';

interface DeviceCardProps {
  device: MissionDevice;
  onPress?: () => void;
  onToggle?: () => void;
}

export const DeviceCard: React.FC<DeviceCardProps> = ({
  device,
  onPress,
  onToggle,
}) => {
  const getIcon = () => {
    if (device.type === 'light') {
      return 'bulb-outline';
    } else if (device.type === 'heating' || device.type === 'cooling') {
      return 'snow-outline';
    }
    return 'cube-outline';
  };

  const getStatusColor = () => {
    return device.status === 'on' ? '#6bbf76' : '#d1d5dc';
  };

  const getStatusText = () => {
    return device.status === 'on' ? '켜짐' : '꺼짐';
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: getStatusColor() }]}>
          <Ionicons name={getIcon()} size={32} color="#000" />
        </View>
        
        <Text style={styles.deviceName}>{device.name}</Text>
        
        <TouchableOpacity
          style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}
          onPress={onToggle}
          activeOpacity={0.7}
        >
          <Text style={styles.statusText}>{getStatusText()}</Text>
        </TouchableOpacity>
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>
            {device.temperature !== undefined ? '실내 온도' : '전력 사용량'}
          </Text>
          <Text style={styles.infoValue}>
            {device.temperature !== undefined
              ? `${device.temperature.toFixed(1)}°C`
              : `${device.powerUsage?.toFixed(1) || 0} kWh`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 163.5,
    height: 201,
    backgroundColor: '#f4f4f4',
    borderRadius: 12,
    padding: 16,
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    marginBottom: 8,
    textAlign: 'center',
  },
  statusBadge: {
    height: 25,
    minWidth: 50,
    borderRadius: 12.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  statusText: {
    fontSize: 14,
    color: '#4a5565',
    fontWeight: '400',
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6a7282',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    color: '#000',
    fontWeight: '400',
  },
});

