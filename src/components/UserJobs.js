import React from 'react';
import { Link } from 'react-router-dom';

export default function UserJobs(props) {
	return (
		<article>
			<h3>Jobs <small>that you manage</small></h3>
			<p>You don't manage any job yet.</p>
			<p><Link to="/jobs">Add a job</Link> now.</p>
		</article>
	)
}
