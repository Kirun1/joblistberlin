import React from 'react';
import { Link,
				 Route,
				 BrowserRouter as Router} from 'react-router-dom';
import Companies from './Companies';
import Jobs from './Jobs';


export default function App() {
	return (
		<Router>
			<div className="App">
				<nav className="Nav">
					<Link to="/companies">Companies</Link>
					<Link to="/jobs">Jobs</Link>
				</nav>

				<Route path="/companies" component={ Companies }/>
				<Route path="/jobs" component={ Jobs }/>
			</div>
		</Router>
	)
}
