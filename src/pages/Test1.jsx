import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Game.css";

const words = [
    { word: "éléphant", correct: "é" },
    { word: "garçon", correct: "ç" },
    { word: "hôtel", correct: "ô" },
    { word: "sœur", correct: "œ" },
    { word: "naître", correct: "î" },
    { word: "très", correct: "è" }
];

const allLetters = "abcdefghijklmnopqrstuvwxyzàâçéèêëîïôûùüÿœ".split("");

const Game = () => {
    const [currentWord, setCurrentWord] = useState(null);
    const [options, setOptions] = useState([]);
    const [feedback, setFeedback] = useState(null);
    const [score, setScore] = useState({ correct: 0, incorrect: 0 });

    useEffect(() => {
        pickNewWord();
    }, []);

    const pickNewWord = () => {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        const incorrectLetter = allLetters.find(l => l !== randomWord.correct);
        
        const shuffledOptions = Math.random() > 0.5
            ? [randomWord.correct, incorrectLetter]
            : [incorrectLetter, randomWord.correct];

        setCurrentWord(randomWord);
        setOptions(shuffledOptions);
        setFeedback(null);
    };

    const handleChoice = (letter) => {
        if (letter === currentWord.correct) {
            setScore({ ...score, correct: score.correct + 1 });
            setFeedback("✅ Correct!");
        } else {
            setScore({ ...score, incorrect: score.incorrect + 1 });
            setFeedback("❌ Try Again!");
        }
        setTimeout(pickNewWord, 1000);
    };

    return (
        <div className="game-container">
            <motion.h1 animate={{ scale: 1.1 }} transition={{ duration: 0.5 }}>Dyslexia Letter Identification</motion.h1>
            <p>Choose the correct letter from the word:</p>
            
            {currentWord && (
                <motion.div className="word-display" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h2>{currentWord.word}</h2>
                </motion.div>
            )}

            <div className="options">
                {options.map((letter, index) => (
                    <motion.button key={index} whileHover={{ scale: 1.2 }} onClick={() => handleChoice(letter)}>
                        {letter}
                    </motion.button>
                ))}
            </div>

            {feedback && <p className="feedback">{feedback}</p>}
            
            <div className="score">
                <p>✅ {score.correct} | ❌ {score.incorrect}</p>
            </div>
        </div>
    );
};

export default Game;
