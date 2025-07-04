import React from "react";
import Header from "../components/Header";
import WelcomeMessage from "../components/WelcomeMessage";
import RiskButtons from "../components/RiskButtons";
import NewsList from "../components/NewsList";

const HomePage: React.FC = () => {
  return (
    <div>
      <Header />
      <WelcomeMessage />
      <RiskButtons />
      <NewsList />
    </div>
  );
};

export default HomePage;
