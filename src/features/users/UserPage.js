// Imports
import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";

// RTK Query
import { useGetPostsQuery } from "../../api/apiSlice";
import { useGetUsersQuery } from "../../features/users/usersSlice";

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

	// UserId
	const { userId } = useParams();

	// User
	const { data:users } = useGetUsersQuery();
	const { data:posts } = useGetPostsQuery();

	// RTK Query
	// This user
	const user = useMemo(() => {
		return users.find((user) => {
			return user.id === userId;
		});
	}, [users, userId]);
	// This user posts with useMemo (optimization)
	const userPosts = useMemo(() => {
		return posts.filter((post) => {
			return post.user === userId;
		});
	}, [posts, userId]);
	
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