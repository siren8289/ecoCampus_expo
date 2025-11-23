import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

interface RankingUser {
  id: string;
  rank: number;
  name: string;
  department: string;
  points: number;
}

type RankingType = 'individual' | 'department';
type TimePeriod = 'daily' | 'weekly' | 'monthly';

export const RankingScreen: React.FC = () => {
  const navigation = useNavigation();
  const [rankingType, setRankingType] = useState<RankingType>('individual');
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('daily');
  const [myRank, setMyRank] = useState(12);
  const [myPoints, setMyPoints] = useState(850);
  const [myName, setMyName] = useState('나환경');
  const [myDepartment, setMyDepartment] = useState('사무행정과');

  const [rankingList, setRankingList] = useState<RankingUser[]>([
    {
      id: '1',
      rank: 1,
      name: '김환경',
      department: '빅데이터과',
      points: 3450,
    },
    {
      id: '2',
      rank: 2,
      name: '이환경',
      department: '치위생과',
      points: 3333,
    },
    {
      id: '3',
      rank: 3,
      name: '최환경',
      department: '아동보육과',
      points: 3000,
    },
    {
      id: '4',
      rank: 4,
      name: '윤환경',
      department: '산업디자인과',
      points: 2876,
    },
    {
      id: '5',
      rank: 5,
      name: '박환경',
      department: '항공과',
      points: 2777,
    },
    {
      id: '6',
      rank: 6,
      name: '정환경',
      department: '시각미디어과',
      points: 2456,
    },
    {
      id: '7',
      rank: 7,
      name: '강환경',
      department: '세무회계과',
      points: 2222,
    },
    {
      id: '8',
      rank: 8,
      name: '임환경',
      department: '소프트웨어융합과',
      points: 1234,
    },
    {
      id: '9',
      rank: 9,
      name: '조환경',
      department: '문예창작과',
      points: 1222,
    },
  ]);

  // 랭킹 데이터 업데이트 시뮬레이션
  useEffect(() => {
    const interval = setInterval(() => {
      // 가끔 포인트가 증가하는 시뮬레이션
      if (Math.random() > 0.95) {
        setMyPoints((prev) => prev + 10);
        // 랭킹 리스트도 업데이트
        setRankingList((prev) =>
          prev.map((user) => {
            if (user.id === '1' && Math.random() > 0.8) {
              return { ...user, points: user.points + 5 };
            }
            return user;
          })
        );
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // 탭/기간 변경 시 랭킹 데이터 필터링 (시뮬레이션)
  useEffect(() => {
    // 실제로는 API 호출로 데이터를 가져와야 함
    // 여기서는 시뮬레이션으로 포인트를 약간 변경
    const multiplier =
      timePeriod === 'daily' ? 1 : timePeriod === 'weekly' ? 1.2 : 1.5;
    setRankingList((prev) =>
      prev.map((user) => ({
        ...user,
        points: Math.floor(user.points * multiplier),
      }))
    );
  }, [timePeriod, rankingType]);

  const getRankIcon = (rank: number) => {
    if (rank === 1) {
      return <Ionicons name="trophy" size={24} color="#FFD700" />;
    } else if (rank === 2) {
      return <Ionicons name="trophy" size={24} color="#C0C0C0" />;
    } else if (rank === 3) {
      return <Ionicons name="trophy" size={24} color="#CD7F32" />;
    }
    return null;
  };

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return '#FFD700';
    if (rank === 2) return '#C0C0C0';
    if (rank === 3) return '#CD7F32';
    return '#ffd769';
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
        <Text style={styles.topBarTitle}>랭킹</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerText}>
            오늘도 절약 실천, 함께 만드는 캠퍼스 변화
          </Text>
        </View>

        {/* My Rank Card */}
        <View style={styles.myRankCard}>
          <View style={styles.myRankContent}>
            <View style={styles.myRankLeft}>
              <View
                style={[
                  styles.myRankBadge,
                  { backgroundColor: getRankBadgeColor(myRank) },
                ]}
              >
                <Text style={styles.myRankNumber}>{myRank}</Text>
              </View>
              <View style={styles.myRankInfo}>
                <Text style={styles.myRankLabel}>내 순위</Text>
                <Text style={styles.myRankName}>
                  <Text style={styles.myRankNameBold}>{myName}</Text>
                  <Text style={styles.myRankDepartment}>
                    {' '}
                    ({myDepartment})
                  </Text>
                </Text>
              </View>
            </View>
            <Text style={styles.myRankPoints}>{myPoints}P</Text>
          </View>
        </View>

        {/* Ranking Type Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              rankingType === 'individual' && styles.activeTabButton,
            ]}
            onPress={() => setRankingType('individual')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabButtonText,
                rankingType === 'individual' && styles.activeTabButtonText,
              ]}
            >
              개인 랭킹
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              rankingType === 'department' && styles.activeTabButton,
            ]}
            onPress={() => setRankingType('department')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabButtonText,
                rankingType === 'department' && styles.activeTabButtonText,
              ]}
            >
              학과 랭킹
            </Text>
          </TouchableOpacity>
        </View>

        {/* Ranking Title */}
        <View style={styles.rankingTitleContainer}>
          <Text style={styles.rankingTitle}>🏆 전체 랭킹</Text>
        </View>

        {/* Time Period Filters */}
        <View style={styles.periodContainer}>
          <TouchableOpacity
            style={[
              styles.periodButton,
              timePeriod === 'daily' && styles.activePeriodButton,
            ]}
            onPress={() => setTimePeriod('daily')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.periodButtonText,
                timePeriod === 'daily' && styles.activePeriodButtonText,
              ]}
            >
              일간
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.periodButton,
              timePeriod === 'weekly' && styles.activePeriodButton,
            ]}
            onPress={() => setTimePeriod('weekly')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.periodButtonText,
                timePeriod === 'weekly' && styles.activePeriodButtonText,
              ]}
            >
              주간
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.periodButton,
              timePeriod === 'monthly' && styles.activePeriodButton,
            ]}
            onPress={() => setTimePeriod('monthly')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.periodButtonText,
                timePeriod === 'monthly' && styles.activePeriodButtonText,
              ]}
            >
              월간
            </Text>
          </TouchableOpacity>
        </View>

        {/* Ranking List */}
        <View style={styles.rankingListContainer}>
          {rankingList.map((user) => (
            <View key={user.id} style={styles.rankingItem}>
              <View style={styles.rankingItemLeft}>
                {user.rank <= 3 ? (
                  <View style={styles.rankIconContainer}>
                    {getRankIcon(user.rank)}
                  </View>
                ) : (
                  <View
                    style={[
                      styles.rankBadge,
                      { backgroundColor: getRankBadgeColor(user.rank) },
                    ]}
                  >
                    <Text style={styles.rankNumber}>{user.rank}</Text>
                  </View>
                )}
                <View style={styles.rankingItemInfo}>
                  <Text style={styles.rankingItemName}>{user.name}</Text>
                  <Text style={styles.rankingItemDepartment}>
                    {user.department}
                  </Text>
                </View>
              </View>
              <Text style={styles.rankingItemPoints}>
                {user.points.toLocaleString()}P
              </Text>
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
    backgroundColor: '#fffbf0',
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
  banner: {
    backgroundColor: '#ffebaa',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
    height: 40,
    justifyContent: 'center',
  },
  bannerText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
    textAlign: 'center',
    letterSpacing: -0.31,
  },
  myRankCard: {
    backgroundColor: '#fff',
    borderWidth: 0.7,
    borderColor: '#d3d3d3',
    borderRadius: 12,
    padding: 17,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  myRankContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  myRankLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  myRankBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  myRankNumber: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '600',
    letterSpacing: -0.45,
  },
  myRankInfo: {
    gap: 4,
    flex: 1,
  },
  myRankLabel: {
    fontSize: 14,
    color: '#4a5565',
    fontWeight: '400',
    letterSpacing: -0.15,
  },
  myRankName: {
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: -0.31,
  },
  myRankNameBold: {
    color: '#333',
  },
  myRankDepartment: {
    color: '#666',
  },
  myRankPoints: {
    fontSize: 20,
    color: '#6bbf76',
    fontWeight: '400',
    letterSpacing: -0.45,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#dddcdc',
    borderRadius: 12,
    padding: 3,
    marginHorizontal: 16,
    marginBottom: 16,
    height: 36,
  },
  tabButton: {
    flex: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    height: 29,
  },
  activeTabButton: {
    backgroundColor: '#d9ebd9',
  },
  tabButtonText: {
    fontSize: 15,
    color: '#484848',
    fontWeight: '500',
    letterSpacing: -0.15,
  },
  activeTabButtonText: {
    color: '#000',
  },
  rankingTitleContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  rankingTitle: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
    letterSpacing: -0.31,
  },
  periodContainer: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e3e3e3',
    borderRadius: 12,
    padding: 5,
    marginHorizontal: 16,
    marginBottom: 16,
    gap: 4,
  },
  periodButton: {
    flex: 1,
    height: 28,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  activePeriodButton: {
    backgroundColor: '#81d18a',
  },
  periodButtonText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '400',
    letterSpacing: -0.15,
  },
  activePeriodButtonText: {
    color: '#000',
  },
  rankingListContainer: {
    paddingHorizontal: 16,
    gap: 8,
  },
  rankingItem: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rankingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  rankIconContainer: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankNumber: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
  },
  rankingItemInfo: {
    gap: 4,
    flex: 1,
  },
  rankingItemName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    letterSpacing: -0.31,
  },
  rankingItemDepartment: {
    fontSize: 14,
    color: '#666',
    fontWeight: '400',
  },
  rankingItemPoints: {
    fontSize: 16,
    color: '#6bbf76',
    fontWeight: '500',
    letterSpacing: -0.31,
  },
  bottomSpacer: {
    height: 80,
  },
});

