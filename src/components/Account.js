import React from 'react';
import UserSettings from './UserSettings';
import UserJobs from './UserJobs';
import { Route,
				 NavLink } from 'react-router-dom';

export default function Account(props) {
	const { match } = props;
	return (
		<div>
			<h2>Account <small>overview</small></h2>

			<section>
				<nav className="Nav">
					<NavLink exact to={`${match.url}`}>Jobs</NavLink>
					<NavLink to={`${match.url}/settings`}>Settings</NavLink>
				</nav>
			</section>

			<section>
				<Route exact path={`${match.url}`} component={ UserJobs }/>
				<Route path={`${match.url}/settings`} component={ UserSettings }/>
			</section>
		</div>
	)
}
