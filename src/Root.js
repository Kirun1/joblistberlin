import React, { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import NotificationProvider from './NotificationProvider'
import App from './App';

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
