import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Companies from './Companies';
import AddCompany from './AddCompany';
import CompaniesTagsRoute from './CompaniesTagsRoute';
import Company from './Company';

export default class CompaniesRoute extends Component {
	render() {
		const { match } = this.props;

		return (
		<div>
			<section className="Section">
				<Switch>
					<Route exact path={match.url} component={ Companies }/>
					<Route exact path={`${match.url}/tags`} component={ CompaniesTagsRoute }/>
					<Route exact path={`${match.url}/add`} component={ AddCompany }/>
					<Route path={`${match.url}/:id`} component={ Company }/>
				</Switch>
			</section>
		</div>
		)
	}
}
