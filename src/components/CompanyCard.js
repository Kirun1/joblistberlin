import React, { Component } from 'react';
import { database } from 'firebase';
import { getCurrentUserSettingRef } from '../api/auth';
import ContextualToggle from './ContextualToggle'
import Option from './Option';

export default class CompanyCard extends Component {
	addToUserFavorites = () => {
		getCurrentUserSettingRef().then(settings => {
			const settingsId = Object.keys(settings.val())[0];
			const companyId = this.props.id;
			database().ref(`userSettings/${settingsId}/favoriteCompanies/${companyId}`)
								.set(true).then(data => console.log)
		})
	}
	removeFromUserFavorites = () => {
		getCurrentUserSettingRef().then(settings => {
			const settingsId = Object.keys(settings.val())[0];
			const companyId = this.props.id;
			// empty set = delete()
			database().ref(`userSettings/${settingsId}/favoriteCompanies/${companyId}`)
								.set().then(data => console.log)
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
						goToDetail } = this.props;
		return (
			<article className={`Company ${this.companyIsApproved()}`}>

				<ContextualToggle label={ title }>
					{/* { goToDetail ? <Option action={ () => goToDetail(id) }>Edit</Option> : null } */}
					<Option action={ this.addToUserFavorites }>Add to favorites</Option>
					<Option action={ this.reportBrokenLink }>Report broken link</Option>
				</ContextualToggle>

				<div className="Company-body">
					<h4 className="Company-title">{ title }</h4>
					<a href={ url } className="Company-link">
						<input readOnly value={ url }/>
					</a>
				</div>

			</article>
		)
	}
}
