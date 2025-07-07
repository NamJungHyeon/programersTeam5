// src/components/ShelterMap.tsx
import React from "react";
type Props = {
  shelters: any[];
  onMarkerClick: (shelter: any) => void;
};
const ShelterMap: React.FC<Props> = ({ shelters, onMarkerClick }) => (
  <div style={{
    background: "#dde3e7",
    borderRadius: 20,
    minHeight: 360,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1rem",
    width: "95%",
    position: "relative"
  }}>
    {/* 더미 지도 */}
    <span role="img" aria-label="지도" style={{ fontSize: "7rem", opacity: 0.2, position: "absolute", left: 30, top: 60 }}>🗺️</span>
    {shelters.map((s, i) => (
      <button
        key={s.id}
        onClick={() => onMarkerClick(s)}
        style={{
          position: "absolute",
          left: `${30 + i * 70}px`,
          top: `${130 + i * 30}px`,
          zIndex: 2,
          background: "#fff",
          border: "2.5px solid #ef476f",
          borderRadius: "50%",
          boxShadow: "0 2px 7px #ef476f44",
          cursor: "pointer",
        }}
        title={s.name}
      >
        <span style={{ fontSize: "1.35rem", color: "#ef476f" }}>📍</span>
      </button>
    ))}
  </div>
);
export default ShelterMap;
