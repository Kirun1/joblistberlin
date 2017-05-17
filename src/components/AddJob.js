import React, { Component } from 'react';
import {
	postToJobs,
	getServerTime as getTime
} from '../api';

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
		postToJobs(this.state);
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

export default PostJob;
