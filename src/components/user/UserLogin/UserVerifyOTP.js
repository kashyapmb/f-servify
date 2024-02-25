import { useState } from "react";
import * as React from "react";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
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

function UserVerifyOTP() {
  const navigate = useNavigate();
  const [ct, setCT] = useState(0);

  const location = useLocation();
  const { otp, email } = location.state || {};

  const [timerCount, setTimer] = React.useState(60);
  const [OTPinput, setOTPinput] = useState("");
  const [disable, setDisable] = useState(true);

  function resendOTP() {
    if (disable) return;
    axios
      .post("http://localhost:8000/send_recovery_email", {
        OTP: otp,
        recipient_email: email,
      })
      .then(() => setDisable(true))
      .then(() => alert("A new OTP has succesfully been sent to your email."))
      .then(() => setTimer(60))
      .catch(console.log);
  }

  function verfiyOTP(e) {
    e.preventDefault();
    if (OTPinput == otp) {
      navigate("/user/resetpass", { state: { email: email } });
    } else if (ct === 3) {
      navigate("/user/forget");
      alert("u have entered wrong otp more than 3 times");
    } else {
      alert(
        "The code you have entered is not correct, try again or re-send the link"
      );
      setCT(ct + 1);
    }
  }

  const inputHandler = (e) => {
    let str = e.target.value;
    if (/^\d{0,4}$/.test(str)) {
      setOTPinput(str);
    }
  };

  React.useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval);
  }, [disable]);

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
            style={{ width: "12rem", borderRadius: "1rem", cursor: "pointer" }}
          />
          <Box sx={{ fontSize: "1.3rem", mt: "2rem", fontWeight: "600" }}>
            Email Verification
          </Box>
          <Box>
            <Box
              sx={{
                fontSize: "1rem",
                mt: "2rem",
                alignSelf: "center",
              }}
            >
              We have sent a code to your email : {email}
            </Box>
          </Box>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="otp"
              label="Enter 4 digit OTP"
              name="otp"
              autoComplete="otp"
              autoFocus
              value={OTPinput}
              onChange={inputHandler}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={verfiyOTP}
            >
              Verify account
            </Button>
          </Box>

          <Box sx={{ display: "flex", mt: "2rem" }}>
            <Box>Didn't recieve code?</Box>&nbsp;
            <Box
              style={{
                color: disable ? "gray" : "blue",
                cursor: disable ? "none" : "pointer",
                textDecorationLine: disable ? "none" : "underline",
              }}
              onClick={() => resendOTP()}
            >
              {disable ? ` Resend OTP in ${timerCount}s` : " Resend OTP"}
            </Box>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </>
  );
}

export default UserVerifyOTP;
