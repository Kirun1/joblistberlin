import React from 'react';

export default function Company(props) {
  return (
	  <article key={ props.id }>
	    <a href={props.url}>
				{props.title} <span>{ props.isApproved ? "OK" : "NONONNONON" }</span>
			</a>
		</article>
  )
}
