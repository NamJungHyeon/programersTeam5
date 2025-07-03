/**
 * 🔍 키워드 검색 컴포넌트
 * 
 * 사용자가 키워드를 입력하면 카카오 API를 사용해 장소 검색을 제공하고,
 * 검색된 장소 정보를 상위 컴포넌트로 전달하는 컴포넌트입니다.
 * 
 * 📚 사용 예시:
 * <AddressSearch 
 *   onSearch={(result) => console.log(result)}
 *   placeholder="장소를 검색하세요 (예: 강남역, 스타벅스)"
 * />
 */

import React, { useState, useRef, useEffect } from 'react';
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
 * 검색 결과 인터페이스
 */
interface SearchResult {
  name: string;              // 장소명
  address: string;           // 주소
  coordinates: Coordinates;  // 좌표
  category?: string;         // 카테고리 (예: 음식점, 카페 등)
}

/**
 * 키워드 검색 컴포넌트 Props
 */
interface AddressSearchProps {
  onSearch: (result: SearchResult) => void; // 검색 완료 시 호출되는 함수
  placeholder?: string;                     // 입력 필드 placeholder 텍스트
  disabled?: boolean;                       // 비활성화 여부
  style?: React.CSSProperties;              // 컨테이너 스타일
}

/**
 * 카카오 Places API 검색 결과 타입 (카카오 API 응답 구조)
 */
interface KakaoSearchResult {
  place_name: string;    // 장소명
  address_name: string;  // 주소
  category_name: string; // 카테고리
  y: string;            // 위도 (문자열로 반환됨)
  x: string;            // 경도 (문자열로 반환됨)
}

// =============================================================================
// 🎨 스타일 컴포넌트
// =============================================================================

/**
 * 검색 컨테이너 스타일
 */
const SearchContainer = styled.div`
  width: 100%;
  max-width: 500px;
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
`;

/**
 * 검색 입력 래퍼 (입력창과 버튼을 감싸는 컨테이너)
 */
const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: border-color 0.3s ease;
  
  &:focus-within {
    border-color: #4285f4;
    box-shadow: 0 2px 12px rgba(66, 133, 244, 0.2);
  }
  
  /* 반응형 디자인 */
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

/**
 * 검색 입력 필드 스타일
 */
const SearchInput = styled.input`
  flex: 1;
  padding: 14px 16px;
  border: none;
  outline: none;
  font-size: 16px;
  background: transparent;
  
  &::placeholder {
    color: #999;
  }
  
  /* 모바일에서 줌 방지 */
  @media (max-width: 768px) {
    font-size: 16px; /* iOS에서 줌 방지를 위해 16px 이상 필요 */
  }
`;

/**
 * 검색 버튼 스타일
 */
const SearchButton = styled.button`
  padding: 14px 20px;
  background: linear-gradient(135deg, #4285f4 0%, #34a853 100%);
  color: white;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #3367d6 0%, #2d8e47 100%);
    transform: translateY(-1px);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
  
  /* 모바일 반응형 */
  @media (max-width: 768px) {
    width: 100%;
    border-radius: 0 0 6px 6px;
  }
`;

/**
 * 자동완성 목록 컨테이너
 */
const SuggestionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 4px 0 0 0;
  position: absolute;
  width: 100%;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  max-height: 300px;
  overflow-y: auto;
  
  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;

/**
 * 자동완성 항목 스타일
 */
const SuggestionItem = styled.li<{ isHighlighted?: boolean }>`
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s ease;
  background-color: ${props => props.isHighlighted ? '#f8f9fa' : 'white'};
  
  &:hover {
    background-color: #f0f7ff;
  }
  
  &:last-child {
    border-bottom: none;
  }
  
  /* 주소 텍스트 스타일 */
  font-size: 14px;
  color: #333;
  line-height: 1.4;
`;

/**
 * 로딩 스피너 스타일
 */
