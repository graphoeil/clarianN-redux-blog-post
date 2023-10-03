// Imports
import React from "react";
import { useGetUsersQuery } from "../users/usersSlice";

// Component
const PostAuthor = ({ userId }) => {

	// RTK Query
	const { data:users } = useGetUsersQuery();

	// Author
	const author = users.find((user) => {
		return user.id === userId;
	});

	// Return
	return <span style={ { fontWeight:'bold' } }>
		by { author ? author.name : 'John Doe' }
	</span>;

};

// Export
export default PostAuthor;