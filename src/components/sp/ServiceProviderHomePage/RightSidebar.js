import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { cities } from "../../../data/cities";
import { services } from "../../../data/services";

import { MdHome } from "react-icons/md";
import { GoHeart, GoHeartFill, GoStarFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";

function MainArea(props) {
  const { city, setCity, user } = props;

  const navigate = useNavigate();

  function gotoUserLogin() {
    navigate("/user/login");
  }

  const selectedCity = (selectedcity) => {
    setCity(selectedcity);
    localStorage.setItem("servifyCityName", selectedcity);
    console.log(city);
  };

  const selectedService = (selectedservice) => {
    if (city == "") {
      alert("First of all select city");
      return;
    }
    console.log(selectedservice);

    navigate(`/user/${city.toLowerCase()}/${selectedservice.toLowerCase()}`);
  };

  const deleteToken = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const navigatetoUserProfile = () => {
    navigate("/user/profile");
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }
  return (
    <>
      <Box
        sx={{
          background: "#ffffff",
          borderRadius: "3rem",
          padding: "3rem 3rem",
          margin: "1rem",
          border: "1px solid black",
        }}
      >
        {/* cities input  and profile */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <TextField
              id="outlined-select-currency"
              select
              label="city name"
              defaultValue="Select"
              helperText="Please select where u want the service"
              value={city}
              sx={{ width: "35rem" }}
            >
              {cities.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  onClick={() => selectedCity(option.value)}
                >
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box>
            {user ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1rem",
                  }}
                >
                  <Avatar
                    {...stringAvatar(
                      `${user.fname.toUpperCase()} ${user.lname.toUpperCase()}`
                    )}
                    sx={{ bgcolor: "orange", cursor: "pointer" }}
                    onClick={navigatetoUserProfile}
                  />
                  <Button
                    variant="contained"
                    sx={{ background: "orange" }}
                    onClick={deleteToken}
                  >
                    Log out
                  </Button>
                </Box>
              </>
            ) : (
              <Avatar
                src="/broken-image.jpg"
                sx={{ bgcolor: "orange", cursor: "pointer" }}
                onClick={gotoUserLogin}
              />
            )}
          </Box>
        </Box>

        {/* services component */}
        <Box sx={{ marginTop: "1rem" }}>
          <Box sx={{ fontSize: "1.3rem", fontWeight: "600", margin: "1rem 0" }}>
            Services
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "3rem",
              flexWrap: "wrap",
            }}
          >
            {services.map((option) => (
              <Box
                sx={{
                  width: "10rem",
                  height: "10rem",
                  borderRadius: "11px",
                  background: "#ffffff",
                  transition: "0.5s",
                  boxShadow: " 8px 8px 28px #dbdbdb, -8px -8px 28px #ffffff",

                  ":hover": {
                    borderRadius: "11px",
                    background: "linear-gradient(145deg,  #ffffff, #e6e6e6)",
                    boxShadow:
                      "15px 15px 30px #bfbfbf, -15px -15px 30px #ffffff",
                  },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => selectedService(option.value)}
              >
                <img src="images/typeuser.png" style={{ width: "5rem" }} />
                <Box sx={{ textAlign: "center", margin: "0.5rem" }}>
                  {option.value}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* your search activity */}
        <Box sx={{ marginTop: "1rem" }}>
          <Box
            sx={{
              fontSize: "1.3rem",
              fontWeight: "600",
              margin: "3rem 0 1rem 0",
            }}
          >
            Your Search Activity
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: "3rem",
              flexWrap: "wrap",
            }}
          >
            {services.map((option) => (
              <Card
                sx={{ maxWidth: 345, borderRadius: "11px", cursor: "pointer" }}
              >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: "red" }} variant="rounded">
                      K
                    </Avatar>
                  }
                  title="Kashyap Bavadiya"
                  subheader="Software Developer"
                  sx={{ marginBottom: "0rem" }}
                />
                <CardContent sx={{ paddingTop: "0", paddingBottom: "10px" }}>
                  <Box>22yrs, surat</Box>
                  <Box>Expertise: web development, Software development</Box>
                </CardContent>
                <hr />
                <CardContent sx={{ paddingTop: "0" }}>
                  <Box sx={{ display: "flex", gap: "2rem" }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontSize: "1rem",
                      }}
                    >
                      <GoHeart /> <Box>0</Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontSize: "1rem",
                      }}
                    >
                      <GoStarFill color="yellow" /> <Box>4.5(10 reviews)</Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Suggested Profiles */}
        <Box sx={{ marginTop: "1rem" }}>
          <Box
            sx={{
              fontSize: "1.3rem",
              fontWeight: "600",
              margin: "3rem 0 1rem 0",
            }}
          >
            Suggested Profiles
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: "3rem",
              flexWrap: "wrap",
            }}
          >
            {services.map((option) => (
              <Card
                sx={{ maxWidth: 345, borderRadius: "11px", cursor: "pointer" }}
              >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: "red" }} variant="rounded">
                      K
                    </Avatar>
                  }
                  title="Kashyap Bavadiya"
                  subheader="Software Developer"
                  sx={{ marginBottom: "0rem" }}
                />
                <CardContent sx={{ paddingTop: "0", paddingBottom: "10px" }}>
                  <Box>22yrs, surat</Box>
                  <Box>Expertise: web development, Software development</Box>
                </CardContent>
                <hr />
                <CardContent sx={{ paddingTop: "0" }}>
                  <Box sx={{ display: "flex", gap: "2rem" }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontSize: "1rem",
                      }}
                    >
                      <GoHeart /> <Box>0</Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontSize: "1rem",
                      }}
                    >
                      <GoStarFill color="yellow" /> <Box>4.5(10 reviews)</Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default MainArea;
