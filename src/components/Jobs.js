import React, { Component } from 'react';
import { database } from 'firebase';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import Job from './Job';

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
					<p>
						Positions in this list are all located in the <strong>Berlin area</strong>.<br/>
						Do you want to <Link to="jobs/add">add a job</Link> offer to this list?<br/>
						Find more jobs on the <a href="https://www.facebook.com/pg/joblistberlin/community/" target="_blank">Facebook community</a>.
					</p>

				</section>
				<section className="Section">
					{ this.state.model.map((job, index) => <Job key={ index } model={ job }/>) }
				</section>
			</div>
		)
	}
}
