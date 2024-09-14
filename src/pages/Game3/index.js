import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AudioOutlined, AudioMutedOutlined } from '@ant-design/icons';
import alertSound from '../../assets/alert.mp3';
import './Game3.scss';

const Game3 = () => {
  const [state, setState] = useState({
    step: 1,
    inputValue: '',
    isCorrect: false,
    showFindFragmentButton: false,
    showPuzzleButton: false,
    showGuideMessage: false,
    showFinalButton: false,
    isAlertPlaying: false,
  });

  const navigate = useNavigate();
  const audioRef = useRef(null);

  // 音效初始化及清理
  useEffect(() => {
    audioRef.current = new Audio(alertSound);
    audioRef.current.loop = true;

    return () => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    };
  }, []);

  // 步驟控制邏輯
  useEffect(() => {
    let timer;
    if (state.step === 1) {
      timer = setTimeout(() => {
        setState((prevState) => ({ ...prevState, showFindFragmentButton: true }));
      }, 9000);
    } else if (state.step === 2) {
      timer = setTimeout(() => {
        setState((prevState) => ({ ...prevState, showPuzzleButton: true }));
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [state.step]);

  // 處理輸入框變化
  const handleInputChange = (e) => {
    const value = e.target.value;
    setState((prevState) => ({
      ...prevState,
      inputValue: value,
      isCorrect: value === '二次世界大戰',
    }));
  };

  // 遊戲步驟控制
  const handleButtonClick = () => {
    setState((prevState) => ({
      ...prevState,
      step: prevState.step + 1,
      showFindFragmentButton: false,
      showPuzzleButton: false,
    }));
  };

  // 遊戲結束
  const handleEndGame = () => {
    audioRef.current?.pause();
    audioRef.current.currentTime = 0;

    setState((prevState) => ({
      ...prevState,
      showGuideMessage: true,
      step: 4,
    }));

    setTimeout(() => {
      setState((prevState) => ({
        ...prevState,
        showFinalButton: true,
      }));
    }, 3600);
  };

  // 最終按鈕行為
  const handleFinalButtonClick = () => {
    navigate('/?dialogIndex=22');
  };

  // 切換警報音效
  const toggleAlert = () => {
    if (state.isAlertPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((error) => {
        console.error('音效播放失敗:', error);
      });
    }
    setState((prevState) => ({
      ...prevState,
      isAlertPlaying: !prevState.isAlertPlaying,
    }));
  };

  const {
    step,
    inputValue,
    isCorrect,
    showFindFragmentButton,
    showPuzzleButton,
    showGuideMessage,
    showFinalButton,
    isAlertPlaying,
  } = state;

  return (
    <div className="container3">
      <div className="alert-toggle" onClick={toggleAlert}>
        {isAlertPlaying ? <AudioOutlined /> : <AudioMutedOutlined />}
      </div>

      {step === 1 && (
        <div className="content3">
          <p className="text3">快到防空洞旁找找解除警報的方式!</p>
          {showFindFragmentButton && (
            <button className="button3" onClick={handleButtonClick}>
              找到碎片了
            </button>
          )}
        </div>
      )}

      {step === 2 && (
        <div className="content3">
          <p className="text3">試著把碎片拼好吧！</p>
          {showPuzzleButton && (
            <button className="button3" onClick={handleButtonClick}>
              拼好了
            </button>
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
            <button className="button3 endButton3" onClick={handleEndGame}>
              答對了
            </button>
          )}
        </div>
      )}

      {step === 4 && showGuideMessage && (
        <div className="content3">
          <p className="text3">記得找導覽人員拿相片喔!</p>
          {showFinalButton && (
            <button className="button3 finalButton3" onClick={handleFinalButtonClick}>
              抵達糖廠宿舍區
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Game3;
