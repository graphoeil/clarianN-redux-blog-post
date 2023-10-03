// Imports
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import Spinner from "../../components/Spinner";

// RTK Query
import { useGetPostsQuery } from "../../api/apiSlice";

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

	// RTK Query replace useSelector here
	// Refetch for re-fetching data after adding a post
	const { data:posts = [], isLoading, isSuccess, isError, error, 
		isFetching, refetch } = useGetPostsQuery();

	// Stored posts
	// Le hook “useMemo” permet de mémoriser une variable qui sera uniquement recalculée 
	// lorsqu'une de ses dépendances sera mise à jour.
	const sortedPosts = useMemo(() => {
		const sortedPosts = posts.slice().sort((a, b) => {
			return b.date.localeCompare(a.date);
		});
		return sortedPosts;
	}, [posts]);

	// Returns
	if (isLoading){
		return(
			<section className="posts-list">
				<h2>Posts</h2>
				<Spinner/>
			</section>
		);
	}
	if (isError){
		return(
			<section className="posts-list">
				<h2>Posts</h2>
				<div>{ error.toString() }</div>
			</section>
		);
	}
	if (isSuccess){
		const containerClass = classNames('post-container', {
			disabled:isFetching
		})
		// With RTK Query we must wait for isSuccess
		// or wait after status is not isLoading or not isError ;-)
		return(
			<section className="posts-list">
				<h2>Posts</h2>
				<button onClick={ refetch }>
					Refetch posts
				</button>
				<div className={ containerClass }>
					{
						// Sorting the post (by most recent date)
						// Slice return a new array, with a shallow copy of this original array
						sortedPosts.map((post) => {
							return <PostExcerpts key={ post.id } post={ post }/>
						})
					}
				</div>
			</section>
		);
	}
	return null;

};

// Export
export default PostsList;