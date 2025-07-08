import React from "react";
import Header from "../components/Common/Header";
import SignupForm from "../components/Auth/SignupForm";
import { motion } from "framer-motion";

const SignupPage: React.FC = () => (
  <div>
    <Header />
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0.85, 0.3, 1] }}
    >
      <SignupForm />
    </motion.div>
  </div>
);

export default SignupPage;
