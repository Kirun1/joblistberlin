import React, { Component } from 'react';
import { database as db } from 'firebase';
import CompanyCard from './CompanyCard';
import Loading from './Loading';

export default class Company extends Component {
	componentDidMount() {
		const id = this.props.match.params.id;
		db().ref(`/links/${id}`).on('value', (snapshot) => {
			const model = snapshot.val();
			this.setState({
				model
			})
		})
	}
	render() {
		if(!this.state) return <Loading/>

		const { model } = this.state;

		return (
		<article>
			<section>
				<h2>{model.title}</h2>
			</section>
			<CompanyCard { ...model }/>
		</article>
		)
	}
}
