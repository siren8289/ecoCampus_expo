import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RankProgress } from '../../types';

interface RankProgressCardProps {
  progress: RankProgress;
}

export const RankProgressCard: React.FC<RankProgressCardProps> = ({ progress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>이미지</Text>
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.rankText}>{progress.currentRank}</Text>
            <Text style={styles.pointsText}>다음 등급까지 {progress.pointsToNextRank}P</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBarFill, { width: `${progress.progress}%` }]} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 0.7,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    padding: 16,
    marginHorizontal: 17,
    marginTop: 16,
  },
  content: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#e5e5e5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 14,
    color: '#4a5565',
  },
  progressContainer: {
    flex: 1,
    gap: 4,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rankText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
    letterSpacing: -0.15,
  },
  pointsText: {
    fontSize: 14,
    color: '#4a5565',
    textAlign: 'right',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#e5e5e5',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#6bbf76',
    borderRadius: 4,
  },
});
