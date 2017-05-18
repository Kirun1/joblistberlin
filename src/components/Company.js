import React from 'react';

export default function Job(props) {
	let companyStatus;

	if (props.isApproved) {
		companyStatus = 'Company--isApproved';
	} else {
		companyStatus = 'Company--isNotApproved';
	}

  return (
	  <article key={ props.id } className={`Company ${companyStatus}`}>
	    <h4 className="Company-title">{props.title}</h4>
			<a href={props.url} className="Company-link">
				<input value={props.url}/>
			</a>
		</article>
  )
}
