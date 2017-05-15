import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loginWithEmail } from '../api';
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
		e.preventDefault();
		loginWithEmail(this.state.email, this.state.password)
			.then(() => this.props.history.push('/'))
			.catch(e => {
				this.props.addNotification(e.message)
				console.log('Login error:', e)
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

export default withNotification( Login );
