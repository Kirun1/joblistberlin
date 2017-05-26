import React, { Component } from 'react';
import { database } from 'firebase';
import { getCurrentUser } from '../api/auth';

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
				<button onClick={ this.getUser }>Get user</button>
			</div>
		)
	}
}
