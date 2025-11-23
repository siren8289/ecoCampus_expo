# Expo 앱 연결 가이드

앱 연결이 안 될 때 시도해볼 방법들:

## 1. 터널 모드로 시작 (가장 안정적)

```bash
npm run start:tunnel
```

터널 모드는 Expo의 클라우드 서비스를 통해 연결하므로 네트워크 설정과 무관하게 작동합니다.

## 2. LAN 모드로 시작

```bash
npm run start:lan
```

같은 Wi-Fi 네트워크에 연결된 기기에서만 작동합니다.

## 3. 일반 모드 (기본)

```bash
npm start
```

## 문제 해결 체크리스트

### ✅ Expo Go 앱 설치 확인
- **iOS**: App Store에서 "Expo Go" 검색 후 설치
- **Android**: Google Play Store에서 "Expo Go" 검색 후 설치

### ✅ 같은 네트워크 확인 (LAN 모드 사용 시)
- 컴퓨터와 스마트폰이 같은 Wi-Fi에 연결되어 있는지 확인
- 방화벽이 포트를 차단하지 않는지 확인

### ✅ QR 코드 스캔
- 터미널에 표시된 QR 코드를 Expo Go 앱으로 스캔
- 또는 터미널에 표시된 URL을 직접 입력

### ✅ 수동 연결
터미널에 표시된 URL을 Expo Go 앱에서 직접 입력:
- "Enter URL manually" 옵션 선택
- 예: `exp://192.168.0.1:8081`

### ✅ 방화벽 설정
- macOS: 시스템 설정 > 네트워크 > 방화벽에서 Node.js 허용
- Windows: Windows Defender 방화벽에서 Node.js 허용

### ✅ 포트 확인
기본 포트는 8081입니다. 다른 앱이 사용 중이면 자동으로 다른 포트를 사용합니다.

## 시뮬레이터/에뮬레이터 사용

실제 기기 대신 시뮬레이터를 사용할 수도 있습니다:

```bash
# iOS 시뮬레이터 (Mac만 가능)
npm run ios

# Android 에뮬레이터
npm run android

# 웹 브라우저
npm run web
```

## 추가 도움말

문제가 계속되면:
1. `expo start --clear` - 캐시 클리어 후 재시작
2. `npm install` - 의존성 재설치
3. Expo 공식 문서: https://docs.expo.dev/

