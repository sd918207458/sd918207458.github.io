import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dialog from "./pages/Dialog";
import Game1 from "./pages/Game1";
import Game2 from "./pages/Game2";
import Game3 from "./pages/Game3";
import Game4 from "./pages/Game4";
import Game5 from "./pages/Game5";
import Game6 from "./pages/Game6";
import Game7 from "./pages/Game7";
import ARCourse from "./pages/ARCourse";
import ARStart from "./pages/ARStart";
import Lesson from "./pages/Lesson";

const App = () => {
  const [dialogIndex, setDialogIndex] = useState(0);

  return (
    <Router>
      <Routes>
        {/* 登入頁面 */}
        <Route path="/" element={<Login />} />

        {/* 遊戲路由 */}
        <Route path="/Game1" element={<Game1 />} />
        <Route path="/Game2" element={<Game2 />} />
        <Route path="/Game3" element={<Game3 />} />
        <Route path="/Game4" element={<Game4 />} />
        <Route path="/Game5" element={<Game5 />} />
        <Route path="/Game6" element={<Game6 />} />
        <Route path="/Game7" element={<Game7 />} />

        {/* 教案路由 */}
        <Route path="/lesson" element={<Lesson />} />
        {/* 其他頁面 */}
        <Route
          path="/Dialog"
          element={
            <Dialog dialogIndex={dialogIndex} setDialogIndex={setDialogIndex} />
          }
        />
        <Route path="/ARCourse" element={<ARCourse />} />
        <Route path="/ARStart" element={<ARStart />} />
      </Routes>
    </Router>
  );
};

export default App;
