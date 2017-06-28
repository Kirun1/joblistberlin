import React, { Component } from 'react';
import { database } from 'firebase';
import { getCurrentUser } from '../actions/auth';
import withNotification from './withNotification';

class PostJob extends Component {
  constructor() {
		super();
		this.state = {
	    title: '',
			description: ''
		};
  }

  handleSubmit = (e) => {
		e.preventDefault();
		const { addNotification, history } = this.props;
		const { title, description, createdAt } = this.state;
		var newModelRef = database().ref('jobs').push();
		getCurrentUser().then(user => {
			newModelRef.set({
				title,
				description,
				createdAt,
				user: user.uid
			})
		}).then(() => {
			addNotification(`The job <${title}> has been added to the board`);
			history.push('/jobs');
		}).catch(error => {
			console.log('AddJob submit error:', error);
		})
  }

  handleChange = (e) => {
		// if it is a URL fetch and set title
		this.setState({
	    [e.target.name] : e.target.value
		});
  }


  render() {
		const { description, title } = this.state;

		return (
			<div>
				<h2>Add <small>a new job</small></h2>
				<form onSubmit={ this.handleSubmit }>
					<article>
						<label>Title:
							<input name="title"  type="text" placeholder="Job's title" onChange={ this.handleChange } value={ title }/>
						</label>
					</article>

					<article>
						<label>Url:
							<textarea name="description" type="text" placeholder="Job's description" onChange={ this.handleChange } value={ description }/>
						</label>
					</article>
					<button type="submit">add Job</button>
				</form>
			</div>
		)
  }
}

export default withNotification(PostJob);
