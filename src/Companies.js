import React from 'react';
import {callAPI} from './api';
import Job from './Job.js';

export default class Companies extends React.Component {
  componentDidMount() {
		this.fetchData().then(data => this.setState( { data }));
  }
  fetchData() {
		return callAPI('/links');
  }
	render() {
		return (
			<ul>
				{ Object.values(this.state.data).map((job, index) => <Job key={ index } { ...job }/>) }
			</ul>
		)
	}
}
