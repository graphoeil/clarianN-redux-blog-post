// Imports
import React from "react";
import { useParams, Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import Spinner from "../../components/Spinner";

// RTK Query
import { useGetPostQuery } from "../../api/apiSlice";

// Component
const SinglePostPage = () => {

	// PostID
	const { postId } = useParams();

	// RTK Query
	const { data:post, isFetching, isSuccess } = useGetPostQuery(postId);

	// Returns
	if (isFetching){
		return(
			<section>
				<article className="post">
					<Spinner/>
				</article>
			</section>
		);
	}
	if (isSuccess){
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
	}
	return null;

};

// Export
export default SinglePostPage;