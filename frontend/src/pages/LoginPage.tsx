import React from "react";
import Header from "../components/Header";

const LoginPage: React.FC = () => {
  return (
    <div>
      <Header />
      <div
        style={{
          maxWidth: "400px",
          margin: "3rem auto",
          textAlign: "center",
          background: "#fff",
        }}
      >
        <h2 style={{ marginBottom: "2rem" }}>로그인</h2>

        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <div style={{ textAlign: "left" }}>
            <label htmlFor="email" style={{ fontSize: "0.9rem", fontWeight: "bold" }}>
              이메일
            </label>
            <input
              id="email"
              type="email"
              placeholder="이메일"
              style={{
                width: "100%",
                padding: "0.75rem",
                fontSize: "1rem",
                border: "1px solid #ccc",
                borderRadius: "6px",
                marginTop: "0.3rem",
              }}
            />
          </div>

          <div style={{ textAlign: "left" }}>
            <label htmlFor="password" style={{ fontSize: "0.9rem", fontWeight: "bold" }}>
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호"
              style={{
                width: "100%",
                padding: "0.75rem",
                fontSize: "1rem",
                border: "1px solid #ccc",
                borderRadius: "6px",
                marginTop: "0.3rem",
              }}
            />
          </div>

          <div style={{ textAlign: "right", fontSize: "0.85rem", color: "#888" }}>
            비밀번호를 잊어버리셨나요?
          </div>

          <button
            type="submit"
            style={{
              padding: "0.75rem",
              fontSize: "1rem",
              backgroundColor: "#228be6",
              color: "white",
              border: "none",
              borderRadius: "999px",
              cursor: "pointer",
            }}
          >
            로그인
          </button>

          <div style={{ marginTop: "1rem", fontSize: "0.85rem", color: "#888" }}>
            계정이 없으신가요? <span style={{ textDecoration: "underline", cursor: "pointer" }}>회원가입</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
