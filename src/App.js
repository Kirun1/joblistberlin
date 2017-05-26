import React from 'react';
import { Switch,
				 Route,
				 NavLink,
				 Redirect } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute.js';
import PublicRoute from './components/PublicRoute.js';
import { isAuthenticated } from './api/auth';
import NoMatchRoute from './components/NoMatchRoute';
import CompaniesRoute from './components/CompaniesRoute';
import JobsRoute from './components/JobsRoute';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import Account from './components/Account';
import Admin from './components/Admin';

import NotificationDisplay from './components/NotificationDisplay';

import logo from '../public/jlb-logo.png'

export default function App() {
	let auth = isAuthenticated();
	return (
		<div className="App">
			<NotificationDisplay/>

			<aside className="App-aside Container Section">
				<nav className="Nav Nav--main">
					<NavLink className="Nav-item Logo" to="/">
						<img className="Logo-img" src={logo} alt="Job List Berlin logo"/>
					</NavLink>
					<NavLink className="Nav-item" to="/companies">Companies</NavLink>
					<NavLink className="Nav-item" to="/jobs">Jobs</NavLink>
					<hr/>
					{ auth && <NavLink className="Nav-item" to="/auth/account">Account</NavLink> }
					{ auth && <NavLink className="Nav-item" to="/auth/logout">Logout</NavLink> }
					{ !auth && <NavLink className="Nav-item" to="/auth/login">Login</NavLink> }
				</nav>
			</aside>

			<main className="App-main Container Section">
				<Switch>
					<Redirect exact from='/' to='/companies'/>
					<Route path="/companies" component={ CompaniesRoute }/>
					<Route path="/jobs" component={ JobsRoute }/>
					<PublicRoute path="/auth/register" component={ Register }/>
					<PublicRoute path="/auth/login" component={ Login }/>
					<PrivateRoute path="/auth/logout" component={ Logout }/>
					<PrivateRoute path="/auth/account" component={ Account }/>
					<Route path="/admin" component={ Admin }/>
					<Route component={NoMatchRoute}/>
				</Switch>

			</main>
		</div>
	)
}
