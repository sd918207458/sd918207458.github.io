import React, { useState, useRef, useCallback, memo } from 'react';
import './Game5.scss';
import ARComponent from '../../components/arcomp/ARComponent';
import imageTargetSrc from './辨識圖-手水舍.mind';
import QRCodeGenerator from '../../components/QRCodeGenerator';
import QrScanner from 'react-qr-scanner';
import { message } from 'antd';

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

const Game5 = () => {
  // 狀態定義
  const [markerFound, setMarkerFound] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [isAREnabled, setIsAREnabled] = useState(true);
  const [hideBackground, setHideBackground] = useState(true);
  const [qrResult, setQrResult] = useState('');
  const formRef = useRef(null);

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

  // 渲染 AR 內容的回調函數
  const renderARContent = useCallback((scene, THREE) => {
    if (buttonClicked) {
      const texture = new THREE.CanvasTexture(createTextCanvas("記得找導覽人員拿相片喔"));
      const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
      const geometry = new THREE.PlaneGeometry(1, 0.3);
      const textMesh = new THREE.Mesh(geometry, material);
      textMesh.position.set(0, 0.5, 0);
      scene.add(textMesh);
    }
  }, [buttonClicked]);

  // 創建文字畫布的輔助函數
  const createTextCanvas = useCallback((text) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 64;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '24px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    return canvas;
  }, []);

  // 處理 QR 掃描結果的回調函數
  const handleQRScan = useCallback((data) => {
    if (data) {
      setQrResult(data.text);
      setMarkerFound(true);
      message.success('QR 碼掃描成功！', 2);
    }
  }, []);

  // 處理 QR 掃描錯誤的回調函數
  const handleQRError = useCallback((err) => {
    console.error(err);
  }, []);

  return (
    <div className={`container5 ${hideBackground ? 'hide-background' : ''}`}>
      {/* AR 組件 */}
      <ARComponent
        imageTargetSrc={imageTargetSrc}
        onTargetFound={handleTargetFound}
        renderARContent={renderARContent}
        isEnabled={isAREnabled}
      />
      {/* QR 掃描器 */}
      <div style={{ width: '100%', maxWidth: '100vw', marginTop: '5vh' }}>
        <WrappedQrScanner
          onScan={handleQRScan}
          onError={handleQRError}
          delay={300}
        />
      </div>
      {/* 按鈕容器 */}
      <div className="buttonContainer">
        {markerFound && !buttonClicked && (
          <button className="foundButton5" onClick={handleFoundButtonClick}>
            找到了
          </button>
        )}
        {buttonClicked && (
          <div className="centered-button-container">
            <button className="endGameButton5" onClick={handleEndGame}>
              結束遊戲
            </button>
          </div>
        )}
      </div>
      {/* 隱藏的表單，用於結束遊戲 */}
      <form ref={formRef} action="/" method="GET" style={{ display: 'none' }}>
        <input type="hidden" name="dialogIndex" value="38" />
      </form>
    </div>
  );
};

export default Game5;