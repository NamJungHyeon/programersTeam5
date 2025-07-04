import React from "react";
import NewsCard from "./NewsCard";

import { newsImages } from "../assets";

const dummyNews = [
  {
    title: "뉴스 제목 1",
    description: "뉴스 1 설명",
    image: newsImages.news1,
  },
  {
    title: "뉴스 제목 2",
    description: "뉴스 2 설명",
    image: newsImages.news2,
  },
  {
    title: "뉴스 제목 3",
    description: "뉴스 3 설명",
    image: newsImages.news3,
  },
  {
    title: "뉴스 제목 4",
    description: "뉴스 4 설명",
    image: newsImages.news4,
  },
];

const NewsList: React.FC = () => {
  return (
    <section style={{ textAlign: "center", margin: "2rem 0" }}>
      <h2 style={{ marginBottom: "1rem" }}>최신 뉴스</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        {dummyNews.map((news, index) => (
          <NewsCard
            key={index}
            title={news.title}
            description={news.description}
            image={news.image}
          />
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem" }}>
        {["<" ,1, 2, 3, 4, 5, ">"].map((page) => (
          <button
            key={page}
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              border: "1px solid #ddd",
              backgroundColor: "#fff",
              cursor: "pointer",
            }}
          >
            {page}
          </button>
        ))}
      </div>
    </section>
  );
};

export default NewsList;
