import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './reset.css'
import './global.css'
import UserProvider  from './context/UserProvider';

import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
  <UserProvider>
      <App />
  </UserProvider>
  </Router>
  </React.StrictMode>
);