import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusCardData } from '../../types';

interface StatusCardProps {
  data: StatusCardData;
}

export const StatusCard: React.FC<StatusCardProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{data.icon}</Text>
      <Text style={styles.label}>{data.label}</Text>
      <Text style={styles.value}>{data.value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: 89,
    height: 132,
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 8,
  },
  icon: {
    fontSize: 24,
    lineHeight: 32,
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    color: '#4a5565',
    fontWeight: '400',
    textAlign: 'center',
  },
  value: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
    textAlign: 'center',
    letterSpacing: -0.15,
  },
});

