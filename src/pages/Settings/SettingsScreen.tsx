import React, { useState } from 'react';
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

interface MenuItem {
  id: string;
  title: string;
  onPress: () => void;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('나환경');
  const [userDepartment, setUserDepartment] = useState('사무행정과');

  const handleEditProfile = () => {
    Alert.alert('프로필 편집', '프로필 편집 화면으로 이동합니다.');
  };

  const handleAccount = () => {
    Alert.alert('계정', '계정 관리 화면으로 이동합니다.');
  };

  const handleCompletedMissions = () => {
    Alert.alert('완료한 미션', '완료한 미션 목록 화면으로 이동합니다.');
  };

  const handlePointHistory = () => {
    // 포인트 사용 내역 페이지로 이동
    // @ts-ignore - React Navigation type issue
    navigation.navigate('Mission', { screen: 'Point' });
  };

  const handleNotificationSettings = () => {
    Alert.alert('알림 설정', '알림 설정 화면으로 이동합니다.');
  };

  const handleAppSettings = () => {
    Alert.alert('앱 설정', '앱 설정 화면으로 이동합니다.');
  };

  const handleCustomerCenter = () => {
    Alert.alert('고객센터', '고객센터 화면으로 이동합니다.');
  };

  const handleFAQ = () => {
    Alert.alert('FAQ', 'FAQ 화면으로 이동합니다.');
  };

  const handleInquiry = () => {
    Alert.alert('문의하기', '문의하기 화면으로 이동합니다.');
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
            // 로그아웃 로직
            Alert.alert('로그아웃 완료', '로그아웃되었습니다.');
          },
        },
      ]
    );
  };

  const menuSections: MenuSection[] = [
    {
      title: '내 정보',
      items: [
        {
          id: 'account',
          title: '계정',
          onPress: handleAccount,
        },
      ],
    },
    {
      title: '나의 활동',
      items: [
        {
          id: 'completed-missions',
          title: '완료한 미션',
          onPress: handleCompletedMissions,
        },
        {
          id: 'point-history',
          title: '포인트 사용 내역',
          onPress: handlePointHistory,
        },
      ],
    },
    {
      title: '설정',
      items: [
        {
          id: 'notification-settings',
          title: '알림 설정',
          onPress: handleNotificationSettings,
        },
        {
          id: 'app-settings',
          title: '앱 설정',
          onPress: handleAppSettings,
        },
      ],
    },
    {
      title: '고객지원',
      items: [
        {
          id: 'customer-center',
          title: '고객센터',
          onPress: handleCustomerCenter,
        },
        {
          id: 'faq',
          title: 'FAQ',
          onPress: handleFAQ,
        },
        {
          id: 'inquiry',
          title: '문의하기',
          onPress: handleInquiry,
        },
      ],
    },
    {
      title: '계정에서 나가기',
      items: [
        {
          id: 'logout',
          title: '로그아웃',
          onPress: handleLogout,
        },
      ],
    },
  ];

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
        <Text style={styles.topBarTitle}>설정</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileContent}>
            <View style={styles.profileLeft}>
              <View style={styles.profileIcon}>
                <Ionicons name="person" size={24} color="#000" />
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{userName}</Text>
                <Text style={styles.profileDepartment}>{userDepartment}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleEditProfile}
              activeOpacity={0.7}
            >
              <Text style={styles.editButtonText}>편집</Text>
              <Ionicons name="create-outline" size={12} color="#999" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.menuContainer}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.menuItem,
                    itemIndex === section.items.length - 1 && styles.lastMenuItem,
                  ]}
                  onPress={item.onPress}
                  activeOpacity={0.7}
                >
                  <Text style={styles.menuItemText}>{item.title}</Text>
                  <Ionicons name="chevron-forward" size={20} color="#6a7282" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

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
  profileCard: {
    backgroundColor: '#ffebaa',
    borderWidth: 0.7,
    borderColor: '#d1d5dc',
    borderRadius: 12,
    padding: 17,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  profileIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    gap: 4,
  },
  profileName: {
    fontSize: 20,
    color: '#000',
    fontWeight: '400',
    letterSpacing: -0.31,
  },
  profileDepartment: {
    fontSize: 16,
    color: '#4a5565',
    fontWeight: '400',
    letterSpacing: -0.15,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: '#d1d5dc',
    borderRadius: 14,
    paddingHorizontal: 4,
    paddingVertical: 4,
    height: 26,
    minWidth: 71,
    justifyContent: 'center',
  },
  editButtonText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '400',
    letterSpacing: -0.15,
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 16,
    gap: 4,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#696969',
    fontWeight: '400',
    letterSpacing: -0.31,
    marginBottom: 4,
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f0f0f0',
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuItemText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
    letterSpacing: -0.31,
  },
  bottomSpacer: {
    height: 80,
  },
});

