// Imports
import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
// Here client is like axios (REST Api)
import { client } from "../../api/client";

// Initial state
const initialState = {
	posts:[],
	status:'idle',
	error:null
};

// Async methods
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async(_, thunkAPI) => {
	try {
		const response = await client.get('/fakeApi/posts');
		return response.data;
	} catch (error){
		return thunkAPI.rejectWithValue(error);
	}
});
export const addPost = createAsyncThunk('posts/addPost', async(post, thunkAPI) => {
	try {
		const response = await client.post('/fakeApi/posts', post);
		return response.data;
	} catch (error){
		return thunkAPI.rejectWithValue(error);
	}
});

// Slice
const postsSlice = createSlice({
	name:'posts',
	initialState,
	reducers:{
		// Add new post (with posts here in initialState)
		// With REST Api we use addPost async methods !
		// Then id, date and reactions are managed by the Api
		postAdded:{
			reducer(state, { payload }){
				state.posts.push(payload);
			},
			prepare(title, content, userId){
				return {
					payload:{
						id:nanoid(),
						date:new Date().toISOString(),
						title,
						content,
						user:userId,
						reactions:{
							thumbsUp:0,
							raisingHands:0,
							heart:0,
							rocket:0,
							eyes:0
						}
					}
				};
			}
		},
		// Add new post (twice), with nanoid() in method ;-)
		// So the prepare method is not so great...
		postAddedTwice:(state, { payload:{ title, content, userId } }) => {
			const newId = nanoid();
			state.push({
				id:newId,
				date:new Date().toISOString(),
				title,
				content,
				user:userId,
				reactions:{
					thumbsUp:0,
					raisingHands:0,
					heart:0,
					rocket:0,
					eyes:0
				}
			});
		},
		// Edit post
		postUpdated:(state, { payload:{ id, title, content } }) => {
			const updatedPost = state.posts.find((post) => {
				return post.id === id;
			});
			if (updatedPost){
				updatedPost.title = title;
				updatedPost.content = content;
			}
		},
		// Reaction emojis
		reactionAdded:(state, { payload:{ postId, reaction } }) => {
			const existingPost = state.posts.find((post) => {
				return post.id === postId;
			});
			if (existingPost){
				// Increase reaction
				existingPost.reactions[reaction]++;
			}
		},
	},
	extraReducers:(builder) => {
		// Fetch posts
		builder.addCase(fetchPosts.pending, (state) => {
			state.status = 'loading';
		}).addCase(fetchPosts.fulfilled, (state, { payload }) => {
			return { ...state, status:'succeeded', posts:payload };
		}).addCase(fetchPosts.rejected, (state, { payload:{ message } }) => {
			return { ...state, status:'failed', error:message };
		});
		// Add post
		builder.addCase(addPost.fulfilled, (state, { payload }) => {
			return { ...state, status:'succeeded', posts:[ ...state.posts, payload ] };
		});
	}
});

// Actions export
export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;

// Slice export
export default postsSlice.reducer;