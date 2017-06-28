import React from 'react';
import App from './App';
import { BrowserRouter as Router} from 'react-router-dom';
import FirebaseAdapter from './components/FirebaseAdapter'
import NotificationProvider from './NotificationProvider'

export default class Root extends React.Component {
	render() {
		return (
			<Router>
				<FirebaseAdapter>
					<NotificationProvider>
						<App/>
					</NotificationProvider>
				</FirebaseAdapter>
			</Router>
		)
	}
}
