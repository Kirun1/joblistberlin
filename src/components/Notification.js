import React, { Component } from 'react';

export default class Notification extends Component {
	componentDidMount() {
		window.setTimeout(this.props.onRemove, 4000);
	}
	render() {
		return <article>{ this.props.message }</article>
	}
}
