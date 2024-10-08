import React, { useState, createContext, useContext } from 'react';

// Create the Game Context
const GameContext = createContext();

// Custom hook to use the Game Context
export const useGame = () => useContext(GameContext);

// GameProvider component that wraps the app
export const GameProvider = ({ children }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [players, setPlayers] = useState([]);
  const [winner, setWinner] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const questions = [
    {
      question: "Who is the current President of the United States?",
      options: [
        "A. Joe Biden",
        "B. Donald Trump",
        "C. Barack Obama",
        "D. George W. Bush",
      ],
      answer: "A",
    },
    {
      question: "What is the capital of France?",
      options: ["A. Berlin", "B. Madrid", "C. Paris", "D. Rome"],
      answer: "C",
    },
    {
      question: "Which element has the chemical symbol 'O'?",
      options: ["A. Gold", "B. Oxygen", "C. Silver", "D. Hydrogen"],
      answer: "B",
    },
    {
      question: "Who wrote 'Hamlet'?",
      options: [
        "A. Leo Tolstoy",
        "B. Mark Twain",
        "C. William Shakespeare",
        "D. Charles Dickens",
      ],
      answer: "C",
    },
    {
      question: "What is the largest planet in the Solar System?",
      options: ["A. Earth", "B. Mars", "C. Saturn", "D. Jupiter"],
      answer: "D",
    },
  ];

  const currentQuestion = questions[currentQuestionIndex];

  // Function to move to the next question
  const moveToNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setWinner('Game Over! All questions answered correctly!');
    }
    setErrorMessage('');  // Reset error message on the next question
  };

  // Function to submit answer
  const submitAnswer = (name, answer) => {
    if (answer.toLowerCase() === currentQuestion.correctAnswer.toLowerCase()) {
      setWinner(`${name} answered correctly!`);
      moveToNextQuestion();  // Move to the next question
    } else {
      setErrorMessage('Incorrect answer. Try again!');  // Show error for wrong answer
    }
  };

  const playerJoin = (playerName) => setPlayers([...players,playerName])

  return (
    <GameContext.Provider value={{ currentQuestion, winner, errorMessage, submitAnswer,playerJoin }}>
      {children}
    </GameContext.Provider>
  )
};
