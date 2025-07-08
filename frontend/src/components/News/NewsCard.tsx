import React, { useState } from "react";

type NewsCardProps = {
  title: string;
  description: string;
  image: string;
  onClick?: () => void; // 클릭 이벤트
};

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  description,
  image,
  onClick,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      style={{
        width: "250px",
        margin: "0.5rem",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        transition: "transform 0.18s cubic-bezier(.4,1.3,.4,1)",
        transform: hovered ? "scale(1.05)" : "scale(1)",
        willChange: "transform",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* 이미지 영역 */}
      <div style={{ width: "100%", height: "150px", overflow: "hidden" }}>
        <img
          src={image}
          alt={title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div style={{ padding: "0.75rem" }}>
        <h3 style={{ fontSize: "1rem", margin: "0 0 0.5rem 0" }}>{title}</h3>
        <p style={{ fontSize: "0.85rem", color: "#555", margin: 0 }}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default NewsCard;
