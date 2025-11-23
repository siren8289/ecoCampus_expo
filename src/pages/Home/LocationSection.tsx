import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LocationData } from '../../types';

interface LocationSectionProps {
  locationData: LocationData;
  onPowerControlPress?: () => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({
  locationData,
  onPowerControlPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.locationText}>현재 위치 {locationData.currentLocation}</Text>
        <TouchableOpacity 
          style={styles.powerControlButton}
          onPress={onPowerControlPress}
          activeOpacity={0.7}
        >
          <Text style={styles.powerControlText}>전력 제어</Text>
          <Ionicons name="chevron-forward" size={16} color="#4a5565" />
        </TouchableOpacity>
      </View>
      <Text style={styles.powerUsageText}>
        총 전력 사용량 {locationData.totalPowerUsage.toFixed(1)} kWh
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 16,
    gap: 4,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
    letterSpacing: -0.31,
  },
  powerControlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  powerControlText: {
    fontSize: 16,
    color: '#4a5565',
    fontWeight: '500',
    letterSpacing: -0.15,
  },
  powerUsageText: {
    fontSize: 16,
    color: '#4a5565',
    fontWeight: '400',
    letterSpacing: -0.15,
  },
});

