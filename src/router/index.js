// router/index.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Game1 from '../pages/Game1';
import Game2 from '../pages/Game2';
import Game3 from '../pages/Game3';
import Game4 from '../pages/Game4';
import Game5 from '../pages/Game5';
import Game6 from '../pages/Game6';
import Game7 from '../pages/Game7';
import ARCourse from '../pages/ARCourse';
import ARStart from '../pages/ARStart';


const router = (
    <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/game1" element={<Game1 />} />
            <Route path="/game2" element={<Game2 />} />
            <Route path="/game3" element={<Game3 />} />
            <Route path="/game4" element={<Game4 />} />
            <Route path="/game5" element={<Game5 />} />
            <Route path="/game6" element={<Game6 />} />
            <Route path="/game7" element={<Game7 />} />
            <Route path="/ARCourse" element={<ARCourse />} />
            <Route path="/ARStart" element={<ARStart />} />
        </Routes>
    </Router>
);

export default router;
