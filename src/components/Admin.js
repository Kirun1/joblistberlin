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
				<a href="https://joblistberlin.firebaseio.com">(live) Firebase root</a>
				<a href="https://joblistberlin.firebaseio.com/links/.json">(live) model: links </a>
				<a href="https://joblistberlin-staging.firebaseio.com/links/.json">(staging) Firebase root</a>
			</div>
		)
	}
}
