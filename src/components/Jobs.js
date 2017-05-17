import React from 'react';
import { Link } from 'react-router-dom';
import AddJob from './AddJob.js';

export default function Jobs() {
	return (
		<div className="Jobs">
			<section className="Section">
				<h2>Job<small> board</small></h2>
				<p>Want to add an offer to this list?</p>
				<Link to="jobs/add">Add a job</Link>
			</section>
			<section className="Section">
				<p>Job offers:</p>
			</section>
		</div>
	)
}
