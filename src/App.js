import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import MainScreen from './Components/MainScreen';

import PlayerScreen from './Components/PlayerScreen';

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

const App = () => {
    const [players, setPlayers] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [congratsMessage, setCongratsMessage] = useState("");
    const [feedbackMessage, setFeedbackMessage] = useState("");

    const handleJoin = (playerName) => {
        setPlayers([...players, playerName]);
    };

    const handleAnswerSubmit = (answer) => {
      const correctAnswer = questions[currentQuestion].answer;
      if (answer === correctAnswer) {
          const playerName = players[players.length - 1]; // Get the last player who joined
          if (currentQuestion + 1 === questions.length) {
            // End of game
            setCongratsMessage(`Game Over! Thanks for playing, ${players[players.length - 1]}!`);
            setFeedbackMessage("");
        }else{
          setCongratsMessage(`Congratulations, ${playerName}!`);
          setFeedbackMessage(""); // Clear feedback message
          setTimeout(() => {
              setCongratsMessage("");
              setCurrentQuestion((prevIndex) => prevIndex + 1);
          }, 2000);
         } // Move to next question after 2 seconds
      } else {
          setFeedbackMessage("Wrong answer. Try again!");
          setCongratsMessage(""); // Clear congrats message
      }
  };

  const handleAnswerSubmitMain  = (answer) => {
    const correctAnswer = questions[currentQuestion].answer;
    if (answer === correctAnswer) {
        if (currentQuestion + 1 === questions.length) {
          // End of game
          setCongratsMessage(`Game Over! Thanks for playing!`);
          setFeedbackMessage("");
      }else{
        setCongratsMessage(`Congratulations!`);
        setFeedbackMessage(""); // Clear feedback message
        setTimeout(() => {
            setCongratsMessage("");
            setCurrentQuestion((prevIndex) => prevIndex + 1);
        }, 2000);
       } // Move to next question after 2 seconds
    } else {
        setFeedbackMessage("Wrong answer. Try again!");
        setCongratsMessage(""); // Clear congrats message
    }
};


    return (
    <Router>
      <div className="container">
          <Routes>
              <Route path='/' element={
                  <MainScreen 
                      question={questions[currentQuestion]} 
                      players={players} 
                      congratsMessage={congratsMessage}
                      feedbackMessage={feedbackMessage}
                      onSubmit={handleAnswerSubmitMain}
                  />
              } />
              <Route path="/mobile" element={
                  <PlayerScreen 
                      currentQuestion={questions[currentQuestion]} 
                      feedbackMessage={feedbackMessage} congratsMessage={congratsMessage} onJoin={handleJoin} onSubmit={handleAnswerSubmit} 
                  />
              } />
              <Route path="*" element={<Navigate to="/" />} />
          </Routes>
      </div>
    </Router>
    );
};

export default App;
