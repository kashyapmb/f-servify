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
import { useNavigate } from "react-router-dom";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { toast, Toaster } from "react-hot-toast";
import PhoneInput from "react-phone-input-2";

const steps = [
  "Personal Information",
  "Verify Email Address",
  "Verify Mobile Number",
];

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
  const [mobileOTPinput, setMobileOTPinput] = useState("");
  const [OTPinput, setOTPinput] = useState("");
  const [disable, setDisable] = useState(true);
  const [timerCount, setTimer] = React.useState(60);
  const [activeStep, setActiveStep] = React.useState(0);

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

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const emailInputHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.toLowerCase() });
  };
  const mobileInputHandler = (e) => {
    setFormData({ ...formData, mobile: e });
  };

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

  const OTPinputHandler = (e) => {
    let str = e.target.value;
    if (/^\d{0,4}$/.test(str)) {
      setOTPinput(str);
    }
  };
  const MobileOTPinputHandler = (e) => {
    let str = e.target.value;
    if (/^\d{0,6}$/.test(str)) {
      setMobileOTPinput(str);
    }
  };

  const navigate = useNavigate();
  const navigateToSignIn = () => [navigate("/user/login")];

  const validMobile = async (mobile) => {
    if (/^\d{12}$/.test(mobile)) {
      return true;
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/create",
        formData
      );
      console.log(response);
      localStorage.setItem("userToken", response.data.token);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

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
  const sendOTPtogivenMobile = async (e) => {
    e.preventDefault();

    const mobile = "+" + formData.mobile;
    console.log(mobile);

    try {
      await axios
        .post("http://localhost:8000/sendOTP", {
          mobile,
        })
        .then((response) => {
          console.log(response);
          toast.success("OTP sent to given number!");
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleNext = async (e) => {
    e.preventDefault();
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
                  toast.error("Password and C. Password should be same");
                }
              } else {
                toast.error(
                  "Password should be greater than or equal to 6 character"
                );
              }
            } else {
              toast.error(
                "Email exist in our database...try again with new email address"
              );
            }
          } else {
            toast.error("Enter valid email address");
          }
        } else {
          toast.error("Enter valid mobile  number");
        }
      } else {
        toast.error("Enter all the information");
      }
    } else if (activeStep === 1) {
      try {
        if (OTPinput == otp) {
          await sendOTPtogivenMobile(e);
          setTimer(60);
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          return;
        } else {
          toast.error(
            "The code you have entered is not correct, try again or re-send the link"
          );
        }
      } catch (error) {
        console.log(error);
      }
    } else if (activeStep === 2) {
      const mobile = '+' + formData.mobile;
      try {
        await axios
          .post("http://localhost:8000/enterotp", {
            mobile,
            otp: mobileOTPinput,
          })
          .then(async (response) => {
            console.log(response);
            toast.success("Mobile Verified");
            await handleSubmit(e);
            toast.success("Account created succesfully");
            navigate("/user");
            return;
          });
      } catch (error) {
        toast.error("Enter valid OTP");
        console.log(error);
      }
    }
  };

  return (
    <Box sx={{ padding: "0 0 5rem 0" }}>
      <Toaster />
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
                        <PhoneInput
                          fullWidth
                          inputStyle={{ width: "100%", height: "3.5rem" }}
                          country={"in"}
                          value={formData.mobile}
                          onChange={mobileInputHandler}
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
                  <Box sx={{ width: "20rem" }}>
                    <Box
                      sx={{
                        fontSize: "1.3rem",
                        mt: "1rem",
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
                  </Box>
                )}
                {activeStep === 2 && (
                  <React.Fragment>
                    <Grid container spacing={2} sx={{ ml: "1rem" }}>
                      <Box>
                        <Box
                          sx={{
                            fontSize: "1.3rem",
                            mt: "2rem",
                            fontWeight: "600",
                          }}
                        >
                          Mobile Verification
                        </Box>
                        <Box>
                          <Box
                            sx={{
                              fontSize: "1rem",
                              mt: "2rem",
                              alignSelf: "center",
                            }}
                          >
                            We have sent a code to this number :{" +"}
                            {formData.mobile}
                          </Box>
                        </Box>
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                          <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="otp"
                            label="Enter 6 digit OTP"
                            name="otp"
                            autoComplete="otp"
                            autoFocus
                            value={mobileOTPinput}
                            onChange={MobileOTPinputHandler}
                          />
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
                    onClick={() => {
                      setActiveStep((prevActiveStep) => prevActiveStep - 1);
                    }}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />

                  {activeStep === 0 ? (
                    <Button onClick={handleNext} variant="contained">
                      Next
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="contained"
                      onClick={handleNext}
                    >
                      Verify OTP
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
