import React, { useState } from 'react';

const PlayerScreen = ({ currentQuestion, onSubmit,onJoin ,congratsMessage,feedbackMessage}) => {
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [playerName, setPlayerName] = useState("");

    const [showQuestion,setShowQuestion] = useState(false)

    const handleJoin = () => {
        if (playerName) {
            onJoin(playerName);
            setShowQuestion(true)
            setPlayerName(""); // Clear input after joining
        }
    };

    const handleOptionChange = (event) => {
      setSelectedAnswer(event.target.value);
    };

    return (
        <div>
          {showQuestion?(<>
            <h2>{currentQuestion.question}</h2>
            <div className="options">
                {Object.entries(currentQuestion.options).map(([key, value]) => (
                    <div key={key} className="option">
                      <input
                          type="radio"
                          id={key}
                          name="answer"
                          value={key}
                          checked={selectedAnswer === key}
                          onChange={handleOptionChange}
                      />
                      <label htmlFor={key}>{value}</label>
                    </div>
                ))}
            </div>
            <button className="button" onClick={() => onSubmit(selectedAnswer)}>Submit Answer</button>
            {congratsMessage && <h2>{congratsMessage}</h2>}
            {feedbackMessage && <h3 style={{ color: 'red' }}>{feedbackMessage}</h3>}
            </> ):(
          <>
            <input 
                type="text" 
                value={playerName} 
                onChange={(e) => setPlayerName(e.target.value)} 
                placeholder="Enter your name" 
            />
            <button onClick={handleJoin} className="button">Join</button>
          </>
        )}
        </div>
    );
};

export default PlayerScreen;
