// Imports
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from "../features/posts/postsSlice";
import usersReducer from "../features/users/usersSlice";
import notificationsReducer from "../features/notifications/notificationsSlice";

// RTK Query
import { apiSlice } from "../api/apiSlice";

// Store
const store = configureStore({
	reducer:{
		posts:postsReducer,
		users:usersReducer,
		notifications:notificationsReducer,
		// RTK Query
		[apiSlice.reducerPath]:apiSlice.reducer
	},
	// RTK Query
	// We must add middleware
	middleware:(getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(apiSlice.middleware)
	}
});

// Export
export default store;