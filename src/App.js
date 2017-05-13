import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute.js';
import { auth } from './api';
import Companies from './components/Companies';
import Jobs from './components/Jobs';
import Login from './components/Login';
import Register from './components/Register';
import Account from './components/Account';

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			uid: null
		};
	}

	componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({uid: user.uid});
      } else {
        this.setState({uid: null});
      }
    });
  }

	render() {
		return (
			<div className="App">
				<section>
					<nav className="Nav">
						<NavLink to="/" exact>Companies</NavLink>
						<NavLink to="/jobs">Jobs</NavLink>
						<NavLink to="/auth/login">Login</NavLink>
						<NavLink to="/auth/account">settings</NavLink>
					</nav>
				</section>

				<section>
					<p>uid: { this.state.uid }</p>
					<Route exact path="/" component={ Companies }/>
					<Route path="/jobs" component={ Jobs }/>
					<Route path="/auth/login" component={ Login }/>
					<Route path="/auth/register" component={ Register }/>
					<PrivateRoute path="/auth/account" component={ Account }/>
				</section>
			</div>
		)
	}
}
