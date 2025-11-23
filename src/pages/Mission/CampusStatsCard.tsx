import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CampusStats } from '../../types';

interface CampusStatsCardProps {
  stats: CampusStats;
  onSaveClick: () => void;
}

export const CampusStatsCard: React.FC<CampusStatsCardProps> = ({ stats, onSaveClick }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>캠퍼스 절전 현황</Text>
      
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>📊</Text>
          <View style={styles.statContent}>
            <Text style={styles.statLabel}>오늘 절감량</Text>
            <Text style={styles.statValue}>
              <Text style={styles.statValueBold}>{stats.todaySavings.toLocaleString()}</Text>
              {' '}kWh
            </Text>
          </View>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>👥</Text>
          <View style={styles.statContent}>
            <Text style={styles.statLabel}>학생 참여</Text>
            <Text style={styles.statValue}>
              <Text style={styles.statValueBold}>{stats.studentParticipation.toLocaleString()}</Text>
              {' '}회
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.wasteCard}>
        <Text style={styles.wasteEmoji}>⚠️</Text>
        <Text style={styles.wasteText}>낭비 의심 강의실 {stats.wasteRooms}개</Text>
        <View style={styles.saveButton}>
          <Text style={styles.saveButtonText}>절약하러 가기</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 17,
    marginTop: 16,
  },
  title: {
    fontSize: 24,
    color: '#000',
    fontWeight: '400',
    letterSpacing: -0.31,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eaeaea',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  statEmoji: {
    fontSize: 34,
  },
  statContent: {
    gap: 8,
  },
  statLabel: {
    fontSize: 16,
    color: '#4a5565',
    fontWeight: '400',
  },
  statValue: {
    fontSize: 20,
    color: '#000',
    fontWeight: '400',
  },
  statValueBold: {
    fontWeight: '500',
  },
  wasteCard: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eaeaea',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  wasteEmoji: {
    fontSize: 20,
  },
  wasteText: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
    letterSpacing: -0.15,
  },
  saveButton: {
    backgroundColor: '#81d18a',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
    minHeight: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '400',
    letterSpacing: -0.15,
  },
});
