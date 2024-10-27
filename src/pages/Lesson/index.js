import React, { useState, useCallback, memo } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom"; // 新增 useNavigate 引入
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

  const navigate = useNavigate(); // 新增 useNavigate hook

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
      if (data && typeof data === "string") {
        // 確認 data 是字符串
        console.log("Scanned data:", data);
        if (data.includes("sanmingmemoryjourney")) {
          setMarkerFound(true);
          if (!hasScanned) {
            message.success("QR 碼掃描成功！", 2);
            setHasScanned(true);
          }
        }
        if (data === ImageTargetSrc02) {
          if (window.confirm("你確定要跳轉到三民記憶之旅網站嗎？")) {
            navigate("/");
          }
        }
      }
    },
    [hasScanned, navigate]
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
