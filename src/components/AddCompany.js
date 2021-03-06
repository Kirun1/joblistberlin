import React, { Component } from 'react';
import withNotification from './withNotification'
import { postCompany } from '../actions/companies';

class AddCompany extends Component {
  constructor() {
		super();
		this.state = {
	    url: '',
	    title: '',
			body: ''
		};
  }

  handleSubmit = (e) => {
		e.preventDefault();
		const { addNotification, history } = this.props;
		const { url, title, body  } = this.state;

		postCompany(title, url, body).then(newModel => {
			console.log('addcompany:submit sucess');
			addNotification(`The company ${title} has been added`);
			history.push('/companies');
		}).catch(error => {
			console.log('addCompany:submit error:', error);
			addNotification(`error adding the company: ${error}`);
		})
  }

  handleChange = (e) => {
		this.setState({
	    [e.target.name] : e.target.value
		});
  }


  render() {
		const { url, title, body } = this.state;

		return (
			<div className="AddCompany">
				<h2>Add <small>a new company</small></h2>
				<p>You can submit a new company to the list. Note that:</p>
				<ul>
					<li>Only <strong>companies/job-boards/...</strong> websites are accepted</li>
					<li><strong>URL</strong>s should lead directly to a job/career page</li>
					<li>All submissions are <strong>reviewed</strong> before publication</li>
				</ul>
				<form onSubmit={ this.handleSubmit }>
					<article>
						<label>Name:
							<input required name="title"  type="text" placeholder="Company name" onChange={ this.handleChange } value={ title }/>
						</label>
					</article>
					<article>
						<label>Url:
							<input required name="url" type="url" placeholder="Company's website /job" onChange={ this.handleChange } value={ url } title="https://..."/>
						</label>
					</article>
					<article>
						<label>Description:
							<textarea name="body" type="text" maxLength="999" placeholder="What is this company about? #startup #bar #jobBoard ..." onChange={ this.handleChange } value={ body } title="Write a little description about this Company, what it does, or what type of jobs it offers (max. 1000 characters)"></textarea>
						</label>
					</article>
					<button className="Button Button--validate" type="submit">add Company</button>
				</form>
			</div>
		)
  }
}

export default withNotification(AddCompany);
