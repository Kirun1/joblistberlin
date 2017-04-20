import React from 'react';
import Companies from './Companies';
import {Link, Route} from 'react-router-dom';

export default function App() {
	return (
		<div>
			<nav className="Navigation">
				<Link to="c">Companies</Link>
				<Link to="j">Jobs</Link>
			</nav>
			<Route path="/c" component={Companies}/>
		</div>
	)
}
