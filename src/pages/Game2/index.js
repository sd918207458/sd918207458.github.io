import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import assemblyImage from '../../assets/DIY相機教學圖-01.png'; // 引入組裝相機的圖片
import './Game2.scss'; // 引入樣式

const Game2 = () => {
  const [isAssembling, setIsAssembling] = useState(false); // 追蹤是否正在組裝
  const [showFinishButton, setShowFinishButton] = useState(false); // 追蹤是否顯示完成按鈕
  const [showEndButton, setShowEndButton] = useState(false); // 追蹤是否顯示結束按鈕
  const [progress, setProgress] = useState(0); // 組裝進度
  const navigate = useNavigate();

  // 使用 useEffect 管理計時器和組裝進度
  useEffect(() => {
    let timer;
    let progressInterval;
    if (isAssembling) {
      // 如果正在組裝，設定計時器和進度條
      progressInterval = setInterval(() => {
        setProgress((prev) => (prev < 100 ? prev + 1 : 100));
      }, 900); // 每0.9秒進度增加1%

      // 90秒後顯示完成按鈕
      timer = setTimeout(() => {
        setShowFinishButton(true);
      }, 90000); // 90000 毫秒 = 1.5 分鐘
    }

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval); // 清除計時器和進度條更新
    };
  }, [isAssembling]);

  // 開始組裝
  const handleStartAssembling = () => {
    setIsAssembling(true); // 設置為正在組裝
    setShowFinishButton(false); // 隱藏完成按鈕
    setShowEndButton(false); // 隱藏結束按鈕
    setProgress(0); // 重設進度條
  };

  // 完成組裝
  const handleFinishAssembly = () => {
    setIsAssembling(false); // 停止組裝狀態
    setShowFinishButton(false); // 隱藏完成按鈕
    setShowEndButton(true); // 顯示結束按鈕
  };

  // 處理遊戲結束
  const handleEndGame = () => {
    navigate('/?dialogIndex=10'); // 導航到新的頁面
  };

  return (
    <div className="container2">
      <div className="content2">
        {/* 開始修相機按鈕 */}
        {!isAssembling && !showEndButton && (
          <button className="assembleButton2" onClick={handleStartAssembling}>
            開始修相機
          </button>
        )}
        {/* 組裝相機說明圖、進度條及修好了按鈕 */}
        {isAssembling && (
          <>
            <img src={assemblyImage} alt="組裝相機說明圖" className="assemblyImage2" />
            <div className="progress-bar">
              <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
            {showFinishButton && (
              <button className="finishButton2" onClick={handleFinishAssembly}>
                修好了
              </button>
            )}
          </>
        )}
        {/* 找導覽人員拿相片按鈕 */}
        {showEndButton && (
          <button className="endButton2" onClick={handleEndGame}>
            記得找導覽人員拿相片喔!
          </button>
        )}
      </div>
    </div>
  );
};

export default Game2;
