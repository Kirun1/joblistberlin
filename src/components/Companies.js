import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import withCompanies from '../withCompanies';
import Loading from './Loading';
import CompanyCard from './CompanyCard';
import CompaniesTags from './CompaniesTags';
import IntroText from './IntroText';
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

	setSearchFromURL({search}) {
		if (!search) search = ''
		this.setState({search: window.decodeURIComponent(search)})
	}

	render() {
		if(!this.props.data) return <Loading/>

		return (
			<div>
				<Helmet>
          <title>Companies hiring in Berlin — Job List Berlin</title>
          <meta
					name="description"
					content="A list of companies hiring in Berlin, and a direct link to their career page. Job List Berlin also lists job boards and other websites, making it clear, simple and fast to find a work opportunities in Berlin."/>
        </Helmet>

				<IntroText>
					All <u>{this.props.data.length}</u> companies in this list have <strong>offices in Berlin</strong>, and <strong>job offers</strong> on their website.<br/>
				This is an <strong>open list</strong>,  <Link className="Button Button--validate" to='companies/add'>submit a company.</Link>
				</IntroText>

				<p>You can explore all companies by their tags.</p>

				<nav className="Nav Nav--sticky">
					<label className="FormItem FormItem--h">
						<span>Search</span>
						<input
							type="search"
							title="Search for a company"
							placeholder="company name, description, activity, tag"
							onChange={ (e) => this.handleSearch(e.target.value) }
							value={ this.state.search } />
						<button className="Button" onClick={ this.clearSearch }>Clear</button>
						<CompaniesTags companies={ this.props.data }/>
				</label>
			</nav>

				<div className="Companies">
				{
					this.props.data
						.filter(this.applySearch)
						.map((company, index, companies) => (
							<CompanyCard
								key={ company.id }
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
