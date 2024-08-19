import React, { useState, useRef, useCallback, useEffect } from 'react';
import './Game7.scss';
import { Button, Typography, Layout, message, Spin } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import ARComponent from '../../components/arcomp/ARComponent';
import imageTargetSrc from './辨識圖-郵差蛙蛙.mind'; // AR辨識圖檔案
import * as THREE from 'three'; // 引入Three.js來處理3D圖形

const { Content } = Layout; // 從Ant Design Layout組件中解構出Content
const { Text } = Typography; // 從Ant Design Typography組件中解構出Text

const Game7 = () => {
  // 設定state，用來追蹤目標是否已經被找到、AR是否啟用、以及是否顯示訊息
  const [targetFound, setTargetFound] = useState(false);
  const [isAREnabled, setIsAREnabled] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  // 使用useRef來取得表單的參考
  const formRef = useRef(null);

  // 當目標被找到時的處理函數
  const handleTargetFound = useCallback(() => {
    setTargetFound(true); // 設定目標已找到
    message.success('目標找到了！', 2); // 顯示提示訊息，持續2秒
    // 使用 setTimeout 來確保狀態更新有足夠的時間
    setTimeout(() => {
      setShowMessage(true);
      console.log('Show message set to true');
    }, 100);
  }, []);

  // 當目標遺失時的處理函數
  const handleTargetLost = useCallback(() => {
    setTargetFound(false); // 設定目標未找到
    setShowMessage(false); // 隱藏訊息
  }, []);

  // 當遊戲結束時的處理函數
  const handleEndGame = async () => {
    if (formRef.current) {
      formRef.current.submit(); // 提交表單
    }
  };

  // 處理AR場景內容渲染的函數
  const renderARContent = useCallback((scene) => {
    if (!scene) return null; // 如果場景不存在，則不執行任何操作

    // 建立一個平面幾何圖形和基本材質，並將其添加到場景中
    const geometry = new THREE.PlaneGeometry(1, 0.552);
    const material = new THREE.MeshBasicMaterial({ color: 0x0000ff, transparent: true, opacity: 0.5 });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // 為平面添加旋轉動畫
    const animate = () => {
      plane.rotation.y += 0.01;
      requestAnimationFrame(animate);
    };
    animate();

    return null; // 由於AR場景中已經處理了所有渲染邏輯，此處返回null
  }, []);

  // 當targetFound狀態改變時執行的副作用
  useEffect(() => {
    console.log('Current states - targetFound:', targetFound, 'showMessage:', showMessage);
  }, [targetFound, showMessage]);

  return (
    <Layout style={{ minHeight: '100vh', background: 'transparent' }}> {/* 設置全頁面佈局和背景透明 */}
      <Content style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}> {/* 置中內容 */}
        <ARComponent
          imageTargetSrc={imageTargetSrc} // 傳遞AR辨識圖像
          onTargetFound={handleTargetFound} // 當目標被找到時呼叫
          // onTargetLost={handleTargetLost} // 當目標遺失時呼叫
          renderARContent={renderARContent} // 傳遞AR場景渲染函數
          isEnabled={isAREnabled} // 傳遞AR是否啟用的狀態
        />
        <AnimatePresence> {/* 動畫切換的呈現 */}
          {targetFound && showMessage && ( /* 當目標找到且需要顯示訊息時，顯示動畫訊息 */
            <motion.div
              initial={{ opacity: 0, y: 50 }} // 初始狀態
              animate={{ opacity: 1, y: 0 }} // 動畫狀態
              exit={{ opacity: 0, y: -50 }} // 離場狀態
              style={{ width: '100%', maxWidth: '500px', textAlign: 'center', background: 'transparent', paddingTop: '2rem', zIndex: '10000' }} // 樣式設定
            >
              <div style={{
                background: 'rgba(0, 0, 0, 0.5)',
                padding: '16px',
                borderRadius: '8px',
                marginTop: '16px',
                marginBottom: '16px'
              }}>
                <Text style={{ color: 'white' }}>找到囉，記得找導覽人員拿相片哦</Text> {/* 顯示提示文字 */}
              </div>
              <Button type="primary" onClick={handleEndGame} size="large"
                style={{
                  backgroundColor: '#8b5a2b',
                  borderColor: '#8b5a2b',
                  color: 'white'
                }}>
                結束遊戲
              </Button> {/* 結束遊戲按鈕 */}
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {!targetFound && (
            <motion.div
              key="searching-message"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              style={{ marginTop: '2rem', textAlign: 'center' }}
            >
              <Spin tip="正在搜尋目標..." size="large">
                <div style={{ padding: '30px', background: 'rgba(0, 0, 0, 0.05)', borderRadius: '4px' }}>
                  <Text>請將相機對準目標圖片</Text>
                </div>
              </Spin>
            </motion.div>
          )}
        </AnimatePresence>
        <form ref={formRef} action="/" method="GET" style={{ display: 'none' }}> {/* 隱藏的表單 */}
          <input type="hidden" name="dialogIndex" value="68" />
        </form>
      </Content>
    </Layout>
  );
};

export default Game7;
