    <!-- JavaScript代码 -->
    <script>

        // 获取关闭按钮元素
        let closeButton = document.getElementById('closeButton');

        // 获取uiContainer元素
        let uiContainer = document.getElementById('uiContainer');

        // 监听关闭按钮的点击事件
        closeButton.addEventListener('click', function () {
            // 隐藏uiContainer和closeButton
            uiContainer.style.display = 'none';
            closeButton.style.display = 'none';
        });

    </script>
