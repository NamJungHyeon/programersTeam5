import React, { useState } from "react";
import Header from "../components/Common/Header";
import Pagination from "../components/Common/Pagination";
import BoardTable from "../components/Board/BoardTable";
import { motion } from "framer-motion";

const BoardPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const dummyPosts = Array.from({ length: 35 }, (_, i) => ({
    id: String(i + 1).padStart(5, "0"),
    title: `게시글 제목 ${i + 1}`,
    content: `여기는 ${i + 1}번째 글의 내용입니다.`,
    author: "아무개",
    date: "2024-01-15",
  }));

  const PAGE_SIZE = 5;
  const totalPages = Math.ceil(dummyPosts.length / PAGE_SIZE);
  const posts = dummyPosts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div style={{ background: "#f6f9fb", minHeight: "100vh" }}>
      <Header />
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.48, ease: [0.4, 0.85, 0.3, 1] }}
      >
        <BoardTable posts={posts} />
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </motion.div>
    </div>
  );
};

export default BoardPage;
