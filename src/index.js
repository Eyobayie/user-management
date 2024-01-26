import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ApiRouter from './Routers';
import Modal from 'react-modal';

Modal.setAppElement('#root');

ReactDOM.render(
  <React.StrictMode>
    <ApiRouter />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
