# EcoCampus API 명세서

## 기본 정보
- **Base URL**: `http://localhost:{port}` (포트는 자동 할당)
- **Content-Type**: `application/json`

---

## 공통 응답 형식

### 성공 응답
```json
{
  "key": "value"
}
```

### 에러 응답
```json
{
  "error": "Error message"
}
```

---

## 1. 홈 (Home)

### 1.1 디바이스 목록 조회
- **GET** `/api/home/devices`
- **설명**: 홈 화면에 표시할 디바이스 목록
- **응답**: `Device[]`

### 1.2 위치 정보 조회
- **GET** `/api/home/location`
- **설명**: 현재 선택된 강의실 및 총 전력 사용량
- **응답**: 
```json
{
  "currentLocation": "정보문화관 PC34실",
  "totalPowerUsage": 1.2
}
```

### 1.3 절약 데이터 조회
- **GET** `/api/home/savings`
- **설명**: 오늘 절약량 및 참여 미션 수
- **응답**:
```json
{
  "todaySavings": 0.7,
  "participatedMissions": 2,
  "acquiredPoints": 120,
  "departmentAverage": 12
}
```

### 1.4 캐릭터 데이터 조회
- **GET** `/api/home/character`
- **설명**: 홈 화면 캐릭터 레벨 및 성장률
- **응답**:
```json
{
  "level": 2,
  "growthRate": 35
}
```

### 1.5 디바이스 토글
- **PUT** `/api/devices/<device_id>/toggle`
- **설명**: 디바이스 on/off 상태 변경
- **파라미터**: `device_id` (경로)
- **응답**: `Device`

---

## 2. 강의실 (Rooms)

### 2.1 강의실 목록 조회
- **GET** `/api/rooms`
- **설명**: 모든 강의실 목록
- **응답**: `Room[]`

### 2.2 강의실 선택
- **PUT** `/api/rooms/<room_id>/select`
- **설명**: 강의실 선택 및 위치 정보 업데이트
- **파라미터**: `room_id` (경로)
- **응답**:
```json
{
  "message": "Room selected",
  "room": { ... },
  "location": { ... }
}
```

---

## 3. 캐릭터 (Character)

### 3.1 캐릭터 진행률 조회
- **GET** `/api/character/progress`
- **설명**: 캐릭터 레벨, 진행률, 다음 레벨까지 미션 수
- **응답**:
```json
{
  "currentLevel": 2,
  "nextLevel": 3,
  "progress": 35,
  "missionsToNextLevel": 13,
  "characterName": "나무",
  "characterEmoji": "🌳"
}
```

### 3.2 캐릭터 상태 카드 조회
- **GET** `/api/character/status`
- **설명**: 오늘의 성장 상태 카드 목록
- **응답**: `StatusCard[]`

### 3.3 연속 미션 일수 조회
- **GET** `/api/character/streak`
- **설명**: 연속 미션 완료 일수 및 완료한 날짜
- **응답**:
```json
{
  "days": 3,
  "completedDays": [1, 2, 3],
  "message": "3일 연속 미션 완료했어요!"
}
```

---

## 4. 미션 (Mission)

### 4.1 미션 목록 조회
- **GET** `/api/missions`
- **쿼리 파라미터**: 
  - `category` (선택): `all`, `recycle`, `quiz`, `content`, `contest`
- **응답**: `Mission[]`

### 4.2 미션 상세 조회
- **GET** `/api/missions/<mission_id>`
- **파라미터**: `mission_id` (경로)
- **응답**: `Mission` + 추가 정보 (roomName, devices, timer, nearbyRoom)

### 4.3 미션 시작
- **POST** `/api/missions/<mission_id>/start`
- **파라미터**: `mission_id` (경로)
- **응답**:
```json
{
  "message": "Mission started",
  "mission": { ... }
}
```

### 4.4 미션 완료
- **POST** `/api/missions/<mission_id>/complete`
- **파라미터**: `mission_id` (경로)
- **설명**: 미션 완료 시 포인트 추가, 절약 데이터 업데이트
- **응답**:
```json
{
  "message": "Mission completed",
  "mission": { ... }
}
```

### 4.5 랭크 진행률 조회
- **GET** `/api/rank/progress`
- **설명**: 현재 등급 및 다음 등급까지 포인트
- **응답**:
```json
{
  "currentRank": "새싹 등급",
  "nextRank": "잎새 등급",
  "currentPoints": 350,
  "pointsToNextRank": 650,
  "progress": 35
}
```

### 4.6 캠퍼스 통계 조회
- **GET** `/api/campus/stats`
- **설명**: 캠퍼스 전체 절약량 및 참여 통계
- **응답**:
```json
{
  "todaySavings": 1204,
  "studentParticipation": 3450,
  "wasteRooms": 3
}
```

