import React, { Component } from 'react';
import withNotification from './withNotification';
import { getCurrentUser,
				 sendVerificationEmail,
				 updateUserEmail } from '../api';

class Account extends Component {
	constructor() {
		super();
		this.state = {
			email: null,
			emailVerified: null,
			newEmail: null
		}
	}

	componentDidMount() {
		this.reloadUser();
	}

	isEmailVerified() {
		const { email, emailVerified} = this.state;
		if (emailVerified) {
			return `(verified) ${email}`;
		} else {
			return `(not-verified) ${email}`;
		}
	}

	handleEmailUpdate = (e) => {
		this.setState({
	    newEmail : e.target.value
		});
	}

	sendEmail = () => {
		const { addNotification } = this.props;
		sendVerificationEmail().then(() => {
			addNotification('A confirmation email was again to your email adress. Check your inbox');
		})
	}
	reloadUser() {
		return getCurrentUser().then(user => {
			const {email,
						 emailVerified } = user;
			this.setState({
				email,
				emailVerified,
				newEmail: ''
			});
		});
	}
	updateEmail = () => {
		const { addNotification } = this.props
		updateUserEmail(this.state.newEmail).then(() => {
			addNotification('A confirmation email was sent to both your new and old email. Check your inbox!');
			this.reloadUser();
		}).catch(e => {
			addNotification(e.message);
		})
	}

	render() {
		if(!this.state.email) return null;

		return (
			<div>
				<h2>Account <small>overview</small></h2>
				<label>
					Your email:
					<input title={ this.state.email }
								 value={ this.state.newEmail }
								 onChange={this.handleEmailUpdate }
								 placeholder={ this.isEmailVerified() }/>
				</label>
				<div className="ButtonGroup">
					{ this.state.newEmail && <button className="Button" onClick={ this.updateEmail }>Update email</button> }
					{ !this.state.emailVerified && <button className="Button" onClick={ this.sendEmail }>Re-send verification email</button> }
				</div>
			</div>
		)
	}
}

export default withNotification(Account);
