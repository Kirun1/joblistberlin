import React from 'react';

export default function Job(props) {
	const { title, url } = props.model;
	return (
		<article>
			{title} {url}
		</article>
	)
}
