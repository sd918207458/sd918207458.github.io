import React from 'react';
import { useNavigate } from 'react-router-dom';
import ARDetector from '../../components/ARDetector.js';

const DetectAndDo = () => {
  const navigate = useNavigate();

  const handleMarkerFound = () => {
    navigate('/next-page');
  };

  return (
    <ARDetector
      markerUrl="/path/to/your/marker.patt"
      onMarkerFound={handleMarkerFound}
    />
  );
};

export default DetectAndDo;