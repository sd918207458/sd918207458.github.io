import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ARDetector from '../../components/ARDetector'; // 引用 ARDetector 組件
import './Game6.scss'; // 使用 CSS 模組
import patternPatt from './pattern.patt'; // 引用 pattern.patt 文件

const Game1 = () => {
    const [isLoaded, setIsLoaded] = useState(false); // 檢查 AR 是否已加載
    const [markerFound, setMarkerFound] = useState(false); // 標記是否被找到
    const [buttonClicked, setButtonClicked] = useState(false); // 找到了按鈕是否被點擊
    const navigate = useNavigate();
    const sceneRef = useRef(null); // 使用 useRef 創建 sceneRef

    useEffect(() => {
        document.documentElement.classList.add('hide-background');
        document.body.classList.add('hide-background');

        return () => {
            document.documentElement.classList.remove('hide-background');
            document.body.classList.remove('hide-background');
        };
    }, []);

    const handleFoundButtonClick = () => {
        setButtonClicked(true);
    };

    const handleEndGame = () => {
        navigate('/', { state: { dialogIndex: 68 } });
    };

    const handleMarkerFound = () => {
        setMarkerFound(true);
    };

    const handleNextPage = () => {
        // 定義跳轉到下一頁的邏輯
        console.log("Jumping to next page...");
    };

    return (
        <div className="container1">
            <ARDetector
                markerUrl={patternPatt}
                onMarkerFound={handleMarkerFound}
                onEndGame={handleEndGame}
                onNextPage={handleNextPage}
                models={[
                    { url: 'path/to/model1.gltf', type: 'gltf' },
                    { url: 'path/to/model2.obj', type: 'obj' },
                    { url: 'path/to/model3.fbx', type: 'fbx' }
                ]}
            />
            {markerFound && (
                <div className="buttonContainer">
                    {!buttonClicked ? (
                        <button className="foundButton" onClick={handleFoundButtonClick}>
                            找到了
                        </button>
                    ) : (
                        <>
                            <div className="info-text">記得找導覽人員拿相片喔</div>
                            <button className="endButton" onClick={handleEndGame}>
                                結束遊戲
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Game1;
