import React from 'react';
import Jobs from './Jobs';
import PostJob from './PostJob';
import {callAPI} from './api';

export default class App extends React.Component {
  componentDidMount() {
		this.fetchData().then(data => this.setState( { data }));
  }
  fetchData() {
		return callAPI('/links');
  }
  render() {
		if(!this.state) {
	    return null;
		}
		return (
				<div>
				<PostJob/>
				<Jobs data={ this.state.data }/>
				</div>
		);
  }
}
