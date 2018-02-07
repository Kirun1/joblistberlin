import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import Root from './Root';

import './styles/reset.css';
import './styles/index.css';
import './styles/utilities.css';
import './styles/layout.css';
import './styles/button.css';
import './styles/form.css';
import './styles/nav.css';
import './styles/contextualToggle.css';
import './styles/notification.css';
import './styles/company.css';

import firebase from 'firebase';

let config;

if (process.env.NODE_ENV !== "production") {
	config = {
		"apiRootUrl": "https://joblistberlin-staging.firebaseio.com",
		"apiKey": "AIzaSyAOWDGWR6dgJXNvG_B9A6hIaJNVQBwg0jI",
		"databaseURL": "joblistberlin-staging.firebaseio.com",
		"authDomain": "joblistberlin-staging.firebaseapp.com",
		"storageBucket": "joblistberlin-staging.appspot.com"
	}
} else {
	config = {
		"apiRootUrl": "https://joblistberlin.firebaseio.com",
		"apiKey": "AIzaSyACEEOsMA6xpUV4uzgbQtK8T7GNLOdQRfQ",
		"databaseURL": "joblistberlin.firebaseio.com",
		"authDomain": "joblistberlin.firebaseapp.com",
		"storageBucket": "joblistberlin.appspot.com"
	}
}

firebase.initializeApp(config);

ReactDOM.render(
	<Root />,
  document.getElementById('root')
);
