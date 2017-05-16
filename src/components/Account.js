import React, { Component } from 'react';
import { getCurrentUser } from '../api';

export default class Account extends Component {
	constructor() {
		super();
		this.state = {
			user: null
		}
	}
	componentDidMount() {
		const user = getCurrentUser();
		this.setState({
			user
		})
	}
	render() {
		if(!this.state.user) return null;

		const { email, emailVerified } = this.state.user;
		return (
			<div>
				<h2>Account <small>overview</small></h2>
				<label>
					Your email: {emailVerified ? <span>verified</span> : <span>(verify)</span>}
					<input placeholder={ email }/>
				</label>
			</div>
		)
	}
}
