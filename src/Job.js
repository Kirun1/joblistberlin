import React from 'react';

export default function Job(props) {
  return (
	  <li key={ props.id }>
	    <a href={props.url}>
				{props.title} <span>{ props.isApproved ? "OK" : "NONONNONON" }</span>
			</a>
		</li>
  )
}
