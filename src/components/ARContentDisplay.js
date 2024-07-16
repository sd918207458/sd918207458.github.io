import React from 'react';
import ARDetector from '../../components/ARDetector.js';

const ARContentDisplay = () => {
  const renderARContent = () => (
    <a-entity
      gltf-model="/path/to/your/3d-model.gltf"
      scale="0.1 0.1 0.1"
      position="0 0 0"
    ></a-entity>
  );

  return (
    <ARDetector
      markerUrl="/path/to/your/marker.patt"
      renderContent={renderARContent}
    />
  );
};

export default ARContentDisplay;