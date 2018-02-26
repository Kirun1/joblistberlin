import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { database } from 'firebase';
import { format } from 'date-fns';
import withNotification from './withNotification';
import { getCurrentUserSettingRef } from '../actions/auth';
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
	reportBrokenLink(linkID) {
		const reportURL = `https://docs.google.com/forms/d/e/1FAIpQLSfBpCBvw7ApDW4ZUni85zqZyzHhoJ0aimNAdLc4Jnr_Pxzk7A/viewform?usp=pp_url&entry.727514964=${linkID}&entry.730769846`
		window.open(reportURL, '_blank');
	}
	companyIsFavorited() {
		if (this.props.isFavorite) {
			return 'Company--isFavorite';
		} else {
			return 'Company--isNotFavorite';
		}
	}
	companyIsApproved() {
		if (this.props.isApproved) {
			return 'Company--isApproved';
		} else {
			return 'Company--isNotApproved';
		}
	}

	render() {

		const {
			id,
			title,
			url,
			body,
			createdAt,
			isFavorite } = this.props;

		return (
			<article
				className={`Company ${this.companyIsFavorited()} ${this.companyIsApproved()}`}
				title={ body && body }>

				<ContextualToggle label={ title }>
					{/* { <Option action={ () => console.log('yolol') }>Edit</Option> } */}
					<Option action={ () => this.reportBrokenLink(this.props.id) }>Report broken link (popup)</Option>
				</ContextualToggle>

				<div className="Company-main">
					<div className="Company-header">
						<a href={ url } className="Company-link" target="_blank" rel="noopener noreferrer">
							<h4 className="Company-title">{ title }</h4>
						</a>
						<Link
							className="Company-createdDate"
							to={ `/companies/${id}` }>{ format(createdAt, 'YYYY-MM') }</Link>
					</div>
					<input readOnly value={ url }/>
					{ body && (
							<p className="Company-body">{ body }</p>
					) }
				</div>
			</article>
		)
	}
}

export default withNotification(CompanyCard);
