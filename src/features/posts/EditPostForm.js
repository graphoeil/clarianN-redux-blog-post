// Imports
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { postUpdated } from "./postsSlice";

// Component
const EditPostForm = () => {

	// PostID
	const { postId } = useParams();

	// Store
	const { posts } = useSelector((store) => { return store.posts; });

	// Post
	const post = posts.find((post) => {
		return post.id === postId;
	});

	// Dispatch
	const dispatch = useDispatch();

	// Form state
	const [formData, setFormData] = useState({
		title:post.title,
		content:post.content
	});

	// Inputs change
	const handleChange = (e) => {
		setFormData((oldState) => {
			return { ...oldState, [e.target.name]:e.target.value };
		});
	};

	// Submit form
	const navigate = useNavigate();
	const submitForm = (e) => {
		e.preventDefault();
		// Variables
		const { title, content } = formData;
		// Is title and content
		if (!title || !content){ return; }
		// Dispatch
		dispatch(postUpdated({ id:postId, title, content }));
		// Navigate to post page
		navigate(`/posts/${ postId }`);
	};

	// Return
	return(
		<section>
			<h2>Edit post</h2>
			<form onSubmit={ submitForm }>

				{/* Title */}
				<label htmlFor="title">Post title :</label>
				<input type="text" name="title" id="title"
					value={ formData.title } onChange={ handleChange } />
				{/* Title */}

				{/* Content */}
				<label htmlFor="content">Post content :</label>
				<textarea name="content" id="content"
					value={ formData.content } onChange={ handleChange } />
				{/* Content */}

				{/* Button */}
				<button type="submit">
					Save post
				</button>
				{/* Button */}

			</form>
		</section>
	);

};

// Export
export default EditPostForm;