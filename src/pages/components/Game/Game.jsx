import React, { useState, useEffect, useCallback } from "react";
import "@fontsource/poppins";
import "./Game.css";
import { useNavigate } from "react-router-dom";
const Game = () => {
    const words = [
        { word: "été", letter: "é" },
        { word: "frère", letter: "è" },
        { word: "garçon", letter: "ç" },
        { word: "père", letter: "è" },
        { word: "hôtel", letter: "é" },
        { word: "liberté", letter: "é" },
        { word: "éléphant", letter: "é" },
        { word: "café", letter: "é" },
        { word: "crème", letter: "è" },
        { word: "forêt", letter: "ê" },
        { word: "à", letter: "à" },
        { word: "naître", letter: "î" },
        { word: "noël", letter: "ô" },
        { word: "très", letter: "è" },
        { word: "marché", letter: "é" },
        { word: "sœur", letter: "œ" },
        { word: "pêche", letter: "è" },
        { word: "école", letter: "é" },
        { word: "voilà", letter: "à" },
        { word: "là", letter: "à" }
    ];

    const allAccents = ["é", "è", "à", "ç", "î", "ô", "œ", "ê"];
    const totalQuestions = words.length;

    const [currentWord, setCurrentWord] = useState(null);
    const [correctLetter, setCorrectLetter] = useState(null);
    const [score, setScore] = useState({ correct: 0, incorrect: 0 });
    const [isCorrect, setIsCorrect] = useState(null);
    const [accentPair, setAccentPair] = useState([]);
    const [letterSpacing, setLetterSpacing] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [dyslexiaLevel, setDyslexiaLevel] = useState(null);

    // Function to pick a new word
    const pickNewWord = useCallback(() => {
        const selectedWord = words[currentQuestion];
        setCurrentWord(selectedWord);
        setCorrectLetter(selectedWord.letter);

        // Generate incorrect option
        const availableAccents = allAccents.filter(acc => acc !== selectedWord.letter);
        const randomAccentIndex = Math.floor(Math.random() * availableAccents.length);
        const secondAccent = availableAccents[randomAccentIndex];

        // Shuffle options
        const shuffledAccentPair = Math.random() > 0.5
            ? [selectedWord.letter, secondAccent]
            : [secondAccent, selectedWord.letter];

        setAccentPair(shuffledAccentPair);
    }, [currentQuestion]);

    // Function to calculate dyslexia level based on score
    const calculateDyslexiaLevel = () => {
        const percentage = (score.correct / totalQuestions) * 100;
        if (percentage >= 90) {
            setDyslexiaLevel("No significant signs of dyslexia");
        } else if (percentage >= 70) {
            setDyslexiaLevel("Mild dyslexia");
        } else if (percentage >= 50) {
            setDyslexiaLevel("Moderate dyslexia");
        } else {
            setDyslexiaLevel("Severe dyslexia");
        }
    };
    const navigate = useNavigate();
    const handleGotoLessons = () => {
        navigate("/lessons")
    }

    // Handle answer selection
    const handleAnswerClick = (selectedLetter) => {
        if (selectedLetter === correctLetter) {
            setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
            setIsCorrect(true);
        } else {
            setScore(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
            setIsCorrect(false);
        }

        if (currentQuestion + 1 >= totalQuestions) {
            calculateDyslexiaLevel();
            setCompleted(true);
        } else {
            setCurrentQuestion(prev => prev + 1);
        }
    };

    // Run `pickNewWord` on question change
    useEffect(() => {
        if (!completed) {
            pickNewWord();
        }
    }, [currentQuestion, completed, pickNewWord]);

    return (
        <div className="game-wrapper">
            {completed ? (
                <div className="results-container">
                    <h2>Assessment Complete!</h2>
                    <div className="results-card">
                        <h3>Your Results</h3>
                        <div className="score-summary">
                            <p>Correct Answers: <span className="correct-score">{score.correct}</span></p>
                            <p>Incorrect Answers: <span className="incorrect-score">{score.incorrect}</span></p>
                            <p>Total Questions: {totalQuestions}</p>
                        </div>
                        <div className="dyslexia-level">
                            <h4>Word Game:</h4>
                            <p className={`level ${dyslexiaLevel.toLowerCase().includes('no') ? 'no-dyslexia' : 'has-dyslexia'}`}>
                                {dyslexiaLevel}
                            </p>
                        </div>
                        <p className="disclaimer">
                
                        </p>
                    </div>
                </div>
            ) : (
                <div className="game-container">
                    <p className="game-subtitle">Identify the correct accented character in the word</p>
                    
                    <div className="progress-bar">
                        <div 
                            className="progress"
                            style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
                        ></div>
                    </div>

                    <p className="question-count">Question {currentQuestion + 1} of {totalQuestions}</p>

                    {currentWord && (
                        <div className="word-display">
                            <div className="word-container">
                                <span className="word-label">Word: </span>
                                <p className="target-word" style={{ letterSpacing: `${letterSpacing}px` }}>
                                    {currentWord.word}
                                </p>
                                <div className="letter-spacing">
                                    <label>Letter Spacing: {letterSpacing}px</label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="10"
                                        value={letterSpacing}
                                        onChange={(e) => setLetterSpacing(parseInt(e.target.value))}
                                    />
                                </div>
                            </div>
                            <p className="prompt-text">Do you see <strong>{accentPair[0]}</strong> or <strong>{accentPair[1]}</strong>?</p>
                        </div>
                    )}

                    <div className="options">
                        {score.correct <= 5 ? (
                            accentPair.map((letter, index) => (
                                <button key={index} onClick={() => handleAnswerClick(letter)}>
                                    {letter}
                                </button>
                            ))
                        ) : (
                            <>
                            <button onClick={() => handleGotoLessons()}>
                                Lessons
                            </button>
                            <button onClick={() => handleGotoLessons()}>
                                Download PDF
                            </button>
                            </>
                            
                        )}
                    </div>


                    {isCorrect !== null && (
                        <div className={`result ${isCorrect ? "correct" : "incorrect"}`}>
                            {isCorrect ? "Correct! 🎉" : "Try Again! 💪"}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Game;
