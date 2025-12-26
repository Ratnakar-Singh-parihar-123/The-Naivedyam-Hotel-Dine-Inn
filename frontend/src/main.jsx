// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AppContextProvider from './context/AppContext';
import { HotelProvider } from './context/HotelContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <HotelProvider>
          <App />
        </HotelProvider>
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);