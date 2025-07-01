// 환경변수 타입 정의
declare namespace NodeJS {
  interface ProcessEnv {
    // 카카오 맵 API 키
    REACT_APP_KAKAO_MAP_API_KEY: string;
    
    // 공공데이터 API 키 (나중에 사용)
    REACT_APP_PUBLIC_DATA_API_KEY?: string;
    
    // 기본 React 환경변수
    NODE_ENV: 'development' | 'production' | 'test';
    PUBLIC_URL: string;
  }
} 