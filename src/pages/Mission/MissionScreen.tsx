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
import { MissionTopBar } from './MissionTopBar';
import { RankProgressCard } from './RankProgressCard';
import { IoTControlCard } from './IoTControlCard';
import { FilterTabs } from './FilterTabs';
import { CampusStatsCard } from './CampusStatsCard';
import { MissionItemCard } from './MissionItemCard';
import {
  RankProgress,
  MissionDevice,
  MissionItem,
  CampusStats,
  MissionFilter,
} from '../../types';

export const MissionScreen: React.FC = () => {
  const navigation = useNavigation();

  const [rankProgress, setRankProgress] = useState<RankProgress>({
    currentRank: '새싹 등급',
    nextRank: '잎새 등급',
    currentPoints: 350,
    pointsToNextRank: 650,
    progress: 35,
  });

  const [devices, setDevices] = useState<MissionDevice[]>([
    {
      id: '1',
      name: '전등',
      status: 'off',
      icon: 'bulb',
      type: 'light',
    },
    {
      id: '2',
      name: '냉난방기',
      status: 'off',
      icon: 'snow',
      type: 'cooling',
    },
  ]);

  const [isConnected, setIsConnected] = useState(true);
  const [activeFilter, setActiveFilter] = useState<MissionFilter>('all');

  const [campusStats, setCampusStats] = useState<CampusStats>({
    todaySavings: 1204,
    studentParticipation: 3450,
    wasteRooms: 3,
  });

  const [missions, setMissions] = useState<MissionItem[]>([
    {
      id: '1',
      title: '친환경 스토리',
      emoji: '📖',
      category: 'content',
      points: 10,
      progress: 25,
      totalSteps: 4,
      currentStep: 1,
      status: 'in-progress',
    },
    {
      id: '2',
      title: '텀블러 사용 인증',
      emoji: '☕',
      category: 'recycle',
      points: 10,
      progress: 50,
      totalSteps: 4,
      currentStep: 2,
      status: 'in-progress',
    },
    {
      id: '3',
      title: '분리수거 챌린지',
      emoji: '♻️',
      category: 'recycle',
      points: 10,
      progress: 25,
      totalSteps: 4,
      currentStep: 1,
      status: 'in-progress',
    },
    {
      id: '4',
      title: '에코 마일리지',
      emoji: '🚌',
      category: 'content',
      points: 10,
      progress: 75,
      totalSteps: 4,
      currentStep: 3,
      status: 'in-progress',
    },
  ]);

  // 필터링된 미션 목록
  const filteredMissions =
    activeFilter === 'all'
      ? missions
      : missions.filter((mission) => mission.category === activeFilter);

  // 등급 진행률 자동 업데이트
  useEffect(() => {
    const interval = setInterval(() => {
      setRankProgress((prev) => {
        if (prev.progress < 100) {
          const newProgress = Math.min(prev.progress + 0.1, 100);
          return {
            ...prev,
            progress: newProgress,
          };
        }
        return prev;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleFilterPress = () => {
    Alert.alert('필터', '필터 옵션을 선택하세요.');
  };

  const handleDeviceToggle = (deviceId: string) => {
    setDevices((prevDevices) =>
      prevDevices.map((device) => {
        if (device.id === deviceId) {
          const newStatus = device.status === 'on' ? 'off' : 'on';
          return {
            ...device,
            status: newStatus,
          };
        }
        return device;
      })
    );
  };

  const handleStartMission = () => {
    navigation.navigate('MissionDetail' as never);
  };

  const handleViewAll = () => {
    Alert.alert('전체 보기', '모든 기기 제어 화면으로 이동합니다.');
  };

  const handleSaveClick = () => {
    Alert.alert('절약하러 가기', '낭비 의심 강의실로 이동합니다.');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <MissionTopBar onBackPress={handleBackPress} onFilterPress={handleFilterPress} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 등급 진행 카드 */}
        <RankProgressCard progress={rankProgress} />

        {/* IoT 제어 카드 */}
        <IoTControlCard
          devices={devices}
          isConnected={isConnected}
          onDeviceToggle={handleDeviceToggle}
          onStartMission={handleStartMission}
          onViewAll={handleViewAll}
        />

        {/* 필터 탭 */}
        <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />

        {/* 캠퍼스 절전 현황 */}
        <CampusStatsCard stats={campusStats} onSaveClick={handleSaveClick} />

        {/* 오늘의 미션 */}
        <View style={styles.missionsSection}>
          <Text style={styles.missionsTitle}>오늘의 미션</Text>
          {filteredMissions.map((mission) => (
            <MissionItemCard
              key={mission.id}
              mission={mission}
              onPress={() => navigation.navigate('MissionDetail' as never)}
            />
          ))}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  missionsSection: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  missionsTitle: {
    fontSize: 20,
    color: '#000',
    fontWeight: '400',
    letterSpacing: -0.31,
    marginBottom: 12,
  },
  bottomSpacer: {
    height: 80,
  },
});
