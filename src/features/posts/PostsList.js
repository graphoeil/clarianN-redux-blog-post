// Imports
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import Spinner from "../../components/Spinner";

// Post excerpts
let PostExcerpts = ({ post }) => {
	const { id, date, title, content, user } = post;
	return(
		<article key={ id } className="post-excerpt">
			<h3>{ title }</h3>
			<PostAuthor userId={ user }/>
			<TimeAgo timestamp={ date }/>
			<p>{ content.substring(0, 100) } ...</p>
			<Link to={ `/posts/${ id }` } className="button muted-button">
				View post
			</Link>
			<ReactionButtons post={ post }/>
		</article>
	);
};
// With memo only the post that change is re-render !
PostExcerpts = React.memo(PostExcerpts);

// Component
const PostsList = () => {

	// Store
	const { posts, status, error } = useSelector((store) => { return store.posts; });

	// Sorting the post (by most recent date)
	// Slice return a new array, with a shallow copy of this original array
	const orderedPosts = posts.slice().sort((a, b) => {
		return b.date.localeCompare(a.date);
	});
	
	// Returns
	if (status === 'loading'){
		return(
			<section className="posts-list">
				<h2>Posts</h2>
				<Spinner/>
			</section>
		);
	}
	if (status === 'error'){
		return(
			<section className="posts-list">
				<h2>Posts</h2>
				<div>{ error }</div>
			</section>
		);
	}
	return(
		<section className="posts-list">
			<h2>Posts</h2>
			{
				orderedPosts.map((post) => {
					return <PostExcerpts key={ post.id } post={ post }/>
				})
			}
		</section>
	);

};

// Export
export default PostsList;