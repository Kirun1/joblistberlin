import React from 'react';
import PropTypes from 'prop-types';
import Notification from './Notification';

export default function NotificationDisplay(props, context) {

	if (!context.notifications.length) return null;

	return (
		<aside className="Notifications">
			{
				context.notifications.map((notification, index) => {
					return <Notification
										 key={notification.id}
										 onRemove={ () => context.removeNotification(notification.id) }
										 message={ notification.message }/>
				})
			}
		</aside>
	)
}

NotificationDisplay.contextTypes = {
	notifications: PropTypes.array,
	removeNotification: PropTypes.func
}
