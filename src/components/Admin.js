import React, { Component } from 'react';
import { database } from 'firebase';
import { getCurrentUser } from '../actions/auth';

export default class Admin extends Component {
	getUser() {
		getCurrentUser().then(user => {
			database().ref('userSettings')
								.orderByChild('user')
								.equalTo(user.uid)
								.once('value')
								.then(userSettings => {
									console.log(userSettings.val())
								})
		})

	}
	render() {
		return (
			<div className="Admin">
				{/* <button onClick={ this.getUser }>Get user</button> */}
				<ul>
					<li><a href="https://joblistberlin.firebaseio.com">Firebase</a></li>
					<li><a href="https://joblistberlin.firebaseio.com/links/.json">links.json (live)</a></li>
					<li><a href="https://joblistberlin-staging.firebaseio.com/links/.json">link.json (staging)</a></li>
					<li><a href="https://trends.google.com/trends/explore?q=job%20list%20berlin,berlin%20startup%20jobs,jobs%20in%20berlin,work%20in%20berlin,berlin%20job">Google trends</a></li>
				</ul>
			</div>
		)
	}
}
