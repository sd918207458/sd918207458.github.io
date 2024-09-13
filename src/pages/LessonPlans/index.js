import React, { useState, useCallback, useEffect, memo } from 'react';
import './LessonPlans.scss'; 
import { message } from 'antd'; 
import ARComponent from '../../components/arcomp/ARComponent'; 
import LessonPlansAR from './LessonPlans.mind'; 
import LinkToJourney from './LinkToJourney.mind'; 
import QrScanner from 'react-qr-scanner'; 

const WrappedQrScanner = memo(({ onScan, onError, ...props }) => (
  <QrScanner
    onScan={onScan}
    onError={onError}
    style={{ width: '100%', maxWidth: '100vw', height: 'auto', aspectRatio: '16/9' }}
    constraints={{
      audio: false,
      video: { facingMode: "environment" } 
    }}
    {...props}
  />
));

WrappedQrScanner.displayName = 'WrappedQrScanner'; 

const LessonPlans = () => {
  const [isMarkerDetected, setIsMarkerDetected] = useState(false); 
  const [isButtonClicked, setIsButtonClicked] = useState(false); 
  const [isQRScanned, setIsQRScanned] = useState(false); 
  const [activeProcess, setActiveProcess] = useState(''); 
  
  useEffect(() => {
    resetStatus();
  }, []);

  const resetStatus = () => {
    setIsMarkerDetected(false);
    setIsButtonClicked(false);
    setIsQRScanned(false);
    setActiveProcess(''); 
  };

  // 處理 AR 標記檢測
  const handleTargetFound = useCallback((target) => {
    if (activeProcess === '') {
      setActiveProcess('AR');
    }
    
    if (!isMarkerDetected && activeProcess === 'AR') {
      if (target === 'LessonPlansAR') {
        setIsMarkerDetected(true);
        message.success('AR 目標已檢測到！', 2);
      } else if (target === 'LinkToJourney') {
        window.location.href = 'https://sanmingmemoryjourney.com'; 
      }
    }
  }, [isMarkerDetected, activeProcess]);

  // 按鈕處理邏輯
  const handleFoundButtonClick = useCallback(() => {
    setIsButtonClicked(true);
    message.success('遊戲目標已確認！', 2);
  }, []);

  // 結束遊戲
  const handleEndGame = useCallback(() => {
    if (window.confirm('確定要結束遊戲並關閉頁面嗎？')) {
      window.close();
    }
  }, []);

  // 處理 QR 掃描結果
  const handleQRScan = useCallback((data) => {
    if (!isQRScanned && activeProcess === '') {
      setActiveProcess('QR');
      if (data?.includes('sanmingmemoryjourney')) {
        setIsQRScanned(true);
        message.success('QR 碼掃描成功！', 2);
      }
    }
  }, [isQRScanned, activeProcess]);

  const handleQRError = useCallback((err) => {
    console.error('QR 掃描錯誤:', err);
    message.error('掃描錯誤，請重試');
  }, []);

  useEffect(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      message.error('當前設備不支持攝像頭功能');
    }
  }, []);

  return (
    <div className="lesson-plans-container">
      <div className="ar-component-wrapper">
        <ARComponent
          imageTargetSrc={LessonPlansAR} 
          LinkToJourney={LinkToJourney} 
          onTargetFound={handleTargetFound} 
          isEnabled={true} 
          onError={(err) => console.error("AR 加載錯誤:", err)} 
        />
      </div>

      <div className="qr-scanner-wrapper">
        <WrappedQrScanner
          onScan={handleQRScan} 
          onError={handleQRError} 
          delay={300} 
        />
      </div>

      {(isMarkerDetected || isQRScanned) && (
        <div className="button-container">
          {!isButtonClicked ? (
            <button className="found-button" onClick={handleFoundButtonClick}>
              找到了
            </button>
          ) : (
            <div className="centered-content">
              <button className="end-button" onClick={handleEndGame}>
                結束遊戲
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LessonPlans;
