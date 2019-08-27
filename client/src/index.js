import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import EmployeeProvider from './context/EmployeeProvider'
import './index.css';
import App from './App';


ReactDOM.render(
    <BrowserRouter>
        <EmployeeProvider>
            <App />
        </EmployeeProvider>
    </BrowserRouter>,
    document.getElementById('root'));
