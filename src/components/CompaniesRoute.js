import React, { Component } from 'react';
import {Route, NavLink} from 'react-router-dom';
import Companies from './Companies';
import PostCompany from './PostCompany';

export default class CompaniesRoute extends Component {
	render() {
		const { match } = this.props;

		return (
		<div>
			<section className="Section">
				<h2><small>A list of </small>companies</h2>
				<Route exact path={`${match.url}`} component={ Companies }/>
				<Route path={`${match.url}/add`} component={ PostCompany }/>
			</section>
		</div>
		)
	}
}
