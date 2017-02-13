import React from 'react';
import Job from './Job.js';

export default function Jobs(props)
{
    return (
	    <ul>
	    { Object.values(props.data).map((job, index) => <Job key={ index } { ...job }/>) }
	</ul>
    )
}
