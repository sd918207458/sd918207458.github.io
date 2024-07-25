import React from 'react';
import ARComponent from './ARComponent';

/**
 * MarkerBasedAR - 基於標記的AR組件
 * 
 * 這個組件專為基於標記的AR體驗設計，使用`ARComponent`來實現AR標記檢測和3D模型的渲染。
 * 
 * @param {Object} props - 組件屬性
 * @param {string} props.markerUrl - AR標記圖案的URL
 * @param {Function} props.onMarkerFound - 找到標記時的回調函數
 * @param {Function} props.onEndExperience - 結束AR體驗的回調函數
 */
const MarkerBasedAR = ({ markerUrl, onMarkerFound, onEndExperience }) => {
    // 渲染AR內容函數，使用A-Frame的a-marker和a-entity來展示3D模型
    const renderARContent = () => (
        <a-marker preset="custom" type="pattern" url={markerUrl}>
            <a-entity
                position="0 0 0"
                scale="0.05 0.05 0.05"
                gltf-model="path/to/your/3d-model.gltf"
            ></a-entity>
        </a-marker>
    );

    // 返回ARComponent組件，傳遞必要的屬性
    return (
        <ARComponent
            markerUrl={markerUrl}
            onMarkerFound={onMarkerFound}
            onEndExperience={onEndExperience}
            renderARContent={renderARContent}
            arType="markerBased"
        />
    );
};

export default MarkerBasedAR;
