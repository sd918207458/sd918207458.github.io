import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Game5.scss';
import patternPatt from './pattern.patt';

const Game5 = () => {
  const [isLoaded, setIsLoaded] = useState(false); // AR 是否已加載
  const [markerFound, setMarkerFound] = useState(false); // 是否找到標記
  const [buttonClicked, setButtonClicked] = useState(false); // 是否按下按鈕
  const [hideBackground, setHideBackground] = useState(true); // 隱藏背景樣式
  const navigate = useNavigate();

  useEffect(() => {
    // 在元件 mount 時添加隱藏背景圖片的樣式
    setHideBackground(true);
    document.documentElement.classList.add('hide-background');
    document.body.classList.add('hide-background');

    // 在元件 unmount 時移除隱藏背景圖片的樣式
    return () => {
      setHideBackground(false);
      document.documentElement.classList.remove('hide-background');
      document.body.classList.remove('hide-background');
    };
  }, []);

  useEffect(() => {
    // 檢查 AFRAME 是否已加載
    const checkLoadStatus = () => {
      const interval = setInterval(() => {
        if (window.AFRAME?.registerComponent) {
          setIsLoaded(true);
          clearInterval(interval);
        }
      }, 100);
    };

    checkLoadStatus();

    return () => clearInterval(checkLoadStatus);
  }, []);

  useEffect(() => {
    // 設置和清除標記的事件監聽器
    if (isLoaded) {
      const scene = document.querySelector('a-scene');

      const handleMarkerFound = () => setMarkerFound(true);
      const handleMarkerLost = () => { }; // 不再重置 markerFound 狀態

      if (scene) {
        const markers = scene.querySelectorAll('a-marker');
        markers.forEach(marker => {
          marker.addEventListener('markerFound', handleMarkerFound);
          marker.addEventListener('markerLost', handleMarkerLost);
        });
      }

      return () => {
        if (scene) {
          const markers = scene.querySelectorAll('a-marker');
          markers.forEach(marker => {
            marker.removeEventListener('markerFound', handleMarkerFound);
            marker.removeEventListener('markerLost', handleMarkerLost);
          });
        }
      };
    }
  }, [isLoaded]);

  // 處理找到了按鈕點擊事件
  const handleFoundButtonClick = () => setButtonClicked(true);

  // 結束遊戲的處理函數
  const handleEndGame = () => navigate('/', { state: { dialogIndex: 38 } });

  return (
    <div className={`container5 ${hideBackground ? 'hide-background' : ''}`}>
      {isLoaded ? (
        <a-scene embedded arjs="sourceType: webcam;">
          <a-marker id="animated-marker" preset="hiro" emitevents="true">
            {/* 在此處添加 3D 模型或其他實體 */}
          </a-marker>
          <a-marker
            id="animated-marker-custom"
            type="pattern"
            url={patternPatt}
            emitevents="true"
          >
            {buttonClicked && (
              <a-text
                value="記得找導覽人員拿相片喔"
                position="0 0.5 0"
                align="center"
                color="#FFFFFF"
                background-color="#000000"
              ></a-text>
            )}
          </a-marker>
          <a-entity camera></a-entity>
        </a-scene>
      ) : (
        <p>Loading AR...</p>
      )}
      {markerFound && (
        <div className="buttons-container">
          {!buttonClicked ? (
            <button className="foundButton5" onClick={handleFoundButtonClick}>
              找到了
            </button>
          ) : (
            <>
              <div className="info-text">記得找導覽人員拿相片喔</div>
              <button className="endGameButton5" onClick={handleEndGame}>
                結束遊戲
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Game5;
