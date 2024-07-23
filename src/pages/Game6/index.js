import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

/**
 * ARDetector 組件
 * 
 * 這個組件使用AR.js和A-Frame來處理AR標記檢測和內容渲染。
 * 它支持多種操作模式,可以在檢測到標記時顯示各種類型的內容。
 * 
 * @param {Object} props - 組件屬性
 * @param {string} props.markerUrl - AR標記圖案的URL
 * @param {Function} [props.onMarkerFound] - 找到標記時的回調函數
 * @param {Function} [props.onEndGame] - 結束AR體驗的回調函數
 * @param {Function} [props.renderContent] - 渲染自定義內容的函數
 * @param {Object} [props.customEvent] - 自定義事件對象,包含名稱和處理函數
 * @param {Function} [props.onNavigate] - 自定義導航函數
 * @param {number} [props.countdownTime] - 自定義倒計時時間(秒)
 * @param {Array} props.models - 3D模型對象數組
 * @param {number} props.mode - 操作模式 (1: 倒計時, 2: 顯示內容, 3: 顯示模型, 4: 自定義事件)
 */
const ARDetector = ({
    markerUrl,
    onMarkerFound,
    onEndGame,
    renderContent,
    customEvent,
    onNavigate,
    countdownTime = 5,
    models,
    mode
}) => {
    // 狀態管理
    const [isLoaded, setIsLoaded] = useState(false);  // AR.js是否已加載
    const [markerFound, setMarkerFound] = useState(false);  // 是否找到標記
    const [countdown, setCountdown] = useState(null);  // 倒計時狀態
    const [showMessage, setShowMessage] = useState(false);  // 是否顯示消息
    const [showCustomContent, setShowCustomContent] = useState(false);  // 是否顯示自定義內容
    const [generatedModels, setGeneratedModels] = useState([]);  // 生成的3D模型

    // Refs
    const sceneRef = useRef(null);  // A-Frame場景的ref
    const timerRef = useRef(null);  // 倒計時計時器的ref

    /**
     * 生成隨機3D模型
     * 創建一個包含5個隨機位置模型的數組
     */
    const generateRandomModels = useCallback(() => {
        const newModels = models.map(model => ({
            ...model,
            position: {
                x: (Math.random() - 0.5) * 2,  // -1到1之間
                y: 0,  // 保持在地面上
                z: (Math.random() - 0.5) * 2   // -1到1之間
            }
        })).slice(0, 5);  // 只取前5個模型
        setGeneratedModels(newModels);
    }, [models]);

    /**
     * 處理標記檢測
     * 根據當前模式觸發適當的操作
     */
    const handleMarkerFound = useCallback(() => {
        if (!markerFound) {
            setMarkerFound(true);
            setShowMessage(true);
            if (onMarkerFound) onMarkerFound();

            switch (mode) {
                case 1: // 倒計時模式
                    setCountdown(countdownTime);
                    timerRef.current = setInterval(() => {
                        setCountdown(prevCount => {
                            if (prevCount <= 1) {
                                clearInterval(timerRef.current);
                                if (onNavigate) {
                                    setTimeout(() => {
                                        setShowMessage(false);
                                        onNavigate();
                                    }, 1000);  // 給用戶1秒時間看到"0"後再跳轉
                                }
                                return 0;
                            }
                            return prevCount - 1;
                        });
                    }, 1000);
                    break;
                case 2: // 顯示自定義內容模式
                    setShowCustomContent(true);
                    break;
                case 3: // 顯示3D模型模式
                    generateRandomModels();
                    break;
                case 4: // 自定義事件模式
                    if (customEvent && customEvent.handler) {
                        customEvent.handler();
                    }
                    break;
            }
        }
    }, [markerFound, onMarkerFound, onNavigate, countdownTime, mode, customEvent, generateRandomModels]);

    /**
     * 檢查AR.js是否已加載
     */
    useEffect(() => {
        let interval = setInterval(() => {
            if (window.AFRAME?.registerComponent) {
                setIsLoaded(true);
                clearInterval(interval);
            }
        }, 100);
        return () => clearInterval(interval);
    }, []);

    /**
     * 設置AR場景和事件監聽器
     */
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

    /**
     * 停止AR相機並清理資源
     */
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

    /**
     * 處理結束遊戲操作
     */
    const handleEndGame = useCallback(() => {
        stopARCamera(() => {
            if (onEndGame) onEndGame();
        });
    }, [onEndGame, stopARCamera]);

    if (!isLoaded) return <p>正在加載AR...</p>;

    /**
     * 根據給定的模型類型獲取適當的A-Frame組件
     */
    const getModelComponent = (modelType) => {
        switch (modelType) {
            case 'gltf': return 'gltf-model';
            case 'obj': return 'obj-model';
            case 'fbx': return 'fbx-model';
            default: return 'gltf-model';
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
                    {mode === 2 && showCustomContent && renderContent && renderContent()}
                    {mode === 3 && markerFound && generatedModels.map((model, index) => {
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
            {showMessage && mode === 1 && (
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
    onNavigate: PropTypes.func,
    countdownTime: PropTypes.number,
    models: PropTypes.arrayOf(PropTypes.shape({
        url: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['gltf', 'obj', 'fbx']).isRequired,
    })),
    mode: PropTypes.oneOf([1, 2, 3, 4]).isRequired
};

export default ARDetector;