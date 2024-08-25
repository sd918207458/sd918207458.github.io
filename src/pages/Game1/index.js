import React, { useState, useRef, useCallback } from 'react';
import './Game1.scss';
import ARComponent from '../../components/arcomp/ARComponent';
import imageTargetSrc from './辨識圖_阿公的箱子.mind';

const Game1 = () => {
  const [markerFound, setMarkerFound] = useState(false); // 追蹤是否找到目標標記
  const [buttonClicked, setButtonClicked] = useState(false); // 追蹤按鈕是否已被點擊
  const formRef = useRef(null); // 用於引用隱藏的表單

  // 當AR目標標記被找到時的處理函數
  const handleTargetFound = useCallback(() => setMarkerFound(true), []);

  // 當「找到了」按鈕被點擊時的處理函數
  const handleFoundButtonClick = useCallback(() => setButtonClicked(true), []);

  // 當「結束遊戲」按鈕被點擊時的處理函數，提交表單以結束遊戲
  const handleEndGame = useCallback(() => {
    if (formRef.current) {
      formRef.current.submit(); // 提交表單，觸發頁面跳轉
    }
  }, []);

  // 渲染AR內容的處理函數
  const renderARContent = useCallback((scene, THREE) => {
    // 創建一個半透明的綠色立方體，並將其添加到場景中
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      transparent: true,
      opacity: 0.5,
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube); // 將立方體添加到AR場景中
  }, []);

  return (
    <div className="container1">
      {/* AR 組件，負責處理圖像識別和渲染 */}
      <ARComponent
        imageTargetSrc={imageTargetSrc} // 傳遞AR目標圖像源
        onTargetFound={handleTargetFound} // 當目標被找到時觸發
        renderARContent={renderARContent} // 傳遞渲染AR內容的函數
        isEnabled={true} // 始終啟用AR功能
      />
      {markerFound && ( // 當找到目標標記時顯示按鈕
        <div className="buttonContainer">
          {!buttonClicked ? ( // 如果按鈕尚未被點擊，顯示「找到了」按鈕
            <button className="foundButton" onClick={handleFoundButtonClick}>
              找到了
            </button>
          ) : ( // 如果按鈕已被點擊，顯示「結束遊戲」按鈕
            <div className="centered-content">
              <button className="endButton" onClick={handleEndGame}>
                結束遊戲
              </button>
            </div>
          )}
        </div>
      )}
      {/* 隱藏的表單，用於在「結束遊戲」按鈕被點擊後提交 */}
      <form ref={formRef} action="/" method="GET" style={{ display: 'none' }}>
        <input type="hidden" name="dialogIndex" value="5" />
      </form>
    </div>
  );
};

export default Game1;
