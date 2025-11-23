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

interface ExchangeItem {
  id: string;
  icon: string;
  title: string;
  discount: string;
  points: number;
  category: 'gifticon' | 'voucher';
}

export const PointUseScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [currentPoints, setCurrentPoints] = useState(850);
  const [activeTab, setActiveTab] = useState<'gifticon' | 'voucher'>('voucher');

  // 교환권 아이템들
  const [voucherItems] = useState<ExchangeItem[]>([
    {
      id: '1',
      icon: '🍽️',
      title: '교내 식당 할인권',
      discount: '10% 할인',
      points: 1500,
      category: 'voucher',
    },
    {
      id: '2',
      icon: '☕',
      title: '교내 카페 할인권',
      discount: '15% 할인',
      points: 1500,
      category: 'voucher',
    },
    {
      id: '3',
      icon: '🏪',
      title: '교내 편의점 할인권',
      discount: '10% 할인',
      points: 1500,
      category: 'voucher',
    },
    {
      id: '4',
      icon: '🎁',
      title: '교내 마일리지',
      discount: '10% 할인',
      points: 1500,
      category: 'voucher',
    },
    {
      id: '5',
      icon: '📚',
      title: '책 물려받기',
      discount: '10% 할인',
      points: 2000,
      category: 'voucher',
    },
    {
      id: '6',
      icon: '🛠️',
      title: '커스텀 재료 구매',
      discount: '10% 할인',
      points: 1000,
      category: 'voucher',
    },
  ]);

  // 기프티콘 아이템들
  const [gifticonItems] = useState<ExchangeItem[]>([
    {
      id: '7',
      icon: '☕',
      title: '스타벅스 아메리카노',
      discount: '',
      points: 300,
      category: 'gifticon',
    },
    {
      id: '8',
      icon: '🏪',
      title: 'CU 기프티콘',
      discount: '',
      points: 500,
      category: 'gifticon',
    },
    {
      id: '9',
      icon: '🏪',
      title: 'GS25 기프티콘',
      discount: '',
      points: 500,
      category: 'gifticon',
    },
    {
      id: '10',
      icon: '🛒',
      title: '이마트 기프티콘',
      discount: '',
      points: 1000,
      category: 'gifticon',
    },
    {
      id: '11',
      icon: '💄',
      title: '올리브영 기프티콘',
      discount: '',
      points: 1000,
      category: 'gifticon',
    },
    {
      id: '12',
      icon: '🍔',
      title: '배달의민족 기프티콘',
      discount: '',
      points: 1000,
      category: 'gifticon',
    },
  ]);

  // 라우트에서 포인트 받아오기
  useEffect(() => {
    if (route.params && 'currentPoints' in route.params) {
      setCurrentPoints(route.params.currentPoints as number);
    }
  }, [route.params]);

  const filteredItems =
    activeTab === 'voucher' ? voucherItems : gifticonItems;

  const handleItemPress = (item: ExchangeItem) => {
    if (currentPoints < item.points) {
      Alert.alert(
        '포인트 부족',
        `보유 포인트가 부족합니다.\n필요 포인트: ${item.points}P\n보유 포인트: ${currentPoints}P`,
        [{ text: '확인', style: 'default' }]
      );
      return;
    }

    Alert.alert(
      '교환 확인',
      `${item.title}을(를) ${item.points}P로 교환하시겠습니까?`,
      [
        {
          text: '취소',
          style: 'cancel',
        },
          {
          text: '교환',
          onPress: () => {
            const newPoints = currentPoints - item.points;
            setCurrentPoints(newPoints);
            Alert.alert('교환 완료', `${item.title} 교환이 완료되었습니다!`, [
              {
                text: '확인',
                onPress: () => {
                  // 포인트 페이지로 업데이트된 포인트 전달
                  // @ts-ignore - React Navigation type issue
                  navigation.navigate('Point', { updatedPoints: newPoints });
                  // 현재 화면도 업데이트
                  setCurrentPoints(newPoints);
                },
              },
            ]);
          },
        },
      ]
    );
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
              <Text style={styles.pointLabel}>현재 보유 포인트</Text>
              <Text style={styles.pointValue}>{currentPoints}P</Text>
            </View>
          </View>
        </View>

        {/* Tab Buttons */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'gifticon' && styles.activeTabButton]}
            onPress={() => setActiveTab('gifticon')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabButtonText,
                activeTab === 'gifticon' && styles.activeTabButtonText,
              ]}
            >
              기프티콘
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'voucher' && styles.activeTabButton]}
            onPress={() => setActiveTab('voucher')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabButtonText,
                activeTab === 'voucher' && styles.activeTabButtonText,
              ]}
            >
              교환권
            </Text>
          </TouchableOpacity>
        </View>

        {/* Items Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Point {activeTab === 'gifticon' ? '기프티콘' : '교환권'} 🎁
          </Text>
          <View style={styles.gridContainer}>
            <View style={styles.gridColumn}>
              {filteredItems
                .filter((_, index) => index % 2 === 0)
                .map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.itemCard,
                      currentPoints < item.points && styles.disabledCard,
                    ]}
                    onPress={() => handleItemPress(item)}
                    activeOpacity={0.7}
                    disabled={currentPoints < item.points}
                  >
                    <View style={styles.itemIconContainer}>
                      <Text style={styles.itemIcon}>{item.icon}</Text>
                    </View>
                    <Text style={styles.itemTitle} numberOfLines={2}>
                      {item.title}
                    </Text>
                    {item.discount && (
                      <Text style={styles.itemDiscount}>{item.discount}</Text>
                    )}
                    <Text style={styles.itemPoints}>{item.points}P</Text>
                  </TouchableOpacity>
                ))}
            </View>
            <View style={styles.gridColumn}>
              {filteredItems
                .filter((_, index) => index % 2 === 1)
                .map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.itemCard,
                      currentPoints < item.points && styles.disabledCard,
                    ]}
                    onPress={() => handleItemPress(item)}
                    activeOpacity={0.7}
                    disabled={currentPoints < item.points}
                  >
                    <View style={styles.itemIconContainer}>
                      <Text style={styles.itemIcon}>{item.icon}</Text>
                    </View>
                    <Text style={styles.itemTitle} numberOfLines={2}>
                      {item.title}
                    </Text>
                    {item.discount && (
                      <Text style={styles.itemDiscount}>{item.discount}</Text>
                    )}
                    <Text style={styles.itemPoints}>{item.points}P</Text>
                  </TouchableOpacity>
                ))}
            </View>
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
  pointLabel: {
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
    backgroundColor: '#1c1c1e',
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
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
    letterSpacing: -0.31,
    marginBottom: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  gridColumn: {
    flex: 1,
    gap: 16,
  },
  itemCard: {
    backgroundColor: '#ebebeb',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 150,
    gap: 4,
  },
  disabledCard: {
    opacity: 0.5,
  },
  itemIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  itemIcon: {
    fontSize: 24,
  },
  itemTitle: {
    fontSize: 14,
    color: '#000',
    fontWeight: '400',
    textAlign: 'center',
    letterSpacing: -0.15,
    minHeight: 40,
  },
  itemDiscount: {
    fontSize: 12,
    color: '#6a7282',
    fontWeight: '400',
  },
  itemPoints: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
    letterSpacing: -0.31,
    marginTop: 4,
  },
  bottomSpacer: {
    height: 80,
  },
});

