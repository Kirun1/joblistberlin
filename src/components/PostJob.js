import React from 'react';
import {postToJobs} from '../api.js';

class PostJob extends React.Component {
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
	    [e.target.name] : e.target.value
		});
  }


  render() {
		const { description, title } = this.state;

		return (
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
				<button type="submit">Post job</button>
			</form>
		)
  }
}

export default PostJob;
