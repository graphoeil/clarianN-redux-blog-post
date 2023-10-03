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

// Dans le return
<div className={ containerClass }>
	{
		// Sorting the post (by most recent date)
		// Slice return a new array, with a shallow copy of this original array
		sortedPosts.map((post) => {
			return <PostExcerpts key={ post.id } post={ post }/>
		})
	}
</div>

// useMemo, pour stocker des résultats (sort, map, ...)
// Sorted posts
// Le hook “useMemo” permet de mémoriser une variable qui sera uniquement recalculée 
// lorsqu'une de ses dépendances sera mise à jour.
const sortedPosts = useMemo(() => {
	const sortedPosts = posts.slice().sort((a, b) => {
		return b.date.localeCompare(a.date);
	});
	return sortedPosts;
}, [posts]);