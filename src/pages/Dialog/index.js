import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'antd';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import './Dialog.scss';
import bg1 from '../../assets/picture/BG/背景-活動中心.png';
import bg2 from '../../assets/picture/BG/背景-防空洞.png';
import bg3 from '../../assets/picture/BG/背景-草地.png';
import bg4 from '../../assets/picture/BG/背景-手水舍.png';
import bg5 from '../../assets/picture/BG/背景-神社外.png';

const Dialog = ({
  visible,
  dialogData = [],
  currentIndex = 0,
  onPrevious,
  setCurrentDialogIndex,
  dialogs = [],
  savePageState,
}) => {
  const [countdown, setCountdown] = useState(3); // 3 seconds countdown
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { title, content, imageUrl } = dialogData[currentIndex] || {};

  // Preload all background images
  const preloadImages = () => {
    const images = [bg1, bg2, bg3, bg4, bg5];
    images.forEach(image => {
      const img = new Image();
      img.src = image;
    });
  };

  // Call preloadImages() once when component mounts
  useEffect(() => {
    preloadImages();
  }, []);

  // Function to update background based on index
  const updateBackgroundClass = (index) => {
    let newBackgroundImage = '';
    if (index >= 19 && index <= 27) {
      newBackgroundImage = `url(${bg2})`;
    } else if (index >= 27 && index <= 35) {
      newBackgroundImage = `url(${bg3})`;
    } else if (index >= 37 && index <= 40) {
      newBackgroundImage = `url(${bg4})`;
    } else if (index > 40) {
      newBackgroundImage = `url(${bg5})`;
    } else {
      newBackgroundImage = `url(${bg1})`;
    }
    document.body.style.backgroundImage = newBackgroundImage;
  };

  const handlePreviousDialog = () => {
    if (currentIndex > 0) {
      onPrevious();
    }
  };

  const handleNextDialog = () => {
    setCurrentDialogIndex((prevIndex) => {
      if (prevIndex < dialogs.length - 1) {
        const newIndex = prevIndex + 1;
        updateBackgroundClass(newIndex);
        savePageState();
        return newIndex;
      }
      return prevIndex;
    });
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const dialogIndex = queryParams.get('dialogIndex');
    if (dialogIndex !== null) {
      setCurrentDialogIndex(parseInt(dialogIndex, 10));
    }
  }, [location.search, setCurrentDialogIndex]);

  const startCountdown = () => {
    setIsButtonEnabled(false);
    setCountdown(3); // Reset countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setIsButtonEnabled(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  };

  useEffect(() => {
    if (currentIndex === 18 || currentIndex === 41) {
      startCountdown();
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
    18: { text: isButtonEnabled ? "抵達防空洞" : `前往防空洞 (${formatTime(countdown)})`, onClick: () => navigate('/', { state: { dialogIndex: 19 } }) },
    21: { text: "開始遊戲", onClick: () => navigate('/Game3') },
    36: { text: "開始遊戲", onClick: () => navigate('/Game4') },
    37: { text: "開始遊戲", onClick: () => navigate('/Game5') },
    41: { text: isButtonEnabled ? "抵達神社" : `前往神社 (${formatTime(countdown)})`, onClick: () => navigate('/', { state: { dialogIndex: 42 } }) },
    67: { text: "開始遊戲", onClick: () => navigate('/Game6') },
    94: {
      text: "完結撒花",
      onClick: () => {
        localStorage.clear(); // 清除所有 localStorage 数据
        navigate('#'); // 重定向到主页或其他适当的页面
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
        {imageUrl && <img src={imageUrl} className="custom-modal-image" alt="dialog" />}
        <span className="custom-modal-title">{title}</span>
        <div className="custom-modal-content">{content}</div>
        <Button
          className="custom-modal-button-prev"
          onClick={handlePreviousDialog}
          disabled={currentIndex === 0}
          icon={<CaretLeftOutlined className="my-custom-icon" />}
        />
        {!Object.keys(buttonConfigs).includes(String(currentIndex)) && (
          <Button
            className="custom-modal-button"
            onClick={handleNextDialog}
            icon={<CaretRightOutlined className="my-custom-icon" />}
          />
        )}
      </div>
      {
        buttonConfigs[currentIndex] && (
          <Button
            className="assemble-button"
            onClick={buttonConfigs[currentIndex].onClick}
            disabled={(currentIndex === 18 || currentIndex === 41) && !isButtonEnabled}
          >
            {buttonConfigs[currentIndex].text}
          </Button>
        )
      }
    </>
  );
};

export default Dialog;
