import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type News = {
  title: string;
  description: string;
  image: string;
};

type Props = {
  news: News | null;
  onClose: () => void;
};

const NewsModal: React.FC<Props> = ({ news, onClose }) => {
  useEffect(() => {
    if (!news) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [news, onClose]);

  return (
    <AnimatePresence>
      {news && (
        <div
          style={{
            position: "fixed",
            zIndex: 999,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "fadein 0.15s",
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.88, opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.42, 1.1, 0.5, 1] }}
            style={{
              background: "#fff",
              borderRadius: "16px",
              maxWidth: 400,
              width: "90%",
              padding: "2rem 1.5rem 1.5rem 1.5rem",
              boxShadow: "0 4px 32px rgba(0,0,0,0.19)",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              style={{
                position: "absolute",
                top: "18px",
                right: "18px",
                border: "none",
                background: "rgba(255,255,255,0.9)",
                fontSize: "2.2rem",
                fontWeight: 600,
                color: "#222",
                cursor: "pointer",
                lineHeight: 1,
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
                transition: "background 0.15s",
              }}
              onClick={onClose}
              aria-label="닫기"
              tabIndex={0}
              onMouseEnter={e => (e.currentTarget.style.background = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.9)")}
            >
              ×
            </button>
            <img
              src={news.image}
              alt={news.title}
              style={{
                width: "100%",
                borderRadius: "10px",
                marginBottom: "1.3rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
              }}
            />
            <h2 style={{ margin: "0 0 1.1rem 0", fontSize: "1.3rem" }}>{news.title}</h2>
            <p style={{ color: "#444", fontSize: "1.05rem" }}>{news.description}</p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default NewsModal;
