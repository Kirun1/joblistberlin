import React from 'react';
import Jobs from './Jobs';

export default class App extends React.Component {

    componentDidMount()
    {
	this.fetchData().then(data => this.setState( { data }));
    }
    
    fetchData()
    {
	let url = 'https://joblistberlin-staging.firebaseio.com/links.json';
	return fetch(url).then(response => response.json());

    }
    render()
    {
	if(!this.state) {
	    return null;
	}
	return<Jobs data={ this.state.data }/>;
    }
}

