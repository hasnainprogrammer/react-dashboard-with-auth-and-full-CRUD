import { createContext, useState } from "react";
import axios from "axios";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_API_URL = "https://jsonplaceholder.typicode.com/posts";

  // fetch posts
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(BASE_API_URL);
      setPosts(response.data.slice(0, 9));
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  // create post
  const createPost = async (post) => {
    setLoading(true);
    try {
      const response = await axios.post(BASE_API_URL, post);
      const newPost = { ...response.data, id: posts[posts.length - 1]?.id + 1 };
      setPosts((prevPosts) => [...prevPosts, newPost]);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  // update post
  const updatePost = async (updatedPost) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${BASE_API_URL}/${updatedPost.id}`,
        updatedPost
      );
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === updatedPost.id ? response.data : post
        )
      );
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  // delete post
  const deletePost = async (postId) => {
    setLoading(true);
    try {
      const response = await axios.delete(`${BASE_API_URL}/${postId}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PostContext.Provider
      value={{ posts, fetchPosts, createPost, updatePost, deletePost, loading }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
