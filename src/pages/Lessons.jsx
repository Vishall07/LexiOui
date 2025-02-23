import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import name from "../images/name.jpeg"
import bonjour from "../images/bonjour.jpeg"
import cava from "../images/cava.jpeg"

import name_sound from "../audios/name.mp3"
import bonjour_sound from "../audios/bonjour.mp3"
import cava_sound from "../audios/cava.mp3"
import { useNavigate } from "react-router-dom"; // Import navigation
const lessons = [
  {
    explanation: "Welcome to our first lesson! Today, we will learn how to say 'Hello' in French. Imagine meeting a new friend. You can greet them by saying 'Bonjour' with a smile!",
    word: "Bonjour",
    image: bonjour,
    audio: bonjour_sound
  },
  {
    explanation: "Now, let's learn how to introduce ourselves. If you want to tell someone your name, you can say 'Je m'appelle Bob'. Try saying it aloud!",
    word: "Je m'appelle Bob",
    image: name,
    audio: name_sound
  },
  {
    explanation: "Great job! Now, if you want to ask a friend how they are doing, you can say 'Comment ça va?'. It's a friendly way to start a conversation!",
    word: "Comment ça va?",
    image: cava,
    audio: cava_sound
  },
];

export default function LanguageLesson() {
  const [index, setIndex] = useState(0);
  const [audio] = useState(new Audio());

  useEffect(() => {
    audio.src = lessons[index].audio;
    audio.play();
  }, [index, audio]);

  const nextLesson = () => {
    if (index < lessons.length - 1) setIndex(index + 1);
  };

  const prevLesson = () => {
    if (index > 0) setIndex(index - 1);
  };

  const navigate = useNavigate();
  const nextGame = () => {
      navigate("/test");
    };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}>
      <motion.h1 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "15px", textAlign: "center" }} animate={{ opacity: 1 }}>
        {lessons[index].explanation}
      </motion.h1>

      <div style={{ width: "1300px", height: "300px", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", border: "2px solid #ddd", borderRadius: "10px", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)" }}>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <motion.div
            style={{ fontSize: "90px", fontWeight: "bold", color: "#007bff" }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {lessons[index].word}
          </motion.div>
          <motion.img
            src={lessons[index].image}
            alt={lessons[index].word}
            style={{ width: "500px", height: "250px", borderRadius: "8px", marginLeft: "15px" }}
            animate={{ opacity: 1 }}
          />
        </div>
      </div>

      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <button onClick={prevLesson} disabled={index === 0} style={{ padding: "10px 20px", fontSize: "16px", border: "none", borderRadius: "5px", backgroundColor: index === 0 ? "#ccc" : "#007bff", color: "white", cursor: index === 0 ? "not-allowed" : "pointer" }}>
          Back
        </button>
        {index !== lessons.length - 1 && (
        <button onClick={nextLesson} disabled={index === lessons.length - 1} style={{ padding: "10px 20px", fontSize: "16px", border: "none", borderRadius: "5px", backgroundColor: index === lessons.length - 1 ? "#ccc" : "#007bff", color: "white", cursor: index === lessons.length - 1 ? "not-allowed" : "pointer" }}>
          Next
        </button>)}
        {index === lessons.length - 1 && (
          <button 
            onClick={nextGame} 
            style={{ 
              padding: "10px 20px", 
              fontSize: "16px", 
              border: "none", 
              borderRadius: "5px", 
              backgroundColor: "#007bff", 
              color: "white", 
              cursor: "pointer" 
            }}
          >
            Lets Play
          </button>
        )}
      </div>
    </div>
  );
}
