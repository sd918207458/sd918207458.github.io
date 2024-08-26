import React, { useState, useRef, useCallback } from 'react';
import './Game1.scss';
import ARComponent from '../../components/arcomp/ARComponent';
import imageTargetSrc from './辨識圖_阿公的箱子.mind';
import QRCodeGenerator from '../../components/QRCodeGenerator';
import { QrReader } from 'react-qr-scanner';

const Game1 = () => {
  const [markerFound, setMarkerFound] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [scanning, setScanning] = useState(false); // 控制是否正在掃描QR code
  const [arEnabled, setArEnabled] = useState(true); // 控制是否啟用AR
  const formRef = useRef(null);

  const handleTargetFound = useCallback(() => setMarkerFound(true), []);
  const handleFoundButtonClick = useCallback(() => setButtonClicked(true), []);
  const handleEndGame = useCallback(() => {
    if (formRef.current) {
      formRef.current.submit(); // 提交表單，觸發頁面跳轉
    }
  }, []);

  const renderARContent = useCallback((scene, THREE) => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      transparent: true,
      opacity: 0.5,
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube); 
  }, []);

  const handleScan = useCallback((data) => {
    if (data) {
      setScanning(false);
      setArEnabled(true); 
      if (data.includes('dialogIndex=5')) {
        setMarkerFound(true);
        setButtonClicked(true);
      }
    }
  }, []);

  const handleError = useCallback((err) => {
    console.error(err);
  }, []);

  const startScanning = useCallback(() => {
    setArEnabled(false); 
    setScanning(true); 
  }, []);

  const stopScanning = useCallback(() => {
    setScanning(false);
    setArEnabled(true); 
  }, []);

  return (
    <div className="container1">
      {arEnabled && (
        <ARComponent
          imageTargetSrc={imageTargetSrc}
          onTargetFound={handleTargetFound}
          renderARContent={renderARContent}
          isEnabled={true}
        />
      )}

      {scanning && (
        <div style={{ position: 'relative', zIndex: 1000, width: '100%', height: '100%' }}>
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '100%', height: 'auto' }}
          />
          <button onClick={stopScanning} className="qr-stop-button">
            停止掃描
          </button>
        </div>
      )}

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

      <QRCodeGenerator />

      {/* 掃描QR碼的按鈕 */}
      <div className="qr-button-container">
        <button onClick={startScanning} className="qr-scan-button">
          掃描QR Code
        </button>
      </div>
    </div>
  );
};

export default Game1;
