import React from 'react';
import { Switch,
				 Route,
				 NavLink,
				 Redirect } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute.js';
import PublicRoute from './components/PublicRoute.js';
import { isAuthenticated } from './actions/auth';
import NoMatchRoute from './components/NoMatchRoute';
import CompaniesRoute from './components/CompaniesRoute';
import JobsRoute from './components/JobsRoute';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import Account from './components/Account';
import Admin from './components/Admin';

import NotificationDisplay from './components/NotificationDisplay';


export default function App() {
	let auth = isAuthenticated();
	return (
		<div className="App">
			<NotificationDisplay/>

			<aside className="App-aside Container Section">
				<nav className="Nav Nav--main">
					<NavLink className="Nav-item Logo" to="/">
						<h1 title="Job List Berlin">
							<img className="Logo-img" src={ process.env.PUBLIC_URL + '/jlb-logo.png' } alt="Job List Berlin logo"/>
						</h1>
					</NavLink>
					<NavLink className="Nav-item" to="/companies">Companies</NavLink>
					<a href="https://www.facebook.com/joblistberlin" target="_blank">Facebook</a>
					{/* <NavLink className="Nav-item" to="/jobs">Jobs</NavLink> */}
					{/* <hr/> */}
					{/* { auth && <NavLink className="Nav-item" to="/auth/account">Account</NavLink> } */}
					{/* { auth && <NavLink className="Nav-item" to="/auth/logout">Logout</NavLink> } */}
					{/* { !auth && <NavLink className="Nav-item" to="/auth/login">Login</NavLink> } */}
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
