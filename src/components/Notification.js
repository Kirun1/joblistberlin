import React, { Component } from 'react';

export default class Notification extends Component {
	componentDidMount() {
		this.timer = setTimeout(this.props.onRemove, 8000);
	}

	componentWillUnmount() {
		clearTimeout(this.timer);
	}

	render() {
		return <article className="Notification"
										onClick={ this.props.onRemove }>{ this.props.message }</article>
	}
}
