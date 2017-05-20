import React, { Component } from 'react';
import { database } from 'firebase';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import AddJob from './AddJob.js';

export default class Jobs extends Component {
	constructor(props) {
		super();
		this.state = {
			model: []
		}
	}
	componentDidMount() {
		database().ref('jobs').on('value', (snapshot) => {
			const model = _.values(snapshot.val());
			this.setState({
				model
			});
		})
	}
	render() {
		return (
			<div className="Jobs">
				<section className="Section">
					<h2>Job<small> board</small></h2>
					<p>Want to add an offer to this list?</p>
					<Link to="jobs/add">Add a job</Link>
				</section>
				<section className="Section">
					<p>Job offers:</p>
					{ this.state.model.map(job => <span>JOBI</span>)}
				</section>
			</div>
		)
	}
}
