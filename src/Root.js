import React, { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import NotificationProvider from './NotificationProvider'
import App from './App';

import firebase from 'firebase';
import env from './env.json'

var config = {
	"apiKey": env.apiKey,
	"databaseURL": env.databaseURL,
	"authDomain": env.authDomain,
	"storageBucket": env.storageBucket
};

const firebaseApp = firebase.initializeApp(config);


export default class Root extends Component {
	render() {
		return (
			<Router>
				<NotificationProvider>
					<App/>
				</NotificationProvider>
			</Router>
		)
	}
}
