import React from "react";

const cities = ["서울", "경기도", "부산", "인천", "대구"];

interface RiskCityListProps {
  selected: string;
  setSelected: (city: string) => void;
}

const RiskCityList: React.FC<RiskCityListProps> = ({ selected, setSelected }) => (
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
);

export default RiskCityList;
