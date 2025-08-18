import { Typography, Box, Grid } from "@mui/material";
import SinglePost from "../components/SinglePost";
import Spinner from "../components/Spinner";
import { useContext, useEffect } from "react";
import PostContext from "../context/post/PostContext";

function Dashboard() {
  const { posts, fetchPosts, loading } = useContext(PostContext);

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return <Spinner />;

  return (
    <Box sx={{ margin: "50px" }}>
      <Typography variant="h4" sx={{ marginBottom: "10px" }}>
        Posts
      </Typography>
      <Grid container spacing={2}>
        {posts.map((post) => (
          <SinglePost key={post.id} post={post} />
        ))}
      </Grid>
    </Box>
  );
}

export default Dashboard;
