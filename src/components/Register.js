import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
	getServerTime as getTime,
	registerWithEmail } from '../api';

export default class Register extends Component {
	constructor() {
		super();
		this.state = {
	    email: '',
			password: ''
		};
  }

  handleSubmit = (e) => {
		e.preventDefault();
		const { email, password } = this.state;
		registerWithEmail(email, password, getTime());
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
