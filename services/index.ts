/**
 * 🌐 API 서비스 모음
 * 
 * 이 파일은 외부 API 호출과 데이터 처리를 담당합니다.
 * 각 서비스는 독립적으로 작동하며, 에러 처리도 포함되어 있습니다.
 */

import axios from 'axios';
import { 
  Shelter, 
  AddressSearchResult, 
  ApiResponse, 
  Coordinates 
} from '../types';

// =============================================================================
// 🔧 API 기본 설정
// =============================================================================

/**
 * Axios 인스턴스 생성 - 기본 설정을 미리 정의합니다
 */
const apiClient = axios.create({
  timeout: 10000, // 10초 타임아웃
  headers: {
    'Content-Type': 'application/json',
  },
});

// API 요청/응답 로그를 위한 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    console.log(`🚀 API 요청: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ API 요청 오류:', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ API 응답 성공: ${response.status}`);
    return response;
  },
  (error) => {
    console.error('❌ API 응답 오류:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

// =============================================================================
// 🏠 대피소 관련 API 서비스
// =============================================================================

/**
 * 백엔드에서 대피소 목록을 가져옵니다
 * 
 * @param coordinates 검색할 위치 좌표
 * @param maxDistance 최대 검색 거리 (미터)
 * @returns 대피소 목록
 * 
 * 📚 사용 예시:
 * const shelters = await getShelters(
 *   { lat: 37.5665, lng: 126.9780 }, 
 *   5000 // 5km 반경
 * );
 */
const getShelters = async (
  coordinates: Coordinates,
  maxDistance: number = 5000
): Promise<ApiResponse<Shelter[]>> => {
  try {
    // TODO: 실제 백엔드 API가 구현되면 이 URL을 변경하세요
    const response = await apiClient.get('/api/shelters', {
      params: {
        lat: coordinates.lat,
        lng: coordinates.lng,
        maxDistance,
        limit: 10 // 최대 10개 결과
      }
    });

    return {
      success: true,
      data: response.data,
      message: '대피소 목록을 성공적으로 가져왔습니다.'
    };

  } catch (error: any) {
    console.error('대피소 목록 조회 실패:', error);
    
    return {
      success: false,
      error: error.message || '대피소 목록을 가져오는데 실패했습니다.',
      message: '네트워크 연결을 확인해주세요.'
    };
  }
};

/**
 * 공공데이터 API에서 대피소 정보를 직접 가져옵니다 (임시용)
 * 실제 백엔드가 구현되기 전까지 사용하는 함수입니다.
 */
const getMockShelters = async (coordinates: Coordinates): Promise<ApiResponse<Shelter[]>> => {
  try {
    // 개발용 임시 데이터 - 실제로는 공공데이터 API에서 가져와야 합니다
    const mockData: Shelter[] = [
      {
        id: '1',
        name: '서울시청 대피소',
        address: '서울특별시 중구 세종대로 110',
        coordinates: { lat: 37.5665, lng: 126.9780 },
        capacity: 500,
        facilityType: '공공건물',
        contactNumber: '02-120',
        facilities: ['화장실', '주차장', '음료수']
      },
      {
        id: '2',
        name: '강남역 지하상가 대피소',
        address: '서울특별시 강남구 강남대로 396',
        coordinates: { lat: 37.4979, lng: 127.0276 },
        capacity: 300,
        facilityType: '지하상가',
        contactNumber: '02-2180-8114',
        facilities: ['화장실', '편의점', '의료실']
      },
      {
        id: '3',
        name: '홍대입구역 대피소',
        address: '서울특별시 마포구 양화로 160',
        coordinates: { lat: 37.5571, lng: 126.9240 },
        capacity: 200,
        facilityType: '지하역사',
        contactNumber: '02-6110-1234',
        facilities: ['화장실', '자판기']
      }
    ];

    // 개발 환경에서 네트워크 지연 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
      success: true,
      data: mockData,
      message: '임시 대피소 데이터를 가져왔습니다.'
    };

  } catch (error: any) {
    return {
      success: false,
      error: error.message,
      message: '임시 데이터 로딩에 실패했습니다.'
    };
  }
};

// =============================================================================
// 🔍 주소 검색 관련 API 서비스
// =============================================================================

/**
 * 주소를 좌표로 변환합니다 (카카오 주소 검색 API 사용)
 * 
 * @param address 검색할 주소
 * @returns 좌표 정보
 * 
 * ⚠️ 주의: 실제 사용시 카카오 API 키가 필요합니다!
 */
const searchAddress = async (address: string): Promise<ApiResponse<AddressSearchResult[]>> => {
  try {
    // TODO: 카카오 API 키를 환경변수에서 가져오세요
    const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
    
    if (!KAKAO_API_KEY) {
      throw new Error('카카오 API 키가 설정되지 않았습니다.');
    }

    const response = await axios.get(
      'https://dapi.kakao.com/v2/local/search/address.json',
      {
        params: { query: address },
        headers: {
          Authorization: `KakaoAK ${KAKAO_API_KEY}`,
        },
      }
    );

    const results: AddressSearchResult[] = response.data.documents.map((doc: any) => ({
      address: doc.address_name,
      coordinates: {
        lat: parseFloat(doc.y),
        lng: parseFloat(doc.x)
      },
      roadAddress: doc.road_address_name
    }));

    return {
      success: true,
      data: results,
      message: '주소 검색이 완료되었습니다.'
    };

  } catch (error: any) {
    console.error('주소 검색 실패:', error);
    
    return {
      success: false,
      error: error.message || '주소 검색에 실패했습니다.',
      message: 'API 키 설정을 확인해주세요.'
    };
  }
};

/**
 * 현재 위치를 가져옵니다 (브라우저 위치 서비스 사용)
 */
const getCurrentLocation = (): Promise<ApiResponse<Coordinates>> => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({
        success: false,
        error: '브라우저가 위치 서비스를 지원하지 않습니다.',
        message: '주소를 직접 입력해주세요.'
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          success: true,
          data: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          message: '현재 위치를 가져왔습니다.'
        });
      },
      (error) => {
        let errorMessage = '위치 정보를 가져올 수 없습니다.';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = '위치 접근 권한이 거부되었습니다.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = '위치 정보를 사용할 수 없습니다.';
            break;
          case error.TIMEOUT:
            errorMessage = '위치 정보 요청이 시간 초과되었습니다.';
            break;
        }

        resolve({
          success: false,
          error: errorMessage,
          message: '브라우저 설정에서 위치 접근을 허용해주세요.'
        });
      },
      {
        enableHighAccuracy: true, // 높은 정확도 요청
        timeout: 10000,          // 10초 타임아웃
        maximumAge: 300000       // 5분간 캐시 사용
      }
    );
  });
};

// =============================================================================
// 내보내기 (Export)
// =============================================================================

export {
  // 대피소 관련
  getShelters,
  getMockShelters,
  
  // 주소 검색 관련
  searchAddress,
  getCurrentLocation,
  
  // API 클라이언트
  apiClient
}; 