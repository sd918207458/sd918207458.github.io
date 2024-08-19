import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js';

const MindARComponent = ({
  imageTargetSrc,
  onTargetFound,
  onTargetLost,
  renderARContent,
  isEnabled
}) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    if (!isEnabled || !containerRef.current) return;

    const mindarThree = new MindARThree({
      container: containerRef.current,
      imageTargetSrc: imageTargetSrc,
    });

    const { renderer, scene, camera } = mindarThree;
    sceneRef.current = scene;

    const anchor = mindarThree.addAnchor(0);
    anchor.onTargetFound = onTargetFound;
    anchor.onTargetLost = onTargetLost;

    const start = async () => {
      await mindarThree.start();
      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
      });
    };

    start();

    return () => {
      renderer.setAnimationLoop(null);
      mindarThree.stop();
    };
  }, [imageTargetSrc, onTargetFound, onTargetLost, isEnabled]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      {isEnabled && renderARContent && renderARContent(sceneRef.current)}
    </div>
  );
};

MindARComponent.propTypes = {
  imageTargetSrc: PropTypes.string.isRequired,
  onTargetFound: PropTypes.func,
  onTargetLost: PropTypes.func,
  renderARContent: PropTypes.func,
  isEnabled: PropTypes.bool.isRequired,
};
export default MindARComponent;