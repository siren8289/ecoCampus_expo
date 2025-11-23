import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

interface DonateCategory {
  id: string;
  icon: string;
  title: string;
  points: number;
  description?: string;
}

export const PointDonateScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [currentPoints, setCurrentPoints] = useState(850);
  const [totalDonated, setTotalDonated] = useState(300);
  const [donateAmount, setDonateAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // 기부 카테고리
  const [donateCategories] = useState<DonateCategory[]>([
    {
      id: '1',
      icon: '📚',
      title: '책 물려받기',
      points: 700,
    },
    {
      id: '2',
      icon: '🎓',
      title: '장학금 포인트 기부',
      points: 3000,
    },
    {
      id: '3',
      icon: '⏰',
      title: '봉사시간 전환',
      points: 2500,
    },
  ]);

  // 라우트에서 포인트 받아오기
  useEffect(() => {
    if (route.params && 'currentPoints' in route.params) {
      setCurrentPoints(route.params.currentPoints as number);
    }
    if (route.params && 'totalDonated' in route.params) {
      setTotalDonated(route.params.totalDonated as number);
    }
  }, [route.params]);

  // 포커스 시 포인트 업데이트 (다른 화면에서 돌아올 때)
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (route.params && 'currentPoints' in route.params) {
        setCurrentPoints(route.params.currentPoints as number);
      }
      if (route.params && 'totalDonated' in route.params) {
        setTotalDonated(route.params.totalDonated as number);
      }
    });
    return unsubscribe;
  }, [navigation, route.params]);

  const handleCategoryPress = (category: DonateCategory) => {
    if (currentPoints < category.points) {
      Alert.alert(
        '포인트 부족',
        `보유 포인트가 부족합니다.\n필요 포인트: ${category.points}P\n보유 포인트: ${currentPoints}P`,
        [{ text: '확인', style: 'default' }]
      );
      return;
    }

    setSelectedCategory(category.id);
    setDonateAmount(category.points.toString());
  };

  const handleDonate = () => {
    const amount = parseInt(donateAmount, 10);

    if (!amount || amount <= 0) {
      Alert.alert('입력 오류', '기부할 포인트를 입력해주세요.');
      return;
    }

    if (amount > currentPoints) {
      Alert.alert(
        '포인트 부족',
        `보유 포인트가 부족합니다.\n기부 포인트: ${amount}P\n보유 포인트: ${currentPoints}P`
      );
      return;
    }

    const category = selectedCategory
      ? donateCategories.find((c) => c.id === selectedCategory)
      : null;

    Alert.alert(
      '기부 확인',
      category
        ? `${category.title}에 ${amount}P를 기부하시겠습니까?`
        : `${amount}P를 기부하시겠습니까?`,
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '기부',
          onPress: () => {
            const newPoints = currentPoints - amount;
            const newTotalDonated = totalDonated + amount;
            setCurrentPoints(newPoints);
            setTotalDonated(newTotalDonated);
            setDonateAmount('');
            setSelectedCategory(null);

            Alert.alert(
              '기부 완료',
              category
                ? `${category.title}에 ${amount}P 기부가 완료되었습니다!`
                : `${amount}P 기부가 완료되었습니다!`,
              [
                {
                  text: '확인',
                  onPress: () => {
                    // 포인트 페이지로 업데이트된 포인트 전달
                    // @ts-ignore - React Navigation type issue
                    navigation.navigate('Point', {
                      updatedPoints: newPoints,
                      updatedTotalDonated: newTotalDonated,
                    });
                    // 현재 화면도 업데이트
                    setCurrentPoints(newPoints);
                    setTotalDonated(newTotalDonated);
                  },
                },
              ]
            );
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

        {/* Donation Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>총 기부 내역</Text>
            <Text style={styles.summaryValue}>{totalDonated}P</Text>
          </View>
        </View>

        {/* Donation Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>어디에 기부할까요?</Text>
          <View style={styles.categoryContainer}>
            {donateCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  selectedCategory === category.id && styles.selectedCategoryCard,
                  currentPoints < category.points && styles.disabledCard,
                ]}
                onPress={() => handleCategoryPress(category)}
                activeOpacity={0.7}
                disabled={currentPoints < category.points}
              >
                <View style={styles.categoryContent}>
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                  <View style={styles.categoryInfo}>
                    <Text style={styles.categoryTitle}>{category.title}</Text>
                    <Text style={styles.categoryPoints}>{category.points}P</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#6a7282" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Direct Donation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>직접 기부하기</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="기부할 포인트를 입력해주세요"
              placeholderTextColor="#6a7282"
              value={donateAmount}
              onChangeText={setDonateAmount}
              keyboardType="numeric"
            />
            <View style={styles.inputSuffix}>
              <Text style={styles.inputSuffixText}>P</Text>
            </View>
          </View>
        </View>

        {/* Donate Button */}
        <TouchableOpacity
          style={[
            styles.donateButton,
            (currentPoints <= 0 || !donateAmount || parseInt(donateAmount, 10) <= 0) &&
              styles.disabledButton,
          ]}
          onPress={handleDonate}
          activeOpacity={0.7}
          disabled={
            currentPoints <= 0 || !donateAmount || parseInt(donateAmount, 10) <= 0
          }
        >
          <Text style={styles.donateButtonText}>기부하기</Text>
        </TouchableOpacity>

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
  summaryCard: {
    backgroundColor: '#ebebeb',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#4a5565',
    fontWeight: '400',
  },
  summaryValue: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
    letterSpacing: -0.31,
    marginBottom: 16,
  },
  categoryContainer: {
    gap: 12,
  },
  categoryCard: {
    backgroundColor: '#ebebeb',
    borderRadius: 12,
    padding: 16,
  },
  selectedCategoryCard: {
    backgroundColor: '#d3efd6',
    borderWidth: 2,
    borderColor: '#6bbf76',
  },
  disabledCard: {
    opacity: 0.5,
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  categoryIcon: {
    fontSize: 32,
  },
  categoryInfo: {
    flex: 1,
    gap: 4,
  },
  categoryTitle: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
    letterSpacing: -0.31,
  },
  categoryPoints: {
    fontSize: 14,
    color: '#6a7282',
    fontWeight: '400',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ebebeb',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    gap: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
  },
  inputSuffix: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ffeba6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputSuffixText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  donateButton: {
    backgroundColor: '#ffeba6',
    borderRadius: 12,
    paddingVertical: 16,
    marginHorizontal: 16,
    marginTop: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  donateButtonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
    letterSpacing: -0.31,
  },
  bottomSpacer: {
    height: 80,
  },
});

