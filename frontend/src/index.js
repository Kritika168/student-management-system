// React 18 Application Entry Point
// Tech Stack: React 18.2 with Concurrent Features
// DSAI Summer Internship 2026

import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// React 18 createRoot API for better performance
const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
