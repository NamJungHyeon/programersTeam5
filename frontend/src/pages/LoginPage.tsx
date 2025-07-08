import React from "react";
import Header from "../components/Common/Header";
import LoginForm from "../components/Auth/LoginForm";
import { motion } from "framer-motion";

const LoginPage: React.FC = () => {
  return (
    <div>
      <Header />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.4, 0.85, 0.3, 1] }}
      >
        <LoginForm />
      </motion.div>
    </div>
  );
};

export default LoginPage;
