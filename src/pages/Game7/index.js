import React, { useState, useRef, useCallback, useEffect, memo } from 'react';
import './Game7.scss';
import { Button, Typography, Layout, message } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import ARComponent from '../../components/arcomp/ARComponent';
import imageTargetSrc from './辨識圖-郵差蛙蛙.mind';
import * as THREE from 'three';
import QrScanner from 'react-qr-scanner';

const { Content } = Layout;
const { Text } = Typography;

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

const Game7 = () => {
  const [targetFound, setTargetFound] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [qrResult, setQrResult] = useState('');
  const [messageShown, setMessageShown] = useState(false); 
  const formRef = useRef(null);

  // 處理目標找到的回調函數
  const handleTargetFound = useCallback(() => {
    setTargetFound(true);
    if (!messageShown) {
      message.success('目標找到了！', 2);
      setMessageShown(true);
    }
    setTimeout(() => setShowMessage(true), 100);
  }, [messageShown]);

  const handleTargetLost = useCallback(() => {
    setTargetFound(false);
    setShowMessage(false);
  }, []);

  // 處理結束遊戲的回調函數
  const handleEndGame = useCallback(() => {
    if (formRef.current) {
      formRef.current.submit();
    }
  }, []);

  // 渲染 AR 內容
  const renderARContent = useCallback((scene) => {
    const geometry = new THREE.PlaneGeometry(1, 0.552);
    const material = new THREE.MeshBasicMaterial({ color: 0x0000ff, transparent: true, opacity: 0.5 });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    const animate = () => {
      plane.rotation.y += 0.01;
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  const handleQRScan = useCallback((data) => {
    if (data && data.text.includes('sanmingmemoryjourney')) {
      setQrResult(data.text);
      if (!messageShown) {
        handleTargetFound(); 
      }
    }
  }, [handleTargetFound, messageShown]);

  useEffect(() => {
    console.log('Current states - targetFound:', targetFound, 'showMessage:', showMessage, 'qrResult:', qrResult);
  }, [targetFound, showMessage, qrResult]);

  return (
    <Layout style={{ minHeight: '100vh', background: 'transparent' }}>
      <Content style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5vh 5vw'
      }}>
        <ARComponent
          imageTargetSrc={imageTargetSrc}
          onTargetFound={handleTargetFound}
          onTargetLost={handleTargetLost}
          renderARContent={renderARContent}
          isEnabled={true}
          style={{ width: '100%', height: 'auto', aspectRatio: '16 / 9' }}
        />
        <div style={{ width: '100%', maxWidth: '100vw', marginTop: '5vh' }}>
          <WrappedQrScanner
            onScan={handleQRScan}
            delay={300}
          />
        </div>

        <AnimatePresence>
          {targetFound && showMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={{
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
                padding: '5vmin',
                background: 'rgba(0, 0, 0, 0.6)', // 背景加深，提升可視性
              }}
            >
              <div style={{
                background: 'rgba(0, 0, 0, 0.7)',
                padding: '4vmin',
                borderRadius: '2vmin',
                marginBottom: '4vmin',
                maxWidth: '90%',
                width: '100%',
                maxHeight: '40vh',
                overflow: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Text style={{
                  color: 'white',
                  fontSize: 'clamp(14px, 3vmin, 24px)',
                  textAlign: 'center',
                }}>找到囉，記得找導覽人員拿相片哦</Text>
              </div>
              <Button
                type="primary"
                onClick={handleEndGame}
                size="large"
                style={{
                  backgroundColor: '#8b5a2b',
                  borderColor: '#8b5a2b',
                  color: 'white',
                  fontSize: 'clamp(12px, 2.5vmin, 20px)',
                  padding: '2vmin 4vmin',
                  height: 'auto',
                  maxWidth: '90%',
                  width: 'auto',
                }}
              >
                結束遊戲
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!targetFound && (
            <motion.div
              key="searching-message"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 10000,
                padding: '5vmin',
              }}
            >
              <div style={{
                padding: '4vmin',
                background: 'rgba(0, 0, 0, 0.5)', // 更加明顯的提示框背景
                borderRadius: '2vmin',
                maxWidth: '90%',
                width: '100%',
                maxHeight: '40vh',
                overflow: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Text style={{
                  fontSize: 'clamp(14px, 3vmin, 24px)',
                  textAlign: 'center',
                }}>
                  請將相機對準目標圖片或QR碼
                </Text>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <form ref={formRef} action="/" method="GET" style={{ display: 'none' }}>
          <input type="hidden" name="dialogIndex" value="68" />
        </form>
      </Content>
    </Layout>
  );
};

export default Game7;
