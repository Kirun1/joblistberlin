import React, { Component } from 'react';
import { map,
				 reverse } from 'lodash';
import { database } from 'firebase';
import { Link } from 'react-router-dom';
import filter from 'lodash';
import { getCurrentUserSettingRef } from '../api/auth';
import Loading from './Loading';
import CompanyCard from './CompanyCard';

function serializeKey(data, id) {
	data.id = id;
	return data;
}

export default class Companies extends Component {
	constructor() {
		super();
		this.state = {
			model: null
		}
	}

	mutateCompanies(allCompanies, favCompaniesId) {
		// go through all companies, find each favorites
		var favCompanies = [];
		var otherCompanies = [];

		return allCompanies.map(value => {
			favCompaniesId.forEach(id => {
				// if in the favorite list, add favorite flag and push
				if(value.id === id) {
					value.isFavorite = true;
					favCompanies.push(value)
				} else {
					// if not in favorite, push
					otherCompanies.push(value)
				}
			})
			// in any case push to all with favorite tag on favorites
			return value;
		});
	}

  componentDidMount() {
		// model will render all companies
		var model;

		database().ref('links').orderByChild("createdAt").on('value', (snapshot) => {
			// find and serialize all companies
			const allCompanies = map(snapshot.val(), serializeKey);

			// get favorite companies, ids only
			getCurrentUserSettingRef().then(settings => {
				const sSettings = map(settings.val(), serializeKey)[0];
				var favCompaniesId = sSettings.favoriteCompanies;

				if (favCompaniesId) {
					const favCompaniesId = Object.keys(sSettings.favoriteCompanies);
					model = this.mutateCompanies(allCompanies, favCompaniesId)
				} else {
					model = allCompanies;
				}

				// set state two models
				this.setState({
					model
				});
			})
		})
	}

	goToCompanyDetail = (companyId) => {
		const { path } = this.props.match;
		this.props.history.push(`${path}/${companyId}`)
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
