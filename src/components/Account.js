import React from 'react';
import UserSettings from './UserSettings';
import UserJobs from './UserJobs';
import { Route,
				 Link } from 'react-router-dom';

export default function Account(props) {
	const { match } = props;
	return (
		<div>
			<h2>Account <small>overview</small></h2>

			<section>
				<nav className="Nav">
					<Link to={`${match.url}`}>Jobs</Link>
					<Link to={`${match.url}/settings`}>Settings</Link>
				</nav>
			</section>

			<Route exact path={`${match.url}`} component={ UserJobs }/>
			<Route path={`${match.url}/settings`} component={ UserSettings }/>
		</div>
	)
}
