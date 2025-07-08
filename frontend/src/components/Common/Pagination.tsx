import React from "react";

// props: 현재페이지, 전체페이지, 페이지변경함수
type Props = {
  page: number;
  totalPages: number;
  onPageChange: (n: number) => void;
};

const Pagination: React.FC<Props> = ({ page, totalPages, onPageChange }) => {
  // max 5개씩만 표시
  const pageArray = Array.from({ length: totalPages }, (_, i) => i + 1);
  let shownPages = pageArray;
  if (totalPages > 5) {
    if (page <= 3) shownPages = pageArray.slice(0, 5);
    else if (page >= totalPages - 2) shownPages = pageArray.slice(-5);
    else shownPages = pageArray.slice(page - 3, page + 2);
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "0.8rem",
        marginTop: "2.1rem",
      }}
    >
      {/* Prev */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        style={paginationBtnStyle}
      >
        {"<"}
      </button>
      {shownPages.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          style={{
            ...paginationBtnStyle,
            fontWeight: num === page ? 700 : 400,
            color: num === page ? "#228be6" : "#444",
            borderColor: num === page ? "#228be6" : "#eee",
            background: num === page ? "#f4faff" : "#fff",
            transform: num === page ? "scale(1.14)" : "scale(1)",
            transition: "all 0.17s cubic-bezier(.5,1.4,.5,1)",
            zIndex: num === page ? 2 : 1,
          }}
        >
          {num}
        </button>
      ))}
      {/* Next */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        style={paginationBtnStyle}
      >
        {">"}
      </button>
    </div>
  );
};

// 스타일 오브젝트 (RiskButtons 느낌)
const paginationBtnStyle: React.CSSProperties = {
  width: 32,
  height: 32,
  background: "#fff",
  border: "1.5px solid #eee",
  borderRadius: "999px",
  fontSize: "1.05rem",
  cursor: "pointer",
  outline: "none",
  transition: "all 0.15s cubic-bezier(.4,1.3,.4,1)",
  fontWeight: 400,
};

export default Pagination;
