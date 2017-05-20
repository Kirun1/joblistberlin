import React, { Component } from 'react';
import withNotification from './withNotification'
import { database } from 'firebase';
import { serverTime } from '../api';

class AddCompany extends Component {
  constructor() {
		super();
		this.state = {
	    url: '',
	    title: '',
			createdAt: serverTime
		};
  }

  handleSubmit = (e) => {
		e.preventDefault();
		const { addNotification, history } = this.props;
		const { url, title, createdAt } = this.state;
		const newModelRef = database().ref('links').push();
		newModelRef.set({
			url,
			title,
			createdAt
		}).then(newModel => {
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
