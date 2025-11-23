import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SavingsData } from '../../types';

interface SavingsCardProps {
  data: SavingsData;
  onPointsPress?: () => void;
}

export const SavingsCard: React.FC<SavingsCardProps> = ({ data, onPointsPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPointsPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={styles.emoji}>🌱</Text>
        <Text style={styles.title}>오늘의 절약 현황 카드</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.label}>오늘의 절약량</Text>
          <Text style={styles.value}>{data.todaySavings.toFixed(1)} kWh</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>참여 미션</Text>
          <Text style={styles.value}>{data.participatedMissions} 개</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>획득 포인트</Text>
          <Text style={styles.value}>+ {data.acquiredPoints} P</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>학과 평균 대비</Text>
          <Text style={[styles.value, styles.positiveValue]}>
            + {data.departmentAverage} %
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    padding: 20,
    marginHorizontal: 16,
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  emoji: {
    fontSize: 20,
    lineHeight: 28,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    letterSpacing: -0.31,
  },
  content: {
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#4a5565',
    fontWeight: '400',
    letterSpacing: -0.31,
  },
  value: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
    letterSpacing: -0.31,
  },
  positiveValue: {
    color: '#6bbf76',
  },
});

