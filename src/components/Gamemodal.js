import React, { useCallback, useRef, useState } from 'react';
import { Button, Modal, Select, message } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import usePageState from './usePageState';

const { Option } = Select;

const ModalButton = ({ isVisible, showModal, handleModalCancel }) => {
    const navigate = useNavigate();
    const [pageState, setPageState] = usePageState({
        dialogVisible: false,
        currentDialogIndex: 0,
    });
    const formRef = useRef(null);
    const [selectedOption, setSelectedOption] = useState(null);

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

    const clearMemory = useCallback(() => {
        localStorage.clear();
        setPageState({
            dialogVisible: false,
            currentDialogIndex: 0,
            introVisible: false,
            imageVisible: false,
            isModalVisible: false
        });
        message.success('已清除當前紀錄');
        handleModalCancel();
        if (formRef.current) {
            formRef.current.submit();
        }
    }, [setPageState, handleModalCancel]);

    const handleConfirm = () => {
        if (selectedOption) {
            const [action, ...params] = selectedOption.split(':');
            if (action === 'game') {
                navigateToGame(params[0]);
            } else if (action === 'story') {
                navigateToStory(params[0]);
            }
        }
    };

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
                <Select
                    style={{ width: '100%', marginBottom: '1rem' }}
                    placeholder="請選擇關卡或操作"
                    onChange={(value) => setSelectedOption(value)}
                >
                    <Option value="game:1">第一章：爺爺的舊相機</Option>
                    <Option value="story:5">第一章故事-1</Option>
                    <Option value="game:2">第一章：爺爺的舊相機-2</Option>
                    <Option value="story:10">第一章故事-2</Option>
                    <Option value="game:3">第二章：消除空襲警報</Option>
                    <Option value="story:22">第二章故事</Option>
                    <Option value="game:4">第三章：聽聲辨位</Option>
                    <Option value="story:37">第三章故事</Option>
                    <Option value="game:5">第四章：AR辨識</Option>
                    <Option value="story:38">第四章故事</Option>
                    <Option value="game:6">第五章：尋找小小樹蛙</Option>
                    <Option value="story:48">第五章故事-1</Option>
                    <Option value="game:7">第五章：尋找郵差小小樹蛙神</Option>
                    <Option value="story:68">第五章故事-2</Option>
                </Select>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <Button 
                        onClick={clearMemory} 
                        style={{ width: '100%', backgroundColor: 'red', color: 'white' }}
                    >
                        清除紀錄
                    </Button>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <Button 
                            type="primary" 
                            onClick={handleConfirm} 
                            disabled={!selectedOption}
                            style={{ width: '48%' }}
                        >
                            確認
                        </Button>
                        <Button 
                            onClick={handleModalCancel}
                            style={{ width: '48%' }}
                        >
                            取消
                        </Button>
                    </div>
                </div>
            </Modal>
            <form ref={formRef} action="/" method="GET" style={{ display: 'none' }}>
                <input type="hidden" name="reset" value="true" />
            </form>
        </>
    );
};

export default ModalButton;