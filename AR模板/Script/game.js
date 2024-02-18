<script>
              function runMyCode(config) {
                // 解构参数对象，提取需要的属性
                const { bottomLeftId, bottomRightId, markerId, bottomLeftText, bottomRightText } = config;
          
                // 分数计数器
                let score = 0;
            
                // 在DOM加载完成后执行JavaScript代码
                document.addEventListener("DOMContentLoaded", function () {
                    // 获取红色和绿色区域的元素
                    let bottomLeft = document.getElementById(bottomLeftId);
                    let bottomRight = document.getElementById(bottomRightId);
            
                    // 随机决定红色和绿色区域的位置
                    let random = Math.random(); // 生成一个0到1之间的随机数
                    if (random < 0.5) {
                        // 将红色区域放在左边，绿色区域放在右边
                        bottomLeft.style.left = '0';
                        bottomRight.style.right = '0';
                    } else {
                        // 将绿色区域放在左边，红色区域放在右边
                        bottomLeft.style.right = '0';
                        bottomRight.style.left = '0';
                    }
            
                    // 监听a-marker的触发事件
                    document.getElementById(markerId).addEventListener('markerFound', function() {
                        // 显示红色和绿色区域
                        bottomLeft.style.display = 'block';
                        bottomRight.style.display = 'block';
                    });
            
                    // 红色区域的点击事件
                    bottomLeft.addEventListener('click', function() {
                        showFalse(); // 显示false.gif
                    });
            
                    // 绿色区域的点击事件
                    bottomRight.addEventListener('click', function() {
                        showTrue(); // 显示true.gif
                    });
                });
            
                function showTrue() {
                    // 显示true.gif
                    let trueImage = document.getElementById('trueImage');
                    trueImage.style.display = 'block';
            
                    // 增加分数
                    score += 100;
            
                    // 更新分数显示
                    updateScoreDisplay();
            
                    // 1 秒后隐藏
                    setTimeout(function() {
                        trueImage.style.display = 'none';
                    }, 1000);
                }
            
                function showFalse() {
                    // 显示false.gif
                    let falseImage = document.getElementById('falseImage');
                    falseImage.style.display = 'block';
            
                    // 减少分数
                    score -= 100;
            
                    // 更新分数显示
                    updateScoreDisplay();
            
                    // 1 秒后隐藏
                    setTimeout(function() {
                        falseImage.style.display = 'none';
                    }, 1000);
                }
            
                // 更新分数显示
                function updateScoreDisplay() {
                    let scoreDisplay = document.getElementById('scoreDisplay');
                    scoreDisplay.innerText = '分数: ' + score;
                }
            }
            
            runMyCode({
                bottomLeftId: 'bottomLeft', // 红色区域的元素ID
                bottomRightId: 'bottomRight', // 绿色区域的元素ID
                markerId: 'animated-marker', // AR 标记的元素ID
                bottomLeftText: '濁水溪', // 红色区域的文字
                bottomRightText: '鹽水溪' // 绿色区域的文字
            });
<script>
