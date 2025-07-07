import React, { useState } from "react";
import Header from "../components/Header";

const cities = ["서울", "경기도", "부산", "인천", "대구"];

const dummyRisk = [
  { type: "산불", icon: "🔥", status: "위험" },
  { type: "기상", icon: "🌩️", status: "안전" },
  { type: "미세먼지", icon: "🌫️", status: "주의" },
  { type: "전염병", icon: "🦠", status: "안전" },
  { type: "기타", icon: "❓", status: "안전" },
];

const getColor = (status: string) => {
  switch (status) {
    case "위험":
      return "#ff3d3d";
    case "주의":
      return "#ffc500";
    case "안전":
      return "#27c77d";
    default:
      return "#aaa";
  }
};

const RiskPage: React.FC = () => {
  const [selected, setSelected] = useState("경기도");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null); // 추가!

  return (
    <div>
      <Header />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "2rem",
          margin: "2rem",
        }}
      >
        {/* 지도 영역 */}
        <div
          style={{
            flex: 2,
            minWidth: 400,
            background: "#dde3e7",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 540,
            position: "relative",
          }}
        >
          <span
            role="img"
            aria-label="지도"
            style={{ fontSize: "7rem" }}
          >
            🗺️
          </span>
          <div
            style={{
              position: "absolute",
              left: 80,
              top: 110,
              background: "#fff",
              borderRadius: 24,
              padding: "0.5rem 1.2rem",
              boxShadow: "0 2px 12px rgba(0,0,0,0.13)",
              fontWeight: 600,
              fontSize: "1rem",
            }}
          >
            {selected}
          </div>
        </div>

        {/* 오른쪽 컨트롤 */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "1.2rem",
          }}
        >
          {/* 검색 */}
          <div style={{ marginBottom: "0.5rem" }}>
            <input
              placeholder="검색할 지역 이름"
              style={{
                width: "100%",
                padding: "0.8rem 1rem",
                fontSize: "1.02rem",
                border: "1.2px solid #d7dee7",
                borderRadius: "8px",
                outline: "none",
              }}
            />
          </div>

          {/* 위험도 카테고리 (마우스 오버 애니메이션 적용) */}
          <div style={{ display: "flex", gap: "0.7rem", marginBottom: "0.8rem" }}>
            {dummyRisk.map((r, idx) => (
              <div
                key={r.type}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  border: `2px solid ${getColor(r.status)}`,
                  borderRadius: "14px",
                  padding: "0.5rem 0.8rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minWidth: 70,
                  background: "#fff",
                  cursor: "pointer",
                  transition: "transform 0.18s cubic-bezier(.4,1.3,.4,1)",
                  transform: hoveredIdx === idx ? "scale(1.18)" : "scale(1)",
                  boxShadow: hoveredIdx === idx
                    ? "0 4px 12px rgba(0,0,0,0.12)"
                    : "0 2px 6px rgba(0,0,0,0.08)",
                  zIndex: hoveredIdx === idx ? 2 : 1,
                }}
              >
                <span style={{ fontSize: "1.3rem" }}>{r.icon}</span>
                <span style={{ fontSize: "0.9rem", margin: "0.1rem 0" }}>{r.type}</span>
                <span
                  style={{
                    background: getColor(r.status),
                    color: "#fff",
                    borderRadius: 7,
                    fontSize: "0.8rem",
                    padding: "0.07rem 0.7rem",
                  }}
                >
                  {r.status}
                </span>
              </div>
            ))}
          </div>

          {/* 지역 선택 리스트 */}
          <div
            style={{
              background: "#fff",
              borderRadius: 18,
              padding: "1rem",
              boxShadow: "0 2px 8px #eee",
            }}
          >
            <div
              style={{
                marginBottom: "0.7rem",
                fontWeight: 600,
                fontSize: "1.07rem",
              }}
            >
              선택 지역 : <b>{selected}</b>
            </div>
            {cities.map((c) => (
              <button
                key={c}
                onClick={() => setSelected(c)}
                style={{
                  width: "100%",
                  background: selected === c ? "#f4faff" : "#fff",
                  border: `1.2px solid ${selected === c ? "#24c6ff" : "#ececec"}`,
                  padding: "0.7rem 0.8rem",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.6rem",
                  cursor: "pointer",
                  fontWeight: selected === c ? 700 : 400,
                }}
              >
                <span role="img" aria-label="지역" style={{ marginRight: "0.5rem" }}>
                  🏠
                </span>
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskPage;
