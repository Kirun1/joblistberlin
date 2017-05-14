import React from 'react';
import PropTypes from 'prop-types';

export default function NotificationDisplay(props, context) {
	return (
		<p>
			{ context.messages.map(message => <article>{message}</article>) }
		</p>
	)
}

NotificationDisplay.contextTypes = {
	messages: PropTypes.array
}
