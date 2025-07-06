import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import NewsModal from "./NewsModal";
import { newsImages } from "../assets";
import { motion, AnimatePresence } from "framer-motion";

type News = {
  title: string;
  description: string;
  image: string;
};

const dummyNews: News[] = [
  { title: "뉴스 제목 1", description: "뉴스 1 설명", image: newsImages.news1 },
  { title: "뉴스 제목 2", description: "뉴스 2 설명", image: newsImages.news2 },
  { title: "뉴스 제목 3", description: "뉴스 3 설명", image: newsImages.news3 },
  { title: "뉴스 제목 4", description: "뉴스 4 설명", image: newsImages.news4 },
  { title: "뉴스 제목 5", description: "뉴스 5 설명", image: newsImages.news4 },
  { title: "뉴스 제목 6", description: "뉴스 6 설명", image: newsImages.news3 },
  { title: "뉴스 제목 7", description: "뉴스 7 설명", image: newsImages.news2 },
  { title: "뉴스 제목 8", description: "뉴스 8 설명", image: newsImages.news1 },
  { title: "뉴스 제목 9", description: "뉴스 9 설명", image: newsImages.news1 },
  { title: "뉴스 제목 10", description: "뉴스 10 설명", image: newsImages.news2 },
  { title: "뉴스 제목 11", description: "뉴스 11 설명", image: newsImages.news3 },
  { title: "뉴스 제목 12", description: "뉴스 12 설명", image: newsImages.news4 },
];

const PAGE_SIZE = 4;
const USE_DUMMY = true;

const NewsList: React.FC = () => {
  const [news, setNews] = useState<News[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [direction, setDirection] = useState(0);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);

  useEffect(() => {
    if (USE_DUMMY) {
      const total = Math.ceil(dummyNews.length / PAGE_SIZE);
      setTotalPages(total);
      const sliced = dummyNews.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
      setNews(sliced);
    }
  }, [page]);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      position: "absolute" as const,
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "relative" as const,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      position: "absolute" as const,
    }),
  };

  const handlePageChange = (nextPage: number) => {
    setDirection(nextPage > page ? 1 : -1);
    setPage(nextPage);
  };

  return (
    <section style={{ textAlign: "center", margin: "2rem 0", position: "relative" }}>
      <h2 style={{ marginBottom: "1rem" }}>최신 뉴스</h2>
      <div
        style={{
          minHeight: "250px",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2, ease: [0.4, 0.7, 0.4, 1.1] }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "1rem",
              width: "100%",
              position: "absolute",
              left: 0,
              right: 0,
            }}
          >
            {news.map((item, index) => (
              <NewsCard
                key={item.title + index}
                title={item.title}
                description={item.description}
                image={item.image}
                onClick={() => setSelectedNews(item)} // 카드 클릭시 모달
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1rem",}}>
        <button
          onClick={() => handlePageChange(Math.max(page - 1, 1))}
          disabled={page === 1}
          style={{
            width: "30px", height: "30px", borderRadius: "50%",
            border: "1px solid #ddd", backgroundColor: "#fff", cursor: "pointer"
          }}
        >{"<"}</button>
        {pageNumbers.map((num) => (
          <button
            key={num}
            onClick={() => handlePageChange(num)}
            style={{
              width: "30px", height: "30px", borderRadius: "50%",
              border: "1px solid #ddd",
              backgroundColor: page === num ? "#e9ecef" : "#fff",
              fontWeight: page === num ? "bold" : "normal",
              cursor: "pointer",
            }}
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(Math.min(page + 1, totalPages))}
          disabled={page === totalPages}
          style={{
            width: "30px", height: "30px", borderRadius: "50%",
            border: "1px solid #ddd", backgroundColor: "#fff", cursor: "pointer"
          }}
        >{">"}</button>
      </div>
      {/* 모달 */}
      <NewsModal news={selectedNews} onClose={() => setSelectedNews(null)} />
    </section>
  );
};

export default NewsList;
