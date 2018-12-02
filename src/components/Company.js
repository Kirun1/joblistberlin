import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { database as db } from 'firebase';
import { Link } from 'react-router-dom';
import CompanyCard from './CompanyCard';
import Loading from './Loading';

export default class Company extends Component {
	async componentDidMount() {
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
				<Helmet>
          <title>{model.title} - Careers</title>
          <meta
						name="description"
						content={ `Job opportunities @ ${model.title} in Berlin — ${model.body}` } />
        </Helmet>
				<CompanyCard { ...model }/>
				<section>
					<h3>Website preview, <a href={model.url}>open it!</a></h3>

					<iframe
						src={model.url}
						className="CompanySitePreview"/>
					<p>
						Explore all jobs on <a href={model.url}>{model.title}</a>, or go back to <Link to="/">all companies</Link>.
				</p>
				</section>
			</article>
		)
	}
}
