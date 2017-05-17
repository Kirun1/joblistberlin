import React from 'react';
import AddJob from './AddJob.js';

export default function Jobs() {
	return (
		<div className="Jobs">
			<h2>Job<small> board</small></h2>
			<p>Use this form to add a job offer to the site.</p>
			<AddJob/>
			<p>Job offers:</p>
		</div>
	)
}
