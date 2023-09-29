// Imports
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./app/Navbar";
import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";
import EditPostForm from "./features/posts/EditPostForm";
import SinglePostPage from "./features/posts/SinglePostPage";
import UsersList from "./features/users/UsersList";
import UserPage from "./features/users/UserPage";
import NotificationsList from "./features/notifications/NotificationsList";

// Component
const App = () => {

	// Return
	return(
		<Router>

			{/* Navbar */}
			<Navbar/>
			{/* Navbar */}

			{/* App */}
			<div className="app">

				{/* Routes */}
				<Routes>

					{/* Home */}
					<Route path="/" element={ <React.Fragment>
						<AddPostForm/>
						<PostsList/>
					</React.Fragment> }/>
					{/* Home */}

					{/* Single post */}
					<Route path="/posts/:postId" element={ <SinglePostPage/> }/>
					{/* Single post */}

					{/* Edit post */}
					<Route path="/editPost/:postId" element={ <EditPostForm/> }/>
					{/* Edit post */}

					{/* Users list */}
					<Route path="/users" element={ <UsersList/> }/>
					{/* Users list */}

					{/* User posts */}
					<Route path="/users/:userId" element={ <UserPage/> }/>
					{/* User posts */}

					{/* Notifications */}
					<Route path="/notifications" element={ <NotificationsList/> }/>
					{/* Notifications */}

				</Routes>
				{/* Routes */}

			</div>
			{/* App */}

		</Router>
	);

};

// Export
export default App;