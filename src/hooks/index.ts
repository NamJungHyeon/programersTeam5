/**
 * 🎣 커스텀 훅 모음
 * 
 * 이 파일은 프로젝트에서 사용하는 커스텀 React 훅들을 모아놓았습니다.
 * 각 훅은 재사용 가능하도록 독립적으로 작성되었습니다.
 */

import { useState, useEffect, useCallback } from 'react';
import { 
  Shelter, 
  Coordinates, 
  LoadingState, 
  ApiResponse 
} from '../types';
import { 
  getMockShelters, 
  getCurrentLocation, 
  searchAddress 
} from '../services';
import { getClosestItems } from '../utils';

// =============================================================================
// 🗺️ 위치 관련 훅들
// =============================================================================

/**
 * 사용자의 현재 위치를 관리하는 훅
 * 
 * @returns {object} 현재 위치 정보와 로딩 상태
 * 
 * 📚 사용 예시:
 * const { location, loading, error, refreshLocation } = useLocation();
 * 
 * if (loading) return <div>위치 정보를 가져오는 중...</div>;
 * if (error) return <div>오류: {error}</div>;
 * return <div>위도: {location.lat}, 경도: {location.lng}</div>;
 */
const useLocation = () => {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);

  const getLocation = useCallback(async () => {
    setLoading('loading');
    setError(null);

    try {
      const response = await getCurrentLocation();
      
      if (response.success && response.data) {
        setLocation(response.data);
        setLoading('success');
      } else {
        setError(response.error || '위치를 가져올 수 없습니다.');
        setLoading('error');
      }
    } catch (err: any) {
      setError(err.message || '위치 정보 요청 중 오류가 발생했습니다.');
      setLoading('error');
    }
  }, []);

  // 컴포넌트 마운트 시 자동으로 위치 정보 가져오기
  useEffect(() => {
    getLocation();
  }, [getLocation]);

  return {
    location,
    loading,
    error,
    refreshLocation: getLocation
  };
};

// =============================================================================
// 🏠 대피소 관련 훅들
// =============================================================================

/**
 * 대피소 목록을 관리하는 훅
 * 
 * @param userLocation 사용자 위치 (옵션)
 * @returns {object} 대피소 목록과 관련 함수들
 */
const useShelters = (userLocation?: Coordinates | null) => {
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [loading, setLoading] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);

  const fetchShelters = useCallback(async (coordinates?: Coordinates) => {
    const targetLocation = coordinates || userLocation;
    
    if (!targetLocation) {
      setError('위치 정보가 필요합니다.');
      return;
    }

    setLoading('loading');
    setError(null);

    try {
      // 현재는 임시 데이터를 사용, 나중에 실제 API로 변경
      const response = await getMockShelters(targetLocation);
      
      if (response.success && response.data) {
        // 거리순으로 정렬하여 가장 가까운 10곳 선별
        const sortedShelters = getClosestItems(response.data, targetLocation, 10);
        setShelters(sortedShelters);
        setLoading('success');
      } else {
        setError(response.error || '대피소 정보를 가져올 수 없습니다.');
        setLoading('error');
      }
    } catch (err: any) {
      setError(err.message || '대피소 정보 요청 중 오류가 발생했습니다.');
      setLoading('error');
    }
  }, [userLocation]);

  // 사용자 위치가 변경되면 자동으로 대피소 목록 업데이트
  useEffect(() => {
    if (userLocation) {
      fetchShelters();
    }
  }, [userLocation, fetchShelters]);

  return {
    shelters,
    loading,
    error,
    refreshShelters: fetchShelters
  };
};

// =============================================================================
// 🔍 검색 관련 훅들
// =============================================================================

/**
 * 주소 검색 기능을 제공하는 훅
 * 
 * @returns {object} 검색 함수와 결과 상태
 */
const useAddressSearch = () => {
  const [loading, setLoading] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (address: string): Promise<Coordinates | null> => {
    if (!address.trim()) {
      setError('주소를 입력해주세요.');
      return null;
    }

    setLoading('loading');
    setError(null);

    try {
      const response = await searchAddress(address);
      
      if (response.success && response.data && response.data.length > 0) {
        setLoading('success');
        return response.data[0].coordinates; // 첫 번째 검색 결과 반환
      } else {
        setError(response.error || '주소를 찾을 수 없습니다.');
        setLoading('error');
        return null;
      }
    } catch (err: any) {
      setError(err.message || '주소 검색 중 오류가 발생했습니다.');
      setLoading('error');
      return null;
    }
  }, []);

  return {
    search,
    loading,
    error
  };
};

// =============================================================================
// 🎨 UI 관련 훅들
// =============================================================================

/**
 * 로컬 스토리지와 연동된 상태 관리 훅
 * 
 * @param key 로컬 스토리지 키
 * @param defaultValue 기본값
 * @returns [값, 설정 함수]
 */
const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`로컬 스토리지에서 ${key} 읽기 실패:`, error);
      return defaultValue;
    }
  });

  const setStoredValue = useCallback((newValue: T | ((prev: T) => T)) => {
    try {
      const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
      setValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`로컬 스토리지에 ${key} 저장 실패:`, error);
    }
  }, [key, value]);

  return [value, setStoredValue] as const;
};

/**
 * 디바운스된 값을 제공하는 훅
 * 
 * @param value 디바운스할 값
 * @param delay 지연 시간 (밀리초)
 * @returns 디바운스된 값
 * 
 * 📚 사용 예시:
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearchTerm = useDebounce(searchTerm, 300);
 * 
 * useEffect(() => {
 *   if (debouncedSearchTerm) {
 *     // 검색 실행
 *   }
 * }, [debouncedSearchTerm]);
 */
const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// =============================================================================
// 내보내기 (Export)
// =============================================================================

export {
  // 위치 관련
  useLocation,
  
  // 대피소 관련
  useShelters,
  
  // 검색 관련
  useAddressSearch,
  
  // UI 관련
  useLocalStorage,
  useDebounce
}; 