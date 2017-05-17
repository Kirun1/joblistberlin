import React, { Component } from 'react';
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
		return (
		<div>
			<p>Companies in this list have <strong>officies in Berlin</strong>, and <strong>job offers</strong> on their website.</p>
			<div className="Companies">
				{ this.state.model.map((job, index) => <Company key={ index } { ...job }/>) }
			</div>
		</div>
		)
	}
}
