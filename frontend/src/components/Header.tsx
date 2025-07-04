import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

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
        <a
          href="/"
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
            style={{ height: "40px", marginRight: "0.5rem" }}
          />
          <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            SafetyFirst
          </span>
        </a>
      </div>

      <nav>
        <a href="/shelter" style={{ margin: "0 1rem" }}>
          대피소 찾기
        </a>

        <Link to="/board" style={{ margin: "0 1rem" }}>
          게시판
        </Link>
        <Link
          to="/login"
          style={{
            margin: "0 1rem",
            backgroundColor: "#e9ecef",
            padding: "0.25rem 0.75rem",
            borderRadius: "4px",
          }}
        >
          로그인
        </Link>
      </nav>
    </header>
  );
};

export default Header;
