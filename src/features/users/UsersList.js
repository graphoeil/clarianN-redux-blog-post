// Imports
import React from "react";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";

// RTK Query
import { useGetUsersQuery } from "./usersSlice";

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

	// RTK Query
	const { data:users, isLoading, isSuccess, isError, error } = useGetUsersQuery();

	// Returns
	if (isLoading){
		return(
			<section>
				<h2>Users</h2>
				<Spinner/>
			</section>
		);
	}
	if (isError){
		return(
			<section>
				<h2>Users</h2>
				<div>{ error.toString() }</div>
			</section>
		);
	}
	if (isSuccess){
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
	}
	return null;

};

// Export
export default UsersList;