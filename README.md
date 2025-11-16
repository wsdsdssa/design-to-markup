# Design to Markup - 구현 결과물

Syntekabio 면접 과제로 제작된 반응형 웹 페이지입니다.

## 📋 목차

- [프로젝트 개요](#-프로젝트-개요)
- [기술 스택](#-기술-스택)
- [주요 선택 사항 및 구현 의도](#-주요-선택-사항-및-구현-의도)
- [주요 구현 기능](#-주요-구현-기능)
- [시작하기](#-시작하기)

## 🎯 프로젝트 개요

Figma 디자인 시안을 기반으로 Next.js와 TypeScript를 활용하여 구현한 반응형 웹 페이지입니다. 웹 표준과 접근성을 준수하며, PC와 모바일 환경 모두에서 최적화된 사용자 경험을 제공합니다.

## 🛠 기술 스택

- **Framework**: Next.js 14 (Pages Router)
- **Language**: TypeScript
- **Styling**: Sass / CSS Modules
- **UI Components**: Storybook
- **Carousel**: Swiper.js
- **Linting**: ESLint
- **Formatting**: Prettier
- **Package Manager**: Yarn 1.x

## 💡 주요 선택 사항 및 구현 의도

### 1. Yarn 1.x 버전 사용

**선택 이유:**
- Yarn 4.x는 Plug'n'Play(PnP) 방식으로 node_modules를 생성하지 않아 일부 라이브러리와의 호환성 문제가 발생할 수 있습니다.
- Yarn 1.x는 안정성과 광범위한 생태계 지원으로 프로젝트의 안정적인 의존성 관리를 보장합니다.
- Next.js 및 Storybook과의 완벽한 호환성을 위해 검증된 Yarn 1.x를 선택했습니다.

### 2. Swiper.js 라이브러리 사용

**선택 이유:**
- 카드 섹션의 가로 스크롤 캐러셀 구현을 위해 Swiper.js를 선택했습니다.
- **터치 제스처 지원**: 모바일 환경에서 자연스러운 스와이프 인터랙션 제공
- **반응형 설계**: breakpoint 설정으로 화면 크기별 슬라이드 개수 조정 가능
- **커스터마이징**: CSS로 pagination 스타일을 디자인에 맞게 자유롭게 수정 가능

### 3. 반응형 브레이크포인트 전략

**모바일 기준을 900px로 설정한 이유:**
- 탭 영역의 텍스트('탭 영역1', '탭 영역2', '탭 영역3')가 마진 없이 배치될 경우, 약 900px 이하에서 레이아웃이 깨지는 현상 발생
- 디자인 시안의 모바일 최대 너비(430px)와 PC 최대 너비(1100px)를 고려하여, 중간 지점에서 레이아웃 전환이 필요
- 실제 테스트 결과 900px 미만에서 콘텐츠가 자연스럽게 모바일 뷰로 전환되어 최적의 사용자 경험 제공


### 4. CSS Modules 활용

- **스타일 격리**: 컴포넌트별 스타일 충돌 방지
- **유지보수성**: 컴포넌트와 스타일이 함께 위치하여 관리 용이
- **번들 최적화**: 사용하는 스타일만 번들에 포함

### 5. Hydration 문제 해결

**문제 상황:**
- Next.js SSR에서 서버와 클라이언트가 렌더링하는 이미지가 달라 hydration 에러 발생
- 서버는 `window` 객체가 없어 항상 데스크톱 이미지를 렌더링

**해결 방법:**
```typescript
const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
  setIsMounted(true);
  // 클라이언트에서만 실행
}, []);

const currentImage = useMemo(() => 
  (isMounted && isMobile) ? mobileImage : desktopImage
, [isMounted, isMobile]);
```
- `isMounted` 상태를 추가하여 서버와 클라이언트 모두 처음에는 동일한 이미지 렌더링
- 클라이언트 마운트 후에만 조건부로 이미지 전환하여 hydration 에러 방지

## ✨ 주요 구현 기능

### 1. 고정 헤더 (Sticky Header)
- 스크롤 시 반투명 배경과 그림자 효과 적용
- `backdrop-filter: blur()` 효과로 세련된 UI 구현
- PC: 전체 네비게이션 표시
- 모바일: 햄버거 메뉴로 전환

### 2. 네비게이션 스크롤
- 헤더의 4개 메뉴 클릭 시 해당 섹션으로 부드러운 스크롤
- `scrollIntoView({ behavior: 'smooth' })` API 활용
- `scroll-margin-top` 속성으로 고정 헤더 높이만큼 여백 확보

### 3. 인터랙티브 탭
- 3개의 탭 버튼 클릭 시 이미지 및 콘텐츠 동적 변경
- `useState`와 `useMemo`를 활용한 효율적인 상태 관리
- CSS Grid로 탭 버튼 균등 배치 및 중앙 정렬
- 활성 탭 하단에 애니메이션 바 표시

### 4. 비디오 플레이어
- 중앙 재생 버튼 클릭 시 비디오 재생
- 재생 중 비디오 클릭 시 일시정지
- 오버레이 버튼 페이드 인/아웃 효과
- 반응형 포스터 이미지 (PC/모바일 별도)

### 5. 카드 캐러셀
- Swiper.js를 활용한 가로 스크롤 구현
- 좌측 패딩, 우측 플러시 레이아웃
- 커스텀 페이지네이션 도트
- 반응형 카드 크기 조정 (PC: 460px, 모바일: 220px)

### 6. 모바일 메뉴 패널
- 우측에서 슬라이드 인 애니메이션
- 반투명 오버레이로 배경 강조
- 메뉴 열림 시 body 스크롤 방지
- 메뉴 링크 클릭 또는 오버레이 클릭 시 자동 닫힘

### 7. 반응형 이미지
- 화면 크기에 따라 최적화된 이미지 자동 전환
- PC/모바일 버전 이미지 분리 관리
- Next.js Image 컴포넌트로 자동 최적화

### 8. 그라데이션 효과
- Hero 섹션 이미지 하단 그라데이션 페이드
- CSS `::after` 가상 요소와 `linear-gradient` 활용

### 전제 조건

- Node.js v20.x 이상
- Yarn 1.x

### 설치 및 실행

```bash
# 의존성 설치
yarn install

# 개발 서버 실행 (http://localhost:3000)
yarn dev

# Storybook 실행 (http://localhost:6006)
yarn storybook

# 프로덕션 빌드
yarn build

# 프로덕션 서버 실행
yarn start

# 린트 검사
yarn lint

# Storybook 빌드
yarn storybook:build
```

## 📁 프로젝트 구조

```
design-to-markup/
├── public/
│   ├── fonts/              # 웹폰트 파일
│   ├── images/             # 정적 이미지 (로고)
│   └── video/              # 비디오 파일
├── src/
│   ├── assets/             # 컴포넌트별 이미지 자산
│   ├── components/
│   │   └── HomePage/       # 홈페이지 컴포넌트
│   │       ├── HomePage.tsx
│   │       ├── HomePage.module.scss
│   │       └── HomePage.stories.tsx
│   ├── pages/              # Next.js 페이지 라우팅
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   └── index.tsx
│   └── styles/
│       └── globals.scss    # 전역 스타일
├── .storybook/             # Storybook 설정
└── package.json
```

## 📝 개발 과정에서의 주요 이슈 및 해결

### Next.js CSS 로딩 문제
**문제**: 로컬 개발 서버에서 CSS가 로드되지 않음  
**원인**: `_document.tsx`에 `<Head />` 컴포넌트 누락  
**해결**: Next.js의 `<Head />` 컴포넌트 추가하여 CSS 자동 주입

### Storybook 폰트 경로 문제
**문제**: Storybook에서 `/fonts/` 경로의 폰트 파일 로드 실패  
**원인**: Webpack이 public 디렉토리를 인식하지 못함  
**해결**: `.storybook/main.ts`에 `config.resolve.roots`에 public 경로 추가

