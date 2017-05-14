import React, { Component } from 'react';

export default class Notification extends Component {
	componentDidMount() {
		this.timer = setTimeout(this.props.onRemove, 8000);
		console.log('letime', this.timer)
	}

	componentWillUnmount() {
		clearTimeout(this.timer);
		console.log('this.timer ciao', this.timer);
	}

	render() {
		return <article className="Notification"
										onClick={ this.props.onRemove }>{ this.props.message }</article>
	}
}
