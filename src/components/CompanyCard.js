import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import withNotification from './withNotification';
import ContextualToggle from './ContextualToggle'
import Option from './Option';


class CompanyCard extends Component {
	reportBrokenLink(linkID) {
		const reportURL = `https://docs.google.com/forms/d/e/1FAIpQLSfBpCBvw7ApDW4ZUni85zqZyzHhoJ0aimNAdLc4Jnr_Pxzk7A/viewform?usp=pp_url&entry.727514964=${linkID}&entry.730769846`
		window.open(reportURL, '_blank');
	}

	reportSuggestion(linkID) {
		const reportURL = `https://docs.google.com/forms/d/e/1FAIpQLSeCFXeT92LbiQApCcFHmiWgUxaesV25iXrPNQ2RlcXwpvlsLw/viewform?usp=sf_link&entry.673651500=${linkID}`
		window.open(reportURL, '_blank');
	}

	openInMaps(linkTitle) {
		// the last bit adds the the bicyle lanes layer
		const mapUrl = 'https://www.google.com/maps/search/'
					+ encodeURIComponent(`${linkTitle} berlin germany`)
					+ '/data=!5m1!1e3'
		window.open(mapUrl, '_blank');
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
			createdAt } = this.props;

		return (
			<article
				className={`Company ${this.companyIsApproved()}`}
				title={ body && body }>

				<ContextualToggle label={ title }>
					{/* { <Option action={ () => console.log('yolol') }>Edit</Option> } */}
					<Option action={ () => this.reportBrokenLink(this.props.id) }>Report broken link (&rarr; popup)</Option>
					<Option action={ () => this.reportSuggestion(this.props.id) }>Suggest improvements (&rarr; popup)</Option>
					<Option action={ () => this.openInMaps(this.props.title) }>Show in maps (&rarr; popup)</Option>
				</ContextualToggle>

				<div className="Company-main">
					<div className="Company-header">
						<a href={ url } className="Company-link" target="_blank" rel="noopener noreferrer">
							<h4 className="Company-title">{ title }</h4>
						</a>
					</div>
					<input readOnly value={ url }/>
					{ body && (
							<p className="Company-body">{ body }</p>
					) }
				<Link
			className="Company-permalink"
			to={ `/companies/${id}` }>Permalink</Link>
				</div>
			</article>
		)
	}
}

export default withNotification(CompanyCard);
