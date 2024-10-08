import React, { useState, createContext, useContext } from 'react';

// Create the Game Context
const GameContext = createContext();


// GameProvider component that wraps the app
export const GameProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [congratsMessage, setCongratsMessage] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const questions = [
    {
      question: "What is the capital of France?",
      options: { "A": "Paris", "B": "Berlin", "C": "Rome", "D": "Madrid" },
      answer: "A"
    },
    {
      question: "Who is the current President of the United States?",
      options: {
        "A":"Joe Biden",
        "B":"Donald Trump",
        "C":"Barack Obama",
        "D":"George W. Bush",
      },
      answer: "A",
    },
    {
      question: "What is the capital of France?",
      options: {
        "A":"Berlin",
        "B":"Madrid",
        "C":"Paris",
        "D":"Rome",
      },
      answer: "C",
    },
    {
      question: "Which element has the chemical symbol 'O'?",
      options: {
        "A":"Gold",
        "B":"Oxygen",
        "C":"Silver",
        "D":"Hydrogen",
      },
      answer: "B",
    },
    {
      question: "Who wrote 'Hamlet'?",
      options: {
        "A":"Leo Tolstoy",
        "B":"Mark Twain",
        "C":"William Shakespeare",
        "D":"Charles Dickens",
      },
      answer: "C",
    },
    {
      question: "What is the largest planet in the Solar System?",
      options: {
        "A":"Earth",
        "B":"Mars",
        "C":"Saturn",
        "D":"Jupiter",
      },
      answer: "D",
    },
  ];


  const handleAnswerSubmit = (answer) => {
      const correctAnswer = questions[currentQuestionIndex].answer;
      if (answer === correctAnswer) {
        const playerName = players[players.length - 1];
          if (currentQuestionIndex + 1 === questions.length) {
            setCongratsMessage(playerName 
                ? `Game Over! Thanks for playing, ${playerName}!`
                : `Game Over! Thanks for playing!`);
            setFeedbackMessage("");
          }else{
            setCongratsMessage(playerName 
              ? `Congratulations, ${playerName}!`
              : `GCongratulations!`);
            setFeedbackMessage(""); // Clear feedback message
            setTimeout(() => {
              setCongratsMessage("");
              setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
           }, 2000);
          }
           // Move to next question after 2 seconds
      } else {
          setFeedbackMessage("Wrong answer. Try again!");
          setCongratsMessage(""); // Clear congrats message
      }
  };

  const playerJoin = (playerName) => setPlayers([...players,playerName])

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <GameContext.Provider value={{ players,currentQuestion, congratsMessage, feedbackMessage, handleAnswerSubmit,playerJoin }}>
      {children}
    </GameContext.Provider>
  )
};


export const useGame = () => useContext(GameContext);