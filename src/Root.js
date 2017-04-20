import React from 'react';
import App from './App';
import { BrowserRouter as Router} from 'react-router-dom';

export default class Root extends React.Component {
	render() {
		return (
			<Router>
				<App/>
			</Router>
		)
	}
}
