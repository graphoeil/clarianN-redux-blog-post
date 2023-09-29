// Imports
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

// User post
let UserPost = ({ id, title }) => {
	return(
		<li key={ id }>
			<Link to={ `/posts/${ id }` }>
				{ title }
			</Link>
		</li>
	);
};
UserPost = React.memo(UserPost);

// Component
const UserPage = () => {

	// Store
	const users = useSelector((store) => { return store.users; });
	const { posts } = useSelector((store) => { return store.posts; });

	// UserId
	const { userId } = useParams();

	// This user
	const user = users.find((user) => {
		return user.id === userId;
	});

	// This user posts
	const userPosts = posts.filter((post) => {
		return post.user === userId;
	});
	
	// Return
	return(
		<section>
			<h2>{ user?.name }</h2>
			<ul>
				{
					userPosts.map((post) => {
						return <UserPost key={ post.id } { ...post }/>
					})
				}
			</ul>
		</section>
	);

};

// Export
export default UserPage;