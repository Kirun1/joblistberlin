import React, { Component } from 'react';
import {
	postToCompanies,
	getServerTime as getTime
} from '../api';
import withNotification from './withNotification'

class AddCompany extends Component {
  constructor() {
		super();
		this.state = {
	    url: '',
	    title: ''
		};
  }

  handleSubmit = (e) => {
		e.preventDefault();
		postToCompanies(this.state);
  }

  handleChange = (e) => {
		// if it is a URL fetch and set title
		console.log(e.target.value);
		this.setState({
	    [e.target.name] : e.target.value,
			createdAt: getTime()
		});
  }


  render() {
		const { url, title } = this.state;

		return (
			<div className="AddCompany">
				<h2>Add <small>a new company</small></h2>
				<form onSubmit={ this.handleSubmit }>
					<article>
						<label>Url:
							<input name="url" type="text" placeholder="Company URL" onChange={ this.handleChange } value={ url } title="https://..."/>
						</label>
					</article>

					<article>
						<label>Title:
							<input name="title"  type="text" placeholder="Company name" onChange={ this.handleChange } value={ title }/>
						</label>
					</article>
					<button type="submit">add Company</button>
				</form>
			</div>
		)
  }
}

export default withNotification(AddCompany);
