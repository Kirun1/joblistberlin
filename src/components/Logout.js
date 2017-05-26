import { Component } from 'react';
import { logoutUser } from '../api/auth';

export default class Logout extends Component {
	componentDidMount() {
		logoutUser().then(() => this.props.history.push('/auth/login'));
	}

	render() { return null }
}
