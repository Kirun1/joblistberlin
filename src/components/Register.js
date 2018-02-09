import React, { Component } from 'react';
import withNotification from './withNotification';
import { Link } from 'react-router-dom';
import { registerWithEmail } from '../actions/auth';

class Register extends Component {
	constructor() {
		super();
		this.state = {
	    email: '',
			password: ''
		};
  }

  handleSubmit = (e) => {
		e.preventDefault();
		const { history, addNotification } = this.props;
		const { email, password } = this.state;

		registerWithEmail(email, password)
			.then(() => {
				history.push('/auth/login');
				addNotification('You are now logged in. Welcome!');
			})
			.catch(e => {
				return addNotification(e.message);
			});
  }

  handleChange = (e) => {
		this.setState({
	    [e.target.name] : e.target.value
		});
  }


  render() {
		const { email, password } = this.state;

		return (
			<div>
				<h2>Register<small>, create an account</small></h2>
				<p>To submit on the Job Board and manage your account.</p>
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
					<button type="submit">Register</button>
				</form>
				<p>Already have an account? <Link to="/auth/login">Login</Link></p>
				{/* <h2>Why <small>join?</small></h2>
						<ul>
						<li>Post jobs directly </li>
						<li>Get notified by email when a new Job or Company is added</li>
						</ul> */}
			</div>
		)
  }
}

export default withNotification( Register );
