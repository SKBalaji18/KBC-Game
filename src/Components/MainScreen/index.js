import React,{useState} from 'react';
import QRCodeDisplay from '../QRCodeDisplay';
import {useGame} from '../../Context/GameProvider'
import './index.css'

const MainScreen = () => {
  const { players, handleAnswerSubmit,currentQuestion,congratsMessage,feedbackMessage } = useGame()
  const [selectedAnswer, setSelectedAnswer] = useState("");
  console.log(currentQuestion)
  const handleOptionChange = (event) => {
    setSelectedAnswer(event.target.id);
  };

    return (
        <div>
            <h1 className='game-head'>KBC Game</h1>
            <QRCodeDisplay />
            <h1 className='head'>Players:</h1>
            {players.length > 0 ?
              (<>
                <h3>{players.join(', ')}</h3>
              </>):(<h3>No Player joined yet</h3>)
            }
            <h1 className='current-question-head'>Current Question:</h1>
            <h2 className="question">{currentQuestion.question}</h2>
              <div className="options">
                  
                  {Object.entries(currentQuestion.options).map(([key, value]) => (
                    <div key={key} className='option'>
                      <input
                          type="radio"
                          id={key}
                          name="options"
                          value={selectedAnswer}
                          checked={selectedAnswer === key}
                          onChange={handleOptionChange}
                      />
                      <label htmlFor={key}>{value}</label>
                    </div>
                    ))}
              </div>
              <button className="button" onClick={() => handleAnswerSubmit(selectedAnswer)}>Submit Answer</button>
              {congratsMessage && <p style={{ color: 'green' }}>{congratsMessage}</p>}
              {feedbackMessage && <p style={{ color: 'red' }}>{feedbackMessage}</p>}
        </div>
    );
};

export default MainScreen;
