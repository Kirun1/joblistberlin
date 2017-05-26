import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
	loginWithEmail,
	sendPasswordResetEmail } from '../api/auth';
import withNotification from './withNotification';

class Login extends Component {

	constructor() {
		super();
		this.state = {
	    email: '',
			password: ''
		};
  }

  handleSubmit = (e) => {
		const { addNotification } = this.props;
		e.preventDefault();
		loginWithEmail(this.state.email, this.state.password)
			.then(() => {
				this.props.history.push('/auth/account')
				addNotification('You are logged in!')
			})
			.catch(e => {
				addNotification(e.message)
			});
  }

  handleChange = (e) => {
		this.setState({
	    [e.target.name] : e.target.value
		});
  }

	handleReset = () => {
		const { addNotification } = this.props;
		const email = this.state.email;

		if(!email) {
			return addNotification('Type your email in the email field and click this button again');
		}

		sendPasswordResetEmail(email).then(() => {
			addNotification(`A reset link was sent to your email <${email}>`);
		}).catch(e => {
			addNotification(e.message);
		})
	}

  render() {
		const { email, password } = this.state;

		return (
			<div>
				<h2>Login to <small><Link to="/">Job List Berlin</Link></small></h2>
				<form onSubmit={ this.handleSubmit }>
					<article>
						<label>Email:
							<input name="email"  type="email" placeholder="Email" onChange={ this.handleChange } value={ email }/>
						</label>
					</article>

					<article>
						<label>Password:
							<input name="password" type="password" placeholder="Password" onChange={ this.handleChange } value={ password }/>
						</label>
					</article>
					<div className="ButtonGroup">
						<button className="Button" type="submit">Login</button>
						<button className="Button" onClick={ this.handleReset }>Reset password</button>
					</div>
				</form>
				<p>Don't have an account yet? <Link to="/auth/register">Register</Link></p>
			</div>
		)
  }
}

export default withNotification( Login );
