import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';
import { Provider } from 'react-redux';
import store from './redux/store';
// import Loading from './components/Loading';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <Loading /> */}
      <App />
    </Provider>
  </React.StrictMode>
);
