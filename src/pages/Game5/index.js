import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Game5.scss';

const Game5 = () => {
  const [isLoaded, setIsLoaded] = useState(false); // 檢查 AR 是否已加載
  const [markerFound, setMarkerFound] = useState(false); // 標記是否被找到
  const [buttonClicked, setButtonClicked] = useState(false); // 找到了按鈕是否被點擊
  const [hideBackground, setHideBackground] = useState(true); // 控制是否隱藏背景樣式
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
    let interval;

    // 檢查 AFRAME 是否已加載
    const checkLoadStatus = () => {
      interval = setInterval(() => {
        if (window.AFRAME?.registerComponent) {
          setIsLoaded(true);
          clearInterval(interval);
        }
      }, 100);
    };

    checkLoadStatus();

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // 設置和清除標記的事件監聽器
    if (isLoaded) {
      const scene = document.querySelector('a-scene');

      const handleMarkerFound = () => {
        setMarkerFound(true);
      };

      const handleMarkerLost = () => {
        setMarkerFound(false);
      };

      if (scene) {
        const marker = scene.querySelector('a-marker');
        if (marker) {
          marker.addEventListener('markerFound', handleMarkerFound);
          marker.addEventListener('markerLost', handleMarkerLost);
        }
      }

      return () => {
        if (scene) {
          const marker = scene.querySelector('a-marker');
          if (marker) {
            marker.removeEventListener('markerFound', handleMarkerFound);
            marker.removeEventListener('markerLost', handleMarkerLost);
          }
        }
      };
    }
  }, [isLoaded]);

  // 處理找到了按鈕點擊事件
  const handleFoundButtonClick = () => {
    setButtonClicked(true);
  };

  // 結束遊戲的處理函數
  const handleEndGame = () => {
    navigate('/', { state: { dialogIndex: 38 } });
    window.location.reload(); // 在路由跳轉後刷新網頁
  };

  return (
    <div className={`container5 ${hideBackground ? 'hide-background' : ''}`}>
      {isLoaded ? (
        <a-scene embedded arjs="sourceType: webcam;">
          <a-marker preset="hiro" emitevents="true">
            {buttonClicked && (
              <a-text
                value="找導覽人員拿相片"
                position="0 0.5 0"
                align="center"
                color="#FFFFFF"
                background-color="#000000"
                width="3"
                height="1.5"
                font="dejavu"
              ></a-text>
            )}
          </a-marker>
        </a-scene>
      ) : (
        <p>Loading AR...</p>
      )}
      {markerFound && !buttonClicked && (
        <button className="foundButton5" onClick={handleFoundButtonClick}>
          找到了
        </button>
      )}
      {buttonClicked && (
        <button className="endGameButton5" onClick={handleEndGame}>
          結束遊戲
        </button>
      )}
    </div>
  );
};

export default Game5;
