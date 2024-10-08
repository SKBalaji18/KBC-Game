import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {useGame} from '../../Context/GameProvider'
import './index.css'

const PlayerScreen = () => {
    const {playerJoin} = useGame();
    const navigate = useNavigate();
    const [playerName, setPlayerName] = useState("");

    const handleJoin = () => {
        if (playerName) {
            playerJoin(playerName);
            setPlayerName(""); // Clear input after joining
            navigate('/')
        }
    };

    return (
      <div className='input-container'>
        <input 
            type="text" 
            value={playerName} 
            className='user-input-el'
            onChange={(e) => setPlayerName(e.target.value)} 
            placeholder="Enter your name" 
        />
        <button onClick={handleJoin} className="button">Join</button>
      </div>
  );
};

export default PlayerScreen;


