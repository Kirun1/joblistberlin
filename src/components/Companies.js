import queryString from 'query-string';
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

	componentWillMount() {
		const parsedQuery = queryString.parse(this.props.location.search);
		this.setSearch(parsedQuery.search)
	}

	handleSearch = (e) => {
		const {location, history} = this.props;
		var test = location.pathname + '?search=' + e.target.value
		history.push(test);
	}
	setSearch = (search) => {
		console.log('searSearch', search)
		this.setState({
	    search
		});
	}

	applySearch = (company) => {
		const search = this.state.search;
		const searchPool = company.title;
		if (search) {
			return searchPool.toLowerCase().includes(search.toLowerCase())
		}
		return company;
	}

	render() {
		if(!this.props.data) return <Loading/>

		return (
			<div>
				<h2><small>Companies</small> hiring in Berlin</h2>
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
