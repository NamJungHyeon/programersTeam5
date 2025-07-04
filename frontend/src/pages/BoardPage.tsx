import React from "react";
import Header from "../components/Header";

const BoardPage: React.FC = () => {
  const dummyPosts = Array.from({ length: 7 }, (_, i) => ({
    id: String(i + 1).padStart(5, "0"),
    title: "2024-01-15",
    content: "2024-01-15",
    author: "야무지게",
  }));

  return (
    <div>
      <Header />
      <div style={{ maxWidth: "800px", margin: "2rem auto", textAlign: "center" }}>
        <h2>커뮤니티</h2>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "1rem",
            backgroundColor: "#fff",
          }}
        >
          <thead>
            <tr>
              <th>글 번호</th>
              <th>제목</th>
              <th>내용</th>
              <th>작성자</th>
            </tr>
          </thead>
          <tbody>
            {dummyPosts.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.content}</td>
                <td>{post.author}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: "1rem" }}>
          <button>{`<`}</button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              style={{
                margin: "0 0.25rem",
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
                fontWeight: page === 1 ? "bold" : "normal",
              }}
            >
              {page}
            </button>
          ))}
          <button>{`>`}</button>
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
