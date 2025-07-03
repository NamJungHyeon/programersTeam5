/**
 * 좌표 정보 인터페이스
 */
export interface Coordinates {
  lat: number; // 위도
  lng: number; // 경도
}

/**
 * 장소 검색 결과 인터페이스
 */
export interface SearchResult {
  name: string;      // 장소명
  address: string;   // 주소
  coordinates: Coordinates; // 좌표
  category?: string; // 카테고리
} 