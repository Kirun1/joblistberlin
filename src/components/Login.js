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
		const { addNotification } = this.props;
		e.preventDefault();
		console.log(this.props);
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
					<button type="submit">Login</button>
				</form>
				<p>Don't have an account yet? <Link to="/auth/register">Register</Link></p>
			</div>
		)
  }
}

export default withNotification( Login );
