// src/pages/SignupPage.tsx

import React, { useState } from "react";
import Header from "../components/Header";
import { motion } from "framer-motion";

const SignupPage: React.FC = () => {
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);

  // 드롭다운 값 예시
  const petOptions = ["없음", "강아지", "고양이", "기타"];
  const healthOptions = ["건강", "만성질환", "임산부", "노약자"];
  const homeOptions = ["아파트", "단독주택", "공동주택", "기타"];
  const transportOptions = ["자가용", "대중교통", "도보", "자전거"];

  return (
    <div>
      <Header />
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0.85, 0.3, 1] }}
        style={{
          maxWidth: "800px",
          margin: "2.5rem auto",
          background: "#fff",
          borderRadius: "16px",
          padding: "2.5rem 2rem 2rem 2rem",
          boxShadow: "0 3px 18px 0 rgba(0,0,0,0.05)",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            marginBottom: "2.2rem",
            textAlign: "left",
          }}
        >
          개인정보 입력
        </h2>
        <form>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.5rem 2rem",
            }}
          >
            {/* 왼쪽 컬럼 */}
            <div>
              <label>아이디</label>
              <input style={inputStyle} type="text" autoComplete="username" />

              <label style={{ marginTop: "1.2rem", display: "block" }}>
                비밀번호
              </label>
              <div style={{ position: "relative" }}>
                <input
                  style={inputStyle}
                  type={showPw ? "text" : "password"}
                  autoComplete="new-password"
                />
                <span
                  onClick={() => setShowPw(!showPw)}
                  style={iconStyle}
                  title={showPw ? "숨기기" : "보이기"}
                >
                  {showPw ? "🙈" : "👁️"}
                </span>
              </div>

              <label style={{ marginTop: "1.2rem", display: "block" }}>
                비밀번호 확인
              </label>
              <div style={{ position: "relative" }}>
                <input
                  style={inputStyle}
                  type={showPw2 ? "text" : "password"}
                  autoComplete="new-password"
                />
                <span
                  onClick={() => setShowPw2(!showPw2)}
                  style={iconStyle}
                  title={showPw2 ? "숨기기" : "보이기"}
                >
                  {showPw2 ? "🙈" : "👁️"}
                </span>
              </div>

              <label style={{ marginTop: "1.2rem", display: "block" }}>
                닉네임
              </label>
              <input style={inputStyle} type="text" />

              <label style={{ marginTop: "1.2rem", display: "block" }}>
                이메일
              </label>
              <input style={inputStyle} type="email" autoComplete="email" />
            </div>

            {/* 오른쪽 컬럼 */}
            <div>
              <label>나이</label>
              <input style={inputStyle} type="number" />

              <label style={{ marginTop: "1.2rem", display: "block" }}>
                반려동물 유무
              </label>
              <select style={selectStyle}>
                {petOptions.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>

              <label style={{ marginTop: "1.2rem", display: "block" }}>
                건강 상태
              </label>
              <select style={selectStyle}>
                {healthOptions.map((h) => (
                  <option key={h}>{h}</option>
                ))}
              </select>

              <label style={{ marginTop: "1.2rem", display: "block" }}>
                거주 형태
              </label>
              <select style={selectStyle}>
                {homeOptions.map((h) => (
                  <option key={h}>{h}</option>
                ))}
              </select>

              <label style={{ marginTop: "1.2rem", display: "block" }}>
                교통 수단
              </label>
              <select style={selectStyle}>
                {transportOptions.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
          <div style={{ textAlign: "right", marginTop: "2.5rem" }}>
            <button
              type="submit"
              style={{
                background: "#228be6",
                color: "#fff",
                padding: "0.65rem 2.3rem",
                border: "none",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "1.08rem",
                cursor: "pointer",
                transition: "transform 0.15s cubic-bezier(.4,1.3,.4,1)", // 추가
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.07)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              제출
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "#f3f6fa",
  border: "none",
  borderRadius: "8px",
  padding: "0.85rem",
  fontSize: "1rem",
  marginTop: "0.35rem",
  marginBottom: "0.1rem",
  outline: "none",
  boxSizing: "border-box",
};

// 드롭다운 전용 스타일 (▼이 삐져나오지 않게)
const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: "none",
  paddingRight: "2.5rem",
  background:
    "#f3f6fa url(\"data:image/svg+xml;utf8,<svg fill='gray' height='18' viewBox='0 0 24 24' width='18' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>\") no-repeat right 1rem center/1.3em auto",
};

const iconStyle: React.CSSProperties = {
  position: "absolute",
  right: "1.0rem",
  top: "50%",
  transform: "translateY(-50%)",
  fontSize: "1.35rem",
  color: "#555",
  cursor: "pointer",
  userSelect: "none",
  zIndex: 1,
};

export default SignupPage;
