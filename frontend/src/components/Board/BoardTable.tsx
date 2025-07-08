import React from "react";
import styles from "./BoardTable.module.css";

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
}

interface BoardTableProps {
  posts: Post[];
}

const BoardTable: React.FC<BoardTableProps> = ({ posts }) => (
  <div className={styles.container}>
    <h2 className={styles.title}>커뮤니티</h2>
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.th}>글 번호</th>
          <th className={styles.th}>제목</th>
          <th className={styles.th}>작성일</th>
          <th className={styles.th}>작성자</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post) => (
          <tr className={styles.trHover} key={post.id}>
            <td className={styles.tdNum}>{post.id}</td>
            <td className={styles.tdTitle}>{post.title}</td>
            <td className={styles.tdCenter}>{post.date}</td>
            <td className={styles.tdCenter}>{post.author}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default BoardTable;
