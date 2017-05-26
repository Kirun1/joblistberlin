import React, { Component } from 'react';
import _ from 'lodash';
import { database } from 'firebase';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import CompanyCard from './CompanyCard';

export default class Companies extends Component {
	constructor() {
		super();
		this.state = {
			model: null
		}
	}

  componentDidMount() {
		database().ref('links').orderByChild("createdAt").on('value', (snapshot) => {
			const companies = snapshot.val()
			console.log('companies', companies);
			/* _.values()
				 const model = _.reverse();
				 this.setState({
				 model
				 });*/
		})
	}

	goToCompanyDetail = (companyCreatedDate) => {
		const { path } = this.props.match;
		const date = companyCreatedDate;
		this.props.history.push(`${path}/${date}`)
	}

	render() {

		if (!this.state.model ) return <Loading/>

		return (
		<div>
			<h2><small>A list of </small>companies</h2>
			<p>
				Companies in this list have <strong>officies in Berlin</strong>, and <strong>job offers</strong> on their website.<br/>
				This is a <strong>community currated</strong> list, anyone can <Link to='companies/add'>submit a company</Link> for review.
			</p>
			<div className="Companies">
				{ this.state.model.map((job, index) => <CompanyCard key={ index }
																														goToDetail={ this.goToCompanyDetail }
																														{ ...job } />) }
			</div>
		</div>
		)
	}
}
