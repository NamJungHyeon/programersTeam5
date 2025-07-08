🌐 프론트엔드 폴더 구조 및 역할 정리

src/
├── assets/                     # 이미지 및 정적 리소스
├── components/
│   ├── Common/                 # 공통(레이아웃/재사용) 컴포넌트
│   │   ├── Header.tsx
│   │   ├── Pagination.tsx
│   │   ├── RiskButtons.tsx
│   │   └── WelcomeMessage.tsx
│   ├── News/                   # 뉴스 관련 컴포넌트
│   │   ├── NewsCard.tsx
│   │   ├── NewsList.tsx
│   │   └── NewsModal.tsx
│   └── Shelter/                # 대피소 관련 컴포넌트
│       ├── ShelterDetailModal.tsx
│       ├── ShelterList.tsx
│       ├── ShelterMap.tsx
│       └── ShelterSearchBar.tsx
└── pages/                      # 각 라우팅 페이지 컴포넌트
    ├── BoardPage.tsx
    ├── HomePage.tsx
    ├── LoginPage.tsx
    ├── RiskPage.tsx
    ├── ShelterPage.tsx
    └── SignupPage.tsx
