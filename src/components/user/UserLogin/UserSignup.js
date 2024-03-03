import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
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
import { useState } from "react";
import { useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const steps = ["Personal Information", "Verify Email Address"];

export default function UserSignup() {
  const dataObj = {
    fname: "",
    lname: "",
    mobile: "",
    email: "",
    password: "",
    cpassword: "",
  };

  const [formData, setFormData] = useState(dataObj);
  const [otp, setOTP] = useState("");
  const [OTPinput, setOTPinput] = useState("");
  const [disable, setDisable] = useState(true);
  const [timerCount, setTimer] = React.useState(60);

  React.useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [disable]);

  const sendOTPtogivenEmail = async (e) => {
    e.preventDefault();

    const OTP = Math.floor(Math.random() * 9000 + 1000);
    setOTP(OTP);

    await axios
      .post("http://localhost:8000/send_recovery_email", {
        OTP,
        recipient_email: formData.email,
      })
      .catch(console.log);
  };

  const resendOTP = async () => {
    if (disable) return;
    const OTP = Math.floor(Math.random() * 9000 + 1000);
    await axios
      .post("http://localhost:8000/send_recovery_email", {
        OTP,
        recipient_email: formData.email,
      })
      .then(() => setOTP(OTP))
      .then(() => setDisable(true))
      .then(() => alert("A new OTP has succesfully been sent to your email."))
      .then(() => setTimer(60))
      .catch(console.log);
  };

  const verfiyOTP = async (e) => {
    e.preventDefault();
    try {
      if (OTPinput == otp) {
        console.log("Called");
        await handleSubmit(e);
        alert("Account created succesfully");
        navigate("/user");
        return;
      } else {
        alert(
          "The code you have entered is not correct, try again or re-send the link"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const OTPinputHandler = (e) => {
    let str = e.target.value;
    if (/^\d{0,4}$/.test(str)) {
      setOTPinput(str);
    }
  };
  const emailInputHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.toLowerCase() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/create",
        formData
      );
      localStorage.setItem("userToken", response.data.token);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Signup Error:", error);
    }
  };

  const navigate = useNavigate();
  const navigateToSignIn = () => [navigate("/user/login")];

  //Stepper for sign up
  const [activeStep, setActiveStep] = React.useState(0);

  const isValidEmail = async (e) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(e);
  };
  const emailExist = async (e) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/user/search/${e}`
      );
      return false;
    } catch (error) {
      return true;
    }
  };

  const validMobile = async (mobile) => {
    if (/^\d{10}$/.test(mobile)) {
      return true;
    }
    return false;
  };

  const handleNext = async (e) => {
    if (activeStep === 0) {
      if (
        formData.fname &&
        formData.lname &&
        formData.mobile &&
        formData.email &&
        formData.password &&
        formData.cpassword
      ) {
        if (await validMobile(formData.mobile)) {
          if (await isValidEmail(formData.email)) {
            if (await emailExist(formData.email)) {
              if (formData.password.length >= 6) {
                if (formData.password == formData.cpassword) {
                  await sendOTPtogivenEmail(e);
                  setTimer(60);
                  setActiveStep((prevActiveStep) => prevActiveStep + 1);
                } else {
                  alert("Password and C. Password should be same");
                }
              } else {
                alert(
                  "Password should be greater than or equal to 6 character"
                );
              }
            } else {
              alert("Email exist in our database...try with new email address");
            }
          } else {
            alert("Enter valid email");
          }
        } else {
          alert("Enter valid mobile  number");
        }
      } else {
        alert("Enter all the information");
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ padding: "0 0 5rem 0" }}>
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            noValidate
            sx={{
              mt: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: "1rem 0",
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    {/* <LockOutlinedIcon /> */}
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Create Account
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ width: "50%" }}>
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
            </Box>
            <Box
              sx={{
                width: "50%",
                mt: "3rem",
              }}
            >
              <React.Fragment>
                {activeStep === 0 && (
                  <React.Fragment>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          autoComplete="given-name"
                          name="fname"
                          required
                          fullWidth
                          id="firstname"
                          label="First Name"
                          autoFocus
                          value={formData.fname}
                          onChange={inputHandler}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id="lastName"
                          label="Last Name"
                          name="lname"
                          autoComplete="family-name"
                          value={formData.lname}
                          onChange={inputHandler}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="mobile"
                          label="Mobile No."
                          name="mobile"
                          autoComplete="mobile"
                          value={formData.mobile}
                          onChange={inputHandler}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          value={formData.email}
                          onChange={emailInputHandler}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          value={formData.password}
                          onChange={inputHandler}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="cpassword"
                          label="Confirm Password"
                          type="password"
                          id="cpassword"
                          value={formData.cpassword}
                          onChange={inputHandler}
                        />
                      </Grid>
                    </Grid>
                  </React.Fragment>
                )}
                {activeStep === 1 && (
                  <React.Fragment>
                    <Grid container spacing={2} sx={{ ml: "1rem" }}>
                      <Box
                        sx={{
                          fontSize: "1.3rem",
                          mt: "2rem",
                          fontWeight: "600",
                        }}
                      >
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
                          We have sent a code to this email : {formData.email}
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
                          onChange={OTPinputHandler}
                        />
                      </Box>

                      <Box sx={{ display: "flex", mt: "0.5rem", mb: "3rem" }}>
                        <Box>Didn't recieve code?</Box>&nbsp;
                        <Box
                          style={{
                            color: disable ? "gray" : "blue",
                            cursor: disable ? "none" : "pointer",
                            textDecorationLine: disable ? "none" : "underline",
                          }}
                          onClick={() => resendOTP()}
                        >
                          {disable
                            ? ` Resend OTP in ${timerCount}s`
                            : " Resend OTP"}
                        </Box>
                      </Box>
                    </Grid>
                  </React.Fragment>
                )}

                <Box
                  sx={{
                    display: "flex",
                    mt: "2rem",
                  }}
                >
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />

                  {activeStep === steps.length - 1 ? (
                    <Button
                      type="submit"
                      variant="contained"
                      onClick={verfiyOTP}
                    >
                      Create account
                    </Button>
                  ) : (
                    <Button onClick={handleNext} variant="contained">
                      Next
                    </Button>
                  )}
                </Box>
              </React.Fragment>
            </Box>

            {/* Already have an account  */}
            <Grid
              container
              justifyContent="center"
              mt="2rem"
              sx={{ cursor: "pointer", ":hover": { color: "#2962ff" } }}
            >
              <Grid item>
                <Box onClick={navigateToSignIn}>
                  Already have an account? Sign in
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
