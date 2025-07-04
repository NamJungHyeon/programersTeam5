import React from "react";
import Header from "../components/Header";
import ShelterSearch from "../components/ShelterSearch";
import ShelterMap from "../components/ShelterMap";
import ShelterList from "../components/ShelterList";

const ShelterPage: React.FC = () => {
  return (
    <div>
      <Header />
      <div style={{ display: "flex", flexDirection: "column", padding: "2rem" }}>
        <ShelterSearch />
        <div style={{ display: "flex", marginTop: "1rem" }}>
          <ShelterMap />
          <ShelterList />
        </div>
      </div>
    </div>
  );
};

export default ShelterPage;
