import React, { useState, useCallback, useRef, memo, useEffect } from 'react';
import './Game6.scss';
import { Button, Image, Layout, message } from 'antd';
import ARComponent from '../../components/arcomp/ARComponent';
import imageTargetSrc from './辨識圖-神社.mind'; // 引入AR辨識圖檔
import frogPng from '../../assets/picture/Frog/蛙蛙0-備用.png'; // 引入圖片資源
import QrScanner from 'react-qr-scanner';

const { Content } = Layout;

// 包裝 QR 掃描器組件
const WrappedQrScanner = memo(({ onScan, onError, ...props }) => {
  return (
    <QrScanner
      onScan={onScan}
      onError={onError}
      style={{ width: '100%', maxWidth: '100vw', height: 'auto', aspectRatio: '16 / 9' }}
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
  const [markerFound, setMarkerFound] = useState(false);
  const [qrResult, setQrResult] = useState('');
  const [hasScanned, setHasScanned] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false); // 動態控制
  const formRef = useRef(null);

  const handleTargetFound = useCallback(() => {
    if (!hasScanned) {
      setMarkerFound(true);
      message.success('AR 目標找到了！', 2);
      setHasScanned(true);
      setIsTransitioning(true); // 開啟動畫
      setTimeout(() => setIsTransitioning(false), 1000); // 1秒後結束過渡
    }
  }, [hasScanned]);

  const handleQRScan = useCallback((data) => {
    console.log('QR 扫描结果:', data);
    if (data && data.includes('sanmingmemoryjourney')) {
      setQrResult(data.text);
      handleTargetFound();
    } else {
      console.warn('QR 扫描数据无效或不包含预期的文本');
    }
  }, [handleTargetFound]);

  const handleQRError = useCallback((err) => {
    console.error('QR Scan Error:', err);
    message.error('QR 掃描失敗，請重試');
  }, []);

  const handleEndGame = useCallback(() => {
    if (formRef.current) {
      formRef.current.submit();
    }
  }, []);

  const renderARContent = useCallback((scene, THREE) => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
  }, []);

  useEffect(() => {
    console.log('当前状态 - markerFound:', markerFound, 'qrResult:', qrResult);
  }, [markerFound, qrResult]);

  return (
    <Layout style={{ minHeight: '100vh', background: 'transparent' }}>
      <Content style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
        {/* AR 組件 */}
        <div style={{ width: '100%', aspectRatio: '16/9', marginBottom: '1rem' }}>
          <ARComponent
            imageTargetSrc={imageTargetSrc}
            onTargetFound={handleTargetFound}
            renderARContent={renderARContent}
            isEnabled={true}
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

        {/* 結束遊戲按鈕與圖片過渡效果 */}
        {markerFound && (
          <div className={`overlay ${isTransitioning ? 'fade-in' : ''}`} style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            transition: 'opacity 1s ease-in-out',
          }}>
            <div style={{
              textAlign: 'center',
              padding: '20px',
              borderRadius: '10px',
              backgroundColor: 'white',
              maxWidth: '90%',
              maxHeight: '90%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              <Image
                src={frogPng}
                alt="Found Image"
                style={{ maxHeight: '50vh', width: 'auto', objectFit: 'contain' }}
              />
              <Button
                type="primary"
                onClick={handleEndGame}
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

        {/* 隱藏表單提交 */}
        <form ref={formRef} action="/" method="GET" style={{ display: 'none' }}>
          <input type="hidden" name="dialogIndex" value="48" />
        </form>
      </Content>
    </Layout>
  );
};

export default Game6;
