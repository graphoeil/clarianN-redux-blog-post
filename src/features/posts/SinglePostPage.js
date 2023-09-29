// Imports
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

// Component
const SinglePostPage = () => {

	// PostID
	const { postId } = useParams();

	// Store
	const { posts } = useSelector((store) => { return store.posts; });

	// This post
	const post = posts.find((post) => {
		return post.id === postId;
	});

	// Returns
	if (!post){
		return(
			<section>
				<h2>Post not found !</h2>
			</section>
		);
	}
	return(
		<section>
			<article className="post">
				<h2>{ post.title }</h2>
				<PostAuthor userId={ post.user }/>
				<TimeAgo timestamp={ post.date }/>
				<p className="post-content">{ post.content }</p>
				<Link to={ `/editPost/${ postId }` } className="button">
					Edit post
				</Link>
				<ReactionButtons post={ post }/>
			</article>
		</section>
	);

};

// Export
export default SinglePostPage;