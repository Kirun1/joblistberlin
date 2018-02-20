import React, { Component } from 'react';
import {
	Link,
	NavLink} from 'react-router-dom';
import Tag from './Tag'

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
			tags: []
		}
	}

	componentDidMount() {
		const { companies } = this.props;

		let items = generateTags(companies)
			.reduce((acc,
							 cur) => {
								 if(acc.hasOwnProperty(cur)) {
									 acc[cur]++
								 } else {
									 acc[cur] = 1
								 }
								 return acc
							 }, {})

		let tags = Object.entries(items).sort((a, b) => {
			console.log(a, b)
			return b[1] - a[1]
		})

		console.log('tags', tags)

		this.setState({
			tags
		})
	}

	generateLinks = () => {
		const {tags} = this.state;

		if(!tags) return

		return tags.map((item, index) => (
			<NavLink
				className="Nav-item Tag"
				key={ index }
				to={{
					pathname: '/companies',
					search: `?search=%23${item[0]}`,
					state: {
						search: item
					}
				}}>
				<Tag name={ item[0]} number={ item[1] }></Tag>
			</NavLink>
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
