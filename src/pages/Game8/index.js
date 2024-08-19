import React, { useState, useRef, useCallback } from 'react';
import './Game8.scss';
import { Button, Typography, Layout } from 'antd';
import MindARComponent from '../../components/arcomp/MindARComponent';
import imageTargetSrc from './郵差蛙蛙的辨識圖.mind'; // You need to create this file using MindAR's image compiler
import * as THREE from 'three';

const { Content } = Layout;
const { Text } = Typography;

const Game8 = () => {
    const [targetFound, setTargetFound] = useState(false);
    const [isAREnabled, setIsAREnabled] = useState(true);
    const formRef = useRef(null);

    const handleTargetFound = useCallback(() => setTargetFound(true), []);
    const handleTargetLost = useCallback(() => setTargetFound(false), []);

    const handleEndGame = async () => {
        if (formRef.current) {
            formRef.current.submit();
        }
    };

    const renderARContent = useCallback((scene) => {
        if (!scene) return null;

        const geometry = new THREE.PlaneGeometry(1, 0.552);
        const material = new THREE.MeshBasicMaterial({ color: 0x0000ff, transparent: true, opacity: 0.5 });
        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);

        return null;
    }, []);


    return (
        <Layout style={{ minHeight: '100vh', background: 'transparent' }}>
            <Content style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <MindARComponent
                    imageTargetSrc={imageTargetSrc}
                    onTargetFound={handleTargetFound}
                    onTargetLost={handleTargetLost}
                    renderARContent={renderARContent}
                    isEnabled={isAREnabled}
                />
                {targetFound && (
                    <div style={{ width: '100%', maxWidth: '500px', textAlign: 'center', background: 'transparent', paddingTop: '2rem' }}>
                        <div style={{
                            background: 'rgba(0, 0, 0, 0.5)',
                            padding: '16px',
                            borderRadius: '8px',
                            marginTop: '16px',
                            marginBottom: '16px'
                        }}>
                            <Text style={{ color: 'white' }}>找到囉，記得找導覽人員拿相片哦</Text>
                        </div>
                        <Button type="primary" onClick={handleEndGame} size="large"
                            style={{
                                backgroundColor: '#8b5a2b',
                                borderColor: '#8b5a2b',
                                color: 'white'
                            }}>
                            結束遊戲
                        </Button>
                    </div>
                )}
                <form ref={formRef} action="/" method="GET" style={{ display: 'none' }}>
                    <input type="hidden" name="dialogIndex" value="68" />
                </form>
            </Content>
        </Layout>
    );
};

export default Game8;