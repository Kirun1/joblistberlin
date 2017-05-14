import React, { Component } from 'react';
import { getCurrentUser } from '../api';

export default class Account extends Component {
	constructor() {
		super();
		this.state = {
			user: null,
			email: null
		}
	}
	componentDidMount() {
		const user = getCurrentUser();
		this.setState({
			user,
			email: user.email
		})
	}
	render() {
		return (
			<div>
				<h2>Account:</h2>
				<p>email: { this.state.email }</p>
			</div>
		)
	}
}
