import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import navigation
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize navigation

  const handleLogin = () => {
    localStorage.setItem("user", JSON.stringify({ email }));
    navigate("/welcome");
  };

  return (
    <div className="login-container">
      <motion.div 
        className="login-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="login-title">Lexi Oui</h1>
        <p className="login-subtitle">Oui Learn et Oui Read 🎉</p>

        <input 
          type="email" 
          placeholder="Email" 
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <input 
          type="password" 
          placeholder="Password" 
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <motion.button 
          className="login-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogin} // Call the function
        >
          Login
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Login;
