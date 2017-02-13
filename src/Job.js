import React from 'react';

export default function Job(props) {
    return (
	    <li>
	    <a href={props.url}>
	    {props.title} <span>{ props.isApproved ? "OK" : "NONONNONON" }</span>
	</a>
	</li>
    )
}
