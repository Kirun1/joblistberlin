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

	isEmailVerified() {
		const { email, emailVerified} = this.state.user;
		if (emailVerified) {
			return `${email} (verified)`;
		} else {
			return `${email} (not-verified)`;
		}
	}

	render() {
		if(!this.state.user) return null;

		return (
			<div>
				<h2>Account <small>overview</small></h2>
				<label>
					Your email:
					<input disabled={true} placeholder={ this.isEmailVerified() }/>
					{ !this.state.user.emailVerified && <button onClick={ this.sendVerificationEmail }>Re-send verification email</button> }
				</label>
			</div>
		)
	}
}
