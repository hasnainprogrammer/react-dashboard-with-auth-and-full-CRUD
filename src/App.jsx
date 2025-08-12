import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddPost from "./pages/AddPost";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_API_URL = "https://jsonplaceholder.typicode.com/posts";

  useEffect(() => {
    fetchPosts();
  }, []);

  // user login
  const login = (username, password) => {
    if (username === "admin" && password === "admin") {
      setIsLoggedIn(true);
      return true;
    } else {
      setIsLoggedIn(false);
    }
  };

  // user logout
  const logout = () => {
    setIsLoggedIn(false);
  };

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
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} onLogout={logout} />
      <Routes>
        <Route
          path="*"
          element={<h1 style={{ textAlign: "center" }}>{"Not Found :("}</h1>}
        />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <Dashboard
                posts={posts}
                onDeletePost={deletePost}
                onUpdatePost={updatePost}
                loading={loading}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/dashboard/addpost"
          element={
            isLoggedIn ? (
              <AddPost onCreatePost={createPost} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
