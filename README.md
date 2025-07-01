# 🏠 SafetyFirst - 대피소 찾기 서비스

> 📍 **가장 가까운 대피소를 빠르게 찾아보세요**  
> 주소 입력으로 주변 10개 대피소를 지도에서 확인할 수 있는 웹 서비스

[![React](https://img.shields.io/badge/React-18.x-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-green?logo=springboot)](https://spring.io/projects/spring-boot)
[![MySQL](https://img.shields.io/badge/MySQL-8.x-orange?logo=mysql)](https://www.mysql.com/)

---

## 📋 목차

- [🚀 빠른 시작](#-빠른-시작)
- [🛠 기술 스택](#-기술-스택)
- [📁 프로젝트 구조](#-프로젝트-구조)
- [⚙️ 환경 설정](#️-환경-설정)
- [🎯 주요 기능](#-주요-기능)
- [👥 팀 협업 가이드](#-팀-협업-가이드)
- [🐛 문제 해결](#-문제-해결)

---

## 🚀 빠른 시작

### 1. 프로젝트 클론
```bash
git clone https://github.com/your-username/programersTeam5.git
cd programersTeam5
```

### 2. 환경변수 설정
```bash
# frontend 폴더에 .env 파일 생성
cd frontend
cat > .env << 'EOF'
REACT_APP_KAKAO_MAP_API_KEY=your_kakao_api_key_here
REACT_APP_PUBLIC_DATA_API_KEY=your_public_data_api_key_here
GENERATE_SOURCEMAP=false
EOF
```

> ⚠️ **중요**: 실제 API 키는 팀장에게 문의하거나 [ENV_SETUP.md](ENV_SETUP.md)를 참고하세요.

### 3. 의존성 설치 및 실행
```bash
# 프론트엔드 실행
cd frontend
npm install
npm start
```

🎉 **완료!** 브라우저에서 `http://localhost:3000`으로 접속하세요.

---

## 🛠 기술 스택

### **Frontend**
- **React 18** + **TypeScript** - 모던 웹 개발
- **Styled Components** - CSS-in-JS 스타일링
- **Kakao Map API** - 지도 및 마커 표시
- **Axios** - HTTP 통신

### **Backend** (개발 예정)
- **Spring Boot 3** - RESTful API 서버
- **MySQL 8** - 대피소 데이터 저장
- **공공데이터 API** - 실시간 대피소 정보

### **개발 도구**
- **TaskMaster** - 프로젝트 관리 및 작업 추적
- **Git** - 버전 관리 (feature 브랜치 전략)
- **ESLint + Prettier** - 코드 품질 관리

---

## 📁 프로젝트 구조

```bash
programersTeam5/
├── 📂 frontend/                    # React 앱
│   ├── 📂 src/
│   │   ├── 📂 components/          # 재사용 가능한 컴포넌트
│   │   │   └── KakaoMap.tsx       # 카카오 지도 컴포넌트
│   │   ├── 📂 services/           # API 통신 로직
│   │   ├── 📂 utils/              # 유틸리티 함수들
│   │   ├── 📂 types/              # TypeScript 타입 정의
│   │   ├── 📂 hooks/              # 커스텀 React 훅
│   │   └── 📂 contexts/           # React Context (상태 관리)
│   ├── 📂 public/                 # 정적 파일들
│   ├── .env                       # 환경변수 (Git에서 제외)
│   └── package.json
├── 📂 backend/                     # Spring Boot 앱 (개발 예정)
├── 📂 .taskmaster/                 # 프로젝트 관리 파일
├── 📄 ENV_SETUP.md                 # 환경변수 설정 가이드
├── 📄 .gitignore                   # Git 제외 파일 목록
└── 📄 README.md                    # 이 파일
```

## 📝 주요 변경사항 

### **(7/1 - map branch)추가된 내용:**
1. **🎯 명확한 프로젝트 목표** - SafetyFirst 대피소 찾기 서비스
2. **🚀 빠른 시작 가이드** - 3단계로 바로 실행 가능
3. **📂 상세한 프로젝트 구조** - 폴더별 역할 설명
4. **⚙️ 환경변수 설정 가이드** - 카카오 API 키 설정 방법
5. **👥 팀 협업 방식** - TaskMaster + Git + 태그 시스템
6. **🐛 문제 해결 가이드** - 자주 발생하는 문제들의 해결책
7. **✅ 구현 완료/예정 기능** - 현재 진행 상황 명시

### **팀원들이 쉽게 알 수 있는 정보:**
- 프로젝트 실행 방법 (3분 안에 가능)
- 환경변수 설정 방법 (ENV_SETUP.md 연동)
- Git 브랜치 전략 (feature 브랜치)
- TaskMaster 사용법 (태그별 작업 분리)
- 문제 발생 시 해결 방법

## 📝 커밋 메시지 규칙

```bash
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 스타일 변경 (포맷팅 등)
refactor: 코드 리팩토링
test: 테스트 코드 추가/수정
chore: 빌드 도구, 패키지 매니저 설정 등
```

## 📞 도움이 필요할 때

- 🐛 **버그 신고**: GitHub Issues 생성
- 💬 **질문/토론**: 팀 슬랙 채널 또는 카카오톡
- 📚 **개발 문서**: [ENV_SETUP.md](ENV_SETUP.md)

**⭐ 프로젝트가 도움이 되었다면 Star를 눌러주세요!**