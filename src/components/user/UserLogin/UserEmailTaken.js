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
import { createContext } from "react";
function UserEmailTaken() {
  const OtpContext = createContext();

  const [email, setEmail] = useState("");
  const inputHandler = (e) => {
    setEmail(e.target.value);
  };

  const navigate = useNavigate();

  function isValidEmail(e) {
    // Regular expression for validating email addresses
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(e);
  }
  const emailExist = async (e) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/user/search/${e}`
      );
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValidEmail(email)) {
      if (await emailExist(email)) {
        const OTP = Math.floor(Math.random() * 9000 + 1000);

        console.log(OTP);
        console.log(email);
        axios
          .post("http://localhost:8000/send_recovery_email", {
            OTP,
            recipient_email: email,
          })
          .then(() =>
            navigate("/user/otpverify", {
              state: { otp: OTP, email: email },
            })
          )
          .catch(console.log);
      } else {
        alert("Email not exist in our database");
      }
    } else {
      alert("Enter valid email");
    }
  };
  return (
    <>
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
          <img
            src="../images/servifyLogo.png"
            style={{
              width: "12rem",
              borderRadius: "1rem",
              cursor: "pointer",
            }}
          />
          <Box sx={{ fontSize: "1.3rem", mt: "2rem" }}>
            Enter your Email Address
          </Box>
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
            >
              Continue
            </Button>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </>
  );
}

export default UserEmailTaken;
