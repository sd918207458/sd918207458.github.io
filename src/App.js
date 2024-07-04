import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dialog from './pages/Dialog';
import Game1 from './pages/Game1';
import Game2 from './pages/Game2';
import Game3 from './pages/Game3';
import Game4 from './pages/Game4';
import Game5 from './pages/Game5';
import Game6 from './pages/Game6';
import Game7 from './pages/Game7';
import Game8 from './pages/Game8';

const App = () => {
  const [dialogIndex, setDialogIndex] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dialog" element={<Dialog dialogIndex={dialogIndex} setDialogIndex={setDialogIndex} />} />
        <Route path="/game1" element={<Game1 />} />
        <Route path="/game2" element={<Game2 />} />
        <Route path="/game3" element={<Game3 />} />
        <Route path="/game4" element={<Game4 />} />
        <Route path="/game5" element={<Game5 />} />
        <Route path="/game6" element={<Game6 />} />
        <Route path="/game7" element={<Game7 />} />
        <Route path="/game8" element={<Game8 />} />
      </Routes>
    </Router>
  );
};

export default App;
