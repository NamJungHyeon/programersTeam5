/**
 * 🏠 메인 App 컴포넌트
 * 
 * 대피소 찾기 서비스의 메인 화면입니다.
 * 카카오 맵을 중심으로 한 UI를 제공합니다.
 */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import KakaoMap from './components/KakaoMap';
import AddressSearch from './components/AddressSearch';
import Header from './components/Header';
import './App.css';

// =============================================================================
// 🎨 스타일 컴포넌트
// =============================================================================

/**
 * 전체 앱 컨테이너
 */
const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
`;

/**
 * 메인 콘텐츠 영역
 */
const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

/**
 * 검색 섹션
 */
const SearchSection = styled.section`
  padding: 30px;
  border-bottom: 1px solid #e0e0e0;
  
  h2 {
    color: #333;
    font-size: 1.5rem;
    margin: 0 0 20px 0;
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

/**
 * 경고 메시지 스타일
 */
const WarningBox = styled.div`
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  color: #856404;
  
  strong {
    display: block;
    margin-bottom: 8px;
  }
  
  ul {
    margin: 8px 0 0 20px;
    
    li {
      margin-bottom: 4px;
    }
  }
`;

/**
 * API 상태 정보 박스
 */
const ApiStatusBox = styled.div`
  background: #e8f5e8;
  border: 1px solid #c3e6c3;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  
  .status-item {
    margin: 5px 0;
    
    .label {
      font-weight: bold;
      color: #2d5a2d;
    }
    
    .value {
      color: #1a1a1a;
      margin-left: 10px;
    }
  }
`;

/**
 * 지도 섹션
 */
const MapSection = styled.div`
  width: 100%;
  margin-top: 30px;
`;

// =============================================================================
// 🎯 메인 컴포넌트
// =============================================================================

const App: React.FC = () => {
  // =============================================================================
  // 📊 상태 관리
  // =============================================================================
  
  /**
   * API 상태 관리
   */
  const [apiStatus, setApiStatus] = useState({
    kakaoExists: false,
    kakaoMapsExists: false,
    hasApiKey: false,
    currentUrl: '',
    timestamp: ''
  });

  /**
   * 지도 중심 좌표 (기본값: 서울시청)
   */
  const [mapCenter, setMapCenter] = useState({
    lat: 37.5665, // 서울시청 위도
    lng: 126.9780 // 서울시청 경도
  });

  /**
   * 검색된 장소 정보
   */
  const [searchResult, setSearchResult] = useState<{
    name: string;
    address: string;
    coordinates: { lat: number; lng: number };
    category?: string;
  } | null>(null);

  /**
   * 임시 마커 데이터 (테스트용)
   */
  const [testMarkers] = useState([
    {
      id: '1',
      position: { lat: 37.5665, lng: 126.9780 },
      title: '서울시청',
      content: '서울특별시청 <br/>📍 중구 세종대로 110'
    },
    {
      id: '2', 
      position: { lat: 37.5511, lng: 126.9882 },
      title: '강남역',
      content: '강남역 <br/>📍 강남구 역삼동'
    },
    {
      id: '3',
      position: { lat: 37.5759, lng: 126.9768 },
      title: '광화문',
      content: '광화문광장 <br/>📍 종로구 세종로'
    }
  ]);

  /**
   * 모든 마커 데이터 (테스트 마커 + 검색 결과 마커)
   */
  const allMarkers = [
    ...testMarkers,
    // 검색 결과가 있으면 해당 위치에 특별한 마커 추가
    ...(searchResult ? [{
      id: 'search-result',
      position: {
        lat: searchResult.coordinates.lat,
        lng: searchResult.coordinates.lng
      },
      title: '🔍 검색된 장소',
      content: `${searchResult.name} <br/>🏷️ ${searchResult.category || '일반'} <br/>📍 ${searchResult.address}`
    }] : [])
  ];

  // =============================================================================
  // 🎯 이벤트 핸들러
  // =============================================================================

  /**
   * API 상태 확인
   */
  useEffect(() => {
    const checkApiStatus = () => {
      setApiStatus({
        kakaoExists: !!(window as any).kakao,
        kakaoMapsExists: !!((window as any).kakao && (window as any).kakao.maps),
        hasApiKey: !!process.env.REACT_APP_KAKAO_MAP_API_KEY,
        currentUrl: window.location.href,
        timestamp: new Date().toLocaleTimeString()
      });
    };
    
    // 초기 확인
    checkApiStatus();
    
    // 1초마다 상태 확인
    const interval = setInterval(checkApiStatus, 1000);
    
    return () => clearInterval(interval);
  }, []);

  /**
   * 마커 클릭 이벤트 처리
   */
  const handleMarkerClick = (marker: any) => {
    alert(`📍 ${marker.title}\n${marker.content || '위치 정보'}`);
  };

  /**
   * 지도 클릭 이벤트 처리  
   */
  const handleMapClick = (coordinates: any) => {
    console.log('🗺️ 지도 클릭:', coordinates);
    // 여기에 주소 검색 로직을 추가할 수 있습니다
  };

  /**
   * 키워드 검색 완료 이벤트 처리
   */
  const handleAddressSearch = (result: { name: string; address: string; coordinates: { lat: number; lng: number }; category?: string }) => {
    console.log('🔍 키워드 검색 결과:', result);
    
    // 검색 결과 저장
    setSearchResult(result);
    
    // 지도 중심을 검색된 위치로 이동
    setMapCenter({
      lat: result.coordinates.lat,
      lng: result.coordinates.lng
    });
    
    // 사용자에게 알림
    alert(`📍 "${result.name}"로 지도가 이동되었습니다!`);
  };

  // =============================================================================
  // 🎨 렌더링
  // =============================================================================

  return (
    <div className="app-wrapper">
      <Header />
      <div className="main-container">
        <div className="left-column">
          <div className="search-container">
            <h2>🗺️ 검색할 지역 이름</h2>
            <AddressSearch
              onSearch={handleAddressSearch}
              placeholder="장소를 검색하세요 (예: 강남역, 스타벅스, 롯데월드)"
            />
          </div>
          <MapSection>
            <KakaoMap
              center={mapCenter}
              level={3}
              markers={allMarkers}
              onMarkerClick={handleMarkerClick}
              onMapClick={handleMapClick}
              style={{
                width: '100%',
                height: 'calc(100vh - 250px)', // 높이 계산 조정
                borderRadius: '8px'
              }}
            />
          </MapSection>
        </div>
        <div className="right-column">
          {/* 오른쪽 컬럼: 대피소 목록 (추후 구현) */}
          <h2>가장 가까운 대피소</h2>
          <p>이곳에 대피소 목록이 표시됩니다.</p>
        </div>
      </div>
    </div>
  );
};

export default App;
