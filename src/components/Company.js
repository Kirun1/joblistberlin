import React from 'react';

export default function Job(props) {
  return (
	  <article key={ props.id } className="Company">
	    <a href={props.url}>
				{props.title} <span>{ props.isApproved ? "OK" : "NONONNONON" }</span>
			</a>
		</article>
  )
}
