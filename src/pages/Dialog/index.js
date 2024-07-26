import React, { useState, useEffect } from 'react';
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
  onNext,
  setCurrentDialogIndex,
}) => {
  const [countdown, setCountdown] = useState(3); // 3 seconds countdown
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { title, content, imageUrl } = dialogData[currentIndex] || {};

  const preloadImages = () => {
    const images = [bg1, bg2, bg3, bg4, bg5];
    images.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  };

  useEffect(() => {
    preloadImages();
  }, []);

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

  useEffect(() => {
    updateBackgroundClass(currentIndex);
  }, [currentIndex]);

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
    18: { text: isButtonEnabled ? "抵達防空洞" : `前往防空洞 (${formatTime(countdown)})`, onClick: () => onNext() },
    21: { text: "開始遊戲", onClick: () => navigate('/Game3') },
    36: { text: "開始遊戲", onClick: () => navigate('/Game4') },
    37: { text: "開始遊戲", onClick: () => navigate('/Game5') },
    41: { text: isButtonEnabled ? "抵達神社" : `前往神社 (${formatTime(countdown)})`, onClick: () => onNext() },
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
      {buttonConfigs[currentIndex] && (
        <Button
          className="assemble-button"
          onClick={buttonConfigs[currentIndex].onClick}
          disabled={(currentIndex === 18 || currentIndex === 41) && !isButtonEnabled}
        >
          {buttonConfigs[currentIndex].text}
        </Button>
      )}
    </>
  );
};

export default Dialog;
