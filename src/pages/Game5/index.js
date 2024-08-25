import React, { useState, useRef, useCallback } from 'react';
import './Game5.scss';
import ARComponent from '../../components/arcomp/ARComponent';
import imageTargetSrc from './辨識圖-手水舍.mind';

const Game5 = () => {
  const [markerFound, setMarkerFound] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [isAREnabled, setIsAREnabled] = useState(true);
  const [hideBackground, setHideBackground] = useState(true);
  const formRef = useRef(null);

  const handleTargetFound = useCallback(() => setMarkerFound(true), []);

  const handleFoundButtonClick = useCallback(() => setButtonClicked(true), []);

  const handleEndGame = useCallback(() => {
    if (formRef.current) {
      formRef.current.submit();
    }
  }, []);

  const renderARContent = useCallback((scene, THREE) => {
    if (buttonClicked) {
      const texture = new THREE.CanvasTexture(createTextCanvas("記得找導覽人員拿相片喔"));
      const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
      const geometry = new THREE.PlaneGeometry(1, 0.3);
      const textMesh = new THREE.Mesh(geometry, material);
      textMesh.position.set(0, 0.5, 0);
      scene.add(textMesh);
    }
  }, [buttonClicked]);

  const createTextCanvas = useCallback((text) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 64;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '24px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    return canvas;
  }, []);

  return (
    <div className={`container5 ${hideBackground ? 'hide-background' : ''}`}>
      <ARComponent
        imageTargetSrc={imageTargetSrc}
        onTargetFound={handleTargetFound}
        renderARContent={renderARContent}
        isEnabled={isAREnabled}
      />
      <div className="buttonContainer">
        {markerFound && !buttonClicked && (
          <button className="foundButton5" onClick={handleFoundButtonClick}>
            找到了
          </button>
        )}
        {buttonClicked && (
          <div className="centered-button-container">
            <button className="endGameButton5" onClick={handleEndGame}>
              結束遊戲
            </button>
          </div>
        )}
      </div>
      <form ref={formRef} action="/" method="GET" style={{ display: 'none' }}>
        <input type="hidden" name="dialogIndex" value="38" />
      </form>
    </div>
  );
};

export default Game5;
