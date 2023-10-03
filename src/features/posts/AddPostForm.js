// Imports
import React, { useState } from "react";

// RTK Query
import { useAddPostMutation } from "../../api/apiSlice";
import { useGetUsersQuery } from "../users/usersSlice";

// Component
const AddPostForm = () => {

	// RTK Query
	const [addPost, { isLoading }] = useAddPostMutation();

	// Users
	const { data:users, isSuccess } = useGetUsersQuery();

	// Form state
	const [formData, setFormData] = useState({ title:'', content:'', userId:'' });
	const { title, content, userId } = formData;

	// Inputs change
	const handleChange = (e) => {
		setFormData((oldState) => {
			return { ...oldState, [e.target.name]:e.target.value };
		});
	};

	// Can save, for disabling submit button
	const canSave = [title, content, userId].every(Boolean) && !isLoading;

	// Submit form
	const submitForm = async(e) => {
		e.preventDefault();
		// Is title, content, userId and status = idle ?
		if (canSave){
			try {
				// await for RTK Query
				await addPost({ title, content, user:userId }).unwrap();
				// Reset form
				setFormData((oldState) => {
					return { title:'', content:'', userId:oldState.userId };
				});
			} catch (error){
				console.error('Sorry, failed to save the post => ', error);
			}
		}
	};

	// Returns
	if (isSuccess){
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
					<select name="userId" id="userId" onChange={ handleChange }>
						<option value="">Select an author</option>
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
	}
	return null;

};

// Export
export default AddPostForm;