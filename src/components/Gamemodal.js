import React from 'react';
import { Button, Modal } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const ModalButton = ({ isVisible, showModal, handleModalCancel }) => {
    const navigate = useNavigate();

    const navigateToGame = (gameNumber, dialogIndex = null) => {
        if (dialogIndex !== null) {
            navigate(`/Game${gameNumber}`, { state: { dialogIndex } });
        } else {
            navigate(`/Game${gameNumber}`);
        }
        handleModalCancel();
    };

    return (
        <>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Button
                    type="primary"
                    onClick={showModal}
                    style={{ position: 'absolute', top: '0', left: '0', transform: 'translate(-50vw, -25vw)', zIndex: 1000 }}
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
                    <Button onClick={() => navigateToGame(1)}>Game 1</Button>
                    <Button onClick={() => navigate('/', { state: { dialogIndex: 5 } })}>Game 1 後</Button>
                    <Button onClick={() => navigateToGame(2)}>Game 2</Button>
                    <Button onClick={() => navigate('/', { state: { dialogIndex: 10 } })}>Game 2 後</Button>
                    <Button onClick={() => navigateToGame(3)}>Game 3</Button>
                    <Button onClick={() => navigate('/', { state: { dialogIndex: 22 } })}>Game 3 後</Button>
                    <Button onClick={() => navigateToGame(4)}>Game 4</Button>
                    <Button onClick={() => navigate('/', { state: { dialogIndex: 37 } })}>Game 4 後</Button>
                    <Button onClick={() => navigateToGame(5)}>Game 5</Button>
                    <Button onClick={() => navigate('/', { state: { dialogIndex: 38 } })}>Game 5 後</Button>
                    <Button onClick={() => navigateToGame(6)}>Game 6</Button>
                    <Button onClick={() => navigate('/', { state: { dialogIndex: 68 } })}>Game 6 後</Button>
                </div>
            </Modal>
        </>
    );
};

export default ModalButton;
