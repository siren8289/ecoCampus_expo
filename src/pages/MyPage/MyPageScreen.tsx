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
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

interface ActivityItem {
  id: string;
  icon: string;
  title: string;
  timeAgo: string;
  points: number;
  type: 'earn' | 'spend';
}

interface UserStats {
  points: number;
  completedMissions: number;
  ranking: number;
}

export const MyPageScreen: React.FC = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('나환경');
  const [userDepartment, setUserDepartment] = useState('사무행정과');
  const [userLevel, setUserLevel] = useState(2);
  const [userCharacter, setUserCharacter] = useState('나무');
  const [stats, setStats] = useState<UserStats>({
    points: 1250,
    completedMissions: 42,
    ranking: 12,
  });

  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: '1',
      icon: '⚡',
      title: '절전 미션 성공',
      timeAgo: '2시간 전',
      points: 50,
      type: 'earn',
    },
    {
      id: '2',
      icon: '⚡',
      title: '절전 미션 성공',
      timeAgo: '5시간 전',
      points: 30,
      type: 'earn',
    },
    {
      id: '3',
      icon: '🎁',
      title: '포인트 기부',
      timeAgo: '1일 전',
      points: 300,
      type: 'spend',
    },
  ]);

  // 통계 데이터 업데이트 시뮬레이션
  useEffect(() => {
    const interval = setInterval(() => {
      // 가끔 포인트가 증가하는 시뮬레이션
      if (Math.random() > 0.95) {
        setStats((prev) => ({
          ...prev,
          points: prev.points + 10,
        }));
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleEditProfile = () => {
    Alert.alert('내 정보 수정', '내 정보 수정 화면으로 이동합니다.');
  };

  const handleLogout = () => {
    Alert.alert(
      '로그아웃',
      '정말 로그아웃하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '로그아웃',
          style: 'destructive',
          onPress: () => {
            Alert.alert('로그아웃 완료', '로그아웃되었습니다.');
          },
        },
      ]
    );
  };

  const handleViewAllActivities = () => {
    // 포인트 페이지로 이동
    // @ts-ignore - React Navigation type issue
    navigation.navigate('Mission', { screen: 'Point' });
  };

  const handlePointsPress = () => {
    // 포인트 페이지로 이동
    // @ts-ignore - React Navigation type issue
    navigation.navigate('Mission', { screen: 'Point' });
  };

  const handleSettingsPress = () => {
    // 설정 페이지로 이동
    // @ts-ignore - React Navigation type issue
    navigation.navigate('My', { screen: 'Settings' });
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
        <Text style={styles.topBarTitle}>마이페이지</Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={handleSettingsPress}
          activeOpacity={0.7}
        >
          <Ionicons name="settings-outline" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.profileIcon}>
              <Ionicons name="person" size={40} color="#000" />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{userName}</Text>
              <Text style={styles.profileDepartment}>{userDepartment}</Text>
              <View style={styles.levelBadge}>
                <Ionicons name="leaf" size={14} color="#fff" />
                <Text style={styles.levelText}>
                  {userCharacter} Lv.{userLevel}
                </Text>
              </View>
            </View>
          </View>

          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            <TouchableOpacity
              style={[styles.statCard, styles.pointsCard]}
              onPress={handlePointsPress}
              activeOpacity={0.7}
            >
              <Ionicons name="wallet-outline" size={20} color="#666" />
              <Text style={styles.statLabel}>보유 포인트</Text>
              <Text style={styles.statValue}>
                {stats.points.toLocaleString()}P
              </Text>
            </TouchableOpacity>

            <View style={[styles.statCard, styles.missionCard]}>
              <Ionicons name="trophy-outline" size={20} color="#666" />
              <Text style={styles.statLabel}>완료 미션</Text>
              <Text style={styles.statValue}>{stats.completedMissions}개</Text>
            </View>

            <View style={[styles.statCard, styles.rankingCard]}>
              <Ionicons name="trending-up-outline" size={20} color="#666" />
              <Text style={styles.statLabel}>현재 랭킹</Text>
              <Text style={styles.statValue}>{stats.ranking}위</Text>
            </View>
          </View>
        </View>

        {/* My Activities Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>나의 활동</Text>
            <TouchableOpacity
              onPress={handleViewAllActivities}
              activeOpacity={0.7}
            >
              <Text style={styles.viewAllText}>전체보기</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.activitiesContainer}>
            {activities.map((activity) => (
              <View key={activity.id} style={styles.activityCard}>
                <View
                  style={[
                    styles.activityIconContainer,
                    activity.type === 'earn'
                      ? styles.earnIconContainer
                      : styles.spendIconContainer,
                  ]}
                >
                  <Text style={styles.activityIcon}>{activity.icon}</Text>
                </View>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  <Text style={styles.activityTime}>{activity.timeAgo}</Text>
                </View>
                <View
                  style={[
                    styles.pointsBadge,
                    activity.type === 'earn'
                      ? styles.earnPointsBadge
                      : styles.spendPointsBadge,
                  ]}
                >
                  <Text
                    style={[
                      styles.pointsText,
                      activity.type === 'earn'
                        ? styles.earnPointsText
                        : styles.spendPointsText,
                    ]}
                  >
                    {activity.type === 'earn' ? '+' : '-'}
                    {activity.points}P
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Account Management Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>계정 관리</Text>
          <View style={styles.accountMenuContainer}>
            <TouchableOpacity
              style={styles.accountMenuItem}
              onPress={handleEditProfile}
              activeOpacity={0.7}
            >
              <Text style={styles.accountMenuText}>내 정보 수정</Text>
              <Ionicons name="chevron-forward" size={16} color="#6a7282" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.accountMenuItem}
              onPress={handleLogout}
              activeOpacity={0.7}
            >
              <Text style={[styles.accountMenuText, styles.logoutText]}>
                로그아웃
              </Text>
              <Ionicons name="chevron-forward" size={16} color="#6a7282" />
            </TouchableOpacity>
          </View>
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
  settingsButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderWidth: 0.7,
    borderColor: '#d1d5dc',
    borderRadius: 14,
    padding: 25,
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 40,
  },
  profileIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    gap: 4,
  },
  profileName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '400',
    letterSpacing: -0.31,
  },
  profileDepartment: {
    fontSize: 14,
    color: '#666',
    fontWeight: '400',
    letterSpacing: -0.15,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#81d18a',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  levelText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '400',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  statCard: {
    flex: 1,
    height: 94,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
  },
  pointsCard: {
    backgroundColor: '#ffebaa',
  },
  missionCard: {
    backgroundColor: '#caf1ce',
  },
  rankingCard: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ebebeb',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  statValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    letterSpacing: -0.31,
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#101828',
    fontWeight: '400',
    letterSpacing: -0.31,
  },
  viewAllText: {
    fontSize: 14,
    color: '#81d18a',
    fontWeight: '400',
    letterSpacing: -0.15,
  },
  activitiesContainer: {
    gap: 8,
  },
  activityCard: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f5f5f5',
    borderRadius: 14,
    padding: 17,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  activityIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  earnIconContainer: {
    backgroundColor: '#f0f9f1',
  },
  spendIconContainer: {
    backgroundColor: '#fff9e6',
  },
  activityIcon: {
    fontSize: 20,
  },
  activityInfo: {
    flex: 1,
    gap: 2,
  },
  activityTitle: {
    fontSize: 14,
    color: '#1e2939',
    fontWeight: '400',
    letterSpacing: -0.15,
  },
  activityTime: {
    fontSize: 12,
    color: '#99a1af',
    fontWeight: '400',
  },
  pointsBadge: {
    height: 36,
    borderRadius: 10,
    paddingHorizontal: 12,
    justifyContent: 'center',
    minWidth: 59,
  },
  earnPointsBadge: {
    backgroundColor: '#f0f9f1',
  },
  spendPointsBadge: {
    backgroundColor: '#f5f5f5',
  },
  pointsText: {
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: -0.15,
    textAlign: 'center',
  },
  earnPointsText: {
    color: '#81d18a',
  },
  spendPointsText: {
    color: '#666',
  },
  accountMenuContainer: {
    gap: 8,
    marginTop: 16,
  },
  accountMenuItem: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 52,
  },
  accountMenuText: {
    fontSize: 14,
    color: '#1e2939',
    fontWeight: '400',
    letterSpacing: -0.15,
  },
  logoutText: {
    color: '#fb2c36',
  },
  bottomSpacer: {
    height: 80,
  },
});

