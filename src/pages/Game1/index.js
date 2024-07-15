import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Game1.scss'; // 使用 CSS 模組

const Game1 = () => {
  const [isLoaded, setIsLoaded] = useState(false); // 檢查 AR 是否已加載
  const [markerFound, setMarkerFound] = useState(false); // 標記是否被找到
  const [buttonClicked, setButtonClicked] = useState(false); // 找到了按鈕是否被點擊
  const [hideBackground, setHideBackground] = useState(true); // 控制是否隱藏背景樣式
  const sceneRef = useRef(null); // 使用 useRef 創建 sceneRef
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
      const scene = sceneRef.current;

      const handleMarkerFound = () => {
        setMarkerFound(true);
      };

      const handleMarkerLost = () => {
        // 保持 markerFound 狀態，不再重置 markerFound 為 false
      };

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
  const handleFoundButtonClick = () => {
    setButtonClicked(true);
  };

  // 結束遊戲的處理函數
  const handleEndGame = () => {
    navigate('/', { state: { dialogIndex: 5 } });
  };

  return (
    <div className="container1">
      {isLoaded ? (
        <a-scene ref={sceneRef} embedded arjs="sourceType: webcam;">
          {/* 預設的標記 */}
          <a-marker id="animated-marker" preset="hiro" emitevents="true">
            {/* 在此處添加 3D 模型或其他實體 */}
          </a-marker>
          {/* 自定義的標記 */}
          <a-marker
            id="animated-marker-custom"
            type="pattern"
            url="/assets/nft/trex/pattern-阿公的箱子-辨識圖_阿公本人.patt" // 確認此路徑是否正確
            emitevents="true"
          >
            {/* 在此處添加 3D 模型或其他實體 */}
          </a-marker>
          <a-entity camera></a-entity>
        </a-scene>
      ) : (
        <p>Loading AR...</p>
      )}
      {markerFound && (
        <div className="buttonContainer">
          {!buttonClicked ? (
            <button className="foundButton" onClick={handleFoundButtonClick}>
              找到了
            </button>
          ) : (
            <>
              <div className="info-text">記得找導覽人員拿相片喔</div>
              <button className="endButton" onClick={handleEndGame}>
                結束遊戲
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Game1;
