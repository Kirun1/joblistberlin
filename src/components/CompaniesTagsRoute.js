import React from 'react';
import { Link } from 'react-router-dom';
import withCompanies from '../withCompanies';
import CompaniesTags from './CompaniesTags';
import Loading from './Loading';

const CompaniesTagsRoute = (props) => {
	const companies = props.data
	return !companies ? <Loading/> : (
		<div>
			<nav className="Nav">
				<Link to="/companies" className="Nav-item Button Button--color3 Button--back mr-1">go back to the list of companies</Link>
			</nav>
			<CompaniesTags companies={companies}/>
		</div>
	)
}

export default withCompanies(CompaniesTagsRoute)
