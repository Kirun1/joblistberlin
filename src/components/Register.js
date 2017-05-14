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
		registerWithEmail(email, password, getTime())
			.then(() => this.props.history.push('/auth/login'))
			.catch(e => console.log);
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
			</div>
		)
  }
}
