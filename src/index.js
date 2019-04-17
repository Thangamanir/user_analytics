import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Log_List from './Log_List';
import LogData from './LogData';
//import Activity_List from './Activity_List';
//import ActivityData from './ActivityData';
import * as serviceWorker from './serviceWorker';

//ReactDOM.render(<Activity_List />, document.getElementById('root'));
ReactDOM.render(<Log_List />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
