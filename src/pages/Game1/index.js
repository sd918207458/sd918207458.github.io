import React, { useState, useRef } from 'react';
import './Game1.scss';
import ARComponent from '../../components/arcomp/ARComponent';
import imageTargetSrc from './辨識圖_阿公的箱子.mind';

const Game1 = () => {
  const [markerFound, setMarkerFound] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [isAREnabled, setIsAREnabled] = useState(true);
  const formRef = useRef(null);

  const handleTargetFound = () => setMarkerFound(true);

  const handleFoundButtonClick = () => setButtonClicked(true);

  const handleEndGame = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  const renderARContent = (scene, THREE) => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({color: 0x00ff00, transparent: true, opacity: 0.5});
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
  };

  return (
    <div className="container1">
      <ARComponent
        imageTargetSrc={imageTargetSrc}
        onTargetFound={handleTargetFound}
        renderARContent={renderARContent}
        isEnabled={isAREnabled}
      />
      {markerFound && (
        <div className="buttonContainer">
          {!buttonClicked ? (
            <button className="foundButton" onClick={handleFoundButtonClick}>
              找到了
            </button>
          ) : (
            <div className="centered-content">
              <button className="endButton" onClick={handleEndGame}>
                結束遊戲
              </button>
            </div>
          )}
        </div>
      )}
      <form ref={formRef} action="/" method="GET" style={{ display: 'none' }}>
        <input type="hidden" name="dialogIndex" value="5" />
      </form>
    </div>
  );
};

export default Game1;