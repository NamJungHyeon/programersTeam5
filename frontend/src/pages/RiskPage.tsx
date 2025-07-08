import React, { useState } from "react";
import Header from "../components/Common/Header";
import RiskMap from "../components/Risk/RiskMap";
import RiskCategory from "../components/Risk/RiskCategory";
import RiskCityList from "../components/Risk/RiskCityList";
import styles from "../components/Risk/RiskPageLayout.module.css";

const RiskPage: React.FC = () => {
  const [selected, setSelected] = useState("경기도");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <RiskMap selected={selected} />
        <div className={styles.side}>
          <div>
            <input
              placeholder="검색할 지역 이름"
              className={styles.input}
            />
          </div>
          <RiskCategory hoveredIdx={hoveredIdx} setHoveredIdx={setHoveredIdx} />
          <RiskCityList selected={selected} setSelected={setSelected} />
        </div>
      </div>
    </div>
  );
};

export default RiskPage;
