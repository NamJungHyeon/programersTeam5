import React from "react";

const ShelterList: React.FC = () => {
  return (
    <div
      style={{
        flex: 1,
        height: "400px",
        backgroundColor: "#f8f9fa",
        overflowY: "auto",
        padding: "1rem",
      }}
    >
      <h3>대피소 리스트</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>🏠 대피소 1</li>
        <li>🏠 대피소 2</li>
        <li>🏠 대피소 3</li>
        <li>🏠 대피소 4</li>
      </ul>
    </div>
  );
};

export default ShelterList;
