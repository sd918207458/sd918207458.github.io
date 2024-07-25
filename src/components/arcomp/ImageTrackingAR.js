import React from 'react';
import ARComponent from './ARComponent';

/**
 * ImageTrackingAR - 基於圖像追蹤的AR組件
 * 
 * 這個組件專為基於圖像追蹤的AR體驗設計，使用`ARComponent`來實現圖像追蹤和3D模型的渲染。
 * 
 * @param {Object} props - 組件屬性
 * @param {string} props.imageUrl - AR圖像的URL
 * @param {Function} props.onMarkerFound - 找到標記時的回調函數
 * @param {Function} props.onEndExperience - 結束AR體驗的回調函數
 */
const ImageTrackingAR = ({ imageUrl, onMarkerFound, onEndExperience }) => {
    // 渲染AR內容函數，使用A-Frame的a-nft和a-entity來展示3D模型
    const renderARContent = () => (
        <a-nft
            type="nft"
            url={imageUrl}
            smooth="true"
            smoothCount="10"
            smoothTolerance=".01"
            smoothThreshold="5"
        >
            <a-entity
                gltf-model="path/to/your/3d-model.gltf"
                scale="5 5 5"
                position="50 150 0"
            />
        </a-nft>
    );

    // 返回ARComponent組件，傳遞必要的屬性
    return (
        <ARComponent
            markerUrl={imageUrl}
            onMarkerFound={onMarkerFound}
            onEndExperience={onEndExperience}
            renderARContent={renderARContent}
            arType="imageTracking"
        />
    );
};

export default ImageTrackingAR;
