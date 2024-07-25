import React, { useState, useEffect, useRef } from 'react';
import './Game1.scss';
import ARComponent from '../../components/arcomp/ARComponent';
// import patternPatt from './pattern.patt';
import pattern3 from './pattern-郵差蛙蛙的辨識圖_0.patt';

/**
 * Game1 - AR遊戲組件
 * 
 * 這個組件實現了一個基於標記的AR遊戲，使用多個標記來顯示不同的3D模型或其他實體。
 * 
 * @component
 * @example
 * return (
 *   <Game1 />
 * )
 */
const Game1 = () => {
  const [markerFound, setMarkerFound] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [isAREnabled, setIsAREnabled] = useState(true);
  const formRef = useRef(null);
  // 當找到標記時的處理函數
  const handleMarkerFound = () => setMarkerFound(true);

  // 當按下“找到了”按鈕時的處理函數
  const handleFoundButtonClick = () => setButtonClicked(true);

  // 當按下“結束遊戲”按鈕時的處理函數
  const handleEndGame = async () => {
    if (formRef.current) {
      console.log(formRef.current);
      formRef.current.submit();
    }
  };
  const toggleAR = () => {
    setIsAREnabled(!isAREnabled);
  };

  // 渲染AR內容函數，使用多個a-marker元素來顯示不同的3D模型或其他實體
  const renderARContent = () => (
    <>
      <a-marker id="animated-marker" preset="hiro" emitevents="true">
        {/* 在此處添加3D模型或其他實體 */}
      </a-marker>
      <a-marker id="animated-marker-custom" type="pattern" url={pattern3} emitevents="true">
        {/* 在此處添加3D模型或其他實體 */}
      </a-marker>
    </>
  );

  return (
    <div className="container1">
      <ARComponent
        onMarkerFound={handleMarkerFound}
        renderARContent={renderARContent}
        arType="markerBased"
        isEnabled={isAREnabled}
      />
      {markerFound && (
        <div className="buttonContainer">
          {!buttonClicked ? (
            <button className="foundButton" onClick={handleFoundButtonClick}>
              找到了
            </button>
          ) : (
            <>
              <div className="info-text">記得找導覽人員拿相片哦</div>
              <button className="endButton" onClick={handleEndGame}>
                結束遊戲
              </button>
            </>
          )}
          <form ref={formRef} action="/" method="GET" style={{ display: 'none' }}>
            <input type="hidden" name="dialogIndex" value="5" />
          </form>
        </div>
      )}
    </div>
  );
};

export default Game1;
