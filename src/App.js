import React, { Component } from 'react';
// BrowserRouter as Router is in <Root/>
import { Link, Route } from 'react-router-dom';
import Companies from './components/Companies';
import Jobs from './components/Jobs';
import Login from './components/Login';
import Register from './components/Login';

export default class App extends Component {
	render() {
		var user = window.localStorage.getItem('user');
		console.log('user', user);
		return (
			<div className="App">
				<section>
					<nav className="Nav">
						<Link to="/">Companies</Link>
						<Link to="/jobs">Jobs</Link>
						<Link to="/auth/login">Login</Link>
					</nav>
				</section>

				<section>
					<Route exact path="/" component={ Companies }/>
					<Route path="/jobs" component={ Jobs }/>
					<Route path="/auth/login" component={ Login }/>
					<Route path="/auth/register" component={ Register }/>
				</section>
			</div>
		)
	}
}
