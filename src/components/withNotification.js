import React, { Component } from 'react';
import PropTypes from 'prop-types';

const withNotification = (ExtendedComponent) => class extends Component {
	static contextTypes = {
		addNotification: PropTypes.func
	}

	render() {
		return <ExtendedComponent {...this.props} addNotification={ this.context.addNotification }/>
	}
}

export default withNotification;
