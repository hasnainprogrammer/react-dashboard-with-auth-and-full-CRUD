import { Typography, Box, Grid } from "@mui/material";
import SinglePost from "../components/SinglePost";
import Spinner from "../components/Spinner";

function Dashboard({ posts, onDeletePost, onUpdatePost, loading }) {
  if (loading) return <Spinner />;

  return (
    <Box sx={{ margin: "50px" }}>
      <Typography variant="h4" sx={{ marginBottom: "10px" }}>
        Posts
      </Typography>
      <Grid container spacing={2}>
        {posts.map((post) => (
          <SinglePost
            key={post.id}
            post={post}
            onDeletePost={onDeletePost}
            onUpdatePost={onUpdatePost}
          />
        ))}
      </Grid>
    </Box>
  );
}

export default Dashboard;
