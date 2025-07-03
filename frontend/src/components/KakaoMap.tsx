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
import { Shelter } from '../data/shelters';

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

interface SearchLocation {
  name: string;
  lat: number;
  lng: number;
  style?: React.CSSProperties;
}

interface KakaoMapProps {
  searchLocation: SearchLocation | null;
  shelters: Shelter[];
  style?: React.CSSProperties;
}

// =============================================================================
// 🗺️ 상수 정의
// =============================================================================
// 기본 위치 (서울 시청) - 컴포넌트 밖으로 이동하여 불필요한 재선언 방지
const defaultPosition = {
  lat: 37.5665,
  lng: 126.978,
};

// =============================================================================
// 🎨 스타일 컴포넌트
// =============================================================================

/**
 * 지도 컨테이너 스타일
 */
const MapContainer = styled.div`
  width: 100%;
  height: 100%;
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
  color: #555;
`;

// =============================================================================
// 🎯 메인 컴포넌트
// =============================================================================

const KakaoMap: React.FC<KakaoMapProps> = ({
  searchLocation,
  shelters,
  style
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentMarkers, setCurrentMarkers] = useState<any[]>([]);

  // 지도 초기화
  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      initializeMap();
    } else {
      const script = document.createElement('script');
      script.async = true;
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&autoload=false&libraries=services`;
      document.head.appendChild(script);
      script.onload = () => {
        window.kakao.maps.load(initializeMap);
      };
    }
  }, []);

  const initializeMap = () => {
    const options = {
      center: new window.kakao.maps.LatLng(37.456257, 126.705208), // 인천시청
      level: 8,
    };
    const kakaoMap = new window.kakao.maps.Map(mapContainer.current, options);
    setMap(kakaoMap);
    setIsLoading(false);
  };

  // 지도 중심 및 마커 업데이트
  useEffect(() => {
    if (!map) return;

    // 1. 이전 마커 모두 제거
    currentMarkers.forEach(marker => marker.setMap(null));
    const newMarkers: any[] = [];

    // 2. 새로운 마커 생성 및 화면 범위 계산 준비
    const bounds = new window.kakao.maps.LatLngBounds();
    let hasMarkers = false;

    // 3. 검색 위치 마커 추가
    if (searchLocation) {
      const pos = new window.kakao.maps.LatLng(searchLocation.lat, searchLocation.lng);

      const searchMarkerImage = new window.kakao.maps.MarkerImage(
        'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
        new window.kakao.maps.Size(24, 35)
      );

      const searchMarker = new window.kakao.maps.Marker({
        map: map,
        position: pos,
        title: searchLocation.name,
        image: searchMarkerImage,
      });
      newMarkers.push(searchMarker);
      bounds.extend(pos); // 범위에 검색 위치 추가
      hasMarkers = true;
    }

    // 4. 대피소 마커 추가
    shelters.forEach(shelter => {
      const pos = new window.kakao.maps.LatLng(shelter.lat, shelter.lng)
      const shelterMarker = new window.kakao.maps.Marker({
        map: map,
        position: pos,
        title: shelter.name,
      });
      newMarkers.push(shelterMarker);
      bounds.extend(pos); // 범위에 대피소 위치 추가
      hasMarkers = true;
    });

    // 5. 마커 상태 업데이트
    setCurrentMarkers(newMarkers);

    // 6. 모든 마커가 보이도록 지도 범위 조정
    // 검색을 했고, 표시할 마커가 하나라도 있는 경우에만 실행
    if (searchLocation && hasMarkers) {
      map.setBounds(bounds);
    }

  }, [map, searchLocation, shelters]);

  return (
    <>
      {isLoading && <LoadingSpinner>🗺️ 지도 로딩 중...</LoadingSpinner>}
      <MapContainer ref={mapContainer} style={style} />
    </>
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