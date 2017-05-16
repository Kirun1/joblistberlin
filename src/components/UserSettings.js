import React, { Component } from 'react';
import withNotification from './withNotification';
import { getCurrentUser,
				 sendVerificationEmail,
				 updateUserEmail,
				 sendPasswordResetEmail } from '../api';

class UserSettings extends Component {
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

	changePassword = () => {
		const { addNotification } = this.props;
		sendPasswordResetEmail(this.state.email).then(() => {
			addNotification('A reset link has been sent to your email adress.');
		}).catch(e => {
			addNotification(e.message);
		})
	}

	render() {
		if(!this.state.email) return null;
		const { email, newEmail, emailVerified } = this.state;

		return (
			<div>
				<h3>Settings <small>for your account</small></h3>
				<section>
					<label>
						Your email:
						<input title={ email }
									 value={ newEmail }
									 onChange={this.handleEmailUpdate }
									 placeholder={ this.isEmailVerified() }/>
					</label>
					<div className="ButtonGroup">
						{ newEmail && <button className="Button" onClick={ this.updateEmail }>Update email</button> }
						{ !emailVerified && !newEmail && <button className="Button" onClick={ this.sendEmail }>Re-send verification email</button> }
					</div>
				</section>
				<section>
					<p>Your password:</p>
					<button className="Button" onClick={ this.changePassword }>Change password</button>
				</section>
			</div>
		)
	}
}

export default withNotification(UserSettings);
