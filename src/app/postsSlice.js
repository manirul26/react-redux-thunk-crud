// postsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response.data;
});

export const addPost = createAsyncThunk('posts/addPost', async (postData) => {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', postData);
    return response.data;
});

export const updatePost = createAsyncThunk('posts/updatePost', async ({ id, postData }) => {
    const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, postData);
    return response.data;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (postId) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    return postId;
});

const initialState = {
    posts: [],
    loading: false,
    error: null
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    //  extraReducers: builder => {
    /*     addCase((fetchPosts.pending): (state) => {
          state.loading = true;
          state.error = null;
        }), */

    extraReducers: builder => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addPost.fulfilled, (state, action) => {
                state.posts.push(action.payload);
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                const updatedPost = action.payload;
                state.posts = state.posts.map(post =>
                    post.id === updatedPost.id ? updatedPost : post
                );
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter(post => post.id !== action.payload);
            })
         
    },
});

export default postsSlice.reducer;
