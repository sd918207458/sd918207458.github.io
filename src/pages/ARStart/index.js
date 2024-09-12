import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ARComponent from '../../components/arcomp/ARComponent';
import QrScanner from 'react-qr-scanner';
import imageTargetSrc from './targets.mind';

const ScanAndRedirect = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const timeoutRef = useRef(null);
    const [qrResult, setQrResult] = useState(null);

    const handleTargetFound = () => {
        // 延遲跳轉，給用戶一些視覺反饋時間
        timeoutRef.current = setTimeout(() => {
            navigate('/');
        }, 1000);
    };

    const handleTargetLost = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    const handleQRScan = (data) => {
        if (data) {
            setQrResult(data);
        }
    };

    useEffect(() => {
        if (qrResult) {
            // 假設 QR 碼內容是一個有效的 URL 或路由路徑
            navigate(qrResult);
        }
    }, [qrResult, navigate]);

    const handleError = (err) => {
        console.error(err);
        setError('掃描出錯，請重試。');
    };

    const renderARContent = (scene, THREE) => {
        // 在這裡添加您的 AR 內容（如果需要）
        const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
    };

    return (
        <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
            <ARComponent
                imageTargetSrc={imageTargetSrc}
                onTargetFound={handleTargetFound}
                onTargetLost={handleTargetLost}
                renderARContent={renderARContent}
                isEnabled={true}
            />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
                <QrScanner
                    delay={300}
                    onError={handleError}
                    onScan={handleQRScan}
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
            {error && (
                <p style={{ position: 'absolute', top: 10, left: 10, color: 'red', zIndex: 2 }}>
                    {error}
                </p>
            )}
        </div>
    );
};

export default ScanAndRedirect;