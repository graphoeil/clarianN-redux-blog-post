// Imports
import React, { useLayoutEffect } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { allNotificationsRead } from "./notificationsSlice";
import classNames from "classnames";

// Component
const NotificationsList = () => {

	// Store
	const users = useSelector((store) => { return store.users; });
	const notifications = useSelector((store) => { return store.notifications; });

	// Dispatch
	const dispatch = useDispatch();

	// UseLayoutEffect (similar to useEffect, but synchronously after the render !)
	useLayoutEffect(() => {
		dispatch(allNotificationsRead());
	}, [dispatch, notifications]);

	// Return
	return(
		<section className="notifications">
			<h2>Notifications</h2>
			{
				notifications.map((notification) => {
					const date = parseISO(notification.date);
					const timeAgo = formatDistanceToNow(date);
					const user = users.find((user) => {
						return user.id === notification.user;
					});
					const notificationClassname = classNames('notification', {
						new:notification.isNew
					});
					return(
						<div key={ notification.id } className={ notificationClassname }>
							<div>
								<b>{ user?.name || 'John Doe' }</b> { notification.message }
							</div>
							<div title={ notification.date }>
								<i>{ timeAgo } ago</i>
							</div>
						</div>
					);
				})
			}
		</section>
	);

};

// Export
export default NotificationsList;