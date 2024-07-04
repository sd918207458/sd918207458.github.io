// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import router from './router'; // 假設你的路由配置在 router.js 中
import { BrowserRouter as Router } from 'react-router-dom'; // 如果你的 router.js 已經包含 BrowserRouter，這裡就不需要再次導入

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {router} {/* 假設 router 渲染你的應用程序 */}
  </React.StrictMode>
);
