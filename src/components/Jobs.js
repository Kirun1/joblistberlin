import React from 'react';
import PostJob from './PostJob.js';

export default function Jobs() {
	return (
		<div className="Jobs">
			<h2>Job<small> board</small></h2>
			<p>Maybe you need to hire someone fast, or you don't have a website to post a job offer to. Use this form to post a job offer to this site</p>
			<PostJob/>
			<p>Job offers:</p>
		</div>
	)
}
