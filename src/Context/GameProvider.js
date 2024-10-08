import React, { useState, createContext, useContext, useEffect,useMemo } from 'react';

// Create the Game Context
const GameContext = createContext();


// GameProvider component that wraps the app
export const GameProvider = ({ children ,currentQuestionIndex, setCurrentQuestionIndex}) => {
  const [players, setPlayers] = useState([]);
  const [submittedAnswer, setSubmittedAnswer] = useState(null);
  const [congratsMessage, setCongratsMessage] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const questions = useMemo(() => [
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
  ],[]);


  const handleAnswerSubmit = (answer) => {
    setSubmittedAnswer(answer)
  };

  useEffect(() => {
    if (submittedAnswer !== null) { // Only run if an answer has been submitted
      const correctAnswer = questions[currentQuestionIndex].answer;

      if (submittedAnswer === correctAnswer) {
        const playerName = players[players.length - 1];
          if (currentQuestionIndex + 1 < questions.length) {
            setCongratsMessage(playerName 
              ? `Congratulations, ${playerName}!`
              : `Congratulations!`);
            setFeedbackMessage(""); // Clear feedback message
            setTimeout(() => {
              setCongratsMessage("");
              setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
           }, 2000);
            
          }else{
            setCongratsMessage(playerName 
              ? `Game Over! Thanks for playing, ${playerName}!`
              : `Game Over! Thanks for playing!`);
            setFeedbackMessage("");
          }
           // Move to next question after 2 seconds
      } else {
          setFeedbackMessage("Wrong answer. Try again!");
          setCongratsMessage(""); // Clear congrats message
      }

      setSubmittedAnswer(null); // Reset the submitted answer
    }
  }, [submittedAnswer, currentQuestionIndex,setCurrentQuestionIndex, players, questions]);

  useEffect(() => {
    // You can reset messages or perform actions when the question changes
    setFeedbackMessage(""); // Clear feedback message when question changes
    // Optionally, you could do other things like logging
    console.log(`Current question index updated to: ${currentQuestionIndex}`);
  }, [currentQuestionIndex]); 


  

  const playerJoin = (playerName) => setPlayers([...players,playerName])

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <GameContext.Provider value={{ players,currentQuestion, congratsMessage, feedbackMessage, handleAnswerSubmit,playerJoin }}>
      {children}
    </GameContext.Provider>
  )
};


export const useGame = () => useContext(GameContext);

/* 

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
              : `Congratulations!`);
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
        useEffect(() => {
    // You can reset messages or perform actions when the question changes
    setFeedbackMessage(""); // Clear feedback message when question changes
    // Optionally, you could do other things like logging
    console.log(`Current question index updated to: ${currentQuestionIndex}`);
  }, [currentQuestionIndex]); // Run when currentQuestionIndex changes
*/