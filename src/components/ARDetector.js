import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

const ARDetector = ({
    markerUrl,
    onMarkerFound,
    onEndGame,
    renderContent,
    customEvent,
    onNextPage,
    models // 新增：3D模型的陣列
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [markerFound, setMarkerFound] = useState(false);
    const [countdown, setCountdown] = useState(null);
    const [showMessage, setShowMessage] = useState(false);
    const [generatedModels, setGeneratedModels] = useState([]); // 新增：已生成的模型
    const sceneRef = useRef(null);
    const timerRef = useRef(null);

    // 新增：生成隨機模型的函數
    const generateRandomModels = useCallback(() => {
        const newModels = [];
        for (let i = 0; i < 5; i++) { // 生成5個模型
            const randomModel = models[Math.floor(Math.random() * models.length)];
            const position = {
                x: (Math.random() - 0.5) * 2, // -1 到 1 之間
                y: 0, // 保持在地面上
                z: (Math.random() - 0.5) * 2 // -1 到 1 之間
            };
            newModels.push({ ...randomModel, position });
        }
        setGeneratedModels(newModels);
    }, [models]);

    const handleMarkerFound = useCallback(() => {
        setMarkerFound(true);
        setShowMessage(true);
        if (onMarkerFound) onMarkerFound();

        // 生成隨機模型
        generateRandomModels();

        // 開始倒數
        setCountdown(5);

        timerRef.current = setInterval(() => {
            setCountdown((prevCount) => {
                if (prevCount <= 1) {
                    clearInterval(timerRef.current);
                    // 倒數結束後跳轉到下一頁
                    if (onNextPage) {
                        setTimeout(() => {
                            setShowMessage(false);
                            onNextPage();
                        }, 1000); // 给用户一秒时间看到 "0" 后再跳转
                    }
                    return 0;
                }
                return prevCount - 1;
            });
        }, 1000);
    }, [onMarkerFound, onNextPage, generateRandomModels]);



    useEffect(() => {
        let interval;
        const checkLoadStatus = () => {
            interval = setInterval(() => {
                if (window.AFRAME?.registerComponent) {
                    setIsLoaded(true);
                    clearInterval(interval);
                }
            }, 100);
        };
        checkLoadStatus();
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            const scene = sceneRef.current;
            if (!scene) return;

            document.body.style.backgroundImage = 'none';

            const markers = scene.querySelectorAll('a-marker');
            markers.forEach(marker => {
                marker.addEventListener('markerFound', handleMarkerFound);
                if (customEvent) {
                    marker.addEventListener(customEvent.name, customEvent.handler);
                }
            });

            return () => {
                markers.forEach(marker => {
                    marker.removeEventListener('markerFound', handleMarkerFound);
                    if (customEvent) {
                        marker.removeEventListener(customEvent.name, customEvent.handler);
                    }
                });
                document.body.style.backgroundImage = '';
                if (timerRef.current) {
                    clearInterval(timerRef.current);
                }
            };
        }
    }, [isLoaded, handleMarkerFound, customEvent]);

    const stopARCamera = useCallback((callback) => {
        const scene = sceneRef.current;
        if (scene) {
            if (window.AFRAME && window.AFRAME.scenes.length) {
                const arSystem = scene.systems['arjs'];
                if (arSystem && arSystem.arSource) {
                    arSystem.arSource.stopVideo();
                }
                scene.removeAttribute('arjs');
            }

            const video = document.querySelector('video');
            if (video && video.srcObject) {
                const stream = video.srcObject;
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
                video.srcObject = null;
            }

            const canvas = document.querySelector('.a-canvas');
            if (canvas) {
                canvas.remove();
            }

            while (scene.firstChild) {
                scene.removeChild(scene.firstChild);
            }

            if (scene.parentNode) {
                scene.parentNode.removeChild(scene);
            }

            if (window.AFRAME) {
                window.AFRAME.scenes = [];
            }
        }
        setTimeout(callback, 100);
    }, []);

    const handleEndGame = useCallback(() => {
        stopARCamera(() => {
            if (onEndGame) onEndGame();
        });
    }, [onEndGame, stopARCamera]);

    if (!isLoaded) return <p>Loading AR...</p>;

    const getModelComponent = (modelType) => {
        switch (modelType) {
            case 'gltf': return 'gltf-model';
            case 'obj': return 'obj-model';
            case 'fbx': return 'fbx-model';
            default: return 'gltf-model'; // 默认使用 gltf
        }
    };

    return (
        <div className="ar-detector">
            <a-scene ref={sceneRef} embedded arjs="sourceType: webcam;" vr-mode-ui="enabled: false">
                <a-marker
                    id="animated-marker"
                    type="pattern"
                    preset="custom"
                    url={markerUrl}
                    emitevents="true"
                >
                    {renderContent && renderContent()}
                    {generatedModels.map((model, index) => {
                        const modelComponent = getModelComponent(model.type);
                        return (
                            <a-entity
                                key={index}
                                {...{ [modelComponent]: model.url }}
                                position={`${model.position.x} ${model.position.y} ${model.position.z}`}
                                scale="0.1 0.1 0.1"
                                {...{ [`${modelComponent}-error`]: '' }}
                            ></a-entity>
                        );
                    })}
                </a-marker>
                <a-entity camera></a-entity>
            </a-scene>
            {showMessage && (
                <div className="message-container" style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    padding: '20px',
                    borderRadius: '10px',
                    textAlign: 'center'
                }}>
                    <p className="found-message" style={{ fontSize: '24px', marginBottom: '10px' }}>找到了！</p>
                    {countdown !== null && (
                        <p className="countdown" style={{ fontSize: '36px' }}>{countdown}</p>
                    )}
                </div>
            )}
            {markerFound && onEndGame && (
                <div className="button-container" style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)'
                }}>
                    <button className="end-button" onClick={handleEndGame} style={{
                        padding: '10px 20px',
                        fontSize: '18px',
                        background: 'red',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}>
                        結束遊戲
                    </button>
                </div>
            )}
        </div>
    );
};

ARDetector.propTypes = {
    markerUrl: PropTypes.string.isRequired,
    onMarkerFound: PropTypes.func,
    onEndGame: PropTypes.func,
    renderContent: PropTypes.func,
    customEvent: PropTypes.shape({
        name: PropTypes.string.isRequired,
        handler: PropTypes.func.isRequired
    }),
    onNextPage: PropTypes.func,
    models: PropTypes.arrayOf(PropTypes.shape({
        url: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['gltf', 'obj', 'fbx']).isRequired,
    })).isRequired
};

export default ARDetector;