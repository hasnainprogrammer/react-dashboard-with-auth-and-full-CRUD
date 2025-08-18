import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Modal,
  Box,
  TextField,
} from "@mui/material";
import { useState, useContext } from "react";
import PostContext from "../context/post/PostContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

function SinglePost({ post }) {
  const [open, setOpen] = useState(false);
  const [editedPost, setEditedPost] = useState({
    id: post.id,
    title: post.title,
    body: post.body,
  });

  const { deletePost, updatePost } = useContext(PostContext);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editedPost.title === "" || editedPost.body === "") {
      alert("please fill the fields");
      return;
    }
    updatePost(editedPost);
    handleClose();
  };

  return (
    <>
      <Grid size={4}>
        <div>
          <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Title"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={editedPost.title}
                  onChange={(e) =>
                    setEditedPost((prevPost) => ({
                      ...prevPost,
                      title: e.target.value,
                    }))
                  }
                />
                <TextField
                  label="Body"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={4}
                  value={editedPost.body}
                  onChange={(e) =>
                    setEditedPost((prevPost) => ({
                      ...prevPost,
                      body: e.target.value,
                    }))
                  }
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ marginTop: 2, bgcolor: "#212529" }}
                >
                  Edit
                </Button>
              </form>
            </Box>
          </Modal>
        </div>
        <Card sx={{ padding: "10px", minHeight: "250px" }}>
          <CardContent>
            <Typography sx={{ fontWeight: "bold", marginBottom: "20px" }}>
              {post.title}
            </Typography>
            <Typography>{post.body}</Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              sx={{ bgcolor: "#2f9e44" }}
              onClick={handleOpen}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              sx={{ bgcolor: "#e03131" }}
              onClick={() => {
                if (confirm("are you sure you want to delete this post")) {
                  deletePost(post.id);
                }
              }}
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
}

export default SinglePost;
