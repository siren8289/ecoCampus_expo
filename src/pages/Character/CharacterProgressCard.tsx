import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CharacterProgress } from '../../types';

interface CharacterProgressCardProps {
  progress: CharacterProgress;
  onDecoratePress?: () => void;
  onMissionPress?: () => void;
}

export const CharacterProgressCard: React.FC<CharacterProgressCardProps> = ({
  progress,
  onDecoratePress,
  onMissionPress,
}) => {
  return (
    <View style={styles.container}>
      {/* Level Achievement Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>
          <Text style={styles.bannerHighlight}>Lv.{progress.nextLevel}</Text>
          {' '}달성까지 미션{' '}
          <Text style={styles.bannerHighlight}>{progress.missionsToNextLevel}개</Text>
          {' '}남았어요!
        </Text>
      </View>

      {/* Character Display */}
      <View style={styles.characterContainer}>
        <View style={styles.characterCircle}>
          <Text style={styles.characterEmoji}>{progress.characterEmoji}</Text>
        </View>
      </View>

      {/* Level and Progress */}
      <View style={styles.progressContainer}>
        <View style={styles.levelRow}>
          <Text style={styles.levelText}>
            Lv.{progress.currentLevel} {progress.characterName}
          </Text>
          <Text style={styles.percentageText}>{progress.progress}%</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBarFill, { width: `${progress.progress}%` }]} />
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={onDecoratePress}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>꾸미기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={onMissionPress}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>미션하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  banner: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  bannerText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    fontWeight: '400',
    letterSpacing: -0.15,
  },
  bannerHighlight: {
    fontWeight: 'bold',
    color: '#6bbf76',
  },
  characterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 128,
    marginBottom: 12,
  },
  characterCircle: {
    width: 128,
    height: 128,
    alignItems: 'center',
    justifyContent: 'center',
  },
  characterEmoji: {
    fontSize: 128,
    lineHeight: 128,
  },
  progressContainer: {
    gap: 12,
    marginBottom: 16,
  },
  levelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  levelText: {
    fontSize: 24,
    color: '#000',
    fontWeight: '400',
    letterSpacing: -0.45,
  },
  percentageText: {
    fontSize: 24,
    color: '#000',
    fontWeight: '400',
    letterSpacing: -0.45,
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: 'rgba(3, 2, 19, 0.2)',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#6bbf76',
    borderRadius: 6,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  button: {
    flex: 1,
    backgroundColor: '#ebebeb',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  buttonText: {
    fontSize: 16,
    color: '#030213',
    fontWeight: '400',
    letterSpacing: -0.15,
  },
});

