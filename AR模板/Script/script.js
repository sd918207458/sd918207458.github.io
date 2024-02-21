
        // 初始化遊戲邏輯
        function initializeGameLogic() {
            // 分數計數器
            let score = 0;

            // 在DOM加載完成後執行JavaScript代碼
            document.addEventListener("DOMContentLoaded", function () {
                // 隨機決定紅色和綠色區域的位置
                let random = Math.random(); // 生成一個0到1之間的隨機數
                let bottomLeft = document.getElementById('bottomLeft');
                let bottomRight = document.getElementById('bottomRight');

                if (random < 0.5) {
                    // 將紅色區域放在左邊，綠色區域放在右邊
                    bottomLeft.style.left = '0';
                    bottomRight.style.right = '0';
                } else {
                    // 將綠色區域放在左邊，紅色區域放在右邊
                    bottomLeft.style.right = '0';
                    bottomRight.style.left = '0';
                }

                // 監聽a-marker的觸發事件
                document.getElementById('animated-marker').addEventListener('markerFound', function() {
                    // 顯示紅色和綠色區域
                    bottomLeft.style.display = 'block';
                    bottomRight.style.display = 'block';
                });

                // 紅色區域的點擊事件
                bottomLeft.addEventListener('click', function() {
                    showFalse(); // 顯示false.gif
                    // 替換圖片和文字內容
                    document.getElementById('interactiveImage').setAttribute('src', 'assets/river.jpg');
                    document.getElementById('displayText').setAttribute('value', 'Which stream is this?');
                });

                // 綠色區域的點擊事件
                bottomRight.addEventListener('click', function() {
                    showTrue(); // 顯示true.gif
                    // 替換圖片和文字內容
                    document.getElementById('interactiveImage').setAttribute('src', 'assets/river.jpg');
                    document.getElementById('displayText').setAttribute('value', 'Which stream is this?');
                });
            });

            // 顯示 true.gif
            function showTrue() {
                let trueImage = document.getElementById('trueImage');
                trueImage.style.display = 'block';
                score += 100;
                updateScoreDisplay();
                updateAreaText(); // 更新紅色和綠色區域內的文字
                setTimeout(function() {
                    trueImage.style.display = 'none';
                }, 1000);

                // 檢查分數並播放相應的 GIF
                if (score === 500) {
                    playWin();
                } else if (score < 0) {
                    playLose();
                }
            }

            // 顯示 false.gif
            function showFalse() {
                let falseImage = document.getElementById('falseImage');
                falseImage.style.display = 'block';
                score -= 100;
                updateScoreDisplay();
                updateAreaText(); // 更新紅色和綠色區域內的文字
                setTimeout(function() {
                    falseImage.style.display = 'none';
                }, 1000);

                // 檢查分數並播放相應的 GIF
                if (score === 500) {
                    playWin();
                } else if (score < 0) {
                    playLose();
                }
            }

            // 更新紅色和綠色區域內的文字
            function updateAreaText() {
                document.getElementById('bottomLeft').innerText = '濁水溪';
                document.getElementById('bottomRight').innerText = '鹽水溪';
            }

        // 播放 win.gif
        function playWin() {
            let winImage = document.createElement('img');
            winImage.src = 'assets/win.gif';
            winImage.classList.add('centered');
            document.body.appendChild(winImage);
            setTimeout(function() {
                winImage.parentNode.removeChild(winImage);
                // 播放完动画后重置网页代码
                resetGame();
            }, 3000); // 3秒后移除 GIF
        }
        
        // 播放 lose.gif
        function playLose() {
            let loseImage = document.createElement('img');
            loseImage.src = 'assets/lose.gif';
            loseImage.classList.add('centered');
            document.body.appendChild(loseImage);
            setTimeout(function() {
                loseImage.parentNode.removeChild(loseImage);
                // 播放完动画后重置网页代码
                resetGame();
            }, 3000); // 3秒后移除 GIF
        }
        
        // 重置网页代码
        function resetGame() {
            // 在这里执行重置操作，比如重置分数、恢复初始状态等
            let score = 0;
            document.getElementById('scoreDisplay').innerText = '分数: ' + score;
            // 还可以添加其他重置操作
        }
        
        // 检查分数并播放相应的 GIF
        function checkScore() {
            if (score === 500) {
                playWin();
                uiContainer.style.display = 'block';
                closeButton.style.display = 'block';
            } else if (score < 0) {
                playLose();
                uiContainer.style.display = 'block';
                closeButton.style.display = 'block';
            }
        }



            // 更新分數顯示
            function updateScoreDisplay() {
                let scoreDisplay = document.getElementById('scoreDisplay');
                scoreDisplay.innerText = '分數: ' + score;
            }
        }

        // 初始化關閉按鈕
        function initializeCloseButton() {
            // 在DOM載入完成後執行JavaScript代碼
            document.addEventListener("DOMContentLoaded", function () {
                // 獲取關閉按鈕元素
                let closeButton = document.getElementById('closeButton');
                // 獲取 uiContainer 元素
                let uiContainer = document.getElementById('uiContainer');
                // 監聽關閉按鈕的點擊事件
                closeButton.addEventListener('click', function () {
                    // 隱藏 uiContainer 和 closeButton
                    uiContainer.style.display = 'none';
                    closeButton.style.display = 'none';
                    // 初始化新一輪遊戲邏輯
                    initializeGameLogic();
                });
            });
        }

        // 調用初始化函數
        initializeCloseButton(); // 初始化關閉按鈕
        initializeGameLogic(); // 初始化遊戲邏輯
