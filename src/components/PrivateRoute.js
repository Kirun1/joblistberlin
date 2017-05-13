import React from 'react';
import { Route,
				 Redirect } from 'react-router-dom';

const isAuthenticated = false;

export default function PrivateRoute({ component:Component, ...rest }) {
	return (
		<Route {...rest} render={ props => (
				isAuthenticated ? (
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
