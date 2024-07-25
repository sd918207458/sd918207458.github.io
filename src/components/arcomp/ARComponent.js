import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

/**
 * ARComponent - 整合式AR組件
 * 
 * 這個組件使用AR.js和A-Frame來處理AR標記檢測和內容渲染。根據`arType`屬性，
 * 可以處理不同類型的AR體驗（圖像追蹤、基於位置和標記檢測）。
 * 
 * @param {Object} props - 組件屬性
 * @param {string} props.markerUrl - AR標記圖案的URL（可選，僅標記檢測需要）
 * @param {Function} props.onMarkerFound - 找到標記時的回調函數
 * @param {Function} [props.onEndExperience] - 結束AR體驗的回調函數
 * @param {Function} props.renderARContent - 渲染AR內容的函數
 * @param {Object} [props.customEvent] - 自訂事件對象，包含名稱和處理函數
 * @param {string} props.arType - AR體驗類型，可選值為 'imageTracking', 'locationBased', 'markerBased'
 * @param {boolean} props.isEnabled - 是否用AR
 * */
const ARComponent = ({
    markerUrl,
    onMarkerFound,
    onEndExperience,
    renderARContent,
    customEvent,
    arType,
    isEnabled
}) => {
    const [isInitialized, setIsInitialized] = useState(false);
    const [markerFound, setMarkerFound] = useState(false);
    const sceneRef = useRef(null);

    useEffect(() => {
        // 隱藏背景
        document.documentElement.classList.add('hide-background');
        document.body.classList.add('hide-background');

        return () => {
            // 组件移除時顯示背景
            document.documentElement.classList.remove('hide-background');
            document.body.classList.remove('hide-background');
        };
    }, []);


    const initializeAR = useCallback(() => {
        // 在這裡初始化 AR 功能
        // 因為腳本已經在 index.html 中加載，我們只需要設置必要的元素
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (isEnabled && !isInitialized) {
            initializeAR();
        } else if (!isEnabled && isInitialized) {
            setIsInitialized(false);
            setMarkerFound(false);
        }

    }, [isEnabled, isInitialized, initializeAR]);

    // 處理標記檢測
    const handleMarkerFound = useCallback(() => {
        if (!markerFound) {
            setMarkerFound(true);
            if (onMarkerFound) onMarkerFound();
        }
    }, [markerFound, onMarkerFound]);

    // 設置AR場景和事件監聽器
    useEffect(() => {
        if (isInitialized) {
            const scene = sceneRef.current;
            if (!scene) return;

            const markers = scene.querySelectorAll('a-marker, a-nft, a-entity[gps-entity-place]');
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
            };
        }
    }, [isInitialized, handleMarkerFound, customEvent]);

    // 條件渲染 AR 場景
    const renderARScene = () => {
        // 根據arType設置不同的arjs屬性
        let arjsProps = {};
        if (arType === 'imageTracking') {
            arjsProps = { 'arjs': 'trackingMethod: best; sourceType: webcam; debugUIEnabled: false;' };
        } else if (arType === 'locationBased') {
            arjsProps = { 'arjs': 'sourceType: webcam; debugUIEnabled: false; sourceWidth: 1280; sourceHeight: 960; displayWidth: 1280; displayHeight: 960; debugUIEnabled: false;' };
        } else {
            arjsProps = { 'arjs': 'sourceType: webcam; debugUIEnabled: false;' };
        }
        return (
            <a-scene ref={sceneRef} embedded vr-mode-ui="enabled: false" {...arjsProps}>
                {renderARContent()}
                {arType !== 'locationBased' && <a-entity camera></a-entity>}
            </a-scene>
        );
    };

    return (
        <div className="ar-component">
            {isEnabled ? (
                isInitialized ? renderARScene() : <p>正在加載AR...</p>
            ) : (
                <p>AR 停用中</p>
            )}
        </div>
    );
};

ARComponent.propTypes = {
    markerUrl: PropTypes.string,
    onMarkerFound: PropTypes.func.isRequired,
    onEndExperience: PropTypes.func,
    renderARContent: PropTypes.func.isRequired,
    customEvent: PropTypes.shape({
        name: PropTypes.string.isRequired,
        handler: PropTypes.func.isRequired
    }),
    arType: PropTypes.oneOf(['imageTracking', 'locationBased', 'markerBased']).isRequired,
    isEnabled: PropTypes.bool.isRequired
};
export default ARComponent;
