import React from "react";

const dummyRisk = [
  { type: "산불", icon: "🔥", status: "위험" },
  { type: "기상", icon: "🌩️", status: "안전" },
  { type: "미세먼지", icon: "🌫️", status: "주의" },
  { type: "전염병", icon: "🦠", status: "안전" },
  { type: "기타", icon: "❓", status: "안전" },
];

const getColor = (status: string) => {
  switch (status) {
    case "위험": return "#ff3d3d";
    case "주의": return "#ffc500";
    case "안전": return "#27c77d";
    default: return "#aaa";
  }
};

interface RiskCategoryProps {
  hoveredIdx: number | null;
  setHoveredIdx: (idx: number | null) => void;
}

const RiskCategory: React.FC<RiskCategoryProps> = ({ hoveredIdx, setHoveredIdx }) => (
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
);

export default RiskCategory;
