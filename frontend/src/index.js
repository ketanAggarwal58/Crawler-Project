import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Results from './resultTable';
import JobQueue from './jobQueue';
import Dashboard from './dashboard';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <App /> }>
                </Route>
                <Route path = "/" element = {
              <Dashboard />
            }></Route>
            <Route path = "/jobqueue" element = {
              <JobQueue />
            }></Route>
            <Route path = "/results" element = {
              <Results />
            }></Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
