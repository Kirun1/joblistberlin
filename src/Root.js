import React from 'react';
import App from './App';
import { BrowserRouter as Router} from 'react-router-dom';
import NotificationProvider from './NotificationProvider'

export default class Root extends React.Component {
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
