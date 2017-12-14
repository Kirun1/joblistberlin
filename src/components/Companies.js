import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withFirebase from '../withFirebase';
import Loading from './Loading';
import CompanyCard from './CompanyCard';

class Companies extends Component {
	constructor() {
		super();
		this.state = {}
	}

	render() {
		if(!this.props.data) return <Loading/>

		return (
			<div>
				<h2><small>A list of </small>companies</h2>
				<p>
					Companies in this list have <strong>offices in Berlin</strong>, and <strong>job offers</strong> on their website.<br/>
					This is a <strong>community currated</strong> list, anyone can <Link to='companies/add'>submit a company</Link> for review.
				</p>

				<p>Most recently added:</p>
				{ this.props.data.map((company, index) => <CompanyCard key={ index }
																														goToDetail={ this.goToCompanyDetail }
																														{ ...company } />) }
			</div>
		)
	}
}

export default withFirebase('links')(Companies);
