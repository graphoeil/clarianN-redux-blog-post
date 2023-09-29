// Imports
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// User
let User = ({ id, name }) => {
	return(
		<li key={ id }>
			<Link to={ `/users/${ id }` }>
				{ name }
			</Link>
		</li>
	);
};
User = React.memo(User);

// Component
const UsersList = () => {

	// Store
	const users = useSelector((store) => { return store.users; });

	// Return
	return(
		<section>
			<h2>Users</h2>
			<ul>
				{
					users.map((user) => {
						return <User key={ user.id } { ...user }/>
					})
				}
			</ul>
		</section>
	);

};

// Export
export default UsersList;