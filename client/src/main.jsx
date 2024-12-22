import ReactDOM from 'react-dom/client';


import './reset.css'
import './global.css'

import UserProvider  from './context/UserProvider';

import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
      <App />
  </UserProvider>
);