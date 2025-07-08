import React, { useState } from "react";
import styles from "./SignupForm.module.css";

const petOptions = ["없음", "강아지", "고양이", "기타"];
const healthOptions = ["건강", "만성질환", "임산부", "노약자"];
const homeOptions = ["아파트", "단독주택", "공동주택", "기타"];
const transportOptions = ["자가용", "대중교통", "도보", "자전거"];

const SignupForm: React.FC = () => {
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: "",
    password2: "",
    nickname: "",
    email: "",
    age: "",
    pet: petOptions[0],
    health: healthOptions[0],
    home: homeOptions[0],
    transport: transportOptions[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 유효성 검사/제출 로직
    console.log(form);
  };

  return (
    <form className={styles.formWrapper} onSubmit={handleSubmit}>
      <h2 className={styles.title}>개인정보 입력</h2>
      <div className={styles.grid}>
        {/* 왼쪽 */}
        <div>
          <label>아이디</label>
          <input
            className={styles.input}
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            autoComplete="username"
          />

          <label style={{ marginTop: "1.2rem", display: "block" }}>비밀번호</label>
          <div style={{ position: "relative" }}>
            <input
              className={styles.input}
              type={showPw ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
            <span
              className={styles.icon}
              onClick={() => setShowPw((prev) => !prev)}
              title={showPw ? "숨기기" : "보이기"}
            >
              {showPw ? "🙈" : "👁️"}
            </span>
          </div>

          <label style={{ marginTop: "1.2rem", display: "block" }}>비밀번호 확인</label>
          <div style={{ position: "relative" }}>
            <input
              className={styles.input}
              type={showPw2 ? "text" : "password"}
              name="password2"
              value={form.password2}
              onChange={handleChange}
              autoComplete="new-password"
            />
            <span
              className={styles.icon}
              onClick={() => setShowPw2((prev) => !prev)}
              title={showPw2 ? "숨기기" : "보이기"}
            >
              {showPw2 ? "🙈" : "👁️"}
            </span>
          </div>

          <label style={{ marginTop: "1.2rem", display: "block" }}>닉네임</label>
          <input
            className={styles.input}
            type="text"
            name="nickname"
            value={form.nickname}
            onChange={handleChange}
          />

          <label style={{ marginTop: "1.2rem", display: "block" }}>이메일</label>
          <input
            className={styles.input}
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
          />
        </div>

        {/* 오른쪽 */}
        <div>
          <label>나이</label>
          <input
            className={styles.input}
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
          />

          <label style={{ marginTop: "1.2rem", display: "block" }}>반려동물 유무</label>
          <select
            className={styles.select}
            name="pet"
            value={form.pet}
            onChange={handleChange}
          >
            {petOptions.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>

          <label style={{ marginTop: "1.2rem", display: "block" }}>건강 상태</label>
          <select
            className={styles.select}
            name="health"
            value={form.health}
            onChange={handleChange}
          >
            {healthOptions.map((h) => (
              <option key={h}>{h}</option>
            ))}
          </select>

          <label style={{ marginTop: "1.2rem", display: "block" }}>거주 형태</label>
          <select
            className={styles.select}
            name="home"
            value={form.home}
            onChange={handleChange}
          >
            {homeOptions.map((h) => (
              <option key={h}>{h}</option>
            ))}
          </select>

          <label style={{ marginTop: "1.2rem", display: "block" }}>교통 수단</label>
          <select
            className={styles.select}
            name="transport"
            value={form.transport}
            onChange={handleChange}
          >
            {transportOptions.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <button type="submit" className={styles.submitBtn}>
          제출
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
