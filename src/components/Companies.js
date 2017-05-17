import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { callAPI } from '../api';
import Loading from './Loading';
import Company from './Company';

export default class Companies extends Component {
	constructor() {
		super();
		this.state = {
			model: null
		}
	}
  componentDidMount() {
		callAPI('links').then((model) => {
			this.setState({
				model
			})
		})
	}
	render() {
		if (!this.state.model ) return <Loading/>
		const { match } = this.props;
		return (
		<div>
			<p>
				Companies in this list have <strong>officies in Berlin</strong>, and <strong>job offers</strong> on their website.<br/>
				This is a <strong>community currated</strong> list, anyone can <Link to='companies/add'>submit a company</Link> for review.
			</p>
			<div className="Companies">
				{ this.state.model.map((job, index) => <Company key={ index } { ...job }/>) }
			</div>
		</div>
		)
	}
}
