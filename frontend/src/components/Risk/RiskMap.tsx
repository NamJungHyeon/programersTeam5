import React from "react";

interface RiskMapProps {
  selected: string;
}

const RiskMap: React.FC<RiskMapProps> = ({ selected }) => (
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
    <span role="img" aria-label="지도" style={{ fontSize: "7rem" }}>
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
);

export default RiskMap;
