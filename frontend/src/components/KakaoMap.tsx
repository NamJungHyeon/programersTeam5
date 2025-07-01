/**
 * 🗺️ 카카오 맵 컴포넌트
 * 
 * 이 컴포넌트는 카카오 맵 API를 사용하여 지도를 렌더링합니다.
 * 마커 표시, 클릭 이벤트 등의 기능을 포함합니다.
 * 
 * 📚 사용 예시:
 * <KakaoMap 
 *   center={{ lat: 37.5665, lng: 126.9780 }}
 *   markers={shelterMarkers}
 *   onMarkerClick={handleMarkerClick}
 * />
 */

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

// =============================================================================
// 📝 타입 정의
// =============================================================================

/**
 * 좌표 정보 인터페이스
 */
interface Coordinates {
  lat: number; // 위도
  lng: number; // 경도
}

/**
 * 마커 정보 인터페이스
 */
interface MapMarker {
  id: string;
  position: Coordinates;
  title: string;
  content?: string;
}

/**
 * 카카오 맵 컴포넌트 Props
 */
interface KakaoMapProps {
  center: Coordinates;           // 지도 중심 좌표
  level?: number;               // 지도 확대/축소 레벨 (1-14, 기본값: 3)
  markers?: MapMarker[];        // 마커 배열
  onMarkerClick?: (marker: MapMarker) => void; // 마커 클릭 이벤트
  onMapClick?: (coordinates: Coordinates) => void; // 지도 클릭 이벤트
  style?: React.CSSProperties;  // 지도 컨테이너 스타일
}

// =============================================================================
// 🎨 스타일 컴포넌트
// =============================================================================

/**
 * 지도 컨테이너 스타일
 */
const MapContainer = styled.div<{ width?: string; height?: string }>`
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '400px'};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  /* 반응형 디자인 */
  @media (max-width: 768px) {
    height: 300px;
    border-radius: 4px;
  }
`;

/**
 * 로딩 스피너 스타일
 */
