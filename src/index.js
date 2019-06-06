import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter } from 'react-router-dom';
import Login from './login/Login';
import Signup from './signup/Signup';
import Dashboard from './dashboard/Dashboard';
const firebase = require("firebase");

require("firebase/firestore");
firebase.initializeApp({
	apiKey: "AIzaSyBJK-I9quVoxqODTns4HYogZRrMpV14yK8",
    authDomain: "chat-app-afbe4.firebaseapp.com",
    databaseURL: "https://chat-app-afbe4.firebaseio.com",
    projectId: "chat-app-afbe4",
    storageBucket: "chat-app-afbe4.appspot.com",
    messagingSenderId: "816896774609",
    appId: "1:816896774609:web:cd0365ba086f1e48"
});

const routing = (
	<BrowserRouter>
		<div className="routing-container">
			<Route exact path='/' component={Login}></Route>
			<Route exact path='/signup' component={Signup}></Route>
			<Route exact path='/dashboard' component={Dashboard}></Route>
		</div>
	</BrowserRouter>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
