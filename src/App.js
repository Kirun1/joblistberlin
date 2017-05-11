import React from 'react';
// BrowserRouter as Router is in <Root/>
import { Link, Route } from 'react-router-dom';
import Companies from './Companies';
import Jobs from './Jobs';


export default function App() {
	return (
		<div className="App">
			<section>
				<nav className="Nav">
					<Link to="/companies">Companies</Link>
					<Link to="/jobs">Jobs</Link>
				</nav>
			</section>

			<section>
				<Route path="/companies" component={ Companies }/>
				<Route path="/jobs" component={ Jobs }/>
			</section>
		</div>
	)
}
