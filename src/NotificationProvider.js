import React, { Component } from 'react';
import PropTypes from 'prop-types';
import reject from 'lodash/reject';

export default class NotificationProvider extends Component {

	static childContextTypes = {
		notifications: PropTypes.array,
		addNotification: PropTypes.func,
		removeNotification: PropTypes.func
	}

	constructor() {
		super();
		this.state = {
			notifications: []
		}
	}

	getChildContext() {
    return {
			notifications: this.state.notifications,
			addNotification: this.addNotification.bind(this),
			removeNotification: this.removeNotification.bind(this)
		};
  }

	removeNotification(id) {
		this.setState({
			notifications: reject(this.state.notifications, {id})
		})
	}

	addNotification(message) {
		const notification = {
			message,
			id: Date.now()
		}
		this.setState({
			notifications: [...this.state.notifications, notification]
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
