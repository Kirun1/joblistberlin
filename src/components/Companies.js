import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Jets from 'jets';
import withFirebase from '../withFirebase';
import Loading from './Loading';
import CompanyCard from './CompanyCard';

class Companies extends Component {
	constructor() {
		super();

		this.state = {
			jetsSearch: '',
			jets: {}
		}
	}

	componentDidMount() {
		const jets = new Jets({
			callSearchManually: true,
			contentTag: '#jetsContent'
		});

		this.setState({
			jets
		})
	}

	componentWillUnmount() {
		this.state.jets.destroy();
	}


	handleSearch = (e) => {
		this.setState({
	    [e.target.name] : e.target.value
		});
		this.state.jets.search(e.target.value)
	}

	render() {
		const { jetsSearch } = this.state;

		if(!this.props.data) return <Loading/>

		return (
			<div>
				<h2><small>A list of </small>companies</h2>
				<p>
					Companies in this list have <strong>offices in Berlin</strong>, and <strong>job offers</strong> on their website.<br/>
					This is a <strong>community curated</strong> list, anyone can <Link to='companies/add'>submit a company</Link> for review.
				</p>

				<label>
					<input
					type="search"
					name="jetsSearch"
					id="jetsSearch"
					title="Search for a company"
					placeholder="Search for a company"
					onChange={ this.handleSearch }
					value={ jetsSearch } />
				</label>

				<div id="jetsContent">
					{ this.props.data.map((company, index) => <CompanyCard key={ index }
					goToDetail={ this.goToCompanyDetail }
					{ ...company } />) }
				</div>
			</div>
		)
	}
}

export default withFirebase('links')(Companies);
