/**
 * 🛠️ 유틸리티 함수 모음
 * 
 * 이 파일은 프로젝트에서 자주 사용하는 유틸리티 함수들을 모아놓았습니다.
 * 각 함수는 재사용 가능하도록 독립적으로 작성되었습니다.
 */

import { Coordinates } from '../types';

// =============================================================================
// 📐 거리 계산 관련 함수들
// =============================================================================

/**
 * 두 좌표 간의 직선 거리를 계산합니다 (하버사인 공식 사용)
 * 
 * @param coord1 첫 번째 좌표 (위도, 경도)
 * @param coord2 두 번째 좌표 (위도, 경도)
 * @returns 두 지점 간의 거리 (미터 단위)
 * 
 * 📚 사용 예시:
 * const distance = calculateDistance(
 *   { lat: 37.5665, lng: 126.9780 }, // 서울시청
 *   { lat: 37.5511, lng: 126.9882 }  // 강남역
 * );
 * console.log(`거리: ${distance}미터`);
 */
const calculateDistance = (coord1: Coordinates, coord2: Coordinates): number => {
  const R = 6371e3; // 지구의 반지름 (미터)
  
  // 위도와 경도를 라디안으로 변환
  const φ1 = (coord1.lat * Math.PI) / 180;
  const φ2 = (coord2.lat * Math.PI) / 180;
  const Δφ = ((coord2.lat - coord1.lat) * Math.PI) / 180;
  const Δλ = ((coord2.lng - coord1.lng) * Math.PI) / 180;

  // 하버사인 공식 적용
  const a = 
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  return R * c; // 미터 단위로 반환
};

/**
 * 거리를 읽기 쉬운 형태로 포맷팅합니다
 * 
 * @param distance 거리 (미터 단위)
 * @returns 포맷팅된 거리 문자열
 * 
 * 📚 사용 예시:
 * formatDistance(1234) → "1.2km"
 * formatDistance(567) → "567m"
 */
const formatDistance = (distance: number): string => {
  if (distance >= 1000) {
    return `${(distance / 1000).toFixed(1)}km`;
  }
  return `${Math.round(distance)}m`;
};

// =============================================================================
// 🎯 배열 조작 관련 함수들
// =============================================================================

/**
 * 배열에서 특정 개수만큼 가장 가까운 항목들을 선별합니다
 * 
 * @param items 정렬할 항목 배열
 * @param userLocation 사용자 위치
 * @param count 선별할 개수
 * @returns 거리순으로 정렬된 배열 (가장 가까운 순)
 */
const getClosestItems = <T extends { coordinates: Coordinates }>(
  items: T[],
  userLocation: Coordinates,
  count: number = 10
): T[] => {
  // 각 항목에 거리 정보를 추가하고 정렬
  return items
    .map(item => ({
      ...item,
      distance: calculateDistance(userLocation, item.coordinates)
    }))
    .sort((a, b) => a.distance - b.distance) // 거리 순으로 정렬
    .slice(0, count); // 지정된 개수만큼 선별
};

// =============================================================================
// 🔧 일반적인 유틸리티 함수들
// =============================================================================

/**
 * 디바운스 함수 - 짧은 시간 내에 여러 번 호출되는 함수를 제어합니다
 * 주로 검색 입력창에서 사용됩니다.
 * 
 * @param func 실행할 함수
 * @param delay 지연 시간 (밀리초)
 * @returns 디바운스가 적용된 함수
 * 
 * 📚 사용 예시:
 * const debouncedSearch = debounce((query: string) => {
 *   console.log('검색:', query);
 * }, 300);
 */
const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: number;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * 로컬 스토리지에 데이터를 안전하게 저장합니다
 * 
 * @param key 저장할 키
 * @param value 저장할 값
 */
const setLocalStorage = (key: string, value: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('로컬 스토리지 저장 실패:', error);
  }
};

/**
 * 로컬 스토리지에서 데이터를 안전하게 불러옵니다
 * 
 * @param key 불러올 키
 * @param defaultValue 기본값
 * @returns 저장된 값 또는 기본값
 */
const getLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('로컬 스토리지 불러오기 실패:', error);
    return defaultValue;
  }
};

// =============================================================================
// 내보내기 (Export)
// =============================================================================

// 모든 유틸리티 함수들을 내보냅니다
export {
  // 거리 계산
  calculateDistance,
  formatDistance,
  getClosestItems,
  
  // 일반 유틸리티
  debounce,
  setLocalStorage,
  getLocalStorage
}; 