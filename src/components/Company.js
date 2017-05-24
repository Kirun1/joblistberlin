import React, { Component } from 'react';
import ContextualToggle from './ContextualToggle'
import Option from './Option';

export default class Job extends Component {
	constructor() {
		super();
		this.state = {
			visible: false
		}
	}
	option1() {
		window.alert("opt 1")
	}
	option2() {
		console.log("option 2 visiblllle")
		this.setState({
			visible: true
		})
	}
	option3() {
		console.log('option3')
	}
	render() {
		let companyStatus;
		const { id, title, url, isApproved } = this.props;

		if (isApproved) {
			companyStatus = 'Company--isApproved';
		} else {
			companyStatus = 'Company--isNotApproved';
		}
		return (
			<article key={ id } className={`Company ${companyStatus}`}>
				{ this.state.visible ?
					<div className="Company-body">
						<h4 className="Company-title">{title}</h4>
						<a href={url} className="Company-link">{url}</a>
					</div>
					: <p>lol</p>
				}
				<ContextualToggle>
					<Option action={ this.option1 }>Edit</Option>
					<Option action={ this.option2.bind(this) }>Add to favorites</Option>
					<Option action={ this.option3 }>Report broken link</Option>
				</ContextualToggle>
			</article>
		)
	}
}
