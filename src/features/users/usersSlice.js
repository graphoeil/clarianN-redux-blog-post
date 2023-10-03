// Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";

// RTK Query (endpoints injection)
import { apiSlice } from "../../api/apiSlice";
export const extendedApiSlice = apiSlice.injectEndpoints({
	endpoints:(builder) => ({
		// Get all users
		getUsers:builder.query({
			query:() => { return '/users'; }
		})
	})
});
export const { useGetUsersQuery } = extendedApiSlice;

// Initial state
const initialState = [];

// Async methods
export const fetchUsers = createAsyncThunk('users/fetchUsers', async(_, thunkAPI) => {
	try {
		const response = await client.get('/fakeApi/users');
		return response.data;
	} catch (error){
		console.log(error);
	}
});

// Slice
const usersSlice = createSlice({
	name:'users',
	initialState,
	reducers:{},
	extraReducers:(builder) => {
		// Fetch users
		builder.addCase(fetchUsers.fulfilled, (_, { payload }) => {
			// Because initialState is an array ;-)
			return payload;
		});
	}
});

// Reducer export
export default usersSlice.reducer;