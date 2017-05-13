import React, { Component } from 'react';
import { logoutUser } from '../api';
import { Redirect } from 'react-router-dom';

export default class Logout extends Component {
	componentDidMount() {
		logoutUser().then(() => this.props.history.push('/auth/login'));
	}

	render() { return null }
}
