    <!-- JavaScript代碼 -->
    <script>        
            // 獲取關閉按鈕元素
            let closeButton = document.getElementById('closeButton');
        
            // 獲取uiContainer元素
            let uiContainer = document.getElementById('uiContainer');
        
            // 監聽關閉按鈕的點擊事件
            closeButton.addEventListener('click', function () {
                // 隱藏uiContainer和closeButton
                uiContainer.style.display = 'none';
                closeButton.style.display = 'none';
            });

    </script>
