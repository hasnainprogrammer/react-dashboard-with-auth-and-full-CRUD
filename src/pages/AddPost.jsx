import { Box, Typography, Paper, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddPost({ onCreatePost }) {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postTitle === "" || postBody === "") {
      alert("please fill the fields");
      return;
    }
    const post = {
      title: postTitle,
      body: postBody,
    };
    onCreatePost(post);
    navigate("/dashboard");
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "70px",
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: 320 }}>
        <Typography variant="h5" gutterBottom>
          Add Post
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
          />
          <TextField
            label="Body"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={postBody}
            onChange={(e) => setPostBody(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2, bgcolor: "#212529" }}
          >
            Post
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default AddPost;
