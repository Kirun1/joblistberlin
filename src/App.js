import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute.js';
import PublicRoute from './components/PublicRoute.js';
import { isAuthenticated } from './api';
import Companies from './components/Companies';
import Jobs from './components/Jobs';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import Account from './components/Account';

export default function App() {
	let auth = isAuthenticated();
	return (
		<div className="App">
			<section>
				<nav className="Nav">
					<NavLink to="/" exact>Companies</NavLink>
					<NavLink to="/jobs">Jobs</NavLink>

					{ auth && <NavLink to="/auth/account">Account</NavLink> }
					{ auth && <NavLink to="/auth/logout">Logout</NavLink> }
					{ !auth && <NavLink to="/auth/login">Login</NavLink> }

				</nav>
			</section>

			<section>
				<Route exact path="/" component={ Companies }/>
				<Route path="/jobs" component={ Jobs }/>
				<PublicRoute path="/auth/register" component={ Register }/>
				<PublicRoute path="/auth/login" component={ Login }/>
				<PrivateRoute path="/auth/logout" component={ Logout }/>
				<PrivateRoute path="/auth/account" component={ Account }/>
			</section>
		</div>
	)
}
