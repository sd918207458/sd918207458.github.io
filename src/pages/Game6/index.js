// 介面會有一小小樹蛙神一隻在神社中心位置。

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Game6.scss';

const Game6 = () => {
    const [isLoaded, setIsLoaded] = useState(false); // AR.js 是否加載完成的狀態
    const [showEndGameButton, setShowEndGameButton] = useState(false); // 是否顯示遊戲結束按鈕
    const navigate = useNavigate(); // React Router 的導航函數

    // 檢查 AR.js 是否已經加載完成，如果完成則設置 isLoaded 為 true
    useEffect(() => {
        const interval = setInterval(() => {
            if (window.AFRAME?.registerComponent) {
                setIsLoaded(true);
                clearInterval(interval);
            }
        }, 100);

        return () => clearInterval(interval);
    }, []);

    // 初始化時隱藏背景
    useEffect(() => {
        document.body.classList.add('hide-background');
        return () => {
            document.body.classList.remove('hide-background');
        };
    }, []);

    // 監聽 AR 標記的顯示與隱藏事件
    useEffect(() => {
        if (!isLoaded) return;

        const marker = document.querySelector('a-marker');
        if (!marker) return;

        const handleMarkerFound = () => {
            setShowEndGameButton(true); // 當標記被找到時顯示結束按鈕
        };

        const handleMarkerLost = () => {
            setShowEndGameButton(false); // 當標記丟失時隱藏結束按鈕
        };

        marker.addEventListener('markerFound', handleMarkerFound);
        marker.addEventListener('markerLost', handleMarkerLost);

        return () => {
            marker.removeEventListener('markerFound', handleMarkerFound);
            marker.removeEventListener('markerLost', handleMarkerLost);
        };
    }, [isLoaded]);

    // 處理遊戲結束按鈕的點擊事件
    const handleEndGame = () => {
        stopARCamera(() => {
            document.body.classList.remove('hide-background');
            navigate('/', { state: { dialogIndex: 38 } }); // 導航到指定路由，可以傳遞狀態或參數
        });
    };

    // 停止 AR 相機並清理 AR 環境的函數
    const stopARCamera = (callback) => {
        const scene = document.querySelector('a-scene');
        if (!scene) {
            callback();
            return;
        }

        const arjsSystem = scene.systems['arjs'];
        if (arjsSystem && arjsSystem.source) {
            arjsSystem.source.stop(); // 停止 AR.js 的視頻流

            const cameraEntity = scene.querySelector('[camera]');
            if (cameraEntity) {
                cameraEntity.parentNode.removeChild(cameraEntity);
            }

            arjsSystem.dispose(); // 清理 AR.js 系統

            while (scene.firstChild) {
                scene.removeChild(scene.firstChild);
            }

            scene.parentNode.removeChild(scene); // 從 DOM 中移除場景元素

            setTimeout(callback, 100); // 等待一段時間後執行回調函數
        } else {
            callback();
        }
    };

    // 在組件卸載時確保清理 AR 環境
    useEffect(() => {
        return () => {
            stopARCamera(() => { });
        };
    }, []);

    return (
        <div className="container6">
            {isLoaded ? ( // 如果 AR.js 加載完成，渲染 AR 場景
                <a-scene embedded arjs="sourceType: webcam;">
                    <a-marker preset="hiro" emitevents="true"></a-marker>
                </a-scene>
            ) : (
                <p>Loading AR...</p> // 否則顯示加載中的文本
            )}
            {showEndGameButton && ( // 如果顯示結束遊戲按鈕狀態為 true，渲染結束遊戲按鈕
                <button className="endGameButton6" onClick={handleEndGame}>
                    結束遊戲
                </button>
            )}
        </div>
    );
};

export default Game6;
