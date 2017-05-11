import React from 'react';
import {postToCompany} from '../api';

class PostCompany extends React.Component {
  constructor() {
		super();
		this.state = {
	    url: '',
	    title: ''
		};
  }

  handleSubmit = (e) => {
		e.preventDefault();
		postToCompany(this.state);
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
		)
  }
}

export default PostCompany;
