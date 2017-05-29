import React, { Component } from 'react';
import { database } from 'firebase';
import withNotification from './withNotification';
import { getCurrentUserSettingRef } from '../api/auth';
import ContextualToggle from './ContextualToggle'
import Option from './Option';

class CompanyCard extends Component {
	addToUserFavorites = () => {
		const { addNotification,
						id,
						title } = this.props;

		getCurrentUserSettingRef().then(settings => {
			const settingsId = Object.keys(settings.val())[0];
			database().ref(`userSettings/${settingsId}/favoriteCompanies/${id}`)
								.set(true).then(() => {
									addNotification(`<${title}> added to your favorites`);
								})
		})
	}
	reportBrokenLink() {
		console.log('report broken link')
	}
	companyIsApproved() {
		if (this.props.isFavorite) {
			 return 'Company--isFavorite';
		} else {
			 return 'Company--isNotFavorite';
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

export default withNotification(CompanyCard);
