/**
 * 🏠 메인 App 컴포넌트
 * 
 * 대피소 찾기 서비스의 메인 화면입니다.
 * 카카오 맵을 중심으로 한 UI를 제공합니다.
 */

import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import AddressSearch from "./components/AddressSearch";
import ShelterList from "./components/ShelterList";
import KakaoMap from "./components/KakaoMap";
import { Shelter, shelters } from "./data/shelters";
import { getDistance } from "./utils/distance";
import { SearchResult } from "./types";

// =============================================================================
// 📝 타입 정의
// =============================================================================
interface SearchLocation {
  name: string;
  lat: number;
  lng: number;
}

// =============================================================================
// 📍 메인 컴포넌트
// =============================================================================
function App() {
  const [searchLocation, setSearchLocation] = useState<SearchLocation | null>(
    null
  );
  const [nearbyShelters, setNearbyShelters] = useState<Shelter[]>([]);

  const handleSearch = (searchResult: SearchResult) => {
    const newSearchLocation = {
      name: searchResult.name,
      lat: searchResult.coordinates.lat,
      lng: searchResult.coordinates.lng,
    };
    setSearchLocation(newSearchLocation);
    console.log("검색 위치:", newSearchLocation);

    const nearby = shelters.filter((shelter) => {
      const distance = getDistance(
        newSearchLocation.lat,
        newSearchLocation.lng,
        shelter.lat,
        shelter.lng
      );
      return distance <= 10; // 10km 이내
    });
    console.log("주변 대피소:", nearby);
    setNearbyShelters(nearby);
  };

  return (
    <div className="app-wrapper">
      <Header />
      <div className="main-container">
        <div className="left-column">
          <div className="search-container">
            <h2>🗺️ 검색할 지역 이름</h2>
            <AddressSearch onSearch={handleSearch} />
          </div>
          <div className="map-wrapper">
            <KakaoMap
              searchLocation={searchLocation}
              shelters={nearbyShelters}
              style={{ width: "100%", height: "100%", borderRadius: "8px" }}
            />
          </div>
        </div>
        <div className="right-column">
          <div className="shelter-list-header">
            <h3>가장 가까운 대피소</h3>
          </div>
          <ShelterList shelters={nearbyShelters} />
        </div>
      </div>
    </div>
  );
}

export default App;