---

## 5. 포인트 (Points)

### 5.1 포인트 정보 조회
- **GET** `/api/points`
- **설명**: 현재 포인트, 주간 증가량, 사용량, 기부량
- **응답**:
```json
{
  "currentPoints": 850,
  "weeklyIncrease": 240,
  "usedPoints": 300,
  "totalDonated": 300
}
```

### 5.2 포인트 활동 내역 조회
- **GET** `/api/points/activities`
- **설명**: 최근 포인트 획득/사용 내역
- **응답**: `RecentActivity[]`

### 5.3 주간 활동 데이터 조회
- **GET** `/api/points/weekly`
- **설명**: 요일별 포인트 획득량
- **응답**: `WeeklyActivity[]`

### 5.4 교환 아이템 목록 조회
- **GET** `/api/points/exchange`
- **쿼리 파라미터**: 
  - `category` (선택): `voucher`, `gifticon` (기본값: `voucher`)
- **응답**: `ExchangeItem[]`

### 5.5 포인트 교환
- **POST** `/api/points/exchange`
- **요청 본문**:
```json
{
  "itemId": "1",
  "category": "voucher"
}
```
- **응답**:
```json
{
  "message": "Exchange successful",
  "item": { ... },
  "remainingPoints": 700
}
```

### 5.6 기부 카테고리 목록 조회
- **GET** `/api/points/donate/categories`
- **설명**: 포인트 기부 가능한 카테고리 목록
- **응답**: `DonateCategory[]`

### 5.7 포인트 기부
- **POST** `/api/points/donate`
- **요청 본문**:
```json
{
  "categoryId": "1",
  "amount": 0  // 0이면 카테고리 기본 금액 사용
}
```
- **응답**:
```json
{
  "message": "Donation successful",
  "category": { ... },
  "amount": 700,
  "remainingPoints": 150,
  "totalDonated": 1000
}
```

---

## 6. 사용자 (User)

### 6.1 사용자 프로필 조회
- **GET** `/api/user/profile`
- **설명**: 사용자 기본 정보
- **응답**:
```json
{
  "id": 1,
  "name": "나환경",
  "department": "사무행정과",
  "level": 2,
  "character": "나무",
  "points": 850
}
```

### 6.2 사용자 통계 조회
- **GET** `/api/user/stats`
- **설명**: 사용자 포인트, 완료 미션 수, 랭킹
- **응답**:
```json
{
  "points": 1250,
  "completedMissions": 42,
  "ranking": 12
}
```

### 6.3 사용자 활동 내역 조회
- **GET** `/api/user/activities`
- **설명**: 사용자의 최근 활동 내역
- **응답**: `UserActivity[]`

---

## 7. 랭킹 (Ranking)

### 7.1 랭킹 목록 조회
- **GET** `/api/ranking`
- **쿼리 파라미터**: 
  - `type` (선택): `individual`, `department` (기본값: `individual`)
  - `period` (선택): `daily`, `weekly`, `monthly` (기본값: `daily`)
- **응답**:
```json
{
  "rankingType": "individual",
  "timePeriod": "daily",
  "myRank": {
    "myRank": 12,
    "myPoints": 850,
    "myName": "나환경",
    "myDepartment": "사무행정과"
  },
  "rankingList": [ ... ]
}
```

---

## 8. 헬스 체크

### 8.1 서버 상태 확인
- **GET** `/api/health`
- **응답**:
```json
{
  "status": "healthy",
  "message": "Server is running"
}
```

---

## 데이터 모델

### Device
```json
{
  "id": "1",
  "name": "냉난방기",
  "status": "off",
  "icon": "snow",
  "powerUsage": 1.2,
  "temperature": 23.5,
  "type": "cooling"
}
```

### Mission
```json
{
  "id": "1",
  "title": "친환경 스토리",
  "emoji": "📖",
  "category": "content",
  "points": 10,
  "progress": 25,
  "totalSteps": 4,
  "currentStep": 1,
  "status": "in-progress"
}
```

### Room
```json
{
  "id": "1",
  "name": "정보문화관 PC34실",
  "signalStrength": "B",
  "signal": "strong",
  "peopleCount": 25,
  "congestion": "보통"
}
```

### ExchangeItem
```json
{
  "id": "1",
  "icon": "🍽️",
  "title": "교내 식당 할인권",
  "discount": "10% 할인",
  "points": 1500,
  "category": "voucher"
}
```

### DonateCategory
```json
{
  "id": "1",
  "icon": "📚",
  "title": "책 물려받기",
  "points": 700
}
```

---

## 에러 코드

- **400**: 잘못된 요청 (Invalid request)
- **404**: 리소스를 찾을 수 없음 (Not found)