const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 16px;
  color: #666;
  background-color: #f5f5f5;
  
  &::before {
    content: '🔄';
    animation: spin 1s linear infinite;
    margin-right: 8px;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

/**
 * 에러 메시지 스타일
 */
const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 16px;
  color: #e74c3c;
  background-color: #fdf2f2;
  border: 1px solid #e74c3c;
  border-radius: 4px;
  
  &::before {
    content: '⚠️';
    margin-right: 8px;
  }
`;

// =============================================================================
// 🎯 메인 컴포넌트
// =============================================================================

const KakaoMap: React.FC<KakaoMapProps> = ({
  center,
  level = 3,
  markers = [],
  onMarkerClick,
  onMapClick,
  style
}) => {
  // DOM 요소 참조
  const mapContainer = useRef<HTMLDivElement>(null);
  
  // 상태 관리
  const [map, setMap] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [kakaoMarkers, setKakaoMarkers] = useState<any[]>([]);

  // =============================================================================
  // 🚀 초기화 함수들
  // =============================================================================

  /**
   * 카카오 맵 초기화 함수
   */
  const initializeMap = () => {
    console.log('🚀 지도 초기화 시작...');
    console.log('window.kakao:', window.kakao);
    console.log('window.kakao.maps:', window.kakao?.maps);
    
    // 카카오 맵 API가 로드되었는지 확인
    if (!window.kakao || !window.kakao.maps) {
      console.error('❌ 카카오 맵 API가 로드되지 않았습니다.');
      setError('카카오 맵 API가 로드되지 않았습니다. 인터넷 연결을 확인해주세요.');
      setIsLoading(false);
      return;
    }

    if (!mapContainer.current) {
      setError('지도 컨테이너를 찾을 수 없습니다.');
      setIsLoading(false);
      return;
    }

    try {
      // 지도 옵션 설정
      const options = {
        center: new window.kakao.maps.LatLng(center.lat, center.lng),
        level: level
      };

      // 지도 생성
      const kakaoMap = new window.kakao.maps.Map(mapContainer.current, options);
      
      // 지도 클릭 이벤트 등록
      if (onMapClick) {
        window.kakao.maps.event.addListener(kakaoMap, 'click', (mouseEvent: any) => {
          const latlng = mouseEvent.latLng;
          onMapClick({
            lat: latlng.getLat(),
            lng: latlng.getLng()
          });
        });
      }

      setMap(kakaoMap);
      setIsLoading(false);
      
      console.log('✅ 카카오 맵이 성공적으로 초기화되었습니다.');
    } catch (err: any) {
      console.error('❌ 카카오 맵 초기화 실패:', err);
      setError(`지도 초기화에 실패했습니다: ${err.message}`);
      setIsLoading(false);
    }
  };

  /**
   * 마커들을 지도에 추가하는 함수
   */
  const addMarkersToMap = () => {
    if (!map || !markers.length) return;

    // 기존 마커들 제거
    kakaoMarkers.forEach(marker => marker.setMap(null));

    // 새 마커들 생성
    const newMarkers = markers.map((markerData, index) => {
      try {
        // 마커 위치 설정
        const position = new window.kakao.maps.LatLng(
          markerData.position.lat, 
          markerData.position.lng
        );

        // 마커 생성
        const marker = new window.kakao.maps.Marker({
          position: position,
          title: markerData.title
        });

        // 마커를 지도에 표시
        marker.setMap(map);

        // 마커 클릭 이벤트 등록
        if (onMarkerClick) {
          window.kakao.maps.event.addListener(marker, 'click', () => {
            onMarkerClick(markerData);
          });
        }

        // 인포윈도우 생성 (선택사항)
        if (markerData.content) {
          const infoWindow = new window.kakao.maps.InfoWindow({
            content: `<div style="padding:10px;">${markerData.content}</div>`
          });

          // 마커 클릭 시 인포윈도우 표시
          window.kakao.maps.event.addListener(marker, 'click', () => {
            infoWindow.open(map, marker);
          });
        }

        return marker;
      } catch (err: any) {
        console.error(`❌ 마커 ${index} 생성 실패:`, err);
        return null;
      }
    }).filter(marker => marker !== null);

    setKakaoMarkers(newMarkers);
    console.log(`✅ ${newMarkers.length}개의 마커가 추가되었습니다.`);
  };

  // =============================================================================
  // 🎣 이펙트 훅들
  // =============================================================================

  /**
   * 환경변수 확인 함수
   */
  const checkEnvironmentVariables = () => {
    const apiKey = process.env.REACT_APP_KAKAO_MAP_API_KEY;
    
    console.log('🔑 환경변수 확인...');
    console.log('API 키 존재 여부:', !!apiKey);
    console.log('API 키 앞 4자리:', apiKey ? apiKey.substring(0, 4) + '...' : 'undefined');
    
    if (!apiKey) {
      console.error('❌ REACT_APP_KAKAO_MAP_API_KEY 환경변수가 설정되지 않았습니다.');
      setError('카카오 맵 API 키가 설정되지 않았습니다. ENV_SETUP.md를 참고하여 frontend/.env 파일을 생성해주세요.');
      setIsLoading(false);
      return false;
    }
    
    console.log('✅ 환경변수 확인 완료');
    return true;
  };

  /**
   * 컴포넌트 마운트 시 지도 초기화
   */
  useEffect(() => {
    // 1. 먼저 환경변수 확인
    if (!checkEnvironmentVariables()) {
      return;
    }

    let checkCount = 0;
    const maxChecks = 50; // 5초까지 기다림 (100ms * 50)
    
    // 2. 카카오 맵 API 로드 대기
    const checkKakaoMaps = () => {
      console.log(`🔍 카카오 API 확인 중... (${checkCount + 1}/${maxChecks})`);
      console.log('window.kakao 존재:', !!window.kakao);
      console.log('window.kakao.maps 존재:', !!(window.kakao && window.kakao.maps));
      
      if (window.kakao && window.kakao.maps) {
        console.log('✅ 카카오 API 로드 완료!');
        initializeMap();
      } else {
        checkCount++;
        if (checkCount < maxChecks) {
          setTimeout(checkKakaoMaps, 100);
        } else {
          console.error('❌ 카카오 API 로드 타임아웃');
          setError('카카오 맵 API 로드에 실패했습니다. 페이지를 새로고침해주세요.');
          setIsLoading(false);
        }
      }
    };

    checkKakaoMaps();
    
    // 컴포넌트 언마운트 시 정리
    return () => {
      kakaoMarkers.forEach(marker => marker.setMap(null));
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * 중심 좌표가 변경될 때 지도 이동
   */
  useEffect(() => {
    if (map && center) {
      const moveLatLng = new window.kakao.maps.LatLng(center.lat, center.lng);
      map.setCenter(moveLatLng);
    }
  }, [map, center]);

  /**
   * 마커가 변경될 때 지도 업데이트
   */
  useEffect(() => {
    addMarkersToMap();
  }, [map, markers]); // eslint-disable-line react-hooks/exhaustive-deps

  // =============================================================================
  // 🎨 렌더링
  // =============================================================================

  return (
    <MapContainer style={style}>
      {/* 로딩 상태 */}
      {isLoading && (
        <LoadingSpinner>
          지도를 불러오는 중...
        </LoadingSpinner>
      )}
      
      {/* 에러 상태 */}
      {error && (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      )}
      
      {/* 지도 컨테이너 */}
      <div 
        ref={mapContainer} 
        style={{ 
          width: '100%', 
          height: '100%',
          display: isLoading || error ? 'none' : 'block'
        }}
      />
    </MapContainer>
  );
};

// =============================================================================
// 🌐 전역 타입 선언
// =============================================================================

/**
 * 카카오 맵 API 전역 타입 선언
 * TypeScript에서 window.kakao를 인식할 수 있도록 합니다.
 */
declare global {
  interface Window {
    kakao: any;
  }
}

export default KakaoMap; 