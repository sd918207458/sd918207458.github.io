import React, { useState, useCallback, useEffect, memo } from "react";
import "./LessonPlans.scss";
import { message } from "antd";
import ARComponent from "../../components/arcomp/ARComponent";
import imageTargetSrc from "./LessonPlans.mind";
import ImageTargetSrc02 from "./LinkTojourney.mind";
import QrScanner from "react-qr-scanner";

const WrappedQrScanner = memo(({ onScan, onError, style, ...props }) => {
  return (
    <QrScanner
      onScan={onScan}
      onError={onError}
      style={{
        ...style,
        width: "100%",
        maxWidth: "100vw",
        height: "auto",
        aspectRatio: "16 / 9",
      }}
      constraints={{ audio: false, video: { facingMode: "environment" } }}
      {...props}
    />
  );
});

WrappedQrScanner.displayName = "WrappedQrScanner";

const LessonPlans = () => {
  const [markerFound, setMarkerFound] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [isAREnabled, setIsAREnabled] = useState(true);
  const [hasScanned, setHasScanned] = useState(false);

  const handleTargetFound = useCallback(() => {
    setMarkerFound(true);
    if (!hasScanned) {
      message.success("AR 目標找到了！", 2);
      setHasScanned(true);
    }
  }, [hasScanned]);

  const handleFoundButtonClick = useCallback(() => {
    setButtonClicked(true);
    message.success("遊戲目標已確認！", 2);
  }, []);

  const handleQRScan = useCallback(
    (data) => {
      console.log("Scanned data:", data); // 調試輸出
      if (data) {
        if (data.includes("sanmingmemoryjourney")) {
          setMarkerFound(true);
          if (!hasScanned) {
            message.success("QR 碼掃描成功！", 2);
            setHasScanned(true);
          }
        }
        if (data.includes(ImageTargetSrc02)) {
          if (window.confirm("你確定要跳轉到記憶之旅網站嗎？")) {
            window.location.href = "https://sanmingmemoryjourney.com";
          }
        }
      }
    },
    [hasScanned]
  );

  const handleEndGame = useCallback(() => {
    if (window.confirm("你確定要離開遊戲嗎？")) {
      try {
        window.close(); // 嘗試關閉窗口
      } catch (e) {
        console.error("Window close failed", e); // 錯誤處理
      }
    }
  }, []);

  const handleQRError = useCallback((err) => {
    console.error("QR 掃描錯誤:", err);
    message.error("掃描失敗，請重試");
  }, []);

  return (
    <div className="container1">
      <div style={{ width: "100%", aspectRatio: "16/9", marginBottom: "1rem" }}>
        <ARComponent
          imageTargetSrc={imageTargetSrc}
          onTargetFound={handleTargetFound}
          isEnabled={isAREnabled}
        />
      </div>
      <div style={{ width: "100%", aspectRatio: "16/9", marginBottom: "1rem" }}>
        <WrappedQrScanner
          onScan={handleQRScan}
          onError={handleQRError}
          delay={300}
        />
      </div>
      {markerFound && (
        <div className="buttonContainer">
          {!buttonClicked ? (
            <button className="foundButton" onClick={handleFoundButtonClick}>
              找到了
            </button>
          ) : (
            <div className="centered-content">
              <button className="endButton" onClick={handleEndGame}>
                結束遊戲
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LessonPlans;
