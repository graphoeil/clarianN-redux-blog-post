// Imports
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from "../features/posts/postsSlice";
import usersReducer from "../features/users/usersSlice";
import notificationsReducer from "../features/notifications/notificationsSlice";

// Store
const store = configureStore({
	reducer:{
		posts:postsReducer,
		users:usersReducer,
		notifications:notificationsReducer
	}
});

// Export
export default store;