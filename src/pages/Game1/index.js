import React, { useState, useRef, useCallback, memo } from 'react';
import './Game1.scss';
import { message } from 'antd';
import ARComponent from '../../components/arcomp/ARComponent';
import imageTargetSrc from './辨識圖_阿公的箱子.mind';
import QrScanner from 'react-qr-scanner';

// 包裝 QR 掃描器組件
const WrappedQrScanner = memo(({ onScan, onError, style, ...props }) => {
  return (
    <QrScanner
      onScan={onScan}
      onError={onError}
      style={{ ...style, width: '100%', maxWidth: '100vw', height: 'auto', aspectRatio: '16 / 9' }}
      constraints={{
        audio: false,
        video: { facingMode: "environment" }
      }}
      {...props}
    />
  );
});

WrappedQrScanner.displayName = 'WrappedQrScanner';

const Game1 = () => {
  const [markerFound, setMarkerFound] = useState(false); // 追蹤是否找到標記或掃描到QR碼
  const [buttonClicked, setButtonClicked] = useState(false); // 追蹤是否點擊了"找到了"按鈕
  const [isAREnabled, setIsAREnabled] = useState(true); // 控制AR功能是否啟用
  const formRef = useRef(null); // 用於提交表單的引用

  // 處理目標找到的回調函數
  const handleTargetFound = useCallback(() => {
    setMarkerFound(true);
    message.success('AR 目標找到了！', 2);
  }, []);

  // 處理"找到了"按鈕點擊的回調函數
  const handleFoundButtonClick = useCallback(() => setButtonClicked(true), []);

  // 處理結束遊戲的回調函數
  const handleEndGame = useCallback(() => {
    if (formRef.current) {
      formRef.current.submit();
    }
  }, []);

  // 渲染AR內容的回調函數
  const renderARContent = useCallback((scene, THREE) => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.5 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
  }, []);

  // 處理 QR 掃描結果的回調函數
  const handleQRScan = useCallback((data) => {
    if (data) {
      setMarkerFound(true);
      message.success('QR 碼掃描成功！', 2);
    }
  }, []);

  // 處理 QR 掃描錯誤的回調函數
  const handleQRError = useCallback((err) => {
    console.error(err);
  }, []);

  return (
    <div className="container1">
      {/* AR 組件 */}
      <div style={{ width: '100%', aspectRatio: '16/9', marginBottom: '1rem' }}>
        <ARComponent
          imageTargetSrc={imageTargetSrc}
          onTargetFound={handleTargetFound}
          renderARContent={renderARContent}
          isEnabled={isAREnabled}
        />
      </div>
      {/* QR 掃描器 */}
      <div style={{ width: '100%', aspectRatio: '16/9', marginBottom: '1rem' }}>
        <WrappedQrScanner
          onScan={handleQRScan}
          onError={handleQRError}
          delay={300}
        />
      </div>
      {markerFound && (
        <div className="buttonContainer">
          {!buttonClicked ? (
            <button className="foundButton" onClick={handleFoundButtonClick}>
              找到了
            </button>
          ) : (
            <div className="centered-content">
              <button className="endButton" onClick={handleEndGame}>
                結束遊戲
              </button>
            </div>
          )}
        </div>
      )}
      <form ref={formRef} action="/" method="GET" style={{ display: 'none' }}>
        <input type="hidden" name="dialogIndex" value="5" />
      </form>
    </div>
  );
};

export default Game1;