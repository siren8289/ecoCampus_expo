import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

interface ActivityItem {
  id: string;
  emoji: string;
  title: string;
  date: string;
  points: number;
}

interface WeeklyActivity {
  day: string;
  points: number;
}

export const PointScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [currentPoints, setCurrentPoints] = useState(850);
  const [weeklyIncrease, setWeeklyIncrease] = useState(240);
  const [activeTab, setActiveTab] = useState<'use' | 'donate'>('use');
  const [usedPoints, setUsedPoints] = useState(300);
  const [totalDonated, setTotalDonated] = useState(300);

  const [weeklyActivities, setWeeklyActivities] = useState<WeeklyActivity[]>([
    { day: '월', points: 15 },
    { day: '화', points: 30 },
    { day: '수', points: 45 },
    { day: '목', points: 60 },
    { day: '금', points: 75 },
  ]);

  const [recentActivities, setRecentActivities] = useState<ActivityItem[]>([
    {
      id: '1',
      emoji: '🍽️',
      title: '절전 미션 성공!',
      date: '2025.11.10 09:43',
      points: 50,
    },
    {
      id: '2',
      emoji: '🌍',
      title: '공모전 미션 성공!',
      date: '2025.11.09 14:22',
      points: 100,
    },
    {
      id: '3',
      emoji: '⏰',
      title: '콘센트 사용 미션 성공!',
      date: '2025.11.08 11:15',
      points: 20,
    },
    {
      id: '4',
      emoji: '♻️',
      title: '재활용 미션 성공!',
      date: '2025.11.07 16:30',
      points: 20,
    },
  ]);

  // 라우트에서 포인트 업데이트 받아오기
  useEffect(() => {
    if (route.params && 'updatedPoints' in route.params) {
      setCurrentPoints(route.params.updatedPoints as number);
    }
    if (route.params && 'updatedTotalDonated' in route.params) {
      setTotalDonated(route.params.updatedTotalDonated as number);
    }
  }, [route.params]);

  // 포인트 자동 업데이트 시뮬레이션
  useEffect(() => {
    const interval = setInterval(() => {
      // 가끔 포인트가 증가하는 시뮬레이션
      if (Math.random() > 0.95) {
        setCurrentPoints((prev) => prev + 10);
        setWeeklyIncrease((prev) => prev + 10);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const maxWeeklyPoints = Math.max(...weeklyActivities.map((a) => a.points), 100);

  // 주간 활동 데이터 업데이트 시뮬레이션
  useEffect(() => {
    const interval = setInterval(() => {
      // 금요일 포인트가 증가하는 시뮬레이션
      setWeeklyActivities((prev) =>
        prev.map((activity) => {
          if (activity.day === '금' && Math.random() > 0.9) {
            return { ...activity, points: Math.min(activity.points + 5, 100) };
          }
          return activity;
        })
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleUsePoints = () => {
    // @ts-ignore - React Navigation type issue
    navigation.navigate('PointUse', { currentPoints });
  };

  const handleDonatePoints = () => {
    // @ts-ignore - React Navigation type issue
    navigation.navigate('PointDonate', { currentPoints, totalDonated: 300 });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={20} color="#000" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>포인트</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Point Card */}
        <View style={styles.pointCard}>
          <View style={styles.pointHeader}>
            <View style={styles.pointIcon}>
              <Text style={styles.pointIconText}>My{'\n'}Point</Text>
            </View>
            <View style={styles.pointInfo}>
              <Text style={styles.pointIncrease}>
                이번주 미션 완료로 +{weeklyIncrease} 상승!
              </Text>
              <Text style={styles.pointValue}>{currentPoints}P</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#000" />
          </View>
        </View>

        {/* Tab Buttons */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'use' && styles.activeTabButton]}
            onPress={() => setActiveTab('use')}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabButtonText, activeTab === 'use' && styles.activeTabButtonText]}>
              사용하기
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'donate' && styles.activeTabButton]}
            onPress={() => setActiveTab('donate')}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabButtonText, activeTab === 'donate' && styles.activeTabButtonText]}>
              기부하기
            </Text>
          </TouchableOpacity>
        </View>

        {/* Weekly Activity Card */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>이번주 활동</Text>
          <View style={styles.weeklyCard}>
            <View style={styles.weeklyHeader}>
              <View style={styles.activityItem}>
                <Text style={styles.activityEmoji}>💡</Text>
                <View>
                  <Text style={styles.activityTitle}>전등 끄기</Text>
                  <Text style={styles.activityPoints}>+50</Text>
                </View>
              </View>
              <View style={styles.activityItem}>
                <Text style={styles.activityEmoji}>❄️</Text>
                <View>
                  <Text style={styles.activityTitle}>냉난방기 끄기</Text>
                  <Text style={styles.activityPoints}>+50</Text>
                </View>
              </View>
              <View style={styles.activityItem}>
                <Ionicons name="wallet-outline" size={20} color="#000" />
                <View>
                  <Text style={styles.activityTitle}>사용 Point</Text>
                  <Text style={styles.usedPointsText}>{usedPoints}P</Text>
                </View>
              </View>
            </View>

            {/* Chart */}
            <View style={styles.chartContainer}>
              <View style={styles.chart}>
                {weeklyActivities.map((activity, index) => {
                  const height = (activity.points / maxWeeklyPoints) * 100;
                  return (
                    <View key={activity.day} style={styles.chartBarContainer}>
                      <View style={[styles.chartBar, { height: `${height}%` }]} />
                      <Text style={styles.chartLabel}>{activity.day}</Text>
                    </View>
                  );
                })}
              </View>
              <View style={styles.chartYAxis}>
                <Text style={styles.chartYLabel}>60</Text>
                <Text style={styles.chartYLabel}>15</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Recent Activities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>최근 활동</Text>
          {recentActivities.map((activity) => (
            <View key={activity.id} style={styles.activityCard}>
              <View style={styles.activityCardContent}>
                <Text style={styles.activityCardEmoji}>{activity.emoji}</Text>
                <View style={styles.activityCardInfo}>
                  <Text style={styles.activityCardTitle}>{activity.title}</Text>
                  <Text style={styles.activityCardDate}>{activity.date}</Text>
                </View>
                <Text style={styles.activityCardPoints}>+{activity.points}P</Text>
              </View>
            </View>
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
    backgroundColor: '#fff',
  },
  topBar: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#fffbf0',
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  topBarTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000',
    letterSpacing: -0.44,
  },
  placeholder: {
    width: 36,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  pointCard: {
    backgroundColor: '#ffeba6',
    borderRadius: 14,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  pointHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  pointIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fbfbfb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointIconText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 20,
  },
  pointInfo: {
    flex: 1,
    gap: 4,
  },
  pointIncrease: {
    fontSize: 12,
    color: '#6a7282',
    fontWeight: '400',
  },
  pointValue: {
    fontSize: 36,
    color: '#000',
    fontWeight: '400',
    letterSpacing: 0.37,
  },
  tabContainer: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    backgroundColor: '#ebebeb',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabButton: {
    backgroundColor: '#6bbf76',
  },
  tabButtonText: {
    fontSize: 14,
    color: '#030213',
    fontWeight: '500',
    letterSpacing: -0.15,
  },
  activeTabButtonText: {
    color: '#fff',
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#000',
    fontWeight: '400',
    letterSpacing: -0.44,
    marginBottom: 16,
  },
  weeklyCard: {
    backgroundColor: '#d3efd6',
    borderWidth: 0.7,
    borderColor: '#d1d5dc',
    borderRadius: 14,
    padding: 17,
    gap: 16,
  },
  weeklyHeader: {
    gap: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  activityEmoji: {
    fontSize: 24,
  },
  activityTitle: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
    letterSpacing: -0.31,
  },
  activityPoints: {
    fontSize: 12,
    color: '#000',
    fontWeight: '400',
    letterSpacing: -0.31,
  },
  usedPointsText: {
    fontSize: 12,
    color: '#000',
    fontWeight: '400',
    letterSpacing: -0.44,
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    height: 95,
    marginTop: 8,
  },
  chart: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: '100%',
  },
  chartBarContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%',
  },
  chartBar: {
    width: '100%',
    backgroundColor: '#6bbf76',
    borderRadius: 4,
    minHeight: 4,
  },
  chartLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  chartYAxis: {
    width: 30,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  chartYLabel: {
    fontSize: 12,
    color: '#666',
  },
  activityCard: {
    backgroundColor: '#ebebeb',
    borderWidth: 0.7,
    borderColor: '#e5e5e5',
    borderRadius: 14,
    padding: 17,
    marginBottom: 12,
  },
  activityCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  activityCardEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  activityCardInfo: {
    flex: 1,
    gap: 4,
  },
  activityCardTitle: {
    fontSize: 14,
    color: '#000',
    fontWeight: '400',
    letterSpacing: -0.15,
  },
  activityCardDate: {
    fontSize: 12,
    color: '#6a7282',
    fontWeight: '400',
  },
  activityCardPoints: {
    fontSize: 16,
    color: '#6bbf76',
    fontWeight: '400',
    letterSpacing: -0.31,
  },
  bottomSpacer: {
    height: 80,
  },
});

