import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Header: React.FC = () => {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        backgroundColor: "#f8f9fa",
        borderBottom: "1px solid #ddd",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "black",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={logo}
            alt="SafetyFirst"
            style={{ height: "28px", marginRight: "0.5rem" }}
          />
          <span style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
            SafetyFirst
          </span>
        </Link>
      </div>

      <nav style={{ display: "flex", alignItems: "center" }}>
        <Link
          to="/shelter"
          style={{
            margin: "0 1rem",
            color: "#222",
            textDecoration: "none",
            fontWeight: "normal",   // 게시판이랑 동일
          }}
        >
          대피소 찾기
        </Link>
        <Link
          to="/board"
          style={{
            margin: "0 1rem",
            color: "#222",
            textDecoration: "none",
            fontWeight: "normal",
          }}
        >
          게시판
        </Link>
        <Link
          to="/login"
          style={{
            marginLeft: "1rem",
            backgroundColor: "#e9ecef",
            color: "#222",
            padding: "0.25rem 1.3rem",
            borderRadius: "8px",
            fontWeight: "bold",
            boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
            textDecoration: "none",
            transition: "background 0.2s",
          }}
        >
          로그인
        </Link>
      </nav>
    </header>
  );
};

export default Header;
