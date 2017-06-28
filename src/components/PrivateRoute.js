import React from 'react';
import { Route,
				 Redirect } from 'react-router-dom';
import { isAuthenticated } from '../actions/auth';

export default function PrivateRoute({ component:Component, ...rest }) {
	return (
		<Route {...rest} render={ props => (
				isAuthenticated() ? (
					<Component {...props}/>
				) : (
					<Redirect to={{
						pathname: '/auth/login',
						state: { from: props.location }
					}}/>
				)
			)}/>
	)
}
