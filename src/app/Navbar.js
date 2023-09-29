// Imports
import React from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications } from "../features/notifications/notificationsSlice";

// Component
const Navbar = () => {

	// Store
	const notifications = useSelector((store) => { return store.notifications; });

	// Dispatch
	const dispatch = useDispatch();

	// Badge
	const numUnreadNotifications = notifications.filter((notication) => {
		return !notication.read;
	}).length;

	// Links
	const blogLinks = [
		{ id:0, title:'Posts', url:'/' },
		{ id:1, title:'Users', url:'/users' },
		{ id:2, title:`Notifications`, url:'/notifications' }
	];

	// Return
	return(
		<nav>
			<section>
				<h1>Redux Blog Post</h1>
				<div className="navContent">
					<div className="navLinks">
						{
							blogLinks.map((blogLink) => {
								const { id, title, url } = blogLink;
								if (id === 2){
									return(
										<NavLink key={ id } to={ url } className={ ({ isActive }) => {
											return isActive ? 'active' : '';
										} }>
											{ title } 
											{ numUnreadNotifications > 0 && <span className="badge">{ numUnreadNotifications }</span> }
										</NavLink>
									);
								}
								return(
									<NavLink key={ id } to={ url } className={ ({ isActive }) => {
										return isActive ? 'active' : '';
									} }>
										{ title }
									</NavLink>
								);
							})
						}
					</div>
					<button className="button" onClick={ () => { dispatch(fetchNotifications()); } }>
						Refresh notifications
					</button>
				</div>
			</section>
		</nav>
	);

};

// Export
export default Navbar;