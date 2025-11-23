import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StreakData } from '../../types';

interface StreakSectionProps {
  streak: StreakData;
}

export const StreakSection: React.FC<StreakSectionProps> = ({ streak }) => {
  const totalDays = 7; // 한 주 총 일수

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.emoji}>🔥</Text>
        <Text style={styles.message}>{streak.message}</Text>
      </View>
      <View style={styles.streakContainer}>
        {Array.from({ length: totalDays }, (_, index) => {
          const isCompleted = streak.completedDays.includes(index + 1);
          return (
            <View
              key={index}
              style={[
                styles.streakCircle,
                isCompleted ? styles.completedCircle : styles.incompleteCircle,
              ]}
            >
              {isCompleted && (
                <Ionicons name="checkmark" size={20} color="#fff" />
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  emoji: {
    fontSize: 16,
  },
  message: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
    letterSpacing: -0.31,
  },
  streakContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  streakCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedCircle: {
    backgroundColor: '#6bbf76',
  },
  incompleteCircle: {
    backgroundColor: '#81d18a',
  },
});

