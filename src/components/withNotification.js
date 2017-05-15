import React, { Component } from 'react';
import PropTypes from 'prop-types';

const withNotification = (Component) => class extends Component {
	static contextTypes = {
		addNotification: PropTypes.func
	}

	render() {
		return <Component addNotification={ this.context.addNotification }/>
	}
}

export default withNotification;
