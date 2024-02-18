    <!-- JavaScript代碼 -->
    <script>
        function runMyCode(config) {
            // 解構參數對象，提取需要的屬性
            const { bottomLeftId, bottomRightId, markerId, bottomLeftText, bottomRightText } = config;
    
            // 分數計數器
            let score = 0;
          
            // 在DOM加載完成後執行JavaScript代碼
            document.addEventListener("DOMContentLoaded", function () {
                // 獲取紅色和綠色區域的元素
                let bottomLeft = document.getElementById(bottomLeftId);
                let bottomRight = document.getElementById(bottomRightId);
        
                // 隨機決定紅色和綠色區域的位置
                let random = Math.random(); // 生成一個0到1之間的隨機數
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
                document.getElementById(markerId).addEventListener('markerFound', function() {
                    // 顯示紅色和綠色區域
                    bottomLeft.style.display = 'block';
                    bottomRight.style.display = 'block';
                });
        
                // 紅色區域的點擊事件
                bottomLeft.addEventListener('click', function() {
                    showFalse(); // 顯示false.gif
                });
        
                // 綠色區域的點擊事件
                bottomRight.addEventListener('click', function() {
                    showTrue(); // 顯示true.gif
                });
            });
        
            function showTrue() {
                // 顯示true.gif
                let trueImage = document.getElementById('trueImage');
                trueImage.style.display = 'block';
        
                // 增加分數
                score += 100;
        
                // 更新分數顯示
                updateScoreDisplay();
        
                // 1 秒後隱藏
                setTimeout(function() {
                    trueImage.style.display = 'none';
                }, 1000);
            }
        
            function showFalse() {
                // 顯示false.gif
                let falseImage = document.getElementById('falseImage');
                falseImage.style.display = 'block';
        
                // 減少分數
                score -= 100;
        
                // 更新分數顯示
                updateScoreDisplay();
        
                // 1 秒後隱藏
                setTimeout(function() {
                    falseImage.style.display = 'none';
                }, 1000);
            }
        
            // 更新分數顯示
            function updateScoreDisplay() {
                let scoreDisplay = document.getElementById('scoreDisplay');
                scoreDisplay.innerText = '分數: ' + score;
            }
        }
        
        runMyCode({
            bottomLeftId: 'bottomLeft', // 紅色區域的元素ID
            bottomRightId: 'bottomRight', // 綠色區域的元素ID
            markerId: 'animated-marker', // AR 標記的元素ID
            bottomLeftText: '濁水溪', // 紅色區域的文字
            bottomRightText: '鹽水溪' // 綠色區域的文字
        });
    </script>
