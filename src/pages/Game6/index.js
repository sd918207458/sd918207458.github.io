import React, { useState, useRef } from 'react';
import './Game6.scss';
import { Button, Image, Layout } from 'antd';
import ARComponent from '../../components/arcomp/ARComponent';
import imageTargetSrc from './辨識圖-神社.mind';
import frogPng from '../../assets/picture/Frog/蛙蛙0-備用.png'

const { Content } = Layout;

const Game6 = () => {
  const [markerFound, setMarkerFound] = useState(false);
  const [isAREnabled, setIsAREnabled] = useState(true);
  const formRef = useRef(null);

  const handleTargetFound = () => setMarkerFound(true);

  const handleEndGame = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  const renderARContent = (scene, THREE) => {
    // You can add 3D content here if needed
    // For example:
    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    // const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);
  };

  return (
    <Layout style={{ minHeight: '100vh', background: 'transparent' }}>
      <Content style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <ARComponent
          imageTargetSrc={imageTargetSrc}
          onTargetFound={handleTargetFound}
          renderARContent={renderARContent}
          isEnabled={isAREnabled}
        />
        {markerFound && (
          <div style={{  textAlign: 'center', background: 'transparent', paddingTop: '2rem', zIndex: '1000' }}>
            <Image
              src={frogPng}
              alt="Found Image"
              style={{ maxHeight: '70vh', width: 'auto', objectFit: 'contain', background: 'transparent' }}
            />
            <Button type="primary" onClick={handleEndGame} size="large"
              style={{
                backgroundColor: '#8b5a2b',
                borderColor: '#8b5a2b',
                color: 'white',
                marginTop: '0.5rem'
              }}>
              結束遊戲
            </Button>
          </div>
        )}
        <form ref={formRef} action="/" method="GET" style={{ display: 'none' }}>
          <input type="hidden" name="dialogIndex" value="48" />
        </form>
      </Content>
    </Layout>
  )
}

export default Game6;