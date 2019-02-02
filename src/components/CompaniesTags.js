import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Tag from './Tag'

const generateTags = companies => {

	const findHashTags = searchText => {
		// https://regexr.com/46r2p
		var regexp = /(?:\B#)(\w|-?)+\b/g
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
			tags: [],
			tagsAllVisible: false
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
			return b[1] - a[1]
		})

		this.setState({
			tags
		})
	}

	generateLinks = () => {
		const {tags} = this.state;

		if(!tags) return

		return tags.map((item, i) => (
				<Tag key={ i } name={ item[0] } number={ item[1] }/>
		))
	}

	render () {
		return (
			<div className="Tags">
				<div className="Nav Nav--tags">
					<Link
					className="Nav-item Button Button--color4 Tag"
					to={{
						pathname: '/companies',
						search: ''
					}}>All tags</Link>
					{ this.generateLinks() }
				</div>
			</div>
		)
	}
}
