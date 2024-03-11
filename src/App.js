// App.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, addPost, updatePost, deletePost } from './app/postsSlice';

const App = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.posts);
  const loading = useSelector(state => state.posts.loading);
  const error = useSelector(state => state.posts.error);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleAddPost = async () => {
    const newPost = {
      title: 'New Post',
      body: 'Lorem ipsum dolor sit amet...',
      userId: 1 // Example user ID
    };
    dispatch(addPost(newPost));
  };

  const handleUpdatePost = async (id, updatedPostData) => {
    dispatch(updatePost({ id, postData: updatedPostData }));
  };

  const handleDeletePost = async (postId) => {
    dispatch(deletePost(postId));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Posts</h1>
      <button onClick={handleAddPost}>Add Post</button>
      {posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <button onClick={() => handleUpdatePost(post.id, { title: 'Updated Post' })}>Update</button>
          <button onClick={() => handleDeletePost(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default App;
