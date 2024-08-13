import React, { useCallback, useRef } from 'react';
import { Button, Modal } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import usePageState from './usePageState';

const ModalButton = ({ isVisible, showModal, handleModalCancel }) => {
    const navigate = useNavigate();
    const [pageState, setPageState] = usePageState({
        dialogVisible: false,
        currentDialogIndex: 0,
    });
    const formRef = useRef(null);

    const navigateToGame = useCallback((gameNumber, dialogIndex = null) => {
        setPageState(prevState => ({
            ...prevState,
            currentDialogIndex: dialogIndex || prevState.currentDialogIndex
        }));
        handleModalCancel();
        navigate(`/game${gameNumber}`);
    }, [setPageState, handleModalCancel, navigate]);

    const navigateToStory = useCallback((dialogIndex) => {
        setPageState(prevState => ({
            ...prevState,
            dialogVisible: true,
            currentDialogIndex: dialogIndex
        }));
        handleModalCancel();
        navigate('/?dialogIndex=' + dialogIndex);
    }, [setPageState, handleModalCancel, navigate]);

    const clearLocalStorage = useCallback(() => {
        localStorage.clear();
        setPageState({
            dialogVisible: false,
            currentDialogIndex: 0,
            introVisible: false,
            imageVisible: false,
            isModalVisible: false
        });
        alert('已清除當前紀錄');
        handleModalCancel();
        // 使用表單提交的方式重定向到初始登入頁面
        if (formRef.current) {
            formRef.current.submit();
        }
    }, [setPageState, handleModalCancel]);


    return (
        <>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Button
                    type="primary"
                    onClick={showModal}
                    style={{
                        position: 'fixed', top: '2rem', left: '2rem', zIndex: 1000,
                        backgroundColor: '#8b5a2b',
                        borderColor: '#8b5a2b',
                        color: 'white'
                    }}
                >
                    <EllipsisOutlined />
                </Button>
            </div>
            <Modal
                title="選擇關卡"
                open={isVisible}
                onCancel={handleModalCancel}
                footer={null}
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <Button onClick={() => navigateToGame(1)}>第一章：爺爺的舊相機</Button>
                    <Button onClick={() => navigateToStory(5)}>第一章故事-1 </Button>
                    <Button onClick={() => navigateToGame(2)}>第一章：爺爺的舊相機-2</Button>
                    <Button onClick={() => navigateToStory(10)}>第一章故事-2</Button>
                    <Button onClick={() => navigateToGame(3)}>第二章：消除空襲警報</Button>
                    <Button onClick={() => navigateToStory(22)}>第二章故事</Button>
                    <Button onClick={() => navigateToGame(4)}>第三章：聽聲辨位</Button>
                    <Button onClick={() => navigateToStory(37)}>第三章故事</Button>
                    <Button onClick={() => navigateToGame(5)}>第四章：AR辨識</Button>
                    <Button onClick={() => navigateToStory(38)}>第四章故事</Button>
                    <Button onClick={() => navigateToGame(6)}>第五章：尋找小小樹蛙</Button>
                    <Button onClick={() => navigateToStory(48)}>第五章故事-1</Button>
                    <Button onClick={() => navigateToGame(7)}>第五章：尋找郵差小小樹蛙神</Button>
                    <Button onClick={() => navigateToStory(68)}>第五章故事-2</Button>
                    <Button onClick={() => navigateToGame(8)}>test</Button>
                    <Button onClick={clearLocalStorage} style={{ backgroundColor: 'red', color: 'white' }}>清除紀錄</Button>
                </div>
            </Modal>
            <form ref={formRef} action="/" method="GET" style={{ display: 'none' }}>
                <input type="hidden" name="reset" value="true" />
            </form>
        </>
    );
};

export default ModalButton;
