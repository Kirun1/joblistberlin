import React from 'react';
import {postToJobs} from '../api.js';

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
		postToJobs(this.state);
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
				<article>
					<label>Url:
						<input name="url" type="text" placeholder="Job URL" onChange={ this.handleChange } value={ url }/>
					</label>
				</article>

				<article>
					<label>Title:
						<input name="title"  type="text" placeholder="Job title" onChange={ this.handleChange } value={ title }/>
					</label>
				</article>

				<article>
					<label>Url:
						<textarea name="description" type="text" placeholder="Job URL" onChange={ this.handleChange } value={ url }/>
					</label>
				</article>
				<button type="submit">Post job</button>
			</form>
		)
  }
}

export default PostJob;
