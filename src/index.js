import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
//fa icon for 
import './fontawesome-free/css/all.css' 

import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    , document.getElementById('root'));