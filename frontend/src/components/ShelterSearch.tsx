import React from "react";

const ShelterSearch: React.FC = () => {
  return (
    <input
      type="text"
      placeholder="검색할 지역 이름"
      style={{
        width: "100%",
        padding: "0.75rem 1rem",
        fontSize: "1rem",
        borderRadius: "4px",
        border: "1px solid #ccc",
        backgroundColor: "#f1f3f5",
      }}
    />
  );
};

export default ShelterSearch;
