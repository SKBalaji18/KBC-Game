import React, { useState } from 'react';
import {useGame} from '../../Context/GameProvider'
import './index.css'

const PlayerScreen = () => {

    const { currentQuestion, handleAnswerSubmit,playerJoin ,congratsMessage,feedbackMessage} = useGame();
    const [selectedAnswer, setSelectedAnswer] = useState("");

    const [playerName, setPlayerName] = useState("");

    const [showQuestion,setShowQuestion] = useState(false)

    const handleJoin = () => {
        if (playerName) {
            playerJoin(playerName);
            setShowQuestion(true)
            setPlayerName(""); // Clear input after joining
        }
    };

    const handleOptionChange = (event) => {
      setSelectedAnswer(event.target.id);
    };

    const submitOption = () => {
      handleAnswerSubmit(selectedAnswer)
      setSelectedAnswer('')
    }

    return (
        <div className='input-container'>
          {showQuestion?(<>
            <h2>{currentQuestion.question}</h2>
            <div className="options">
                {Object.entries(currentQuestion.options).map(([key, value]) => (
                    <div key={key} className="option">
                      <input
                          type="radio"
                          id={key}
                          name="answer"
                          value={selectedAnswer}
                          checked={selectedAnswer === key}
                          onChange={handleOptionChange}
                      />
                      <label htmlFor={key}>{value}</label>
                    </div>
                ))}
            </div>
            <button className="button" onClick={submitOption}>Submit Answer</button>
            {congratsMessage && <p style={{ color: 'green' }}>{congratsMessage}</p>}
            {feedbackMessage && <p style={{ color: 'red' }}>{feedbackMessage}</p>}
            </> ):(
          <>
            <input 
                type="text" 
                value={playerName} 
                className='user-input-el'
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
