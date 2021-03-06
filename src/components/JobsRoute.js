import React from 'react';
import { Route } from 'react-router';
import PrivateRoute from './PrivateRoute';
import Jobs from './Jobs';
import AddJob from './AddJob';

export default function JobsRoute(props) {
	const { match } = props;

	return (
		<div>
			<section className="Section">
				<Route exact path={match.url} component={ Jobs }/>
				<PrivateRoute path={`${match.url}/add`} component={ AddJob }/>
			</section>
		</div>
	)
}
