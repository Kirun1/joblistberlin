import React from 'react'
import {NavLink} from 'react-router-dom';

export default function({name, number}) {
	return (
		<NavLink
			exact
			className="Nav-item Tag"
			key={ name }
			to={{
				pathname: '/companies',
				search: `?search=%23${name}`,
				state: {
					search: name
				}
			}}>
			<span className="Tag-name">{name}</span>
			<span className="Tag-number">{number}</span>
		</NavLink>
	)
}
