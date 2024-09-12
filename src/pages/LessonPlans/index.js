import React, { useState, useEffect } from 'react';
import ARComponent from '../../components/arcomp/ARComponent';
import imageTargetSrc from './Lesson.mind';
import { Button, message } from 'antd';

// 模擬掃描 MindAR 圖片後顯示按鈕的邏輯
const ScanAndShowButton = () => {
    const [showButton, setShowButton] = useState(false);

    // 當 AR 目標被識別到時觸發
    const handleTargetFound = () => {
        setShowButton(true);
        message.success('AR 目標已找到！');
    };

    // 在 AR 場景中渲染內容
    const renderARContent = (scene, THREE) => {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
    };

    // 當按鈕被點擊時處理
    const handleButtonClick = () => {
        console.log('AR Button clicked!');
        message.info('按鈕已點擊');
    };

    useEffect(() => {
        // 這裡你可以初始化 AR 系統，或者做一些掃描開始時的初始化操作
        console.log('AR系統已啟動');
    }, []);

    return (
        <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
            {/* ARComponent 負責處理掃描過程 */}
            <ARComponent
                imageTargetSrc={imageTargetSrc}
                onTargetFound={handleTargetFound}
                renderARContent={renderARContent}
                isEnabled={true} // 啟用 AR
            />

            {/* 如果檢測到 AR 目標，顯示按鈕 */}
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
                    onClick={handleButtonClick}
                >
                    AR Button
                </Button>
            )}
        </div>
    );
};

export default ScanAndShowButton;
