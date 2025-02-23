import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Welcome = () => {
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserEmail(JSON.parse(storedUser).email);
    } else {
      navigate("/"); 
    }
  }, [navigate]);

  return (
    <div className="welcome-container">
      <h1>🎉 Welcome to the Learning App! 🎉</h1>
      {userEmail ? <p>Logged in as: <b>{userEmail}</b></p> : <p>Loading...</p>}
      
      <button 
        className="test-button"
        onClick={() => navigate("/assessment")}
      >
        Start Initial Test
      </button>

      <button 
        className="logout-button"
        onClick={() => {
          localStorage.removeItem("user"); 
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Welcome;
