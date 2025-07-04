import React from "react";

const WelcomeMessage: React.FC = () => {
  return (
    <section
      style={{
        textAlign: "center",
        margin: "2rem 0",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        SafetyFirst에 오신 것을 환영합니다
      </h1>
      <p>재난 상황에 대한 최신 정보를 확인하고 안전을 지키세요</p>
    </section>
  );
};

export default WelcomeMessage;
