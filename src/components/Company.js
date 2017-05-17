import React from 'react';

export default function Job(props) {
  return (
	  <article key={ props.id } className="Company">
			<span>{ props.isApproved ? ">" : "<" }</span>
	    <a href={props.url} className="Company-title">{props.title}</a>
		</article>
  )
}
