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

  const selectedService = (selectedservice) => {
    if (city == "") {
      alert("First of all select city");
      return;
    }
    console.log(selectedservice);

    navigate(`/user/${city.toLowerCase()}/${selectedservice.toLowerCase()}`);
  };

  const deleteToken = () => {
    localStorage.removeItem("providerToken");
    window.location.reload();
  };

  const navigatetoUserProfile = () => {
    navigate(`/provider/profile/${user.userId}`);
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
            Welcome, {user.fname} {user.lname}
          </Box>
          <Box>
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
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default MainArea;
