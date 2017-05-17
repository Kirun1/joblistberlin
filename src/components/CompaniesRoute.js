import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Companies from './Companies';
import AddCompany from './AddCompany';

export default class CompaniesRoute extends Component {
	render() {
		const { match } = this.props;

		return (
		<div>
			<section className="Section">
				<Route exact path={match.url} component={ Companies }/>
				<Route path={`${match.url}/add`} component={ AddCompany }/>
			</section>
		</div>
		)
	}
}
