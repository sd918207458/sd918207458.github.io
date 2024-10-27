import React, { useState, useCallback, memo } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import ARComponent from "../../components/arcomp/ARComponent";
import imageTargetSrc from "./LessonPlans.mind";
import ImageTargetSrc02 from "./LinkTojourney.mind";
import QrScanner from "react-qr-scanner";

// 使用 memo 優化 QR 掃描器組件，避免不必要的重新渲染
const WrappedQrScanner = memo(({ onScan, onError, style, ...props }) => (
  <QrScanner
    onScan={onScan} // QR 掃描成功時的處理函數
    onError={onError} // QR 掃描錯誤時的處理函數
    style={{
      ...style,
      width: "100%",
      maxWidth: "100vw",
      height: "auto",
      aspectRatio: "16 / 9",
    }}
    constraints={{ audio: false, video: { facingMode: "environment" } }} // 設定相機參數
    {...props}
  />
));

WrappedQrScanner.displayName = "WrappedQrScanner";

const LessonPlans = () => {
  const [hasScanned, setHasScanned] = useState({ ar: false, qr: false }); // 記錄 AR 或 QR 是否已掃描
  const [buttonClicked, setButtonClicked] = useState(false); // 記錄「找到目標」按鈕是否被點擊
  const navigate = useNavigate(); // 使用導覽 hook

  // 當找到 AR 目標時觸發的處理函數
  const handleTargetFound = useCallback(() => {
    if (!hasScanned.ar) {
      setHasScanned((prev) => ({ ...prev, ar: true }));
      message.success("AR 目標找到了！", 2);
    }
  }, [hasScanned]);

  // 「找到目標」按鈕點擊時的處理函數
  const handleFoundButtonClick = useCallback(() => {
    setButtonClicked(true);
    message.success("遊戲目標已確認！", 2);
  }, []);

  // QR 掃描處理函數，根據掃描到的資料進行相應操作
  const handleQRScan = useCallback(
    (data) => {
      if (data && typeof data === "string") {
        console.log("Scanned data:", data);
        if (data.includes("sanmingmemoryjourney") && !hasScanned.ar) {
          setHasScanned((prev) => ({ ...prev, ar: true }));
          message.success("QR 碼掃描成功！", 2);
        } else if (data === ImageTargetSrc02 && !hasScanned.qr) {
          if (window.confirm("要進入三民億旅遊戲嗎？")) {
            navigate("/"); // 確認後導航到首頁
            setHasScanned((prev) => ({ ...prev, qr: true }));
          }
        }
      }
    },
    [hasScanned, navigate]
  );

  // 結束遊戲按鈕的處理函數，嘗試關閉當前視窗或導航至首頁
  const handleEndGame = useCallback(() => {
    if (window.confirm("你確定要離開遊戲嗎？")) {
      try {
        window.open("about:blank", "_self"); // 嘗試打開空白頁面
        window.close(); // 嘗試關閉當前頁面
      } catch (e) {
        console.error("無法自動關閉視窗，要前往三民億旅遊戲嗎?", e);
        navigate("/"); // 重導至首頁
      }
    }
  }, [navigate]);

  // QR 掃描錯誤的處理函數，顯示錯誤訊息
  const handleQRError = useCallback((err) => {
    console.error("QR 掃描錯誤:", err);
    message.error("掃描失敗，請重試");
  }, []);

  // 統一的樣式設置，確保組件顯示一致
  const scannerStyle = {
    width: "100%",
    aspectRatio: "16/9",
    marginBottom: "1rem",
  };

  return (
    <div className="container1">
      {/* AR 組件 */}
      <div style={scannerStyle}>
        <ARComponent
          imageTargetSrc={imageTargetSrc} // AR 圖片目標
          onTargetFound={handleTargetFound} // AR 目標找到的處理函數
          isEnabled={!hasScanned.ar} // 控制 AR 是否啟用
        />
      </div>

      {/* QR 掃描器 */}
      {!hasScanned.qr && (
        <div style={scannerStyle}>
          <WrappedQrScanner
            onScan={handleQRScan} // QR 掃描處理函數
            onError={handleQRError} // QR 掃描錯誤處理函數
            delay={300} // 設定掃描間隔
          />
        </div>
      )}

      {/* 遊戲按鈕 */}
      {hasScanned.ar && (
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
