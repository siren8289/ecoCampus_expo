import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MissionItem } from '../../types';

interface MissionItemCardProps {
  mission: MissionItem;
  onPress?: () => void;
}

export const MissionItemCard: React.FC<MissionItemCardProps> = ({ mission, onPress }) => {
  const getProgressColor = () => {
    if (mission.emoji === '📖') return '#7c5ab5';
    if (mission.emoji === '☕') return '#f19e47';
    if (mission.emoji === '♻️') return '#aaddbc';
    if (mission.emoji === '🚌') return '#48c2e4';
    return '#6bbf76';
  };

  const progressColor = getProgressColor();
  const progressPercentage = (mission.currentStep / mission.totalSteps) * 100;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={[styles.emojiContainer, { backgroundColor: progressColor }]}>
          <Text style={styles.emoji}>{mission.emoji}</Text>
        </View>
        
        <View style={styles.missionInfo}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>{mission.title}</Text>
            <View style={styles.pointsBadge}>
              <Text style={styles.pointsText}>+{mission.points}P</Text>
            </View>
          </View>
          
          <View style={styles.progressRow}>
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${progressPercentage}%`, backgroundColor: progressColor },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {mission.currentStep}/{mission.totalSteps}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 0.7,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    padding: 17,
    marginBottom: 12,
  },
  content: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  emojiContainer: {
    width: 48,
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 24,
  },
  missionInfo: {
    flex: 1,
    gap: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
    letterSpacing: -0.15,
  },
  pointsBadge: {
    borderRadius: 8,
    paddingVertical: 1,
    paddingHorizontal: 4,
    minHeight: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointsText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#e5e5e5',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#4a5565',
    minWidth: 25,
  },
});

