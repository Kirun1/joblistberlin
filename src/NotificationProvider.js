import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NotificationProvider extends Component {
	constructor() {
		super();
		this.state = {
			messages: []
		}
	}

	getChildContext() {
    return {
			messages: this.state.messages,
			addNotification: this.addNotification.bind(this)
		};
  }

	addNotification(message) {
		this.setState({
			messages: [...this.state.messages, message]
		})
	}

	render() {
		return (
			<div className="NotificationProvider">
				{ this.props.children }
			</div>
		)
	}
}

NotificationProvider.childContextTypes = {
  messages: PropTypes.array,
	addNotification: PropTypes.func
};
