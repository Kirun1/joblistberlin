import React from 'react';
import {callAPI} from './api';
import Company from './Company.js';
import Loading from './Loading.js';

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
		<div className="Companies">
			{
				Object.values(this.state.data)
							.map((job, index) => <Company key={ index } { ...job }/>)
			}
		</div>
		)
	}
}
