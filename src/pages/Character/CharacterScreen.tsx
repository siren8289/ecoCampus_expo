import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { CharacterTopBar } from './CharacterTopBar';
import { CharacterProgressCard } from './CharacterProgressCard';
import { StatusCard } from './StatusCard';
import { StreakSection } from './StreakSection';
import {
  CharacterProgress,
  StatusCardData,
  StreakData,
} from '../../types';

export const CharacterScreen: React.FC = () => {
  const navigation = useNavigation();

  const [characterProgress, setCharacterProgress] = useState<CharacterProgress>({
    currentLevel: 2,
    nextLevel: 3,
    progress: 35,
    missionsToNextLevel: 13,
    characterName: '나무',
    characterEmoji: '🌳',
  });

  const [statusCards, setStatusCards] = useState<StatusCardData[]>([
    { icon: '✅', label: '미션 완료', value: '2개' },
    { icon: '🌱', label: '오늘 성장', value: '+4% 증가' },
    { icon: '💰', label: '포인트', value: '+120P' },
  ]);

  const [streak, setStreak] = useState<StreakData>({
    days: 3,
    completedDays: [1, 2, 3],
    message: '3일 연속 미션 완료했어요!',
  });

  // 진행률 자동 업데이트 시뮬레이션
  useEffect(() => {
    const interval = setInterval(() => {
      setCharacterProgress((prev) => {
        if (prev.progress < 100) {
          const newProgress = Math.min(prev.progress + 0.1, 100);
          const missionsLeft = Math.max(
            0,
            prev.missionsToNextLevel - Math.floor((newProgress - prev.progress) / 7.7)
          );

          // 레벨업 체크
          if (newProgress >= 100 && missionsLeft === 0) {
            Alert.alert('레벨업!', `Lv.${prev.nextLevel} 달성!`);
            return {
              ...prev,
              currentLevel: prev.nextLevel,
              nextLevel: prev.nextLevel + 1,
              progress: 0,
              missionsToNextLevel: 20,
            };
          }

          return {
            ...prev,
            progress: newProgress,
            missionsToNextLevel: missionsLeft,
          };
        }
        return prev;
      });
    }, 3000); // 3초마다 업데이트

    return () => clearInterval(interval);
  }, []);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleDecoratePress = () => {
    Alert.alert('꾸미기', '캐릭터 꾸미기 기능입니다.');
  };

  const handleMissionPress = () => {
    Alert.alert('미션하기', '미션 화면으로 이동합니다.');
  };


  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <CharacterTopBar onBackPress={handleBackPress} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          {/* Character Progress Card */}
          <CharacterProgressCard
            progress={characterProgress}
            onDecoratePress={handleDecoratePress}
            onMissionPress={handleMissionPress}
          />

          {/* Today's Growth Section */}
          <View style={styles.growthSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionEmoji}>🌱</Text>
              <Text style={styles.sectionTitle}>오늘의 성장</Text>
            </View>
            <View style={styles.statusCardsContainer}>
              {statusCards.map((card, index) => (
                <StatusCard key={index} data={card} />
              ))}
            </View>
          </View>

          {/* Streak Section */}
          <StreakSection streak={streak} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  contentContainer: {
    paddingTop: 8,
  },
  growthSection: {
    paddingHorizontal: 24,
    marginTop: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionEmoji: {
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
    letterSpacing: -0.31,
  },
  statusCardsContainer: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
});

