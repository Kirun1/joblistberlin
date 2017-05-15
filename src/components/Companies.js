import React from 'react';
import {callAPI} from '../api';
import Loading from './Loading';
import Company from './Company';
import PostCompany from './PostCompany';

export default class Companies extends React.Component {
  componentDidMount() {
		this.fetchData().then(data => this.setState( { data }));
  }
  fetchData() {
		return callAPI('/links');
  }
	render() {
		if( !this.state ) return <Loading/>
		return (
		<div>
			<h2><small>A list of </small>companies</h2>
			<p>Companies in this list have <strong>officies in Berlin</strong>, and have <strong>job offers</strong> on their website.</p>
			<PostCompany/>
			<div className="Companies">
				{
					Object.values(this.state.data)
								.map((job, index) => <Company key={ index } { ...job }/>)
				}
			</div>
		</div>
		)
	}
}
