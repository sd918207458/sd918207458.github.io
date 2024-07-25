import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Game5.scss';
import ARComponent from '../../components/arcomp/ARComponent';
import patternPatt from './pattern-辨識圖-手水舍_0.patt';

/**
 * Game5 - AR 遊戲組件
 * 
 * 這個組件實現了一個基於標記的 AR 遊戲，使用 ARComponent 來處理 AR 功能。
 * 玩家需要找到特定的 AR 標記，然後可以結束遊戲。
 */
const Game5 = () => {
  // 狀態定義
  const [markerFound, setMarkerFound] = useState(false);  // 是否找到標記
  const [buttonClicked, setButtonClicked] = useState(false);  // 是否點擊了"找到了"按鈕
  const [isAREnabled, setIsAREnabled] = useState(true);  // AR 功能是否啟用
  const [hideBackground, setHideBackground] = useState(true);  // 是否隱藏背景
  const formRef = useRef(null);

  // 處理標記被找到的事件
  const handleMarkerFound = () => setMarkerFound(true);

  // 處理"找到了"按鈕點擊事件
  const handleFoundButtonClick = () => setButtonClicked(true);

  // 處理遊戲結束事件
  const handleEndGame = async () => {
    // 使用表單提交來實現頁面跳轉
    if (formRef.current) {
      formRef.current.submit();
    }
  };
  // 渲染 AR 內容的函數
  const renderARContent = () => (
    <>
      <a-marker id="animated-marker" preset="hiro" emitevents="true">
        {/* 可以在這裡添加 Hiro 標記的 3D 模型或其他內容 */}
      </a-marker>
      <a-marker id="animated-marker-custom" type="pattern" url={patternPatt} emitevents="true">
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
    </>
  );

  return (
    <div className={`container5 ${hideBackground ? 'hide-background' : ''}`}>
      {isAREnabled && (
        <ARComponent
          onMarkerFound={handleMarkerFound}
          renderARContent={renderARContent}
          arType="markerBased"
          isEnabled={isAREnabled}
        />
      )}
      <div className="buttonContainer">
        {markerFound && !buttonClicked && (
          <button className="foundButton5" onClick={handleFoundButtonClick}>
            找到了
          </button>
        )}
        {buttonClicked && (
          <>
            <div className="info-text">記得找導覽人員拿相片喔</div>
            <div className="centered-button-container">
              <button className="endGameButton5" onClick={handleEndGame}>
                結束遊戲
              </button>
            </div>
          </>
        )}
      </div>
      <form ref={formRef} action="/" method="GET" style={{ display: 'none' }}>
        <input type="hidden" name="dialogIndex" value="38" />
      </form>
    </div>
  );
};

export default Game5;