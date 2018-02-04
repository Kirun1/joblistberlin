import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withFirebase from '../withFirebase';
import Loading from './Loading';
import CompanyCard from './CompanyCard';

class Companies extends Component {
	constructor() {
		super();

		this.state = {
			search: ''
		}
	}

	handleSearch = (e) => {
		this.setState({
	    search : e.target.value
		});
	}

	applySearch = (company) => {
		return company.title.toLowerCase().includes(this.state.search.toLowerCase())
	}

	render() {
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
			title="Search for a company"
			placeholder="Search for a company"
			onChange={ this.handleSearch }
			value={ this.state.search } />
				</label>

				<div className="Companies">
					{
						this.props.data
								.filter(this.applySearch)
								.map((company, index) => (
									<CompanyCard
									key={ company.id }
									goToDetail={ this.goToCompanyDetail }
									{ ...company }
									/>
								))
					}
				</div>
			</div>
		)
	}
}

export default withFirebase('links')(Companies);
