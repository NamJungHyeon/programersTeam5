import React from "react";

type Risk = {
  name: string;
  icon: string;
  status: "위험" | "안전" | "주의";
};

const risks: Risk[] = [
  { name: "산불", icon: "🔥", status: "위험" },
  { name: "기상 재해", icon: "🌩️", status: "안전" },
  { name: "미세먼지", icon: "🌫️", status: "주의" },
  { name: "전염병", icon: "🦠", status: "안전" },
  { name: "기타", icon: "❓", status: "안전" },
];

const getColor = (status: Risk["status"]) => {
  switch (status) {
    case "위험":
      return "red";
    case "주의":
      return "orange";
    case "안전":
      return "green";
  }
};

const RiskButtons: React.FC = () => {
  return (
<section style={{ textAlign: "center", margin: "2rem 0" }}>
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      fontSize: "1rem",
      fontWeight: "bold",
    }}
  >
    <span>위험도 조회 (현 위치: 경기도 의왕시)</span>
    <button
      onClick={() => (window.location.href = "/shelter")}
      style={{
        border: "none",
        backgroundColor: "#e9ecef",
        borderRadius: "50%",
        width: "24px",
        height: "24px",
        cursor: "pointer",
      }}
    >
      →
    </button>
  </div>

  <div
    style={{
      marginTop: "1rem",
      display: "flex",
      justifyContent: "center",
      gap: "1rem",
      flexWrap: "wrap",
    }}
  >
    {risks.map((risk) => (
      <div
        key={risk.name}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#fff",
          border: `1px solid ${getColor(risk.status)}`,
          borderRadius: "999px",
          padding: "0.5rem 1rem",
          minWidth: "80px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <span style={{ fontSize: "1.5rem" }}>{risk.icon}</span>
        <span style={{ fontSize: "0.9rem", marginTop: "0.3rem" }}>{risk.name}</span>
        <span
          style={{
            marginTop: "0.2rem",
            fontSize: "0.7rem",
            backgroundColor: getColor(risk.status),
            color: "#fff",
            padding: "0.1rem 0.5rem",
            borderRadius: "4px",
          }}
        >
          {risk.status}
        </span>
      </div>
    ))}
  </div>
</section>

  );
};

export default RiskButtons;
