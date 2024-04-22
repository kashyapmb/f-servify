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
import Dashboard from "../Dashboard/Dashboard";
import DashboardForHome from "./DashboardForHome";

function MainArea(props) {
  const { provider } = props;

  const navigate = useNavigate();

  const deleteToken = () => {
    localStorage.removeItem("providerToken");
    window.location.reload();
  };

  const navigatetoUserProfile = () => {
    navigate(`/provider/profile/${provider._id}`);
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
          <Box sx={{fontSize:'1.4rem', fontWeight:'600'}}>
            Welcome, {provider.fname} {provider.lname}
          </Box>
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Avatar
                src={provider.profilePhoto}
                sx={{ width: "3rem", height: "3rem", cursor: "pointer" }}
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

        {/* Dashboard */}
        <DashboardForHome />
      </Box>
    </>
  );
}

export default MainArea;
