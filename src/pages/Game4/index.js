import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { RetweetOutlined, AudioOutlined, EyeOutlined } from '@ant-design/icons';
import mapImageFront from '../../assets/地圖正面.jpg';
import mapImageBack from '../../assets/地圖反面.jpg';
import audio1 from '../../assets/3-1.mp3';
import audio2 from '../../assets/3-2.mp3';
import audio3 from '../../assets/3-3.mp3';
import './Game4.scss';
import Gamemodal from '../../components/Gamemodal';
import usePageState from '../../components/usePageState';

const Game4 = () => {
  // 狀態管理
  const [inputValue, setInputValue] = useState(''); // 追蹤輸入框的值
  const [showEndButton, setShowEndButton] = useState(false); // 控制是否顯示結束按鈕
  const [isFront, setIsFront] = useState(true); // 追蹤地圖顯示正面還是反面
  const [inputVisible, setInputVisible] = useState(true); // 控制輸入框的顯示狀態
  const [showNewPrompt, setShowNewPrompt] = useState(false); // 控制是否顯示新的提示
  const [showNewButton, setShowNewButton] = useState(false); // 控制是否顯示新的按鈕
  const [audioPlaying, setAudioPlaying] = useState(false); // 追蹤音頻播放狀態
  const navigate = useNavigate(); // 用於頁面導航

  // 頁面狀態管理
  const [pageState, setPageState] = usePageState({
    isModalVisible: false,
  });

  const { isModalVisible } = pageState;

  // 使用 useMemo 儲存音頻檔案數組，避免每次渲染時重新創建數組
  const audioFiles = useMemo(() => [audio1, audio2, audio3], []);

  // 播放音頻的處理函數，使用 useCallback 避免不必要的重渲染
  const handlePlayAudio = useCallback(
    (index) => {
      if (audioPlaying) return; // 如果已有音頻在播放，則不執行任何操作

      setAudioPlaying(true); // 設置音頻正在播放狀態
      const audio = new Audio(audioFiles[index]);
      audio.play();

      audio.onended = () => {
        setAudioPlaying(false); // 當音頻播放結束時，重設播放狀態
        if (index === 1) checkInputValue(); // 如果播放的是第二個音頻，檢查輸入框值
      };
    },
    [audioPlaying, audioFiles] // 依賴於 audioPlaying 和 audioFiles
  );

  // 檢查輸入框的值，若匹配則顯示結束按鈕
  const checkInputValue = useCallback(() => {
    if (inputValue === '手水舍') {
      setShowEndButton(true);
    }
  }, [inputValue]);

  // 處理結束遊戲邏輯，顯示新的提示並在延遲後顯示按鈕
  const handleEndGame = useCallback(() => {
    setShowNewPrompt(true); // 顯示新提示
    setTimeout(() => {
      setShowNewButton(true); // 3秒後顯示新按鈕
    }, 3000);
  }, []);

  // 處理導航邏輯，使用 navigate 進行頁面跳轉
  const handleNavigate = useCallback(() => {
    navigate('/?dialogIndex=37');
  }, [navigate]);

  // 切換地圖顯示正反面的處理函數
  const toggleMap = useCallback(() => {
    setIsFront((prev) => !prev);
  }, []);

  // 切換輸入框顯示狀態的處理函數
  const toggleInputVisibility = useCallback(() => {
    setInputVisible((prev) => !prev);
  }, []);

  // 顯示模態框的處理函數
  const showModal = useCallback(() => {
    setPageState((prevState) => ({
      ...prevState,
      isModalVisible: true,
    }));
  }, [setPageState]);

  // 隱藏模態框的處理函數
  const handleModalCancel = useCallback(() => {
    setPageState((prevState) => ({
      ...prevState,
      isModalVisible: false,
    }));
  }, [setPageState]);

  return (
    <div className="container4">
      {/* 模態框組件 */}
      <Gamemodal
        isVisible={isModalVisible}
        showModal={showModal}
        handleModalCancel={handleModalCancel}
      />
      <div className="mapContainer">
        {/* 音頻按鈕容器 */}
        <div className="audioButtonsContainer">
          {audioFiles.map((_, index) => (
            <button
              key={index}
              className="audioButton"
              onClick={() => handlePlayAudio(index)}
              disabled={audioPlaying} // 音頻播放時禁用按鈕
            >
              <AudioOutlined />
            </button>
          ))}
        </div>

        {/* 地圖圖片容器 */}
        <div className="mapImageContainer">
          <img
            src={isFront ? mapImageFront : mapImageBack}
            alt="地圖圖片"
            className="mapImage"
          />

          {/* 切換地圖與輸入框顯示狀態的按鈕 */}
          <div className="mapButtonsContainer">
            <button className="mapToggleButton" onClick={toggleMap}>
              <RetweetOutlined />
            </button>
            <button className="inputToggleButton" onClick={toggleInputVisibility}>
              <EyeOutlined />
            </button>
          </div>

          {/* 輸入框與結束遊戲按鈕 */}
          {inputVisible && (
            <div className="resultContainer">
              <input
                type="text"
                value={inputValue}
                onInput={(e) => {
                  setInputValue(e.target.value); // 更新輸入框值
                  checkInputValue(); // 檢查輸入框值
                }}
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

      {/* 中央提示與導航按鈕 */}
      <div className={`centralContainer ${showNewPrompt || showNewButton ? 'visible' : ''}`}>
        {showNewPrompt && <div className="newPrompt">請前往尋找手水舍</div>}
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
