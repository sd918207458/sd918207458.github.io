import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * LocationBasedAR 組件
 * 
 * 這個組件使用地理位置在指定範圍內生成 AR 內容。
 * 
 * @param {Object} props - 組件屬性
 * @param {Object} props.boundingBox - 內容生成的地理範圍 {minLat, maxLat, minLng, maxLng}
 * @param {Array} props.content - 可能的 AR 內容數組 [{type: 'model' | 'image', url: string, scale: number}]
 * @param {number} props.minCount - 最少生成的內容數量
 * @param {number} props.maxCount - 最多生成的內容數量
 * @param {Function} props.onContentFound - 當用戶接近內容時的回調函數
 */
const LocationBasedAR = ({ boundingBox, content, minCount, maxCount, onContentFound }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [userLocation, setUserLocation] = useState(null);
    const [generatedContent, setGeneratedContent] = useState([]);
    const sceneRef = useRef(null);

    // 檢查 AR.js 和 A-Frame 是否已加載
    useEffect(() => {
        const checkLoadStatus = () => {
            const interval = setInterval(() => {
                if (window.AFRAME && window.AFRAME.registerComponent) {
                    setIsLoaded(true);
                    clearInterval(interval);
                }
            }, 100);
        };

        checkLoadStatus();
    }, []);

    // 獲取用戶位置
    useEffect(() => {
        if ("geolocation" in navigator) {
            const watchId = navigator.geolocation.watchPosition(
                (position) => {
                    setUserLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                (error) => console.error("Error getting location:", error),
                { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
            );

            return () => navigator.geolocation.clearWatch(watchId);
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, []);

    // 生成隨機內容
    useEffect(() => {
        if (isLoaded && userLocation) {
            const count = Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;
            const newContent = [];

            for (let i = 0; i < count; i++) {
                const randomContent = content[Math.floor(Math.random() * content.length)];
                const randomLat = Math.random() * (boundingBox.maxLat - boundingBox.minLat) + boundingBox.minLat;
                const randomLng = Math.random() * (boundingBox.maxLng - boundingBox.minLng) + boundingBox.minLng;

                newContent.push({
                    ...randomContent,
                    latitude: randomLat,
                    longitude: randomLng
                });
            }

            setGeneratedContent(newContent);
        }
    }, [isLoaded, userLocation, boundingBox, content, minCount, maxCount]);

    // 註冊自定義 A-Frame 組件來處理接近事件
    useEffect(() => {
        if (isLoaded) {
            AFRAME.registerComponent('content-handler', {
                schema: {
                    id: { type: 'string' }
                },

                init: function () {
                    this.el.addEventListener('gps-entity-place-update-positon', (event) => {
                        if (event.detail.distance < 10) { // 假設 10 米為觸發距離
                            onContentFound(this.data.id);
                        }
                    });
                }
            });
        }
    }, [isLoaded, onContentFound]);

    if (!isLoaded || !userLocation) {
        return <div>載入中...</div>;
    }

    return (
        <a-scene
            ref={sceneRef}
            vr-mode-ui="enabled: false"
            arjs="sourceType: webcam; debugUIEnabled: false;"
            renderer="logarithmicDepthBuffer: true;"
            embedded
        >
            <a-camera gps-camera rotation-reader></a-camera>

            {generatedContent.map((item, index) => (
                <a-entity
                    key={index}
                    content-handler={`id: content-${index}`}
                    gps-entity-place={`latitude: ${item.latitude}; longitude: ${item.longitude};`}
                    look-at="[gps-camera]"
                >
                    {item.type === 'model' ? (
                        <a-entity
                            gltf-model={item.url}
                            scale={`${item.scale} ${item.scale} ${item.scale}`}
                        ></a-entity>
                    ) : (
                        <a-image
                            src={item.url}
                            scale={`${item.scale} ${item.scale} 1`}
                        ></a-image>
                    )}
                </a-entity>
            ))}
        </a-scene>
    );
};

LocationBasedAR.propTypes = {
    boundingBox: PropTypes.shape({
        minLat: PropTypes.number.isRequired,
        maxLat: PropTypes.number.isRequired,
        minLng: PropTypes.number.isRequired,
        maxLng: PropTypes.number.isRequired
    }).isRequired,
    content: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.oneOf(['model', 'image']).isRequired,
            url: PropTypes.string.isRequired,
            scale: PropTypes.number.isRequired
        })
    ).isRequired,
    minCount: PropTypes.number.isRequired,
    maxCount: PropTypes.number.isRequired,
    onContentFound: PropTypes.func.isRequired
};

export default LocationBasedAR;