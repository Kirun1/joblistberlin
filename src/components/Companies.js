import React, { Component } from 'react';
import {
	Link,
	NavLink} from 'react-router-dom';
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
		const location = {search: `?search=${window.encodeURIComponent(value)}`}
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

	generateTags(companies) {
		const findHashTags = searchText => {
			var regexp = /\B\#\w\w+\b/g
			let result = searchText.match(regexp);
			if (result) {
				return result.map(item => item.replace('#',''));
			} else {
				return false;
			}
		}

		const tags = companies.map(item => item.body).reduce((acc, curr) => {
			return acc + ' ' + curr
		})

		return findHashTags(tags)
	}

	componentWillMount(props) {
		this.setSearchFromURL(parse(this.props.location.search))
	}

	componentWillReceiveProps(nextProps) {

		let current = this.props.location.search
		let next = nextProps.location.search || ''

		if (current !== next) {
			this.setSearchFromURL(parse(next))
		}
	}
	setSearchFromURL(query) {
		if (query.search) {
			this.setState({
				search: window.decodeURIComponent(query.search)
			})
		}
	}
	generateNav() {
		const items = this.generateTags(this.props.data)

		if (!items) return

		return items.map((item, index) => (
			<NavLink
				className="Nav-item"
				exact
				key={ index }
				to={{
					pathname: '/companies',
					search: `?search=%23${item}`,
					state: {
						search: item
					}
				}}>#{item}</NavLink>
		))
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
				<nav className="Nav Nav--filters">
					<NavLink
						className="Nav-item"
						exact
						to={{
							pathname: '/companies',
							search: '?search=',
							state: { search: '' }
						}}>All</NavLink>

					{ this.generateNav(this.props.data) }
				</nav>

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
