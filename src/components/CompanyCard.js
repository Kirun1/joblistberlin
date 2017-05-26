import React, { Component } from 'react';
import { Database } from 'firebase';
import { getCurrentUserSetting } from '../api/auth';
import ContextualToggle from './ContextualToggle'
import Option from './Option';

export default class CompanyCard extends Component {
	addToUserFavorites = () => {
		getCurrentUserSetting().then(settings => {
			console.log('settings', settings);
		})
	}
	reportBrokenLink() {
		console.log('report broken link')
	}
	companyIsApproved() {
		if (this.props.isApproved) {
			 return 'Company--isApproved';
		} else {
			 return 'Company--isNotApproved';
		}
	}
	render() {

		const { id,
						title,
						url,
						createdAt,
						goToDetail, // passed down from the companiesRoute
						reportBrokenLink } = this.props;

		return (
			<article key={ id } className={`Company ${this.companyIsApproved()}`}>

				<ContextualToggle label={ title }>
					<Option action={ () => goToDetail(createdAt) }>Edit</Option>
					<Option action={ this.addToUserFavorites }>Add to favorites</Option>
					<Option action={ this.reportBrokenLink }>Report broken link</Option>
				</ContextualToggle>

				<div className="Company-body">
					<h4 className="Company-title">{ title }</h4>
					<a href={ url } className="Company-link">
						<input value={ url }/>
					</a>
				</div>

			</article>
		)
	}
}
