# 환경변수 설정 가이드

## 📋 설정 방법

### 1. Frontend 환경변수 파일 생성

`frontend/.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
# React 앱 환경변수
# 주의: REACT_APP_ prefix가 필요합니다

# 카카오 맵 JavaScript API 키
REACT_APP_KAKAO_MAP_API_KEY=510b624b2b131b82ad7aee34c7864031

# 공공데이터 API 키 (나중에 사용 예정)
REACT_APP_PUBLIC_DATA_API_KEY=

# 개발 환경 설정
GENERATE_SOURCEMAP=false
```

### 2. 프로젝트 루트 환경변수 파일 생성 (선택사항)

`.env` 파일을 프로젝트 루트에 생성하고 다음 내용을 추가하세요:

```env
# 백엔드 개발 시 사용할 환경변수들
NODE_ENV=development
PORT=8080

# 데이터베이스 설정 (나중에 사용)
DB_HOST=localhost
DB_PORT=3306
DB_NAME=safety_shelter
DB_USER=root
DB_PASSWORD=

# API 키들
KAKAO_REST_API_KEY=
PUBLIC_DATA_API_KEY=
```

## ⚠️ 중요 사항

1. **절대 .env 파일을 Git에 커밋하지 마세요!**
2. **.gitignore에 이미 .env 파일들이 포함되어 있습니다**
3. **팀원들과 공유할 때는 이 가이드를 참고하여 각자 .env 파일을 생성하세요**
4. **카카오 API 키는 도메인 제한을 통해 보안을 관리합니다**

## 🔧 React 환경변수 사용법

- `REACT_APP_` prefix가 필요합니다
- 컴포넌트에서 `process.env.REACT_APP_변수명`으로 접근
- 빌드 시 번들에 포함되므로 민감한 정보는 포함하지 마세요 