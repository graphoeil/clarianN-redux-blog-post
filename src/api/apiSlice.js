// Imports
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create API
export const apiSlice = createApi({
	reducerPath:'api',
	baseQuery:fetchBaseQuery({ baseUrl:'/fakeApi' }),
	// tagTypes for auto-refreshing when data changes
	tagTypes:['Post'],
	endpoints:(builder) => ({
		//////////////////////////////////////////////// Posts
		// Get all posts
		getPosts:builder.query({
			query:() => { return '/posts'; },
			providesTags:(result = [], error, arg) => {
				return ['Post', ...result.map(({ id }) => {
					return { type:'Post', id };
				})];
			}
		}),
		// Get single post
		getPost:builder.query({
			query:(postId) => { return `/posts/${ postId }`; },
			providesTags:(result, error, arg) => {
				return [{ type:'Post', id:arg }];
			}
		}),
		// Add post
		addPost:builder.mutation({
			query:(initialPost) => { return {
				url:'/posts',
				method:'POST',
				body:initialPost
			}; },
			invalidatesTags:['Post']
		}),
		// Edit post
		editPost:builder.mutation({
			query:(post) => { return {
				url:`/posts/${ post.id }`,
				method:'PATCH',
				body:post
			}; },
			invalidatesTags:(result, error, arg) => {
				return [{ type:'Post', id:arg.id }];
			}
		}),
		// Add reactions
		addReactions:builder.mutation({
			query:({ postId, reaction }) => { return {
				url:`/posts/${ postId }/reactions`,
				method:'POST',
				body:{ reaction }
			} },
			// We udpated the post.reactions when query start
			// Then we don't have to wait for the callback ;-)
			// If there was an error, post.reactions come back to previous state
			async onQueryStarted({ postId, reaction }, { dispatch, queryFulfilled }){
				const patchResult = dispatch(apiSlice.util.updateQueryData('getPosts', undefined, draft => {
					const post = draft.find((post) => {
						return post.id === postId;
					});
					if (post){
						post.reactions[reaction]++;
					}
				}));
				try {
					await queryFulfilled;
				} catch (error){
					patchResult.undo();
				}
			},
			invalidatesTags:(result, error, arg) => {
				return [{ type:'Post', id:arg.id }];
			}
		})
		//////////////////////////////////////////////// Users
		// Users methods are moved in usersSlice.js
	})
});

// Actions export
// Because we use react, actions are automatically named
// with this convention => use MethodName Query ;-)
export const { useGetPostsQuery, useGetPostQuery, 
	useAddPostMutation, useEditPostMutation, 
	useAddReactionsMutation } = apiSlice;