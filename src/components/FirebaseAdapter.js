import React, { Component } from 'react';
import firebase from 'firebase';
import env from '../env.json';

export default class FirebaseAdapter extends Component {
	componentDidMount() {
		var config = {
			"apiKey": env.apiKey,
			"databaseURL": env.databaseURL,
			"authDomain": env.authDomain,
			"storageBucket": env.storageBucket
		};

		// root app just in case we need it
		const firebaseApp = firebase.initializeApp(config, 'jobList');
		this.setState( { firebaseApp });
	}

	render() {
		return (
			<div>
			{ this.props.children }
			</div>
		)
	}
}
