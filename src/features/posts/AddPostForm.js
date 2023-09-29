// Imports
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "./postsSlice";

// Component
const AddPostForm = () => {

	// Store
	const users = useSelector((store) => { return store.users; });

	// Dispatch
	const dispatch = useDispatch();

	// Form state
	const [formData, setFormData] = useState({ title:'', content:'', userId:users[0]?.id || '' });
	const [requestStatus, setRequestStatus] = useState('idle');
	const { title, content, userId } = formData;

	// Inputs change
	const handleChange = (e) => {
		setFormData((oldState) => {
			return { ...oldState, [e.target.name]:e.target.value };
		});
	};

	// Can save, for disabling submit button
	const canSave = [title, content, userId].every(Boolean) && requestStatus === 'idle';

	// Submit form
	const submitForm = async(e) => {
		e.preventDefault();
		// Is title, content, userId and status = idle ?
		if (canSave){
			try {
				// Change status
				setRequestStatus('pending');
				// Dispatch and await
				// unwrap() est une méthode utilisée pour extraire la valeur résultante d'une promesse
				await dispatch(addPost({ title, content, user:userId })).unwrap();
				// Reset form
				setFormData({ title:'', content:'', userId:users[0]?.id || '' });
			} catch (error){
				console.error('Sorry, failed to save the post => ', error);
			} finally {
				setRequestStatus('idle');
			}
		}
	};

	// Return
	return(
		<section>
			<h2>Add a new post</h2>
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

				{/* User */}
				<label htmlFor="title">Author :</label>
				<select name="userId" id="userId" defaultValue={ userId } onChange={ handleChange }>
					{
						users.map((user) => {
							return <option key={ user.id } value={ user.id }>
								{ user.name }
							</option>;
						})
					}
				</select>
				{/* User */}

				{/* Button */}
				<button type="submit" disabled={ !canSave }>
					Save post
				</button>
				{/* Button */}

			</form>
		</section>
	);

};

// Export
export default AddPostForm;