import React from 'react';
import PostJob from './PostJob.js';

export default function Jobs() {
	return (
		<div className="Jobs">
			<h2>Job<small> board</small></h2>
			<p>Use this form to add a job offer to this site.</p>
			<PostJob/>
			<p>Job offers:</p>
		</div>
	)
}
