import React from 'react';
import UserSettings from './UserSettings';
import { Route } from 'react-router-dom';

export default function Account(props) {
	const { match } = props;
	return (
		<div>
			<section className="Section">
				<h2>Account <small>overview</small></h2>
				{/* <nav className="Nav Nav--horizontal">
				<NavLink className="Nav-item" exact to={`${match.url}`}>Jobs</NavLink>
				<NavLink className="Nav-item" to={`${match.url}/settings`}>Settings</NavLink>
				</nav> */}
			</section>

			<section className="Section">
				{/* <Route exact path={`${match.url}`} component={ UserJobs }/> */}
				<Route exact path={`${match.url}`} component={ UserSettings }/>
			</section>
		</div>
	)
}
