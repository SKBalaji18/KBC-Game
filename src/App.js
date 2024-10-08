import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import MainScreen from './Components/MainScreen';

import PlayerScreen from './Components/PlayerScreen';
import {GameProvider} from './Context/GameProvider'

const App = () => {


    return (
      <GameProvider>
        <Router>
          <div className="container">
              <Routes>
                  <Route path='/' element={
                      <MainScreen />
                  } />
                  <Route path="/mobile" element={
                      <PlayerScreen />
                  } />
                  <Route path="*" element={<Navigate to="/" />} />
              </Routes>
          </div>
        </Router>
      </GameProvider>
    );
};

export default App;
