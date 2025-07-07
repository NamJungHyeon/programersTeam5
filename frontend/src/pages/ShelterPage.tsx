// src/pages/ShelterPage.tsx
import React, { useState } from "react";
import Header from "../components/Header";
import ShelterSearchBar from "../components/ShelterSearchBar";
import ShelterMap from "../components/ShelterMap";
import ShelterList from "../components/ShelterList";
import ShelterDetailModal from "../components/ShelterDetailModal";
import { motion } from "framer-motion"; // ★추가!

// 더미 데이터 예시
const shelters = [
  {
    id: 1,
    name: "의왕 휴먼시아아파트",
    address: "경기도 의왕시 포일로 17",
    capacity: 320,
    phone: "031-123-4567",
    status: "여유",
    image: "/images/shelter1.jpg",
    info: ["지상 1층 입구(공공시설)", "최대 320명", "소방관 연락처 연결"],
    lat: 37.394, lng: 126.978,
  },
  {
    id: 2,
    name: "의왕 인덕원삼성아파트",
    address: "경기도 의왕시 내손동 1324",
    capacity: 150,
    phone: "031-987-6543",
    status: "혼잡",
  image: "/images/shelter2.jpg",
    info: ["지상 2층 로비", "최대 150명", "소방관 연락처 연결"],
    lat: 37.395, lng: 126.982,
  },
  {
    id: 3,
    name: "의왕 파크뷰아파트",
    address: "경기도 의왕시 고천동 777",
    capacity: 120,
    phone: "031-555-8888",
    status: "만석",
    image: "/images/shelter3.jpg",
    info: ["지상 1층 커뮤니티룸", "최대 120명", "관리사무소 연락"],
    lat: 37.392, lng: 126.975,
  },
];

const ShelterPage: React.FC = () => {
  const [selectedShelter, setSelectedShelter] = useState<any>(null);

  return (
    <div>
      <Header />
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, ease: [0.43, 0.85, 0.3, 1] }}
        style={{ display: "flex", gap: "1.5rem", padding: "2rem" }}
      >
        {/* 왼쪽: 지도/검색바 */}
        <div style={{ flex: 1.5 }}>
          <ShelterSearchBar />
          <ShelterMap
            shelters={shelters}
            onMarkerClick={(shelter) => setSelectedShelter(shelter)}
          />
        </div>

        {/* 중앙: 대피소 리스트 */}
        <div style={{ flex: 1, minWidth: 340 }}>
          <div style={{ marginBottom: "1rem" }}>
            <span style={{
              fontWeight: 700, fontSize: "1.1rem",
              background: "#ffe1e5", padding: "0.5rem 1.3rem",
              borderRadius: 12, marginBottom: 10, display: "inline-block"
            }}>
              가장 가까운 대피소
            </span>
          </div>
          <ShelterList
            shelters={shelters}
            onItemClick={(shelter) => setSelectedShelter(shelter)}
          />
        </div>
      </motion.div>

      {/* 오른쪽: 대피소 상세 모달 */}
      <ShelterDetailModal
        shelter={selectedShelter}
        onClose={() => setSelectedShelter(null)}
      />
    </div>
  );
};

export default ShelterPage;
