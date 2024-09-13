import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js';

const ARComponent = ({
  imageTargetSrc,
  onTargetFound,
  onTargetLost,
  renderARContent,
  isEnabled
}) => {
  const containerRef = useRef(null);
  const [mindarThree, setMindARThree] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // 增加 loading 狀態

  useEffect(() => {
    if (!isEnabled || !containerRef.current) return;

    const initializeAR = async () => {
      try {
        setLoading(true); // 開始初始化
        const mindARInstance = new MindARThree({
          container: containerRef.current,
          imageTargetSrc: imageTargetSrc,
          uiLoading: "yes",
          uiScanning: "no",
          uiError: "yes",
        });

        const { renderer, scene, camera } = mindARInstance;

        const anchor = mindARInstance.addAnchor(0);
        anchor.onTargetFound = () => {
          onTargetFound && onTargetFound();
        };
        anchor.onTargetLost = () => {
          onTargetLost && onTargetLost();
        };

        await mindARInstance.start();
        setLoading(false); // 完成初始化

        renderer.setAnimationLoop(() => {
          renderer.render(scene, camera);
        });

        setMindARThree(mindARInstance);

        if (renderARContent) {
          renderARContent(scene, THREE);
        }
      } catch (error) {
        console.error('Error initializing AR:', error);
        setError('AR 初始化失敗。請檢查您的設備是否支援 AR 或刷新頁面重試。');
        setLoading(false); // 初始化失敗，停止加載
      }
    };

    initializeAR();

    return () => {
      if (mindarThree) {
        mindarThree.renderer.setAnimationLoop(null);
        mindarThree.stop();
      }
    };
  }, [imageTargetSrc, onTargetFound, onTargetLost, isEnabled, renderARContent]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <>
      {loading && <div className="loading-message">AR 正在啟動...</div>}
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1
        }}
      />
    </>
  );
};

ARComponent.propTypes = {
  imageTargetSrc: PropTypes.string.isRequired,
  onTargetFound: PropTypes.func,
  onTargetLost: PropTypes.func,
  renderARContent: PropTypes.func,
  isEnabled: PropTypes.bool,
};

export default ARComponent;
