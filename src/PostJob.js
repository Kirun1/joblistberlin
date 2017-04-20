import React from 'react';
import {postJobs} from './api';

class PostJob extends React.Component {
  constructor() {
		super();
		this.state = {
	    url: '',
	    title: ''
		};
  }

  handleSubmit = (e) => {
		e.preventDefault();
		postJobs(this.state);
  }

  handleChange = (e) => {
		// if it is a URL fetch and set title
		console.log(e.target.value);
		this.setState({
	    [e.target.name] : e.target.value
		});
  }


  render() {
		const { url, title } = this.state;

		return (
			<form onSubmit={ this.handleSubmit }>
				<label>Url:
					<input name="url" type="text" placeholder="Job URL" onChange={ this.handleChange } value={ url }/>
				</label>

				<label>Title:
					<input name="title"  type="text" placeholder="Job title" onChange={ this.handleChange } value={ title }/>
					<button type="submit">Post job</button>
				</label>
			</form>
		)
  }
}

export default PostJob;
