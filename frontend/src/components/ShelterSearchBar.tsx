// src/components/ShelterSearchBar.tsx
import React from "react";
const ShelterSearchBar: React.FC = () => (
  <div style={{ marginBottom: "1rem" }}>
    <input
      type="text"
      placeholder="검색할 지역 이름"
      style={{
        width: "90%",
        padding: "0.9rem 1.2rem",
        borderRadius: "8px",
        border: "1.2px solid #dde3e7",
        background: "#f6f9fc",
        fontSize: "1.07rem"
      }}
    />
  </div>
);
export default ShelterSearchBar;
