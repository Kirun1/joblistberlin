import React, { Component } from 'react';
import withNotification from './withNotification';
import { getCurrentUser,
				 sendVerificationEmail,
				 updateUserEmail } from '../api';

class Account extends Component {
	constructor() {
		super();
		this.state = {
			user: null,
			newEmail: null
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
	clearEmail() {
		this.setState({
			newEmail: ''
		})
	}
	updateEmail = () => {
		const { addNotification } = this.props
		updateUserEmail(this.state.newEmail).then(() => {
			addNotification('A confirmation email was sent to both your new and old email. Check your inbox!');
			this.clearEmail();
		}).catch(e => {
			addNotification(e.message);
		})
	}

	render() {
		if(!this.state.user) return null;

		return (
			<div>
				<h2>Account <small>overview</small></h2>
				<label>
					Your email:
					<input title={ this.state.user.email }
								 onChange={this.handleEmailUpdate }
								 placeholder={ this.isEmailVerified() }/>
				</label>
				<div className="ButtonGroup">
					{ this.state.newEmail && <button className="Button" onClick={ this.updateEmail }>Update email</button> }
					{ !this.state.user.emailVerified && <button className="Button" onClick={ this.sendEmail }>Re-send verification email</button> }
				</div>
			</div>
		)
	}
}

export default withNotification(Account);
