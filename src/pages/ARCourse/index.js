import React, { useState } from 'react';
import ARComponent from '../../components/arcomp/ARComponent';
import imageTargetSrc from './targets.mind';
import { Button } from 'antd';

const ScanAndShowButton = () => {
    const [showButton, setShowButton] = useState(false);

    const handleTargetFound = () => {
        setShowButton(true);
    };


    const renderARContent = (scene, THREE) => {
        // 在這裡添加您的 AR 內容
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
    };

    return (
        <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
            <ARComponent
                imageTargetSrc={imageTargetSrc}
                onTargetFound={handleTargetFound}
                renderARContent={renderARContent}
                isEnabled={true}
            />
            {showButton && (
                <Button
                    type="primary"
                    style={{
                        position: 'absolute',
                        bottom: '20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 2
                    }}
                    onClick={() => console.log('Button clicked!')}
                >
                    AR Button
                </Button>
            )}
        </div>
    );
};

export default ScanAndShowButton;