import React from 'react';
import { Button, Modal } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const ModalButton = ({ isVisible, showModal, handleModalCancel }) => {
    const navigate = useNavigate();

    const navigateToGame = (gameNumber, dialogIndex = null) => {
        if (dialogIndex !== null) {
            navigate(`/game${gameNumber}`, { state: { dialogIndex } });
        } else {
            navigate(`/game${gameNumber}`);
        }
        handleModalCancel();
    };

    const clearLocalStorage = () => {
        localStorage.clear();
        alert('已清除當前紀錄');
    };

    return (
        <>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Button
                    type="primary"
                    onClick={showModal}
                    style={{ position: 'absolute', top: '0', left: '0', transform: 'translate(-45vw, -20vw)', zIndex: 1000 }}
                >
                    <EllipsisOutlined />
                </Button>
            </div>
            <Modal
                title="選擇關卡"
                visible={isVisible}
                onCancel={handleModalCancel}
                footer={null}
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <Button onClick={() => navigateToGame(1)}>第一章：爺爺的舊相機</Button>
                    <Button onClick={() => navigate('/', { state: { dialogIndex: 5 } })}>第一章故事-1 </Button>
                    <Button onClick={() => navigateToGame(2)}>第一章：爺爺的舊相機-2</Button>
                    <Button onClick={() => navigate('/', { state: { dialogIndex: 10 } })}>第一章故事-2</Button>
                    <Button onClick={() => navigateToGame(3)}>第二章：消除空襲警報</Button>
                    <Button onClick={() => navigate('/', { state: { dialogIndex: 22 } })}>第二章故事</Button>
                    <Button onClick={() => navigateToGame(4)}>第三章：聽聲辨位</Button>
                    <Button onClick={() => navigate('/', { state: { dialogIndex: 37 } })}>第三章故事</Button>
                    <Button onClick={() => navigateToGame(5)}>第四章：AR辨識</Button>
                    <Button onClick={() => navigate('/', { state: { dialogIndex: 38 } })}>第四章故事</Button>
                    <Button onClick={() => navigateToGame(6)}>第五章：尋找小小樹蛙</Button>
                    <Button onClick={() => navigate('/', { state: { dialogIndex: 68 } })}>第五章故事</Button>
                    <Button onClick={clearLocalStorage} style={{ backgroundColor: 'red', color: 'white' }}>清除紀錄</Button>
                </div>
            </Modal>
        </>
    );
};

export default ModalButton;
