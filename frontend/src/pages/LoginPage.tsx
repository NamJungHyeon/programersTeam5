import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // 추가

const LoginPage: React.FC = () => {
  return (
    <div>
      <Header />
      <motion.div
        initial={{ opacity: 0, y: 30 }} // 처음: 투명 + 아래
        animate={{ opacity: 1, y: 0 }} // 나타나며: 불투명 + 제자리
        transition={{ duration: 0.55, ease: [0.4, 0.85, 0.3, 1] }}
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
            <label
              htmlFor="email"
              style={{ fontSize: "0.9rem", fontWeight: "bold" }}
            >
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
            <label
              htmlFor="password"
              style={{ fontSize: "0.9rem", fontWeight: "bold" }}
            >
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

          <div
            style={{ textAlign: "right", fontSize: "0.85rem", color: "#888" }}
          >
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
              transition: "transform 0.25s cubic-bezier(.4,1.3,.4,1)", // 애니메이션 추가
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.08)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            로그인
          </button>

          <div
            style={{ marginTop: "1rem", fontSize: "0.85rem", color: "#888" }}
          >
            계정이 없으신가요?{" "}
            <Link
              to="/signup"
              style={{
                textDecoration: "underline",
                cursor: "pointer",
                color: "#228be6",
                fontWeight: 500,
              }}
            >
              회원가입
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;
