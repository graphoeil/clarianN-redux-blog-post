// Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";

// Intitial state
const initialState = [];

// Async methods
export const fetchNotifications = createAsyncThunk('notifications/fetchNotifications', async(_, thunkAPI) => {
	try {
		/* const [latestNotifications] = ... : C'est de la déstructuration de tableau en JS
		Cela signifie qu'à partir du tableau retourné par getState().notifications, 
		nous prenons le premier élément (qui semble être la dernière notification). 
		C'est ensuite stocké dans la variable latestNotifications. */
		const [latestNotifications] = thunkAPI.getState().notifications;
		const latestTimestamp = latestNotifications ? latestNotifications.date : '';
		const response = await client.get(`/fakeApi/notifications?since=${ latestTimestamp }`);
		return response.data;
	} catch (error){
		return thunkAPI.rejectWithValue(error);
	}
});

// Slice
const notificationsSlice = createSlice({
	name:'notifications',
	initialState,
	reducers:{
		// All notifications
		allNotificationsRead:(state) => {
			state.forEach((notification) => {
				notification.read = true;
			});
		}
	},
	extraReducers:(builder) => {
		// Fetch notifications
		builder.addCase(fetchNotifications.fulfilled, (state, { payload }) => {
			state.push(...payload);
			state.sort((a, b) => {
				return b.date.localeCompare(a.date);
			});
			state.forEach((notification) => {
				// Set isNew to not read property,
				// In NotificationsList, useLayoutEffect dispatch
				// allNotificationsRead after the component render
				// which set all old notification to read = false ;-)
				notification.isNew = !notification.read;
			});
		});
	}
});

// Actions export
export const { allNotificationsRead } = notificationsSlice.actions;

// Reducer export
export default notificationsSlice.reducer;