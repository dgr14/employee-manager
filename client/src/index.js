import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import EmployeeProvider from './context/EmployeeProvider'
import './index.css';
import App from './App';

// NEW FUNCTIONALITY
// Add Incident on my employee component - will allow boss to add positive and negative incidents - MAYBE Add a photo with it
// Log of tardiness
// the ability to add employee goals

// Maybe Add
// The ability to group employees into groups
// 

ReactDOM.render(
    <BrowserRouter>
        <EmployeeProvider>
            <App />
        </EmployeeProvider>
    </BrowserRouter>,
    document.getElementById('root'));
