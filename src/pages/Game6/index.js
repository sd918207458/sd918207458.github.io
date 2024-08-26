import React, { useState, useCallback, useRef } from 'react';
import './Game6.scss';
import { Button, Image, Layout } from 'antd';
import ARComponent from '../../components/arcomp/ARComponent';
import imageTargetSrc from './辨識圖-神社.mind'; // 引入AR辨識圖檔
import frogPng from '../../assets/picture/Frog/蛙蛙0-備用.png'; // 引入圖片資源
import QRCodeGenerator from '../../components/QRCodeGenerator';

const { Content } = Layout; // 從Ant Design解構出Content組件

const Game6 = () => {
  const [markerFound, setMarkerFound] = useState(false); // 使用useState來追蹤是否找到標記
  const formRef = useRef(null); // 使用useRef來取得表單的參考

  // 當目標被找到時觸發的處理函數，使用useCallback來避免不必要的重渲染
  const handleTargetFound = useCallback(() => setMarkerFound(true), []);

  // 當遊戲結束時觸發的處理函數，提交表單，使用useCallback來避免不必要的重渲染
  const handleEndGame = useCallback(() => {
    if (formRef.current) {
      formRef.current.submit(); // 提交表單
    }
  }, []);

  // 渲染AR內容的函數，這裡可以添加3D模型或其他AR內容，使用useCallback來避免不必要的重渲染
  const renderARContent = useCallback((scene, THREE) => {
    // 你可以在這裡添加3D內容，例如：
    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    // const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);
  }, []);

  return (
    <Layout style={{ minHeight: '100vh', background: 'transparent' }}> {/* 設定頁面佈局和背景 */}
      <Content style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}> {/* 內容置中佈局 */}
        <ARComponent
          imageTargetSrc={imageTargetSrc} // 傳遞AR辨識圖檔路徑
          onTargetFound={handleTargetFound} // 當目標被找到時觸發
          renderARContent={renderARContent} // 傳遞渲染AR內容的函數
        />
        {markerFound && ( // 如果標記被找到，顯示以下內容
          <div style={{ textAlign: 'center', paddingTop: '2rem' }}> {/* 設定圖片和按鈕的容器 */}
            <Image
              src={frogPng} // 傳遞圖片路徑
              alt="Found Image" // 設定圖片的替代文字
              style={{ maxHeight: '70vh', width: 'auto', objectFit: 'contain' }} // 設定圖片樣式
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
        )}
        <form ref={formRef} action="/" method="GET" style={{ display: 'none' }}> {/* 隱藏的表單 */}
          <input type="hidden" name="dialogIndex" value="48" /> {/* 傳遞表單數據 */}
        </form>
      </Content>
    </Layout>
  );
};

export default Game6;
