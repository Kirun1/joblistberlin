import React, { Component } from 'react';
import { database } from 'firebase';
import withNotification from './withNotification';
import { getCurrentUserSettingRef } from '../api/auth';
import ContextualToggle from './ContextualToggle'
import Option from './Option';

class CompanyCard extends Component {
	toggleToUserFavorites = () => {
		const { addNotification,
						id,
						title,
						isFavorite } = this.props;
		var status,
				message;

		if (isFavorite) {
			status = null;
			message = `Removed ${title}`;
		} else {
			status = true;
			message = `Added ${title}`;
		}

		getCurrentUserSettingRef().then(settings => {
			const settingsId = Object.keys(settings.val())[0];
			database().ref(`userSettings/${settingsId}/favoriteCompanies/${id}`)
								.set(status).then(() => {
									addNotification(message);
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

		const { title,
						url,
						isFavorite } = this.props;
		return (
			<article className={`Company ${this.companyIsApproved()}`}>

				<ContextualToggle label={ title }>
					{/* { goToDetail ? <Option action={ () => goToDetail(id) }>Edit</Option> : null } */}
					{ isFavorite ? (
					<Option action={ this.toggleToUserFavorites }>Remove from favorites</Option>
					) : (
					<Option action={ this.toggleToUserFavorites }>Add to favorites</Option>
					) }

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
