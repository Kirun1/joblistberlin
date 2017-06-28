import React, { Component } from 'react';
import withNotification from './withNotification'
import { postCompany } from '../actions/companies';

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
		const { addNotification, history } = this.props;
		const { url, title  } = this.state;

		postCompany(title, url).then(newModel => {
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
		const { url, title } = this.state;

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
							<input name="title"  type="text" placeholder="Company name" onChange={ this.handleChange } value={ title }/>
						</label>
					</article>
					<article>
						<label>Url:
							<input name="url" type="url" placeholder="Company's website /job" onChange={ this.handleChange } value={ url } title="https://..."/>
						</label>
					</article>
					<button type="submit">add Company</button>
				</form>
			</div>
		)
  }
}

export default withNotification(AddCompany);
