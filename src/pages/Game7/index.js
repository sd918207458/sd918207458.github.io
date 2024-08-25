import React, { useState, useRef, useCallback, useEffect } from 'react';
import './Game7.scss';
import { Button, Typography, Layout, message, Spin } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import ARComponent from '../../components/arcomp/ARComponent';
import imageTargetSrc from './辨識圖-郵差蛙蛙.mind'; 
import * as THREE from 'three';

const { Content } = Layout;
const { Text } = Typography;

const Game7 = () => {
  const [targetFound, setTargetFound] = useState(false); // 設定目標是否找到的狀態
  const [showMessage, setShowMessage] = useState(false); // 設定是否顯示訊息的狀態
  const formRef = useRef(null); // 使用useRef來儲存表單的參考

  // 當目標被找到時觸發的函數
  const handleTargetFound = useCallback(() => {
    setTargetFound(true); // 更新狀態為找到目標
    message.success('目標找到了！', 2); // 顯示成功訊息，持續2秒
    setTimeout(() => setShowMessage(true), 100); // 短暫延遲後顯示訊息
  }, []);

  // 當目標遺失時觸發的函數
  const handleTargetLost = useCallback(() => {
    setTargetFound(false); // 更新狀態為未找到目標
    setShowMessage(false); // 隱藏訊息
  }, []);

  // 處理遊戲結束的函數，提交表單
  const handleEndGame = useCallback(() => {
    if (formRef.current) {
      formRef.current.submit(); // 提交表單
    }
  }, []);

  // 渲染AR內容的函數
  const renderARContent = useCallback((scene) => {
    if (!scene) return; // 如果場景不存在，則退出

    // 建立一個平面幾何體和基本材質，並添加到場景中
    const geometry = new THREE.PlaneGeometry(1, 0.552);
    const material = new THREE.MeshBasicMaterial({ color: 0x0000ff, transparent: true, opacity: 0.5 });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // 為平面添加旋轉動畫
    const animate = () => {
      plane.rotation.y += 0.01; // 每次幀數更新時旋轉
      requestAnimationFrame(animate); // 使用requestAnimationFrame進行動畫更新
    };
    animate(); // 啟動動畫
  }, []);

  // 當`targetFound`或`showMessage`狀態改變時執行的副作用
  useEffect(() => {
    console.log('Current states - targetFound:', targetFound, 'showMessage:', showMessage);
  }, [targetFound, showMessage]);

  return (
    <Layout style={{ minHeight: '100vh', background: 'transparent' }}> {/* 設定頁面佈局，背景為透明 */}
      <Content style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}> {/* 內容置中 */}
        <ARComponent
          imageTargetSrc={imageTargetSrc} // 傳遞辨識圖像源
          onTargetFound={handleTargetFound} // 當目標被找到時的回調函數
          onTargetLost={handleTargetLost} // 當目標遺失時的回調函數
          renderARContent={renderARContent} // 傳遞用來渲染AR內容的函數
        />
        <AnimatePresence> {/* 使用AnimatePresence來處理組件進出場動畫 */}
          {targetFound && showMessage && ( /* 當找到目標並需要顯示訊息時 */
            <motion.div
              initial={{ opacity: 0, y: 50 }} // 動畫初始狀態
              animate={{ opacity: 1, y: 0 }} // 動畫進場狀態
              exit={{ opacity: 0, y: -50 }} // 動畫離場狀態
              style={{ width: '100%', maxWidth: '500px', textAlign: 'center', paddingTop: '2rem', zIndex: 10000 }}
            >
              <div style={{ background: 'rgba(0, 0, 0, 0.5)', padding: '16px', borderRadius: '8px', margin: '16px 0' }}>
                <Text style={{ color: 'white' }}>找到囉，記得找導覽人員拿相片哦</Text> {/* 顯示提示文字 */}
              </div>
              <Button type="primary" onClick={handleEndGame} size="large" style={{ backgroundColor: '#8b5a2b', borderColor: '#8b5a2b', color: 'white' }}>
                結束遊戲
              </Button> {/* 結束遊戲按鈕 */}
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {!targetFound && ( /* 當未找到目標時顯示 */
            <motion.div
              key="searching-message"
              initial={{ opacity: 0, y: 50 }} // 初始狀態
              animate={{ opacity: 1, y: 0 }} // 動畫進場
              exit={{ opacity: 0, y: -50 }} // 動畫離場
              transition={{ duration: 0.5 }} // 設定動畫持續時間
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
        <form ref={formRef} action="/" method="GET" style={{ display: 'none' }}> {/* 隱藏的表單，用於提交數據 */}
          <input type="hidden" name="dialogIndex" value="68" />
        </form>
      </Content>
    </Layout>
  );
};

export default Game7;
