import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import * as React from "react";
import { Button } from "@mui/material";
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
import { toast, Toaster } from "react-hot-toast";

function UserPasswordReset() {
  const dataObj = {
    password: "",
    cpassword: "",
  };

  const [formData, setFormData] = useState(dataObj);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [email, setEmail] = useState();
  const location = useLocation();
  useEffect(() => {
    setEmail(location.state.email);
  }, []);

  const navigate = useNavigate();
  const changePassword = async (e) => {
    // e.preventDefault();
    if (formData.password === "") {
      toast.error("Enter your new password");
      return;
    } else if (formData.cpassword === "") {
      toast.error("Enter your confirm password");
      return;
    } else if (formData.password.length < 6) {
      toast.error("Password should be greater than or equal to 6 characters");
      return;
    } else if (formData.password != formData.cpassword) {
      toast.error("Both password and confirm password should be same");
      return;
    } else {
      let newPassword = formData.password;
      await axios
        .post("http://localhost:8000/api/user/updatepassword", {
          email,
          newPassword,
        })
        .then(() => alert("New Password set succesfully"))
        .then(() => navigate("/user/login"))
        .catch(console.log);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Toaster />

        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="../images/servifyLogo.png"
            style={{ width: "12rem", borderRadius: "1rem", cursor: "pointer" }}
          />
          <Box sx={{ fontSize: "1.3rem", mt: "1.5rem" }}>Change password</Box>
          <Box
            sx={{
              mt: "0.5rem",
              fontSize: "1rem",
              border: "1px solid black",
              padding: "0.3rem 0.8rem",
              borderRadius: "1rem",
            }}
          >{`${email}`}</Box>
          <Box
            sx={{
              fontSize: "0.9rem",
              fontWeight: "600",
              mt: "2rem",
              alignSelf: "flex-start",
            }}
          >
            Create a strong password
          </Box>
          <Box
            sx={{
              fontSize: "0.9rem",
              mt: "0.6rem",
              alignSelf: "flex-start",
            }}
          >
            Create a new, strong password that you don't use for other websites
          </Box>
          <Box noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="New Password"
              name="password"
              autoFocus
              type="password"
              onChange={inputHandler}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="cpassword"
              label="Confirm Password"
              name="cpassword"
              autoFocus
              type="password"
              onChange={inputHandler}
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
              onClick={changePassword}
            >
              Reset Password
            </Button>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </>
  );
}

export default UserPasswordReset;
