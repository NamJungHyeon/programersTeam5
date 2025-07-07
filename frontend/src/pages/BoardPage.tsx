import React, { useState } from "react";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import { motion } from "framer-motion"; // ← 추가

const BoardPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const dummyPosts = Array.from({ length: 35 }, (_, i) => ({
    id: String(i + 1).padStart(5, "0"),
    title: `게시글 제목 ${i + 1}`,
    content: `여기는 ${i + 1}번째 글의 내용입니다.`,
    author: "야무지게",
    date: "2024-01-15",
  }));

  const PAGE_SIZE = 7;
  const totalPages = Math.ceil(dummyPosts.length / PAGE_SIZE);
  const posts = dummyPosts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div style={{ background: "#f6f9fb", minHeight: "100vh" }}>
      <Header />
      {/* 게시판 영역에 애니메이션 */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.48, ease: [0.4, 0.85, 0.3, 1] }}
        style={{
          maxWidth: 950,
          margin: "2.5rem auto",
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 2px 14px 0 #e2e7ee66",
          padding: "2.2rem 2.1rem 2.2rem 2.1rem"
        }}
      >
        <h2 style={{
          textAlign: "left", fontWeight: 800,
          fontSize: "1.6rem", marginBottom: "1.7rem"
        }}>커뮤니티</h2>
        <table style={{
          width: "100%",
          borderCollapse: "separate",
          borderSpacing: 0,
          borderRadius: 10,
          overflow: "hidden",
          fontSize: "1.05rem",
        }}>
          <thead>
            <tr style={{ background: "#f3f6fa", fontWeight: 700 }}>
              <th style={thStyle}>글 번호</th>
              <th style={thStyle}>제목</th>
              <th style={thStyle}>작성일</th>
              <th style={thStyle}>작성자</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr
                key={post.id}
                style={{
                  borderBottom: "1.3px solid #f1f3f5",
                  cursor: "pointer",
                  transition: "background 0.18s",
                  background: undefined
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "#f7faff")}
                onMouseLeave={e => (e.currentTarget.style.background = "white")}
              >
                <td style={tdNumStyle}>{post.id}</td>
                <td style={tdTitleStyle}>{post.title}</td>
                <td style={tdCenterStyle}>{post.date}</td>
                <td style={tdCenterStyle}>{post.author}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* 페이지네이션 */}
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </motion.div>
    </div>
  );
};

// 스타일 오브젝트
const thStyle: React.CSSProperties = {
  padding: "1rem 0.5rem",
  borderBottom: "2px solid #ecedf0",
  fontWeight: 700,
  fontSize: "1rem",
};
const tdNumStyle: React.CSSProperties = {
  padding: "0.95rem 0.4rem",
  textAlign: "center",
  color: "#94a3b8",
  width: 85,
  fontVariantNumeric: "tabular-nums"
};
const tdTitleStyle: React.CSSProperties = {
  padding: "0.95rem 0.4rem",
  textAlign: "left",
  color: "#222",
  fontWeight: 500,
  maxWidth: 390,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis"
};
const tdCenterStyle: React.CSSProperties = {
  padding: "0.95rem 0.4rem",
  textAlign: "center",
  color: "#333",
};

export default BoardPage;
