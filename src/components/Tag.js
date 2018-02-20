import React from 'react'

export default function({name, number}) {
	return (
		<article className="Tag">
			<span className="Tag-name">{name}</span>
			<span className="Tag-number">{number}</span>
		</article>
	)
}
