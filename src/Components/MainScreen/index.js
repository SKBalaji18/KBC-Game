import React,{useState} from 'react';
import QRCodeDisplay from '../QRCodeDisplay';

const MainScreen = ({ players, onSubmit,question,congratsMessage,feedbackMessage }) => {

  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleOptionChange = (event) => {
    setSelectedAnswer(event.target.id);
  };

    return (
        <div>
          <QRCodeDisplay />
            {players.length > 0 ?
              <h3>Players: {players.join(', ')}</h3> : <h1>Players: No Players Joined yet</h1>
            }
            <h1>Current Question</h1>
            <h2 className="question">{question.question}</h2>
              <div className="options">
                  {Object.entries(question.options).map(([key, value]) => (
                    <div key={key} className="option">
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
              <button className="button" onClick={() => onSubmit(selectedAnswer)}>Submit Answer</button>
              {congratsMessage && <h2>{congratsMessage}</h2>}
              {feedbackMessage && <h3 style={{ color: 'red' }}>{feedbackMessage}</h3>}
        </div>
    );
};

export default MainScreen;
