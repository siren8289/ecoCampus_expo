import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { MissionDevice } from '../../types';

interface RouteParams {
  missionId?: string;
  roomName?: string;
}

interface RoomInfo {
  id: string;
  name: string;
  signal: 'strong' | 'medium' | 'weak';
  signalStrength: string;
  peopleCount: number;
  congestion: string;
  isSelected: boolean;
}

interface NearbyRoom {
  name: string;
  peopleCount: number;
  status: string;
}

export const MissionDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const params = (route.params as RouteParams) || {};

  const [selectedRoom, setSelectedRoom] = useState<RoomInfo>({
    id: '1',
    name: '정보문화관 PC34실',
    signal: 'strong',
    signalStrength: 'B',
    peopleCount: 25,
    congestion: '보통',
    isSelected: true,
  });

  const [devices, setDevices] = useState<MissionDevice[]>([
    {
      id: '1',
      name: '전등(Light)',
      status: 'on',
      icon: 'bulb',
      powerUsage: 8,
      type: 'light',
    },
    {
      id: '2',
      name: '냉난방기(HVAC)',
      status: 'off',
      icon: 'snow',
      temperature: 22.8,
      type: 'cooling',
    },
  ]);

  const [timer, setTimer] = useState(600); // 10분 = 600초
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [missionStarted, setMissionStarted] = useState(false);

  const nearbyRoom: NearbyRoom = {
    name: '정보문화관 PC33실',
    peopleCount: 3,
    status: '여유',
  };

  // 타이머 카운트다운
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            handleMissionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDeviceToggle = (deviceId: string) => {
    setDevices((prevDevices) =>
      prevDevices.map((device) => {
        if (device.id === deviceId) {
          const newStatus = device.status === 'on' ? 'off' : 'on';
          
          // 모든 기기가 꺼져있으면 미션 시작 가능
          const allOff = prevDevices
            .map((d) => (d.id === deviceId ? newStatus : d.status))
            .every((status) => status === 'off');

          if (allOff && !missionStarted) {
            setMissionStarted(true);
            setIsTimerRunning(true);
            Alert.alert('미션 시작', '10분 절전 미션이 시작되었습니다!');
          }

          return {
            ...device,
            status: newStatus,
          };
        }
        return device;
      })
    );
  };

  const handleMissionComplete = () => {
    Alert.alert('미션 완료!', '10분 절전 미션을 완료했습니다. 보상을 받으세요!');
    setIsTimerRunning(false);
  };

  const handleMoveRoom = () => {
    Alert.alert('자리 이동', `${nearbyRoom.name}로 이동하시겠습니까?`);
  };

  const handleGuidePress = () => {
    Alert.alert('IoT 미션 가이드', '미션 가이드 화면으로 이동합니다.');
  };

  const getDeviceIcon = (type: string) => {
    if (type === 'light') return 'bulb-outline';
    if (type === 'heating' || type === 'cooling') return 'snow-outline';
    return 'cube-outline';
  };

  const getDeviceIconColor = (type: string) => {
    if (type === 'light') return '#fff8ae';
    if (type === 'heating' || type === 'cooling') return '#bfdbfe';
    return '#e5e5e5';
  };

  const getSignalColor = (signal: string) => {
    if (signal === 'strong') return '#42b36b';
    if (signal === 'medium') return '#f19e47';
    return '#e74c3c';
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>제어할 강의실 선택</Text>
          <Text style={styles.subtitle}>BLE 범위 내에서 감지된 강의실입니다</Text>
        </View>

        {/* Room Selection Card */}
        <View style={styles.roomCard}>
          <View style={styles.roomHeader}>
            <View style={styles.roomIcon}>
              <Ionicons name="location" size={24} color="#000" />
            </View>
            <View style={styles.roomInfo}>
              <View style={styles.roomNameRow}>
                <Text style={styles.roomName}>{selectedRoom.name}</Text>
                <View style={[styles.signalBadge, { backgroundColor: getSignalColor(selectedRoom.signal) }]}>
                  <Text style={styles.signalText}>{selectedRoom.signalStrength}</Text>
                </View>
              </View>
              <Text style={styles.roomDetails}>
                신호: 강함 | {selectedRoom.peopleCount}명 | 혼잡도: {selectedRoom.congestion}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#000" />
          </View>
        </View>

        {/* Device Cards */}
        {devices.map((device) => (
          <View key={device.id} style={styles.deviceCard}>
            <View style={styles.deviceContent}>
              <View style={[styles.deviceIcon, { backgroundColor: getDeviceIconColor(device.type) }]}>
                <Ionicons name={getDeviceIcon(device.type)} size={24} color="#000" />
              </View>
              <View style={styles.deviceInfo}>
                <Text style={styles.deviceName}>{device.name}</Text>
                <Text style={styles.deviceDetail}>
                  {device.temperature !== undefined
                    ? `실내온도: ${device.temperature}°C`
                    : `소비전력: ${device.powerUsage}W`}
                </Text>
              </View>
              <Switch
                value={device.status === 'on'}
                onValueChange={() => handleDeviceToggle(device.id)}
                trackColor={{ false: '#cbced4', true: '#00a63e' }}
                thumbColor="#fff"
              />
            </View>
          </View>
        ))}

        {/* Move Room Mission Card */}
        <View style={styles.moveRoomCard}>
          <Text style={styles.moveRoomTitle}>자리 이동 미션</Text>
          <Text style={styles.moveRoomDescription}>
            혼자 계시네요! 에너지 절약하고{'\n'}보상도 받아보세요.
          </Text>
          <View style={styles.nearbyRoomCard}>
            <Text style={styles.nearbyRoomText}>
              근처 강의실: {nearbyRoom.name}({nearbyRoom.peopleCount}명 / {nearbyRoom.status})
            </Text>
          </View>
          <TouchableOpacity
            style={styles.moveRoomButton}
            onPress={handleMoveRoom}
            activeOpacity={0.7}
          >
            <Text style={styles.moveRoomButtonText}>자리 이동하고 보상 받기</Text>
          </TouchableOpacity>
        </View>

        {/* Timer Mission Card */}
        <View style={styles.timerCard}>
          <Text style={styles.timerTitle}>10분 OFF 상태 유지하기</Text>
          <Text style={styles.timerDescription}>
            기기를 OFF로 유지하면 절전 미션이 완료됩니다.
          </Text>
          <View style={styles.timerContainer}>
            <View style={styles.timerCircle}>
              <Text style={styles.timerText}>{formatTime(timer)}</Text>
              <Text style={styles.timerLabel}>남은 시간</Text>
            </View>
          </View>
          <Text style={styles.timerInstruction}>
            {missionStarted
              ? '미션이 진행 중입니다. 기기를 OFF 상태로 유지하세요.'
              : '미션 시작을 위해 전원을 먼저 꺼주세요.'}
          </Text>
        </View>

        {/* Guide Link */}
        <View style={styles.guideSection}>
          <TouchableOpacity onPress={handleGuidePress} activeOpacity={0.7}>
            <Text style={styles.guideText}>IoT 미션 가이드</Text>
          </TouchableOpacity>
          <Text style={styles.guideSeparator}>|</Text>
          <TouchableOpacity onPress={handleGuidePress} activeOpacity={0.7}>
            <Text style={styles.guideText}>자세히 보기</Text>
          </TouchableOpacity>
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
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#f7f7f7',
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000',
    letterSpacing: -0.31,
  },
  subtitle: {
    fontSize: 16,
    color: '#04993a',
    fontWeight: '400',
    letterSpacing: -0.15,
    textAlign: 'center',
  },
  roomCard: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ececec',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 33,
    marginTop: 16,
  },
  roomHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  roomIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e5e5e5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roomInfo: {
    flex: 1,
    gap: 4,
  },
  roomNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  roomName: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
    letterSpacing: -0.31,
  },
  signalBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signalText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  roomDetails: {
    fontSize: 14,
    color: '#4a5565',
    fontWeight: '400',
    letterSpacing: -0.15,
  },
  deviceCard: {
    backgroundColor: '#fff',
    borderWidth: 0.7,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 12,
    padding: 17,
    marginHorizontal: 33,
    marginTop: 12,
  },
  deviceContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deviceInfo: {
    flex: 1,
    marginLeft: 12,
    gap: 4,
  },
  deviceName: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
    letterSpacing: -0.31,
  },
  deviceDetail: {
    fontSize: 14,
    color: '#4a5565',
    fontWeight: '400',
    letterSpacing: -0.15,
  },
  moveRoomCard: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ececec',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 33,
    marginTop: 16,
    gap: 13,
  },
  moveRoomTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000',
    letterSpacing: -0.31,
  },
  moveRoomDescription: {
    fontSize: 16,
    color: '#04993a',
    fontWeight: '400',
    letterSpacing: -0.15,
    lineHeight: 20,
  },
  nearbyRoomCard: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ececec',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    height: 40,
    justifyContent: 'center',
  },
  nearbyRoomText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '400',
    letterSpacing: -0.15,
  },
  moveRoomButton: {
    backgroundColor: '#81d18a',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moveRoomButtonText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
    letterSpacing: -0.15,
  },
  timerCard: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ececec',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 33,
    marginTop: 16,
    alignItems: 'center',
    gap: 8,
  },
  timerTitle: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
    letterSpacing: -0.31,
  },
  timerDescription: {
    fontSize: 14,
    color: '#4a5565',
    fontWeight: '400',
    letterSpacing: -0.15,
    textAlign: 'center',
    marginBottom: 8,
  },
  timerContainer: {
    width: 160,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  timerCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  timerText: {
    fontSize: 24,
    color: '#000',
    fontWeight: '400',
    letterSpacing: 0.37,
  },
  timerLabel: {
    fontSize: 16,
    color: '#4a5565',
    fontWeight: '400',
    letterSpacing: -0.15,
  },
  timerInstruction: {
    fontSize: 16,
    color: '#04993a',
    fontWeight: '500',
    letterSpacing: -0.15,
    textAlign: 'center',
    marginTop: 8,
  },
  guideSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginTop: 16,
    paddingHorizontal: 16,
  },
  guideText: {
    fontSize: 16,
    color: '#4a5565',
    fontWeight: '400',
    letterSpacing: -0.15,
  },
  guideSeparator: {
    fontSize: 14,
    color: '#4a5565',
  },
  bottomSpacer: {
    height: 80,
  },
});

