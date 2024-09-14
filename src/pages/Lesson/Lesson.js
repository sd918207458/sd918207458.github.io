import React, { useState, useRef, useCallback, memo } from 'react';
import './Game1.scss';
import { message } from 'antd';
import ARComponent from '../../components/arcomp/ARComponent';
import imageTargetSrc from './LessonPlans.mind'; // AR辨識圖1
import newImageTargetSrc from './LinkTojourney.mind'; // AR辨識圖2
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

const Lesson = () => {
  const [markerFound, setMarkerFound] = useState(false); // 追蹤是否找到標記或掃描到QR碼
  const [buttonClicked, setButtonClicked] = useState(false); // 追蹤是否點擊了"找到了"按鈕
  const [isAREnabled, setIsAREnabled] = useState(true); // 控制AR功能是否啟用
  const [hasScanned, setHasScanned] = useState(false); // 控制提示是否已顯示
  const formRef = useRef(null); // 用於提交表單的引用

  // 處理目標找到的回調函數
  const handleTargetFound = useCallback((target) => {
    if (target === '辨識圖_阿公的箱子') {
      setMarkerFound(true);
      if (!hasScanned) {
        message.success('AR 目標找到了！', 2);
        setHasScanned(true);
      }
    } else if (target === '辨識圖_新圖') {
      // 當新的AR辨識圖被找到時，跳轉到指定網址
      window.location.href = 'https://sanmingmemoryjourney.com';
    }
  }, [hasScanned]);

  // 處理"找到了"按鈕點擊的回調函數
  const handleFoundButtonClick = useCallback(() => {
    setButtonClicked(true);
    message.success('遊戲目標已確認！', 2);
  }, []);

  // 處理結束遊戲的回調函數
  const handleEndGame = useCallback(() => {
    if (window.confirm('確定要結束遊戲並關閉頁面嗎？')) {
      window.close(); // 嘗試關閉當前頁面
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
    if (data && data.includes('sanmingmemoryjourney')) {
      setMarkerFound(true);
      if (!hasScanned) {
        message.success('QR 碼掃描成功！', 2);
        setHasScanned(true);
      }
    }
  }, [hasScanned]);

  // 處理 QR 掃描錯誤的回調函數
  const handleQRError = useCallback((err) => {
    console.error('QR 掃描錯誤:', err);
    message.error('掃描失敗，請重試');
  }, []);

  return (
    <div className="container1">
      {/* AR 組件1 (原本的阿公的箱子) */}
      <div style={{ width: '100%', aspectRatio: '16/9', marginBottom: '1rem' }}>
        <ARComponent
          imageTargetSrc={imageTargetSrc}
          onTargetFound={handleTargetFound}
          renderARContent={renderARContent}
          isEnabled={isAREnabled}
          onError={(err) => {
            console.error("AR 加載錯誤:", err);
            message.error('AR 加載失敗，請檢查設備或檔案是否正確。');
          }}
        />
      </div>

      {/* AR 組件2 (新的辨識圖) */}
      <div style={{ width: '100%', aspectRatio: '16/9', marginBottom: '1rem' }}>
        <ARComponent
          imageTargetSrc={newImageTargetSrc} // 使用新的辨識圖
          onTargetFound={handleTargetFound}
          renderARContent={renderARContent}
          isEnabled={isAREnabled}
          onError={(err) => {
            console.error("AR 加載錯誤:", err);
            message.error('AR 加載失敗，請檢查設備或檔案是否正確。');
          }}
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

export default Lesson;

// Game1/Lesson.js

// import React from 'react';

// const Lesson = () => {
//   return (
//     <div>
//       <h1>這是 Game1 的 Lesson 頁面</h1>
//     </div>
//   );
// };

// export default Lesson;
