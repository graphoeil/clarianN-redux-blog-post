// Imports
import React, { useLayoutEffect } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { useGetUsersQuery } from "../users/usersSlice";
import { useGetNotificationsQuery, allNotificationsRead, 
	selectMetadataEntities } from "./notificationsSlice";

// RTK Query

// Component
const NotificationsList = () => {

	// RTK Query
	const { data:users } = useGetUsersQuery();
	const { data:notifications = [], isSuccess } = useGetNotificationsQuery();
	const notificationsMetadata = useSelector(selectMetadataEntities);

	// Dispatch
	const dispatch = useDispatch();

	// UseLayoutEffect (similar to useEffect, but synchronously after the render !)
	useLayoutEffect(() => {
		dispatch(allNotificationsRead());
	}, [dispatch, notifications]);

	// Returns
	if (isSuccess){
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
						const metadata = notificationsMetadata[notification.id];
						const notificationClassname = classNames('notification', {
							new:metadata.isNew
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
	}
	return null;

};

// Export
export default NotificationsList;