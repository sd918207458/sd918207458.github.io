import React, { useState, useCallback } from "react";
import { message } from "antd"; // 顯示信息提示
import ARComponent from "../../components/arcomp/ARComponent"; // 使用現有的 ARComponent
import QrScanner from "react-qr-scanner";

// 簡化版 QR 掃描器
const WrappedQrScanner = ({ onScan, onError }) => {
  return (
    <QrScanner
      onScan={onScan}
      onError={onError}
      style={{
        width: "100%",
        maxWidth: "100vw",
        height: "auto",
        aspectRatio: "16 / 9",
      }}
      constraints={{
        audio: false,
        video: { facingMode: "environment" },
      }}
    />
  );
};

const Lesson = () => {
  const [state, setState] = useState({
    markerFound: false,
    buttonClicked: false,
    hasScanned: false,
  });

  // 當 AR 標記找到時的回調函數
  const handleTargetFound = useCallback((target) => {
    if (target === "LessonPlans") {
      setState((prevState) => ({
        ...prevState,
        markerFound: true,
        hasScanned: true,
      }));
      message.success("AR 目標找到了！", 2);
    } else if (target === "LinkTojourney") {
      window.location.href = "https://sanmingmemoryjourney.com";
    }
  }, []);

  // 找到按鈕點擊處理
  const handleFoundButtonClick = () => {
    setState((prevState) => ({ ...prevState, buttonClicked: true }));
    message.success("遊戲目標已確認！", 2);
  };

  // 結束遊戲
  const handleEndGame = () => {
    if (window.confirm("確定要結束遊戲並關閉頁面嗎？")) {
      window.close();
    }
  };

  // 處理 QR 掃描結果
  const handleQRScan = (data) => {
    if (data && data.includes("sanmingmemoryjourney")) {
      setState((prevState) => ({ ...prevState, markerFound: true }));
      if (!state.hasScanned) {
        message.success("QR 碼掃描成功！", 2);
        setState((prevState) => ({ ...prevState, hasScanned: true }));
      }
    }
  };

  // 處理 QR 掃描錯誤
  const handleQRError = (err) => {
    console.error("QR 掃描錯誤:", err);
    message.error("掃描失敗，請重試");
  };

  return (
    <div className="container1">
      {/* 使用 ARComponent 來開啟 AR 組件 */}
      <div style={{ width: "100%", aspectRatio: "16/9", marginBottom: "1rem" }}>
        <ARComponent
          imageTargetSrc="/path/to/LessonPlans.mind" // 你的 AR 標記檔案
          onTargetFound={handleTargetFound}
        />
      </div>

      <div style={{ width: "100%", aspectRatio: "16/9", marginBottom: "1rem" }}>
        <ARComponent
          imageTargetSrc="/path/to/LinkTojourney.mind" // 另一個 AR 標記檔案
          onTargetFound={handleTargetFound}
        />
      </div>

      {/* QR 掃描器 */}
      {!state.markerFound && (
        <div
          style={{ width: "100%", aspectRatio: "16/9", marginBottom: "1rem" }}
        >
          <WrappedQrScanner onScan={handleQRScan} onError={handleQRError} />
        </div>
      )}

      {/* 找到目標後的按鈕 */}
      {state.markerFound && (
        <div className="buttonContainer">
          {!state.buttonClicked ? (
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

export default Lesson;
