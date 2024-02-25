import * as React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useEffect } from "react";

const defaultTheme = createTheme();

export default function UserLogin() {
  const navigate = useNavigate();
  const navigateToSignUp = () => [navigate("/user/signup")];
  const navigateToUserHomePage = () => [navigate("/user")];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    let email = data.get("email");
    let password = data.get("password");
    console.log(email);
    console.log(password);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/login",
        {
          email,
          password,
        }
      );
      console.log(response);
      const token = response.data.token;
      localStorage.setItem("token", token);
      navigateToUserHomePage();
    } catch (error) {
      alert(error.response.data.error);
      console.error(error);
    }
  };

  function nagigateToEmailTaken() {
    navigate("/user/forget");
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigateToUserHomePage();
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in as user
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            {/* <FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
						/> */}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs={12}>
                <Box
                  sx={{
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    ":hover": { color: "#2962ff" },
                    mb: "3rem",
                  }}
                  variant="body2"
                  onClick={nagigateToEmailTaken}
                >
                  Forgot password?
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  cursor: "pointer",
                  ":hover": { color: "#2962ff" },
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box onClick={navigateToSignUp}>
                  {"Don't have an account? Sign Up"}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
