import React from "react";
import Header from "../components/Common/Header";
import WelcomeMessage from "../components/Common/WelcomeMessage";
import RiskButtons from "../components/Common/RiskButtons";
import NewsList from "../components/News/NewsList";

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
