import React, { useState, useEffect, useReducer } from 'react';
import { Button } from 'antd';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import './Dialog.scss';
import bg1 from '../../assets/picture/BG/背景-活動中心.png';
import bg2 from '../../assets/picture/BG/背景-防空洞.png';
import bg3 from '../../assets/picture/BG/背景-草地.png';
import bg4 from '../../assets/picture/BG/背景-手水舍.png';
import bg5 from '../../assets/picture/BG/背景-神社外.png';
import bg1_v from '../../assets/picture/BG/背景-活動中心-直.png';
import bg2_v from '../../assets/picture/BG/背景-防空洞-直.png';
import bg4_v from '../../assets/picture/BG/背景-手水舍-直.png';
import bg5_v from '../../assets/picture/BG/背景-神社外-直.png';

const Dialog = ({
  visible,
  dialogData = [],
  currentIndex = 0,
  onPrevious,
  onNext,
  setCurrentDialogIndex,
}) => {
  const initialState = { countdown: 3, isButtonEnabled: false };
  const navigate = useNavigate();
  const location = useLocation();
  const [orientation, setOrientation] = useState('landscape');

  const preloadImages = () => {
    const images = [bg1, bg2, bg3, bg4, bg5, bg1_v, bg2_v, bg4_v, bg5_v];
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  };

  useEffect(() => {
    preloadImages();
  }, []);

  const getBackgroundImage = (index, orientation) => {
    if (index >= 19 && index <= 27) {
      return orientation === 'landscape' ? bg2 : bg2_v;
    } else if (index >= 27 && index <= 35) {
      return bg3;
    } else if (index >= 37 && index <= 40) {
      return orientation === 'landscape' ? bg4 : bg4_v;
    } else if (index > 40) {
      return orientation === 'landscape' ? bg5 : bg5_v;
    } else {
      return orientation === 'landscape' ? bg1 : bg1_v;
    }
  };

  const updateBackgroundClass = (index) => {
    document.body.style.backgroundImage = `url(${getBackgroundImage(index, orientation)})`;
    document.body.style.transition = 'background-image 0.5s ease'; // 加入背景過渡效果
  };

  useEffect(() => {
    updateBackgroundClass(currentIndex);
  }, [currentIndex, orientation]);

  useEffect(() => {
    const handleOrientationChange = () => {
      const newOrientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
      setOrientation(newOrientation);
    };

    handleOrientationChange(); // Set initial orientation
    window.addEventListener('resize', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, []);

  const handlePreviousDialog = () => {
    if (currentIndex > 0) {
      onPrevious();
    }
  };

  const handleNextDialog = () => {
    if (currentIndex < dialogData.length - 1) {
      onNext();
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const dialogIndex = queryParams.get('dialogIndex');
    if (dialogIndex !== null) {
      setCurrentDialogIndex(parseInt(dialogIndex, 10));
    }
  }, [location.search, setCurrentDialogIndex]);

  const reducer = (state, action) => {
    switch (action.type) {
      case 'START_COUNTDOWN':
        return { ...state, countdown: action.payload, isButtonEnabled: false };
      case 'TICK':
        return state.countdown > 1
          ? { ...state, countdown: state.countdown - 1 }
          : { countdown: 0, isButtonEnabled: true };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (currentIndex === 18 || currentIndex === 41) {
      dispatch({ type: 'START_COUNTDOWN', payload: 3 });
      const timer = setInterval(() => {
        dispatch({ type: 'TICK' });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentIndex]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const buttonConfigs = {
    4: { text: "尋找阿公の箱子", onClick: () => navigate('/Game1') },
    9: { text: "開始修相機", onClick: () => navigate('/Game2') },
    18: { text: state.isButtonEnabled ? "抵達防空洞" : `前往防空洞 (${formatTime(state.countdown)})`, onClick: () => onNext() },
    21: { text: "開始遊戲", onClick: () => navigate('/Game3') },
    36: { text: "開始遊戲", onClick: () => navigate('/Game4') },
    37: { text: "開始遊戲", onClick: () => navigate('/Game5') },
    41: { text: state.isButtonEnabled ? "抵達神社" : `前往神社 (${formatTime(state.countdown)})`, onClick: () => onNext() },
    47: { text: "開始遊戲", onClick: () => navigate('/Game6') },
    67: { text: "開始遊戲", onClick: () => navigate('/Game7') },
    94: {
      text: "完結撒花",
      onClick: () => {
        localStorage.clear(); // 清除所有 localStorage 數據
        navigate('/?reset=true'); // 重定向到主頁或其他適當的頁面
      }
    },
  };

  useEffect(() => {
    document.body.classList.add('dialog-body');

    return () => {
      document.body.classList.remove('dialog-body');
    };
  }, []);

  return (
    <>
      {visible && (
        <div className="custom-modal-overlay" onClick={(e) => e.stopPropagation()}></div>
      )}
      <div className="custom-modal">
        {dialogData[currentIndex]?.imageUrl && <img src={dialogData[currentIndex].imageUrl} className="custom-modal-image" alt="dialog" />}
        <span className="custom-modal-title">{dialogData[currentIndex]?.title}</span>
        <div className="custom-modal-content">{dialogData[currentIndex]?.content}</div>
        <Button
          className="custom-modal-button-prev"
          onClick={handlePreviousDialog}
          disabled={currentIndex === 0}
          icon={<CaretLeftOutlined className="my-custom-icon" />}
        />
        {!buttonConfigs[currentIndex] && (
          <Button
            className="custom-modal-button"
            onClick={handleNextDialog}
            icon={<CaretRightOutlined className="my-custom-icon" />}
          />
        )}
      </div>
      {buttonConfigs[currentIndex] && (
        <Button
          className={`assemble-button ${state.isButtonEnabled ? 'enabled' : 'disabled'}`} // 動態按鈕狀態
          onClick={buttonConfigs[currentIndex].onClick}
          disabled={(currentIndex === 18 || currentIndex === 41) && !state.isButtonEnabled}
        >
          {buttonConfigs[currentIndex].text}
        </Button>
      )}
    </>

  );
};

export default Dialog;
