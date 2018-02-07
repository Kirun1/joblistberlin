import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withCompanies from '../withCompanies';
import Loading from './Loading';
import CompanyCard from './CompanyCard';
import {parse} from 'query-string';

class Companies extends Component {
	constructor() {
		super();

		this.state = {
			search: ''
		}
	}

	handleSearch = (value) => {
		this.setState({search: value})
		// Update query param in URL as well.
		const location = {search: `?search=${value}`}
		this.props.history.replace(location)
	}

	applySearch = (company) => {
		return this.buildSearchPool(company)
							 .toLowerCase()
							 .includes(this.state.search.toLowerCase())
	}
	clearSearch = () => {
		this.handleSearch('')
	}
	buildSearchPool(company) {
		return company.title + company.body
	}

	componentWillMount() {
		// Set initial search query from the URL.
			const params = parse(this.props.location.search)
		if (params.search) {
			this.setState({search: params.search})
		}
	}

	render() {
		if(!this.props.data) return <Loading/>

		return (
			<div>
				<h2><small>Companies</small> hiring in Berlin</h2>
				<p>
					Companies in this list have <strong>offices in Berlin</strong>, and <strong>job offers</strong> on their website.<br/>
					This is a <strong>community curated</strong> list, anyone can <Link className="Button Button--validate" to='companies/add'>submit a company</Link> for review.
				</p>

				<label className="FormItem FormItem--h">
					<input
					type="search"
					title="Search for a company"
					placeholder="Search for a company"
					onChange={ (e) => this.handleSearch(e.target.value) }
					value={ this.state.search } />
					<button className="Button" onClick={ this.clearSearch }>Clear</button>
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

export default withCompanies(Companies);
