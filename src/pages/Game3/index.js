import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import alertSound from '../../assets/alert.mp3'; // 引入音效文件
import './Game3.scss'; // 導入 SCSS 文件

const Game3 = () => {
  const [step, setStep] = useState(1); // 1: 初始提示, 2: 找到碎片, 3: 拼好了, 4: 輸入關鍵字
  const [inputValue, setInputValue] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [audioPlayed, setAudioPlayed] = useState(false); // 音效是否已播放
  const [showFindFragmentButton, setShowFindFragmentButton] = useState(false); // 是否顯示“找到碎片了”按鈕
  const [showPuzzleButton, setShowPuzzleButton] = useState(false); // 是否顯示“拼好了”按鈕
  const [showGuideMessage, setShowGuideMessage] = useState(false); // 是否顯示“找導覽人員拿相片”提示
  const [showFinalButton, setShowFinalButton] = useState(false); // 是否顯示“抵達糖廠宿舍區”按鈕

  const navigate = useNavigate();
  const audioRef = useRef(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value === '二次世界大戰') {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const handleEndGame = () => {
    if (audioRef.current) {
      audioRef.current.pause(); // 停止播放音效
      audioRef.current.currentTime = 0; // 重置音頻時間
    }
    setShowGuideMessage(true); // 顯示“找導覽人員拿相片”提示
    setStep(4); // 切換到第4步顯示“找導覽人員拿相片”提示
    setTimeout(() => {
      setShowFinalButton(true); // 6秒後顯示“抵達糖廠宿舍區”按鈕
    }, 6000); // 6000 毫秒 = 6 秒
  };

  const handleFinalButtonClick = () => {
    navigate('/', { state: { dialogIndex: 23 } });
  };

  const handleButtonClick = () => {
    setStep(step + 1);
    setShowFindFragmentButton(false);
    setShowPuzzleButton(false);
  };

  useEffect(() => {
    audioRef.current = new Audio(alertSound); // 使用引入的音效文件
    audioRef.current.loop = true; // 設定音頻循環播放

    // 在組件卸載時停止音效
    return () => {
      if (audioRef.current) {
        audioRef.current.pause(); // 停止播放音效
        audioRef.current.currentTime = 0; // 重置音頻時間
      }
    };
  }, []);

  useEffect(() => {
    if (step === 1 && !audioPlayed) {
      audioRef.current.play().catch((error) => {
        console.error('Audio playback was prevented:', error);
      });
      setAudioPlayed(true);
      setTimeout(() => {
        setShowFindFragmentButton(true);
      }, 9000); // 9秒後顯示“找到碎片了”按鈕
    } else if (step === 2) {
      setTimeout(() => {
        setShowPuzzleButton(true);
      }, 3000); // 3秒後顯示“拼好了”按鈕
    }
  }, [step, audioPlayed]);

  return (
    <div className="container3">
      <div style={{ display: 'none' }}>
        <audio ref={audioRef} src={alertSound} loop />
      </div>
      {step === 1 && (
        <div className="content3">
          <p className="text3">小朋友們! 快到防空洞旁邊仔細找找看，有沒有甚麼解除警報的方式</p>
          {showFindFragmentButton && (
            <button className="button3" onClick={handleButtonClick}>找到碎片了</button>
          )}
        </div>
      )}
      {step === 2 && (
        <div className="content3">
          <p className="text3">將找到的碎片拼拼看吧!</p>
          {showPuzzleButton && (
            <button className="button3" onClick={handleButtonClick}>拼好了</button>
          )}
        </div>
      )}
      {step === 3 && (
        <div className="content3">
          <input
            type="text"
            placeholder="請輸入答案"
            value={inputValue}
            onChange={handleInputChange}
            className="input3"
          />
          {isCorrect && (
            <button className="button3 endButton3" onClick={handleEndGame}>答對了</button>
          )}
        </div>
      )}
      {step === 4 && showGuideMessage && (
        <div className="content3">
          <p className="text3">找導覽人員拿相片</p>
          {showFinalButton && (
            <button className="button3 finalButton3" onClick={handleFinalButtonClick}>抵達糖廠宿舍區</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Game3;
