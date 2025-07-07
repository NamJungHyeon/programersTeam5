// src/components/ShelterList.tsx
import React from "react";
type Props = {
  shelters: any[];
  onItemClick: (shelter: any) => void;
};
const getDotColor = (status: string) =>
  status === "여유" ? "#27c77d" : status === "혼잡" ? "#ffbe2f" : "#ff3d3d";
const ShelterList: React.FC<Props> = ({ shelters, onItemClick }) => (
  <div>
    {shelters.map((s) => (
      <div
        key={s.id}
        onClick={() => onItemClick(s)}
        style={{
          background: "#fff",
          borderRadius: "13px",
          marginBottom: "1rem",
          boxShadow: "0 2px 12px #eee",
          padding: "1.1rem 1rem",
          cursor: "pointer",
          display: "flex", alignItems: "center", gap: "1rem",
          border: "2px solid #eee",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: 13, height: 13, borderRadius: "50%",
            background: getDotColor(s.status),
            marginRight: "0.6rem"
          }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: "1.08rem", marginBottom: 2 }}>{s.name}</div>
          <div style={{ color: "#444", fontSize: "0.96rem" }}>{s.address}</div>
          <div style={{ fontSize: "0.92rem", color: "#777", marginTop: "0.4rem" }}>
            수용인원: <b>{s.capacity}</b> | 상태: <b>{s.status}</b>
          </div>
        </div>
        <button style={{
          background: "#f4f6fa",
          border: "none",
          borderRadius: "50%",
          fontSize: "1.05rem",
          cursor: "pointer",
          padding: "0.4rem 0.55rem",
          marginLeft: "1rem"
        }}>⋮</button>
      </div>
    ))}
  </div>
);
export default ShelterList;
