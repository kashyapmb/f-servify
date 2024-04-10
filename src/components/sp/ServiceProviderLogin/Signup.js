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
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { cities } from "../../../data/cities";
import { services } from "../../../data/services";
import { state } from "../../../data/state";

const steps = [
  "Personal Information",
  "Professional Information",
  "Email verification",
  "Mobile Verification",
];

export default function SignUp() {
  const dataObj = {
    fname: "",
    lname: "",
    mobile: "",
    email: "",
    password: "",
    cpassword: "",
    age: null,
    gender: "",
    city: "",
    location: "",
    profession: "",
    domain: "",
  };
  const [formData, setFormData] = useState(dataObj);
  const [otp, setOTP] = useState("");
  const [mobileOTPinput, setMobileOTPinput] = useState("");
  const [OTPinput, setOTPinput] = useState("");
  const [disable, setDisable] = useState(true);
  const [timerCount, setTimer] = React.useState(60);

  const navigate = useNavigate();
  const navigateToSignIn = () => [navigate("/provider/login")];
  const navigateToServiceProviderHomePage = () => [navigate("/provider")];

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };
  const emailInputHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.toLowerCase() });
  };
  const ageInputHandler = (e) => {
    const { name, value } = e.target;
    if (/^\d{0,2}$/.test(value) && /^[0-9]*$/.test(value))
      setFormData({ ...formData, [name]: Number(value) });
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
  const professionInputHandler = (e) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };
    const selectedService = services.find((obj) => obj.value === value);
    if (selectedService) {
      updatedFormData = { ...updatedFormData, domain: selectedService.domain };
    }
    setFormData(updatedFormData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/provider/create",
        formData
      );
      localStorage.setItem("providerToken", response.data.token);
      toast.success(response.data.msg);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Signup Error:", error);
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
        formData.age &&
        formData.gender &&
        formData.email &&
        formData.password &&
        formData.cpassword
      ) {
        if (await validEmail(formData.email)) {
          if (await emailExist(formData.email)) {
            if (formData.password.length >= 6) {
              if (formData.password == formData.cpassword) {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
              } else {
                alert("Password and C. Password should be same");
              }
            } else {
              alert("Password should be greter than or equal to 6 character");
            }
          } else {
            alert("Enter another email...this email already has been used");
          }
        } else {
          alert("Enter valid Email Address");
        }
      } else {
        alert("Enter all the information");
      }
    }
    if (activeStep === 1) {
      if (
        formData.mobile &&
        formData.profession &&
        formData.location &&
        formData.city
      ) {
        if (await validMobile(formData.mobile)) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
          alert("Enter valid mobile number");
        }
      } else {
        alert("Enter all the information");
      }
    }
    if (activeStep === 2) {
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
    }
    if (activeStep === 3) {
      if (
        formData.mobile &&
        formData.profession &&
        formData.location &&
        formData.city
      ) {
        if (await validMobile(formData.mobile)) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          // await handleSubmit(e);
          // alert("Account succesfully created");
          // navigateToServiceProviderHomePage();
        } else {
          alert("Enter valid mobile number");
        }
      } else {
        alert("Enter all the information");
      }
    }
  };

  const [activeStep, setActiveStep] = React.useState(0);
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
                          value={formData.lname}
                          onChange={inputHandler}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="age"
                          label="Age"
                          type="number"
                          onChange={ageInputHandler}
                          value={formData.age}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Gender
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formData.gender}
                            label="Gender"
                            name="gender"
                            onChange={inputHandler}
                          >
                            <MenuItem value={"Male"}>Male</MenuItem>
                            <MenuItem value={"Female"}>Female</MenuItem>
                            <MenuItem value={"Other"}>Other</MenuItem>
                          </Select>
                        </FormControl>
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
                    <Grid container spacing={2}>
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
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label2">
                            Profession
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label2"
                            id="demo-simple-select"
                            value={formData.profession}
                            label="Profession"
                            name="profession"
                            onChange={professionInputHandler}
                          >
                            {services.map((obj) => {
                              return (
                                <MenuItem value={obj.value}>
                                  {obj.value}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            State
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formData.city}
                            label="City"
                            name="city"
                            onChange={inputHandler}
                          >
                            {state.map((obj) => {
                              return (
                                <MenuItem value={obj.value}>
                                  {obj.value}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            City
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formData.city}
                            label="City"
                            name="city"
                            onChange={inputHandler}
                          >
                            {cities.map((obj) => {
                              return (
                                <MenuItem value={obj.value}>
                                  {obj.value}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="location"
                          label="Location"
                          value={formData.location}
                          onChange={inputHandler}
                        />
                      </Grid>

                      {/* this is hidden field...just paatiya....aana vagar width set noti thati  */}
                      <Grid item xs={12} sx={{ visibility: "hidden" }}>
                        <TextField
                          required
                          fullWidth
                          name="temp"
                          label="temp"
                          type="password"
                          id="password"
                        />
                      </Grid>
                      <Grid item xs={12} sx={{ visibility: "hidden" }}></Grid>
                    </Grid>
                  </React.Fragment>
                )}
                {activeStep === 2 && (
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
                {activeStep === 3 && (
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
                {/* {activeStep === 2 && (
										<React.Fragment>
											<Grid container spacing={2}>
												<Grid item xs={12}>
													<Typography>{`Verify your email : ${formData.email}`}</Typography>
													<Typography>{`Open Gmail into given account and click on the given link to successfully verify your account`}</Typography>
												</Grid>
											</Grid>
										</React.Fragment>
									)} */}
                <Box sx={{ display: "flex", flexDirection: "row", pt: 4 }}>
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
                    <Button onClick={handleNext} variant="contained">
                      Create Account
                    </Button>
                  ) : (
                    <Button onClick={handleNext}>Next</Button>
                  )}
                </Box>
              </React.Fragment>
            </Box>
            {activeStep == 0 && (
              <Grid
                container
                justifyContent="center"
                mt="2rem"
                sx={{ cursor: "pointer", ":hover": { color: "#2962ff" } }}
              >
                <Box onClick={navigateToSignIn}>
                  Already have an account? Sign in
                </Box>
              </Grid>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
