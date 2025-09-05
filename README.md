# Babzip_밥집

**Babzip**은 “한 손에 담은 나의 먹거리 일기장”을 지향하는 맛집 기록/관리 서비스입니다.  
검색·GPS로 주변 식당을 빠르게 찾고, 방문 일자·별점·사진·메모를 남겨 **개인화된 맛집 다이어리**를 만들 수 있어요.  
금·은·동 숟가락 아이콘으로 내가 뽑은 맛집 랭킹을 시각적으로 관리할 수 있습니다.

> **태그라인**: “한 손에 담은 나의 먹거리 일기장”

---

## 📸 Screenshots


| 화면 종류 | 스크린샷 |
| --- | --- |
| 메인 | <img alt="메인" src="https://github.com/user-attachments/assets/3aeeb23e-4856-4daa-a1e9-0567af0cb7c0" width="900" /> |
| 와이어프레임 | <img alt="와이어프레임" src="https://github.com/user-attachments/assets/5c62c1bc-3fc1-49c3-a028-7cf3ccbf45a1" width="900" /> |
| 검색 | <img alt="검색" src="https://github.com/user-attachments/assets/7c112900-368a-4141-8239-a02d8591f495" width="900" /> |
| 내 정보 페이지 | <img alt="내 정보 페이지" src="https://github.com/user-attachments/assets/459d2fdf-71fe-42ca-a111-4a667a00c194" width="900" /> |
| 맛집 등록 과정 | <img alt="맛집 등록 과정" src="https://github.com/user-attachments/assets/19786fe3-200c-4c90-8b3d-ca8e322b93df" width="900" /> |
| TOP10 기능 | <img alt="TOP10 기능" src="https://github.com/user-attachments/assets/c53ffd6f-e918-4e33-888a-93f693a4bf15" width="900" /> |


## 🎨 Brand

- **Primary**: `#121212`  
- **Accent**: `#FFD60A`

---

## 🚀 기술 스택

- **Framework**: React + TypeScript (Vite 권장)
- **Routing**: React Router
- **State**: Zustand
- **Styles**: Module Scss
- **HTTP**: axios
- **Build/Deploy**: Vite build, Vercel

> Babzip 핵심 경험은 **검색엔진(빠른 식당 찾기)**, **GPS(내 위치 기반 주변 식당 확인)**, **개인화 다이어리**에 기반합니다.

---

## 📂 프로젝트 구조

```text
babzip/
├── public/                 # 정적 리소스
├── src/
│   ├── app/                # App 엔트리/라우터 세팅
│   ├── pages/              # 페이지 단위 컴포넌트
│   ├── components/         # 재사용 UI 컴포넌트
│   ├── features/           # 도메인 모듈(기록/랭킹/검색 등)
│   ├── hooks/              # 커스텀 훅 (예: useQuery, useGPS)
│   ├── services/           # API 클라이언트/토큰 유틸
│   ├── store/              # 전역 상태(Zustand/Redux 등)
│   ├── styles/             # 글로벌 스타일/테마
│   └── types/              # 타입 정의
├── .env.example
├── index.html
├── package.json
└── vite.config.ts
```

---

## ⚙️ 환경 변수

`.env` (Vite 기준)는 `VITE_` 접두어를 사용합니다.

```bash
VITE_API_BASE_URL=https://api.babzip.example
# (선택) 맵/외부서비스 키
VITE_MAP_JS_KEY=YOUR_MAP_KEY
```

---

## 🛠️ 주요 기능

### 1) 빠른 식당 찾기 & 내 위치 기반 주변 탐색
- **검색엔진**으로 식당을 빠르게 찾고, **GPS**로 주변 식당을 확인합니다.

### 2) 맛집 기록(다이어리)
- **방문 일자**, **별점**, **사진 업로드**, **간단 메모**를 남겨 다이어리를 만들 수 있습니다.

### 3) 나만의 랭킹(숟가락 시스템)
- **금·은·동 숟가락 아이콘**으로 미식 수준과 선호도를 **직접 랭킹**으로 관리합니다. 다음 탐방의 나침반 역할을 합니다.

### 4) 계정/보안
- **쉽고 간편한 로그인**과 **강력한 보안 체제**를 지향합니다. (구현 방식은 실제 스펙에 맞춰 보완)

---

## ▶️ 실행 방법

```bash
# 1) 설치
npm install

# 2) 환경 변수 설정
cp .env.example .env  # 값 채우기

# 3) 개발 실행
npm run dev

# 4) 프로덕션 빌드
npm run build
npm run preview
```

---

## 📌 TODO

- [ ] 검색·필터 UX 고도화
- [ ] 랭킹(숟가락) 편집/공유 플로우 강화
- [ ] 지도(GPS) 클러스터링/성능 최적화
- [ ] 이미지 업로드 진행률/압축 처리
- [ ] 프리미엄 구독/결제 플로우 설계
- [ ] 방문 분석 AI(시간/조건 추천) 프로토타입
