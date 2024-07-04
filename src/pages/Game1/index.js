import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Game1.scss'; // 使用 CSS 模組

const Game1 = () => {
  const [isLoaded, setIsLoaded] = useState(false); // AR.js 是否加載完成的狀態
  const [markerFound, setMarkerFound] = useState(false); // 標記是否被找到的狀態
  const navigate = useNavigate(); // React Router 的導航函數

  const sceneRef = useRef(null); // 使用 useRef 創建 sceneRef

  // 定義 handleMarkerFound 和 handleMarkerLost 函數
  const handleMarkerFound = () => setMarkerFound(true);
  const handleMarkerLost = () => setMarkerFound(false);

  useEffect(() => {
    let interval;

    // 檢查 AFRAME 是否加載完成
    const checkLoadStatus = () => {
      interval = setInterval(() => {
        if (window.AFRAME?.registerComponent) {
          setIsLoaded(true);
          clearInterval(interval);
        }
      }, 100);
    };

    checkLoadStatus();

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (isLoaded) {
      const scene = sceneRef.current;

      // 控制背景樣式的顯示和隱藏
      document.body.classList.add(styles.hideBackground);

      // 設置和清除標記的事件監聽器
      const markers = scene.querySelectorAll('a-marker');
      markers.forEach(marker => {
        marker.addEventListener('markerFound', handleMarkerFound);
        marker.addEventListener('markerLost', handleMarkerLost);
      });

      return () => {
        markers.forEach(marker => {
          marker.removeEventListener('markerFound', handleMarkerFound);
          marker.removeEventListener('markerLost', handleMarkerLost);
        });

        // 移除背景樣式
        document.body.classList.remove(styles.hideBackground);
      };
    }
  }, [isLoaded]);

  const handleEndGame = () => {
    // 結束遊戲處理函數
    stopARCamera(() => {
      navigate('/', { state: { dialogIndex: 6 } });
      window.location.reload(); // 在路由跳轉後刷新網頁
    });
  };

  const stopARCamera = (callback) => {
    const scene = sceneRef.current;

    // 停止 AR 相機及相關資源的清理
    if (scene) {
      const arjsSystem = scene.systems['arjs'];
      if (arjsSystem && arjsSystem.source) {
        arjsSystem.source.stop();
        const cameraEntity = scene.querySelector('[camera]');
        if (cameraEntity) cameraEntity.parentNode.removeChild(cameraEntity);
        arjsSystem.dispose();

        const markers = scene.querySelectorAll('a-marker');
        markers.forEach(marker => {
          marker.removeEventListener('markerFound', handleMarkerFound);
          marker.removeEventListener('markerLost', handleMarkerLost);
        });

        while (scene.firstChild) scene.removeChild(scene.firstChild);
        scene.parentNode.removeChild(scene);

        const arVideo = document.getElementById('arjs-video');
        if (arVideo) {
          arVideo.srcObject = null;
          arVideo.parentNode.removeChild(arVideo);
        }

        setTimeout(callback, 100);
      } else {
        callback();
      }
    }
  };

  return (
    <div className={styles.container1}>
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
        <div className={styles.buttonContainer}>
          <button className="endButton" onClick={handleEndGame}>
            結束遊戲
          </button>
        </div>
      )}
    </div>
  );
};

export default Game1;
