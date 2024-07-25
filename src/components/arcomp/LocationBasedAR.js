import React from 'react';
import ARComponent from './ARComponent';

/**
 * LocationBasedAR - 基於位置的AR組件
 * 
 * 這個組件專為基於GPS位置的AR體驗設計，使用`ARComponent`來實現基於地理位置的內容渲染。
 * 
 * @param {Object} props - 組件屬性
 * @param {number} props.latitude - GPS緯度
 * @param {number} props.longitude - GPS經度
 * @param {Function} props.onMarkerFound - 找到標記時的回調函數
 * @param {Function} props.onEndExperience - 結束AR體驗的回調函數
 */
const LocationBasedAR = ({ latitude, longitude, onMarkerFound, onEndExperience }) => {
    // 渲染AR內容函數，使用A-Frame的a-text來展示文字，並根據GPS位置定位
    const renderARContent = () => (
        <>
            <a-text
                value="此內容將出現在指定的GPS座標！"
                look-at="[gps-camera]"
                scale="120 120 120"
                gps-entity-place={`latitude: ${latitude}; longitude: ${longitude};`}
            ></a-text>
            <a-camera gps-camera rotation-reader></a-camera>
        </>
    );

    // 返回ARComponent組件，傳遞必要的屬性
    return (
        <ARComponent
            onMarkerFound={onMarkerFound}
            onEndExperience={onEndExperience}
            renderARContent={renderARContent}
            arType="locationBased"
        />
    );
};

export default LocationBasedAR;
