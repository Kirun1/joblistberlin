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
	const auth = isAuthenticated();

	return (
		<div className="App">
			<NotificationDisplay/>

			<aside className="App-aside Container Section">
				<nav className="Nav Nav--logo">
					<NavLink className="Nav-item Logo" to="/">
						<img className="Logo-img" src={ process.env.PUBLIC_URL + '/jlb-logo.png' } alt="Job List Berlin logo"/>
					</NavLink>
					<NavLink className="Nav-item" to="/">
						<h1 title="Job List Berlin">
							Job List Berlin
						</h1>
					</NavLink>
				</nav>
				<nav className="Nav Nav--main">
					<NavLink className="Nav-item" to="/companies">Companies</NavLink>
					<NavLink className="Nav-item" to="/jobs">Jobs</NavLink>
					<hr/>
					{ auth && <NavLink className="Nav-item" to="/auth/account">Account</NavLink> }
					{ auth && <NavLink className="Nav-item" to="/auth/logout">Logout</NavLink> }
					{ !auth && <NavLink className="Nav-item" to="/auth/login">Login</NavLink> }
					<hr/>
					<a href="https://goo.gl/forms/Z63hQv4DPXSKGJW52" target="_blank" rel="noopener noreferrer" className="Nav-item">Contact</a>
					<a href="https://www.facebook.com/joblistberlin" target="_blank" rel="noopener noreferrer" className="Nav-item">Facebook</a>
					{/* <a href="https://www.linkedin.com/company/joblistberlin/" target="_blank" rel="noopener noreferrer" className="Nav-item">↱ Linkedin</a> */}
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
