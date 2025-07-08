import React from "react";
import styles from "./LoginForm.module.css";
import { Link } from "react-router-dom";

const LoginForm: React.FC = () => {
  return (
    <div className={styles.formWrapper}>
      <h2 className={styles.title}>로그인</h2>
      <form className={styles.form}>
        <div style={{ textAlign: "left" }}>
          <label htmlFor="email" className={styles.label}>
            이메일
          </label>
          <input
            id="email"
            type="email"
            placeholder="이메일"
            className={styles.input}
          />
        </div>
        <div style={{ textAlign: "left" }}>
          <label htmlFor="password" className={styles.label}>
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            placeholder="비밀번호"
            className={styles.input}
          />
        </div>
        <div className={styles.forgot}>비밀번호를 잊어버리셨나요?</div>
        <button
          type="submit"
          className={styles.button}
        >
          로그인
        </button>
        <div className={styles.signup}>
          계정이 없으신가요?{" "}
          <Link to="/signup" className={styles.link}>
            회원가입
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
