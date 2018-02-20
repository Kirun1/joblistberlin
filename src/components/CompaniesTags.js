import React, { Component } from 'react';
import {
	Link,
	NavLink} from 'react-router-dom';

const generateTags = companies => {

	const findHashTags = searchText => {
		var regexp = /\B\#\w\w+\b/g
		let result = searchText.match(regexp);
		if (result) {
			return result.map(item => item.replace('#',''));
		} else {
			return false;
		}
	}

	const tags = companies
		.map(item => item.body)
		.reduce((acc, curr) => {
			return acc + ' ' + curr
		})

	return findHashTags(tags)
}

export default class CompaniesTags extends Component {

	constructor() {
		super()
		this.state = {
			items: []
		}
	}

	componentDidMount() {
		const { companies } = this.props;

		const items =  generateTags(companies).filter((value, index, self) => {
			return self.indexOf(value) === index;
		})

		this.setState({
			items
		})
	}

	generateLinks = () => {
		const {items} = this.state;

		if(!items) return

		return items.map((item, index) => (
			<NavLink
				className="Nav-item"
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

	render () {
		return (
			<div className="Nav Nav--filters">
				<Link
					className="Nav-item"
					to={{
						pathname: '/companies',
						search: ''
					}}>All</Link>

				{ this.generateLinks() }

			</div>
		)
	}
}
