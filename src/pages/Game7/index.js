import React, { useState, useRef } from 'react';
import './Game7.scss';
import { Button, Image, Typography, Layout } from 'antd';
import ARComponent from '../../components/arcomp/ARComponent';
import pattern from './pattern-郵差蛙蛙的辨識圖_0.patt';
import frogPng from '../../assets/picture/Frog/蛙蛙0-備用.png'

const { Content } = Layout;
const { Text } = Typography;
/**
 * Game6 - AR遊戲組件
 * 
 * 這個組件實現了一個基於標記的AR遊戲，使用多個標記來顯示不同的3D模型或其他實體。
 * 
 * @component
 * @example
 * return (
 *   <Game6 />
 * )
 */
const Game7 = () => {
  const [markerFound, setMarkerFound] = useState(false);
  const [isAREnabled, setIsAREnabled] = useState(true);  // AR 功能是否啟用
  const formRef = useRef(null);
  // 當找到標記時的處理函數
  const handleMarkerFound = () => setMarkerFound(true);

  // 當按下“結束遊戲”按鈕時的處理函數
  const handleEndGame = async () => {
    // 使用表單提交來實現頁面跳轉
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  // 渲染AR內容函數，使用多個a-marker元素來顯示不同的3D模型或其他實體
  const renderARContent = () => (
    <>
      <a-marker id="animated-marker-custom" type="pattern" url={pattern} emitevents="true">
        {/* 在此處添加3D模型或其他實體 */}
      </a-marker>
    </>
  );

  return (
    <Layout style={{ minHeight: '100vh', background: 'transparent' }}>
      <Content style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <ARComponent
          onMarkerFound={handleMarkerFound}
          renderARContent={renderARContent}
          arType="markerBased"
          isEnabled={isAREnabled}
          arConfig={{
            'aframe-ar': 'detectionMode: mono_and_matrix; matrixCodeType: 3x3; debugUIEnabled: true;',
            'minConfidence': '0.99'
          }}
        />
        {markerFound && (
          <div style={{ width: '100%', maxWidth: '500px', textAlign: 'center', background: 'transparent', paddingTop: '2rem' }}>
            <div style={{
              background: 'rgba(0, 0, 0, 0.5)',
              padding: '16px',
              borderRadius: '8px',
              marginTop: '16px',
              marginBottom: '16px'
            }}>
              <Text style={{ color: 'white' }}>找到囉，記得找導覽人員拿相片哦</Text>
            </div>
            <Button type="primary" onClick={handleEndGame} size="large"
              style={{
                backgroundColor: '#8b5a2b',
                borderColor: '#8b5a2b',
                color: 'white'
              }}>
              結束遊戲
            </Button>
          </div>
        )}
        <form ref={formRef} action="/" method="GET" style={{ display: 'none' }}>
          <input type="hidden" name="dialogIndex" value="68" />
        </form>
      </Content>
    </Layout>
  )
}
export default Game7;
