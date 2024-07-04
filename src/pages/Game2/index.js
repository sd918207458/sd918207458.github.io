import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import assemblyImage from '../../assets/DIY相機教學圖-01.png'; // 引入組裝相機的圖片
import './Game2.scss'; // 引入樣式

const Game2 = () => {
  const [isAssembling, setIsAssembling] = useState(false); // 狀態：是否顯示組裝說明圖
  const [showFinishButton, setShowFinishButton] = useState(false); // 狀態：是否顯示“修好了”按鈕
  const [showEndButton, setShowEndButton] = useState(false); // 狀態：是否顯示“抵達防空洞”按鈕
  const navigate = useNavigate();

  // 處理遊戲結束
  const handleEndGame = () => {
    navigate('/', { state: { dialogIndex: 11 } });
  };

  // 開始組裝
  const handleStartAssembling = () => {
    setIsAssembling(true); // 設置為顯示組裝說明圖
    setShowFinishButton(true); // 立即顯示“修好了”按鈕
  };

  // 完成組裝
  const handleFinishAssembly = () => {
    setIsAssembling(false); // 隱藏組裝相機說明圖
    setShowFinishButton(false); // 隱藏“修好了”按鈕
    setShowEndButton(true); // 立即顯示“抵達防空洞”按鈕
  };

  return (
    <div className="container2">
      <div className="content2">
        {!isAssembling ? (
          <button className="assembleButton2" onClick={handleStartAssembling}>開始修相機</button>
        ) : (
          <>
            <img src={assemblyImage} alt="組裝相機說明圖" className="assemblyImage2" />
            {showFinishButton && (
              <button className="finishButton2" onClick={handleFinishAssembly}>修好了</button>
            )}
          </>
        )}
        {showEndButton && (
          <button className="endButton2" onClick={handleEndGame}>
            找導覽人員拿相片
          </button>
        )}
      </div>
    </div>
  );
};

export default Game2;
