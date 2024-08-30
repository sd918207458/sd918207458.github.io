import React, { useState, useCallback, useRef, memo } from 'react';
import './Game6.scss';
import { Button, Image, Layout, message } from 'antd';
import ARComponent from '../../components/arcomp/ARComponent';
import imageTargetSrc from './辨識圖-神社.mind'; // 引入AR辨識圖檔
import frogPng from '../../assets/picture/Frog/蛙蛙0-備用.png'; // 引入圖片資源
import QRCodeGenerator from '../../components/QRCodeGenerator';
import QrScanner from 'react-qr-scanner';

const { Content } = Layout; // 從Ant Design解構出Content組件

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

const Game6 = () => {
  const [markerFound, setMarkerFound] = useState(false); // 使用useState來追蹤是否找到標記
  const [qrResult, setQrResult] = useState(''); // 使用useState來存儲QR碼掃描結果
  const formRef = useRef(null); // 使用useRef來取得表單的參考

  // 當目標被找到時觸發的處理函數，使用useCallback來避免不必要的重渲染
  const handleTargetFound = useCallback(() => {
    setMarkerFound(true);
    message.success('AR 目標找到了！', 2);
  }, []);

  // 當遊戲結束時觸發的處理函數，提交表單，使用useCallback來避免不必要的重渲染
  const handleEndGame = useCallback(() => {
    if (formRef.current) {
      formRef.current.submit(); // 提交表單
    }
  }, []);

  // 渲染AR內容的函數，這裡可以添加3D模型或其他AR內容，使用useCallback來避免不必要的重渲染
  const renderARContent = useCallback((scene, THREE) => {
    // 簡單的3D內容示例
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
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
    <Layout style={{ minHeight: '100vh', background: 'transparent' }}> {/* 設定頁面佈局和背景 */}
      <Content style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}> {/* 內容置中佈局 */}
        {/* AR 組件 */}
        <div style={{ width: '100%', aspectRatio: '16/9', marginBottom: '1rem' }}>
          <ARComponent
            imageTargetSrc={imageTargetSrc} // 傳遞AR辨識圖檔路徑
            onTargetFound={handleTargetFound} // 當目標被找到時觸發
            renderARContent={renderARContent} // 傳遞渲染AR內容的函數
            isEnabled={true} // 確保AR功能啟用
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
        {markerFound && ( // 如果標記被找到或QR碼被掃描，顯示以下內容
          <div style={{
            textAlign: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10000,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // 半透明背景
          }}>
            <div style={{
              textAlign: 'center',
              padding: '20px',
              borderRadius: '10px',
              maxWidth: '90%',
              maxHeight: '90%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>{/* 設定圖片和按鈕的容器 */}
              <Image
                src={frogPng} // 傳遞圖片路徑
                alt="Found Image" // 設定圖片的替代文字
                style={{ maxHeight: '50vh', width: 'auto', objectFit: 'contain' }} // 設定圖片樣式
              />
              <Button
                type="primary"
                onClick={handleEndGame} // 點擊按鈕時觸發遊戲結束
                size="large"
                style={{
                  backgroundColor: '#8b5a2b',
                  borderColor: '#8b5a2b',
                  color: 'white',
                  marginTop: '0.5rem',
                }}
              >
                結束遊戲
              </Button>
            </div>
          </div>
        )}
        <form ref={formRef} action="/" method="GET" style={{ display: 'none' }}> {/* 隱藏的表單 */}
          <input type="hidden" name="dialogIndex" value="48" /> {/* 傳遞表單數據 */}
        </form>
      </Content>
    </Layout>
  );
};

export default Game6;