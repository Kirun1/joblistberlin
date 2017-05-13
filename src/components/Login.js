import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loginWithEmail } from '../api';

export default class Login extends Component {
	constructor() {
		super();
		this.state = {
	    email: '',
			password: ''
		};
  }

  handleSubmit = (e) => {
		e.preventDefault();
		loginWithEmail(this.state.email, this.state.password)
			.then(data => console.log('after login', data));
  }

  handleChange = (e) => {
		// if it is a URL fetch and set title
		console.log(e.target.value);
		this.setState({
	    [e.target.name] : e.target.value
		});
  }


  render() {
		const { email, password } = this.state;

		return (
			<div>
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
					<button type="submit">Login</button>
				</form>
				<p>Don't have an account yet? <Link to="/auth/register">Register</Link></p>
			</div>
		)
  }
}
