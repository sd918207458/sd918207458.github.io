import React from 'react';
import ARDetector from '../../components/ARDetector.js';

const CustomEvent = () => {
  const handleCustomEvent = (event) => {
    console.log('Custom event triggered!', event);
    // 在這裡執行您的自定義邏輯
  };

  return (
    <ARDetector
      markerUrl="/path/to/your/marker.patt"
      customEvent={{
        name: 'customEventName',
        handler: handleCustomEvent
      }}
    />
  );
};

export default CustomEvent;