// Imports
import React from "react";
import { useSelector } from "react-redux";

// Component
const PostAuthor = ({ userId }) => {

	// Store
	const author = useSelector((store) => {
		return store.users.find((user) => {
			return user.id === userId;
		});
	});

	// Return
	return <span style={ { fontWeight:'bold' } }>
		by { author ? author.name : 'John Doe' }
	</span>;

};

// Export
export default PostAuthor;