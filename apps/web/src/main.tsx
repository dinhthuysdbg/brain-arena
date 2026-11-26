import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/app.css';
import './styles/react.css';

const el = document.getElementById('root');
if (!el) throw new Error('Thiếu phần tử #root');
createRoot(el).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
