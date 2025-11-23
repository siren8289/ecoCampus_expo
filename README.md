# EcoCampus Expo App

React Native Expo 프로젝트입니다. 환경 캠퍼스 에너지 관리 앱입니다.

## 시작하기

### 설치

```bash
cd frontend
npm install
```

또는

```bash
cd frontend
yarn install
```

### 실행

```bash
# 개발 서버 시작
npm start

# iOS 시뮬레이터에서 실행
npm run ios

# Android 에뮬레이터에서 실행
npm run android

# 웹 브라우저에서 실행
npm run web
```

## 프로젝트 구조

```
frontend/
├── src/
│   ├── components/          # 재사용 가능한 컴포넌트
│   │   ├── TopBar.tsx      # 상단 헤더 바
│   │   ├── HomeHeader.tsx  # 홈 화면 제목
│   │   ├── LocationSection.tsx  # 현재 위치 및 전력 제어
│   │   ├── MissionCard.tsx      # 미션 카드 (전등, 냉난방기)
│   │   ├── SavingsCard.tsx      # 절약 현황 카드
│   │   ├── CharacterCard.tsx   # 캐릭터 카드
│   │   └── BottomNavigation.tsx  # 하단 네비게이션 바
│   ├── screens/            # 화면 컴포넌트
│   │   └── HomeScreen.tsx  # 메인 홈 화면
│   ├── types/              # TypeScript 타입 정의
│   │   └── index.ts
│   └── utils/              # 유틸리티 함수
├── App.tsx                 # 메인 앱 진입점
├── app.json                # Expo 설정 파일
└── tsconfig.json           # TypeScript 설정
```

## 주요 기능

- **실시간 전력 모니터링**: 현재 위치의 전력 사용량 실시간 표시
- **기기 제어**: 전등, 냉난방기 등 기기 켜기/끄기
- **절약 현황**: 오늘의 절약량, 참여 미션, 획득 포인트 표시
- **캐릭터 시스템**: 레벨 및 성장률 표시
- **동적 업데이트**: 전력 사용량 자동 업데이트 (5초마다)

## 컴포넌트 설명

### TopBar
상단 헤더로 로고와 알림/설정 아이콘을 포함합니다.

### HomeHeader
"당신의 실천이 우리 캠퍼스를 푸르게 합니다" 메시지를 표시합니다.

### LocationSection
현재 위치와 총 전력 사용량을 표시하며, 전력 제어 버튼을 제공합니다.

### MissionCard
각 기기(전등, 냉난방기)의 상태를 표시하고, 켜기/끄기 기능을 제공합니다.

### SavingsCard
오늘의 절약 현황을 상세히 표시합니다.

### CharacterCard
사용자의 캐릭터 레벨과 오늘의 성장률을 표시합니다.

### BottomNavigation
하단 네비게이션 바로 홈, 미션, 캐릭터, 랭킹, MY 탭을 제공합니다.

## 기술 스택

- React Native
- Expo SDK 51
- TypeScript
- React Hooks (useState, useEffect)

