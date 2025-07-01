/**
 * 🏷️ 타입 정의 모음
 * 
 * 이 파일은 프로젝트에서 사용하는 모든 TypeScript 타입들을 정의합니다.
 * 팀원들이 쉽게 타입을 찾고 수정할 수 있도록 카테고리별로 분류했습니다.
 */

// =============================================================================
// 🗺️ 카카오 맵 관련 타입들
// =============================================================================

/**
 * 카카오 맵 API에서 사용하는 기본 좌표 인터페이스
 */
export interface Coordinates {
  lat: number; // 위도 (latitude)
  lng: number; // 경도 (longitude)
}

/**
 * 카카오 맵에서 사용할 마커 정보
 */
export interface MapMarker {
  id: string;           // 마커 고유 ID
  position: Coordinates; // 마커 위치
  title: string;        // 마커 제목
  content?: string;     // 마커 클릭시 보여줄 내용
}

// =============================================================================
// 🏠 대피소 관련 타입들
// =============================================================================

/**
 * 대피소 정보 인터페이스
 * 공공데이터 API에서 받아오는 대피소 정보를 저장합니다.
 */
export interface Shelter {
  id: string;                    // 대피소 고유 ID
  name: string;                  // 대피소 명칭
  address: string;               // 주소
  coordinates: Coordinates;       // 위치 좌표
  capacity: number;              // 수용 인원
  facilityType: string;          // 시설 유형 (예: 학교, 공원 등)
  contactNumber?: string;        // 연락처 (선택사항)
  facilities?: string[];         // 보유 시설 목록 (화장실, 주차장 등)
  distance?: number;             // 사용자로부터의 거리 (미터 단위)
}

// =============================================================================
// 🔍 검색 관련 타입들  
// =============================================================================

/**
 * 주소 검색 결과 타입
 */
export interface AddressSearchResult {
  address: string;
  coordinates: Coordinates;
  roadAddress?: string; // 도로명 주소 (선택사항)
}

/**
 * 검색 필터 옵션
 */
export interface SearchFilters {
  maxDistance?: number;     // 최대 거리 (미터)
  facilityTypes?: string[]; // 시설 유형 필터
  minCapacity?: number;     // 최소 수용 인원
}

// =============================================================================
// 📱 UI 관련 타입들
// =============================================================================

/**
 * 로딩 상태를 나타내는 타입
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * API 응답의 기본 구조
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// =============================================================================
// 내보내기 (Export)
// =============================================================================

// 다른 파일에서 import해서 사용할 수 있도록 모든 타입을 내보냅니다.
export type {
  // 위에서 정의한 모든 타입들은 이미 export되어 있습니다.
}; 