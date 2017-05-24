import React, { Component } from 'react';
import { database as db } from 'firebase';
import CompanyCard from './CompanyCard';
import Loading from './Loading';

export default class Company extends Component {
	componentDidMount() {
		const id = Number(this.props.match.params.id);
		db().ref('/links').orderByChild('createdAt').equalTo(id).on('value', (snapshot) => {
			const model = snapshot.val();
			const item = Object.keys(model)
			this.setState({
				model: model[item]
			})
		})
	}
	render() {
		if(!this.state) return <Loading/>

		const { model } = this.state;

		return (
		<article>
			<section>
				<h2>Edit <small>{model.title}</small></h2>
			</section>
			<CompanyCard { ...model }/>
		</article>
		)
	}
}
