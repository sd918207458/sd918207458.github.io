    <!-- JavaScript代碼 -->
    <script>
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
    </script>
