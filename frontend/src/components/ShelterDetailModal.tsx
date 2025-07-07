// src/components/ShelterDetailModal.tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  shelter: any;
  onClose: () => void;
};

const modalVariants = {
  hidden: { x: 400, opacity: 0 },
  visible: { x: 0, opacity: 1 },
  exit: { x: 400, opacity: 0 },
};

const ShelterDetailModal: React.FC<Props> = ({ shelter, onClose }) => {
  // 모달 열릴 때만 렌더링 (shelter 값이 있을 때)
  return (
    <AnimatePresence>
      {shelter && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          transition={{ duration: 0.27, ease: [0.45, 0.8, 0.5, 1] }}
          style={{
            position: "fixed", top: 0, right: 0, width: 370, height: "80%",
            background: "#fff", boxShadow: "-3px 0 18px 0 #c5c5c533", zIndex: 200,
            padding: "1.6rem 1.1rem", display: "flex", flexDirection: "column"
          }}
        >
          <button
            style={{
              position: "absolute", top: 25, right: 22, background: "#f4f4f6",
              border: "none", borderRadius: "50%", fontSize: "1.6rem",
              width: 38, height: 38, cursor: "pointer",
            }}
            onClick={onClose}
          >×</button>
          <img src={shelter.image} alt={shelter.name}
            style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 18, marginBottom: 20 }}
          />
          <div style={{ fontWeight: 700, fontSize: "1.15rem", marginBottom: 6 }}>{shelter.name}</div>
          <div style={{ color: "#222", marginBottom: 6 }}>{shelter.address}</div>
          <div style={{ fontSize: "0.98rem", marginBottom: 5 }}>☎️ {shelter.phone}</div>
          <div style={{ fontSize: "0.95rem", color: "#7a7a7a", marginBottom: 12 }}>
            {shelter.info && shelter.info.map((info: string, i: number) => (
              <div key={i}>• {info}</div>
            ))}
          </div>
          <div style={{ marginTop: "auto", display: "flex", gap: 18 }}>
            <button style={iconBtnStyle}>🔗 길찾기</button>
            <button style={iconBtnStyle}>📞 안전 요령</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const iconBtnStyle: React.CSSProperties = {
  background: "#f8f9fa",
  border: "none",
  borderRadius: "8px",
  fontSize: "1rem",
  padding: "0.65rem 1.1rem",
  cursor: "pointer"
};

export default ShelterDetailModal;
