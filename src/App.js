import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { getCurrentUser } from './api';
import Companies from './components/Companies';
import Jobs from './components/Jobs';
import Login from './components/Login';
import Register from './components/Register';
import Settings from './components/Settings';

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			user: null
		};
	}
	/* componentDidUpdate() {
		 this.setState({
		 user: getCurrentUser()
		 });
		 console.log('this.state.user', this.state.user)
		 }*/
	componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        window.localStorage.setItem(storageKey, user.uid);
        this.setState({uid: user.uid});
      } else {
        window.localStorage.removeItem(storageKey);
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
						<NavLink to="/auth/settings">settings</NavLink>
					</nav>
				</section>

				<section>
					<p>user: { this.state.user }</p>
					<Route exact path="/" component={ Companies }/>
					<Route path="/jobs" component={ Jobs }/>
					<Route path="/auth/login" component={ Login }/>
					<Route path="/auth/register" component={ Register }/>
					<Route path="/auth/settings" component={ Settings }/>
				</section>
			</div>
		)
	}
}
