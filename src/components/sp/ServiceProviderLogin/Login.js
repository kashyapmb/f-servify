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
import { useState } from "react";
import { useEffect } from "react";

const defaultTheme = createTheme();

export default function Login() {
  const [email, setEmail] = useState();
  const emailInputHandler = (e) => {
    setEmail(e.target.value.toLowerCase());
  };
  const validEmail = async (email) => {
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return true;
    }
    return false;
  };
  const emailExist = async (email) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/provider/search/${email}`
      );
      return true;
    } catch (error) {
      return false;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    let password = data.get("password");
    if (email && password) {
      if (await validEmail(email)) {
        if (await emailExist(email)) {
          try {
            const response = await axios.post(
              "http://localhost:8000/api/provider/signin/",
              {
                email,
                password,
              }
            );
            const token = response.data.token;
            localStorage.setItem("providerToken", token);
            navigateToProviderHomePage();
          } catch (error) {
            alert("Invalid email or Password");
            console.error(error);
          }
        } else {
          alert("Email not exist in our databse");
        }
      } else {
        alert("Enter valid Email Address");
      }
    } else {
      alert("Enter all information");
    }
  };

  const navigate = useNavigate();
  function navigateToSignUp() {
    navigate("/provider/signup");
  }
  function navigateToProviderHomePage() {
    navigate("/provider");
  }
  function nagigateToEmailTaken() {
    navigate("/provider/forget");
  }

  useEffect(() => {
    if (localStorage.getItem("providerToken")) {
      navigate("/provider");
    }
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
            Sign in
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
              label="Email Address"
              name="email"
              autoFocus
              value={email}
              onChange={emailInputHandler}
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
      </Container>
    </ThemeProvider>
  );
}
