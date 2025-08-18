import { Box, Typography, Paper, TextField, Button } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/auth/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault();
    const loggedin = login(username, password);
    if (loggedin) {
      navigate("/dashboard")
    } else {
      alert("Login failed, invalid credentials.")
    }
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
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2, bgcolor: "#212529" }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default Login;
