import { Typography, Box, AppBar, Toolbar, Link } from "@mui/material";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import AuthContext from "../context/auth/AuthContext";

function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <AppBar position="static" sx={{ bgcolor: "#212529" }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">
          <Link
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: "none",
              color: "#fff",
              fontFamily: '"Roboto","Helvetica","Arial", "sans-serif"',
            }}
          >
            Logo
          </Link>
        </Typography>
        <Box>
          {isLoggedIn && (
            <>
              <Link
                component={RouterLink}
                to="/dashboard"
                sx={{
                  margin: "0 10px",
                  textDecoration: "none",
                  color: "#fff",
                  fontFamily: '"Roboto","Helvetica","Arial", "sans-serif"',
                }}
              >
                Dashboard
              </Link>
              <Link
                component={RouterLink}
                to="/dashboard/addpost"
                sx={{
                  margin: "0 10px",
                  textDecoration: "none",
                  color: "#fff",
                  fontFamily: '"Roboto","Helvetica","Arial", "sans-serif"',
                }}
              >
                Add Post
              </Link>
              <Link
                component={RouterLink}
                sx={{
                  margin: "0 10px",
                  textDecoration: "none",
                  color: "#fff",
                  fontFamily: '"Roboto","Helvetica","Arial", "sans-serif"',
                }}
                onClick={() => logout()}
              >
                Logout
              </Link>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