const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  color: #666;
  font-size: 14px;
  
  &::before {
    content: '🔍';
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
  padding: 12px 16px;
  background: #fff3f3;
  color: #d73527;
  font-size: 14px;
  border-radius: 4px;
  margin-top: 4px;
  
  &::before {
    content: '⚠️';
    margin-right: 8px;
  }
`;

// =============================================================================
// 🎯 메인 컴포넌트
// =============================================================================

const AddressSearch: React.FC<AddressSearchProps> = ({
  onSearch,
  placeholder = "장소를 검색하세요 (예: 강남역, 스타벅스, 롯데월드)",
  disabled = false,
  style
}) => {
  // =============================================================================
  // 📊 상태 관리
  // =============================================================================
  
  const [inputValue, setInputValue] = useState('');                 // 입력 필드 값
  const [suggestions, setSuggestions] = useState<KakaoSearchResult[]>([]); // 자동완성 목록
  const [isLoading, setIsLoading] = useState(false);              // 로딩 상태
  const [error, setError] = useState<string | null>(null);        // 에러 메시지
  const [highlightedIndex, setHighlightedIndex] = useState(-1);   // 키보드로 선택된 항목 인덱스
  
  // DOM 참조
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // =============================================================================
  // 🔧 유틸리티 함수들
  // =============================================================================
  
  /**
   * 디바운스를 적용한 검색 함수
   * 사용자가 타이핑을 멈춘 후 300ms 후에 검색을 실행합니다.
   */
  const debouncedSearch = (query: string) => {
    // 이전 타이머가 있다면 취소
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // 새로운 타이머 설정
    timeoutRef.current = setTimeout(() => {
      searchKeyword(query);
    }, 300); // 300ms 대기
  };
  
  /**
   * 카카오 키워드 검색 API를 호출하는 함수
   */
  const searchKeyword = async (query: string) => {
    // 입력값이 너무 짧으면 검색하지 않음
    if (!query.trim() || query.length < 2) {
      setSuggestions([]);
      setError(null);
      return;
    }
    
    // 카카오 API가 로드되었는지 확인
    if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) {
      setError('카카오 맵 API가 로드되지 않았습니다.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // 카카오 Places 서비스 생성
      const places = new window.kakao.maps.services.Places();
      
      // 키워드 검색 실행
      places.keywordSearch(query, (result: KakaoSearchResult[], status: string) => {
        setIsLoading(false);
        
        if (status === window.kakao.maps.services.Status.OK) {
          // 검색 성공 - 최대 10개까지만 표시
          setSuggestions(result.slice(0, 10));
          setHighlightedIndex(-1); // 하이라이트 초기화
        } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
          // 검색 결과가 없음
          setSuggestions([]);
          setError(`"${query}"에 대한 검색 결과가 없습니다.`);
        } else {
          // 기타 에러
          setSuggestions([]);
          setError('키워드 검색 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
      });
    } catch (err) {
      setIsLoading(false);
      setError('키워드 검색 중 오류가 발생했습니다.');
      console.error('키워드 검색 에러:', err);
    }
  };
  
  /**
   * 선택된 장소로 검색을 완료하는 함수
   */
  const handleSelectAddress = (selectedResult: KakaoSearchResult) => {
    const result: SearchResult = {
      name: selectedResult.place_name,      // 장소명
      address: selectedResult.address_name, // 주소
      coordinates: {
        lat: parseFloat(selectedResult.y), // 카카오 API는 문자열로 반환하므로 숫자로 변환
        lng: parseFloat(selectedResult.x)
      },
      category: selectedResult.category_name // 카테고리
    };
    
    // 입력 필드 업데이트 (장소명으로 변경)
    setInputValue(selectedResult.place_name);
    
    // 자동완성 목록 숨기기
    setSuggestions([]);
    setError(null);
    
    // 상위 컴포넌트에 결과 전달
    onSearch(result);
    
    console.log('🔍 키워드 검색 완료:', result);
  };
  
  // =============================================================================
  // 🎯 이벤트 핸들러들
  // =============================================================================
  
  /**
   * 입력 필드 값 변경 처리
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (value.trim().length >= 2) {
      // 2글자 이상일 때만 검색
      debouncedSearch(value);
    } else {
      // 짧으면 자동완성 숨기기
      setSuggestions([]);
      setError(null);
    }
  };
  
  /**
   * 검색 버튼 클릭 처리
   */
  const handleSearchClick = () => {
    if (inputValue.trim()) {
      // 현재 입력값으로 즉시 검색
      searchKeyword(inputValue.trim());
    }
  };
  
  /**
   * 키보드 이벤트 처리 (엔터, 위/아래 화살표)
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!suggestions.length) {
      // 자동완성 목록이 없으면 엔터 키만 처리
      if (e.key === 'Enter') {
        handleSearchClick();
      }
      return;
    }
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
        
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
          // 하이라이트된 항목 선택
          handleSelectAddress(suggestions[highlightedIndex]);
        } else {
          // 하이라이트된 항목이 없으면 검색 실행
          handleSearchClick();
        }
        break;
        
      case 'Escape':
        // ESC 키로 자동완성 숨기기
        setSuggestions([]);
        setHighlightedIndex(-1);
        if (inputRef.current) {
          inputRef.current.blur(); // 포커스 해제
        }
        break;
    }
  };
  
  // =============================================================================
  // 🧹 정리 작업
  // =============================================================================
  
  /**
   * 컴포넌트 언마운트 시 타이머 정리
   */
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  // =============================================================================
  // 🎨 렌더링
  // =============================================================================
  
  return (
    <SearchContainer style={style}>
      <SearchInputWrapper>
        <SearchInput
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          autoComplete="off" // 브라우저 자동완성 비활성화
        />
        <SearchButton 
          onClick={handleSearchClick}
          disabled={disabled || isLoading}
        >
          {isLoading ? '검색 중...' : '🔍 검색'}
        </SearchButton>
      </SearchInputWrapper>
      
      {/* 에러 메시지 표시 */}
      {error && (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      )}
      
      {/* 자동완성 목록 표시 */}
      {suggestions.length > 0 && (
        <SuggestionList>
          {suggestions.map((suggestion, index) => (
            <SuggestionItem
              key={index}
              isHighlighted={index === highlightedIndex}
              onClick={() => handleSelectAddress(suggestion)}
            >
              <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                📍 {suggestion.place_name}
              </div>
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '2px' }}>
                🏷️ {suggestion.category_name}
              </div>
              <div style={{ fontSize: '11px', color: '#888' }}>
                📮 {suggestion.address_name}
              </div>
            </SuggestionItem>
          ))}
        </SuggestionList>
      )}
      
      {/* 로딩 상태 표시 */}
      {isLoading && suggestions.length === 0 && (
        <SuggestionList>
          <LoadingSpinner>
            키워드를 검색하고 있습니다...
          </LoadingSpinner>
        </SuggestionList>
      )}
    </SearchContainer>
  );
};

export default AddressSearch;

// =============================================================================
// 🔧 window 타입 확장 (TypeScript용)
// =============================================================================

declare global {
  interface Window {
    kakao: any;
  }
} 