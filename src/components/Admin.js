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

				<script type="text/javascript" src="https://ssl.gstatic.com/trends_nrtr/1294_RC01/embed_loader.js"></script>
				<script type="text/javascript">
					trends.embed.renderExploreWidget("GEO_MAP", {"comparisonItem":[{"keyword":"job list berlin","geo":"","time":"today 12-m"},{"keyword":"berlin startup jobs","geo":"","time":"today 12-m"},{"keyword":"jobs in berlin","geo":"","time":"today 12-m"},{"keyword":"work in berlin","geo":"","time":"today 12-m"},{"keyword":"berlin job","geo":"","time":"today 12-m"}],"category":0,"property":""}, {"exploreQuery":"q=job%20list%20berlin,berlin%20startup%20jobs,jobs%20in%20berlin,work%20in%20berlin,berlin%20job&date=today 12-m,today 12-m,today 12-m,today 12-m,today 12-m","guestPath":"https://trends.google.com:443/trends/embed/"});
				</script>

			</div>
		)
	}
}
