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

const steps = ["Personal Information", "Professional Information"];

export default function SignUp() {
  const dataObj = {
    fname: "",
    lname: "",
    mobile: 0,
    email: "",
    password: "",
    cpassword: "",
    age: 0,
    city: "",
    address: "",
    profession: "",
    profilePhoto: "",
    uploadImage: [],
    actualrating: 0,
    completedwork: 0,
  };
  const [formData, setFormData] = useState(dataObj);

  const navigate = useNavigate();
  const navigateToSignIn = () => [navigate("/providerlogin")];
  const navigateToServiceProviderHomePage = () => [
    navigate("/serviceprovider"),
  ];

  const inputHandler = (e) => {
    const { name, value } = e.target;
    // console.log(name)
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // setFormData({ ...formData, profilePhoto: uploadedImage })

    // console.log(uploadedImage)
    // console.log(formData)
    // console.log(JSON.stringify(formData))

    try {
      const response = await axios.post(
        "http://localhost:8000/api/provider/create",
        formData
      );
      localStorage.setItem("token", response.data.token);
      toast.success(response.data.msg);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Signup Error:", error);
    }
  };

  const handleNext = (e) => {
    if (activeStep === 0) {
      if (
        formData.fname &&
        formData.lname &&
        formData.mobile &&
        formData.email &&
        formData.password &&
        formData.cpassword
      ) {
        if (formData.password == formData.cpassword) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
          alert("Password and C. Password should be same");
        }
      } else {
        alert("Enter all the information");
      }
    }
    if (activeStep === 1) {
      if (
        formData.age &&
        formData.city &&
        formData.address &&
        formData.profession
      ) {
        handleSubmit(e);
        navigateToServiceProviderHomePage();
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
            onSubmit={handleSubmit}
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
                      {/* <Grid item xs={12}>
													<Box
														sx={{
															px: "1rem",
															py: "0.6rem",
															display: "flex",
															background: "#fff",
															border: "1px solid black",
															color: "black",
															fontWeight: "600",
															fontSize: "1rem",
															borderRadius: "0.3rem",
															":hover": {
																color: "white",
																background: "#5f6160",
																transition: "0.3s",
																cursor: "pointer",
															},
														}}
														onClick={handleClick}
													>
														Upload a Profile Photo *
													</Box>
													<input
														type="file"
														onChange={handleChange}
														ref={hiddenFileInput}
														style={{ display: "none" }} // Make the file input element invisible
													/>
												</Grid> */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          autoComplete="given-name"
                          name="fname"
                          required
                          fullWidth
                          id="firstname"
                          label="First Name"
                          autoFocus
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
                          onChange={inputHandler}
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
                          name="age"
                          label="Age"
                          type="number"
                          id="age"
                          autoComplete="age"
                          onChange={inputHandler}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="city"
                          label="City"
                          id="city"
                          autoComplete="city"
                          onChange={inputHandler}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="address"
                          label="Address"
                          id="address"
                          autoComplete="address"
                          onChange={inputHandler}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="profession"
                          label="Profession"
                          id="profession"
                          autoComplete="profession"
                          onChange={inputHandler}
                        />
                      </Grid>
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
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />

                  <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? "Done" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            </Box>

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
