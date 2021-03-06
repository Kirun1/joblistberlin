import React, { Component } from 'react';
import {format} from 'date-fns'
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import withCompanies from '../withCompanies';
import Loading from './Loading';
import CompanyCard from './CompanyCard';
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

		const lastCompany = this.props.data.filter((item) => item.isApproved)[0]

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
				This is an <strong>open list</strong>, everyone can <Link className="Button Button--color3" to='companies/add'>add a company.</Link><br/>
				<small title={format(lastCompany.createdAt, 'DD MMMM YYYY')}>Last updated: {format(lastCompany.createdAt, 'YYYY/MM/DD')}</small>
				</IntroText>

				<nav className="Nav Nav--sticky Nav--companies">
					<label className="FormItem FormItem--h">
						<input
							type="search"
							title="Search for a company"
							placeholder="Search all companies, descriptions, #tags..."
							onChange={ (e) => this.handleSearch(e.target.value) }
							value={ this.state.search } />
				</label>
				<button className="Button"  onClick={ this.clearSearch }>Clear</button>
				<Link className="Button Button--color2" to='companies/tags'>Show all<strong> #tags</strong></Link>
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
