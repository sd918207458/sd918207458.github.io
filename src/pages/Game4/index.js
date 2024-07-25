import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RetweetOutlined, AudioOutlined, EyeOutlined } from '@ant-design/icons'; // 引入 Ant Design 的圖標
import mapImageFront from '../../assets/地圖正面.jpg'; // 引入地圖正面圖片
import mapImageBack from '../../assets/地圖反面.jpg'; // 引入地圖反面圖片
import audio1 from '../../assets/3-1.mp3'; // 引入音效文件1
import audio2 from '../../assets/3-2.mp3'; // 引入音效文件2
import audio3 from '../../assets/3-3.mp3'; // 引入音效文件3
import './Game4.scss'; // 導入 SCSS 文件

const Game4 = () => {
  const [inputValue, setInputValue] = useState(''); // 輸入框的值
  const [showEndButton, setShowEndButton] = useState(false); // 控制顯示遊戲結束按鈕
  const [isFront, setIsFront] = useState(true); // 狀態：顯示正面還是反面地圖
  const [inputVisible, setInputVisible] = useState(true); // 控制輸入框顯示狀態
  const [showNewPrompt, setShowNewPrompt] = useState(false); // 顯示新的提示
  const [showNewButton, setShowNewButton] = useState(false); // 顯示新的按鈕
  const [audioPlaying, setAudioPlaying] = useState(false); // 控制音頻播放狀態
  const navigate = useNavigate(); // 用於頁面導航

  // 播放錄音
  const handlePlayAudio = (index) => {
    if (audioPlaying) return; // 如果已有音頻在播放，則返回

    setAudioPlaying(true);
    const audioFiles = [audio1, audio2, audio3]; // 音頻文件數組
    const audio = new Audio(audioFiles[index]);
    audio.play();

    // 當音頻播放結束時，重新啟用按鈕
    audio.onended = () => {
      setAudioPlaying(false);
    };

    // 如果點擊的是第二個音頻，檢查輸入框值並顯示遊戲結束按鈕
    if (index === 1) {
      checkInputValue();
    }
  };

  // 檢查輸入框的值
  const checkInputValue = () => {
    if (inputValue === '手水舍') {
      setShowEndButton(true); // 顯示遊戲結束按鈕
    }
  };

  // 結束遊戲並顯示新的提示和按鈕
  const handleEndGame = () => {
    setShowNewPrompt(true); // 顯示新的提示
    setTimeout(() => {
      setShowNewButton(true); // 3秒後顯示新的按鈕
    }, 3000);
  };

  // 跳轉到新的頁面
  const handleNavigate = () => {
    navigate('/?dialogIndex=37');
  };

  // 清除結果和已播放的音頻
  const clearResultAndAudio = () => {
    setInputValue(''); // 清空輸入框
    setShowEndButton(false); // 隱藏遊戲結束按鈕
    setShowNewPrompt(false); // 隱藏新的提示
    setShowNewButton(false); // 隱藏新的按鈕
  };

  // 切換地圖正反面
  const toggleMap = () => {
    setIsFront(!isFront); // 切換地圖正反面
  };

  // 切換輸入框顯示狀態
  const toggleInputVisibility = () => {
    setInputVisible(!inputVisible); // 切換輸入框顯示狀態
  };

  return (
    <div className="container4">
      <div className="mapContainer">
        {/* 播放錄音按鈕，垂直排列在地圖圖片左邊 */}
        <div className="audioButtonsContainer">
          {[audio1, audio2, audio3].map((audio, index) => (
            <button
              key={index}
              className="audioButton"
              onClick={() => handlePlayAudio(index)}
              disabled={audioPlaying}
            >
              <AudioOutlined />
            </button>
          ))}
        </div>

        {/* 地圖背景圖片 */}
        <div className="mapImageContainer">
          <img src={isFront ? mapImageFront : mapImageBack} alt="地圖圖片" className="mapImage" />

          {/* 切換地圖按鈕和顯示/隱藏輸入框按鈕 */}
          <div className="mapButtonsContainer">
            <button className="mapToggleButton" onClick={toggleMap}>
              <RetweetOutlined />
            </button>
            <button className="inputToggleButton" onClick={toggleInputVisibility}>
              <EyeOutlined />
            </button>
          </div>

          {/* 顯示輸入框和遊戲結束按鈕 */}
          {inputVisible && (
            <div className="resultContainer">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onBlur={checkInputValue}
                placeholder="請輸入關鍵字"
                className="input"
              />
              {showEndButton && (
                <button className="endButton" onClick={handleEndGame}>
                  答對了
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 中央提示和導航按鈕 */}
      <div className={`centralContainer ${showNewPrompt || showNewButton ? 'visible' : ''}`}>
        {showNewPrompt && (
          <div className="newPrompt">
            請前往尋找手水舍
          </div>
        )}
        {showNewButton && (
          <button className="navigateButton" onClick={handleNavigate}>
            抵達手水舍，點擊按鈕
          </button>
        )}
      </div>
    </div>
  );
};

export default Game4;
