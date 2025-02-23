import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Confetti from "react-confetti";

// Word pairs for matching
const wordPairs = [
  { english: "Hello", french: "Bonjour" },
  { english: "Apple", french: "Pomme" },
  { english: "Cat", french: "Chat" },
  { english: "House", french: "Maison" },
  { english: "Car", french: "Voiture" },
];

export default function Test() {
  const [droppedWords, setDroppedWords] = useState({});
  const [isCorrect, setIsCorrect] = useState(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const [userName, setUserName] = useState("Learner");
  const navigate = useNavigate();


  const storedUser = localStorage.getItem("user");



  useEffect(() => {
    const storedName = sessionStorage.getItem("userName") || "Learner";
    setUserName(storedName);
    setUserName(JSON.parse(storedUser).email);
  }, []);

  // Draggable Word Component
  const DraggableWord = ({ word }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "WORD",
      item: { word },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }));

    return (
      <motion.div
        ref={drag}
        style={{
          padding: "10px 20px",
          margin: "5px",
          borderRadius: "5px",
          backgroundColor: "#007bff",
          color: "white",
          cursor: "grab",
          opacity: isDragging ? 0.5 : 1,
        }}
        whileHover={{ scale: 1.1 }}
      >
        {word}
      </motion.div>
    );
  };

  // Drop Zone Component
  const DropZone = ({ englishWord }) => {
    const [{ isOver }, drop] = useDrop(() => ({
      accept: "WORD",
      drop: (item) => {
        setDroppedWords((prev) => ({
          ...prev,
          [englishWord]: item.word,
        }));
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }));

    return (
      <div
        ref={drop}
        style={{
          width: "150px",
          height: "50px",
          lineHeight: "50px",
          textAlign: "center",
          border: "2px dashed #333",
          backgroundColor: isOver ? "#f0f0f0" : "white",
          fontSize: "18px",
        }}
      >
        {droppedWords[englishWord] || "Drop Here"}
      </div>
    );
  };

  // Check Answers
  const checkAnswers = () => {
    const allCorrect = wordPairs.every(
      (pair) => droppedWords[pair.english] === pair.french
    );
    setIsCorrect(allCorrect);

    if (allCorrect) {
      setTimeout(() => {
        setShowCertificate(true);
      }, 1000);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}>
        <h2>Match the French word with its English translation</h2>

        {/* Sentence with Drop Zones */}
        <div style={{ marginTop: "20px" }}>
          {wordPairs.map((pair) => (
            <div key={pair.english} style={{ display: "flex", alignItems: "center", fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>
              <DropZone englishWord={pair.english} /> 
              <span style={{ marginLeft: "10px" }}>{pair.english}</span>
            </div>
          ))}
        </div>

        {/* Draggable Words */}
        <div style={{ display: "flex", marginTop: "20px", gap: "10px", flexWrap: "wrap" }}>
          {wordPairs.map((pair, index) => (
            <DraggableWord key={index} word={pair.french} />
          ))}
        </div>

        {/* Feedback */}
        {isCorrect !== null && (
          <motion.div
            style={{ marginTop: "20px", fontSize: "18px", fontWeight: "bold", color: isCorrect ? "green" : "red" }}
            animate={{ opacity: 1 }}
          >
            {isCorrect ? "✅ All answers are correct!" : "❌ Some answers are incorrect. Try again!"}
          </motion.div>
        )}

        {/* Buttons */}
        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <button
            onClick={checkAnswers}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              border: "none",
              borderRadius: "5px",
              backgroundColor: "#4CAF50",
              color: "white",
              cursor: "pointer",
            }}
          >
            Check Answers
          </button>
          <button
            onClick={() => {
              setDroppedWords({});
              setIsCorrect(null);
            }}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              border: "none",
              borderRadius: "5px",
              backgroundColor: "#ff9800",
              color: "white",
              cursor: "pointer",
            }}
          >
            Retry
          </button>
          {isCorrect && (
            <button
              onClick={() => navigate("/next")}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                border: "none",
                borderRadius: "5px",
                backgroundColor: "#007bff",
                color: "white",
                cursor: "pointer",
              }}
            >
              Next Lesson
            </button>
          )}
        </div>

        {/* Certificate Popup */}
        {showCertificate && (
          <>
            <Confetti />
            <div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "#fff",
                padding: "30px",
                boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
                textAlign: "center",
                borderRadius: "10px",
              }}
            >
              <h2>🎉 Congratulations, {userName}! 🎉</h2>
              <p>You have successfully completed the lesson!</p>
              <button
                onClick={() => setShowCertificate(false)}
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  border: "none",
                  borderRadius: "5px",
                  backgroundColor: "#007bff",
                  color: "white",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </DndProvider>
  );
}
