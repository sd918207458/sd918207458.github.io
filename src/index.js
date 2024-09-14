import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App /> {/* 渲染你的應用程序，路由邏輯已在 App 中處理 */}
  </React.StrictMode>
);
