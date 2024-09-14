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
  const [inputValue, setInputValue] = useState(''); 
  const [showEndButton, setShowEndButton] = useState(false); 
  const [isFront, setIsFront] = useState(true); 
  const [inputVisible, setInputVisible] = useState(true); 
  const [showNewPrompt, setShowNewPrompt] = useState(false); 
  const [showNewButton, setShowNewButton] = useState(false); 
  const [audioPlaying, setAudioPlaying] = useState(false); 
  const navigate = useNavigate(); 

  const [pageState, setPageState] = usePageState({
    isModalVisible: false,
  });

  const { isModalVisible } = pageState;

  const audioFiles = useMemo(() => [audio1, audio2, audio3], []);

  const handlePlayAudio = useCallback(
    (index) => {
      if (audioPlaying) return;

      setAudioPlaying(true);
      const audio = new Audio(audioFiles[index]);
      audio.play();

      audio.onended = () => {
        setAudioPlaying(false); 
        if (index === 1) checkInputValue(); 
      };
    },
    [audioPlaying, audioFiles] 
  );

  const checkInputValue = useCallback(() => {
    if (inputValue === '手水舍') {
      setShowEndButton(true);
    }
  }, [inputValue]);

  const handleEndGame = useCallback(() => {
    setShowNewPrompt(true); 
    setTimeout(() => {
      setShowNewButton(true); 
    }, 3000);
  }, []);

  const handleNavigate = useCallback(() => {
    navigate('/?dialogIndex=37');
  }, [navigate]);

  const toggleMap = useCallback(() => {
    setIsFront((prev) => !prev);
  }, []);

  const toggleInputVisibility = useCallback(() => {
    setInputVisible((prev) => !prev);
  }, []);

  const showModal = useCallback(() => {
    setPageState((prevState) => ({
      ...prevState,
      isModalVisible: true,
    }));
  }, [setPageState]);

  const handleModalCancel = useCallback(() => {
    setPageState((prevState) => ({
      ...prevState,
      isModalVisible: false,
    }));
  }, [setPageState]);

  return (
    <div className="container4">
      <Gamemodal
        isVisible={isModalVisible}
        showModal={showModal}
        handleModalCancel={handleModalCancel}
      />
      <div className="mapContainer">
        <div className="audioButtonsContainer">
          {audioFiles.map((_, index) => (
            <button
              key={index}
              className={`audioButton ${audioPlaying ? 'disabled' : ''}`} 
              onClick={() => handlePlayAudio(index)}
              disabled={audioPlaying} 
            >
              <AudioOutlined />
            </button>
          ))}
        </div>

        <div className="mapImageContainer">
          <img
            src={isFront ? mapImageFront : mapImageBack}
            alt="地圖圖片"
            className={`mapImage ${isFront ? 'flip-in' : 'flip-out'}`} 
          />

          <div className="mapButtonsContainer">
            <button className="mapToggleButton" onClick={toggleMap}>
              <RetweetOutlined />
            </button>
            <button className="inputToggleButton" onClick={toggleInputVisibility}>
              <EyeOutlined />
            </button>
          </div>

          {inputVisible && (
            <div className="resultContainer">
              <input
                type="text"
                value={inputValue}
                onInput={(e) => {
                  setInputValue(e.target.value); 
                  checkInputValue(); 
                }}
                placeholder="請輸入關鍵字"
                className={`input ${showEndButton ? 'correct' : ''}`} 
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
