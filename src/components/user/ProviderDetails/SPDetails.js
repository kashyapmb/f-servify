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
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { MdError, MdHome, MdVerified } from "react-icons/md";
import { GoHeart, GoHeartFill, GoStarFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { MdOutlineReviews } from "react-icons/md";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import axios from "axios";
import Grid from "@mui/material/Grid";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

function SPDetails() {
  const [id, setId] = useState();
  const [providerData, setProviderData] = useState([]);

  const setProviderID = async () => {
    // fetch id from  url
    const currentURL = window.location.href;
    const parts = currentURL.split("/");
    setId(parts[parts.length - 1]);
  };
  const getProviderData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/provider/getone/${id}`
      );
      console.log(response.data);
      setProviderData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await setProviderID();
      await getProviderData();
    };
    fetchData();
  });

  return (
    <>
      <Box sx={{ height: "100%", padding: "1rem" }}>
        <Grid container>
          <Grid item xs={1}></Grid>
          <Grid item xs={7}>
            <LeftSidebar providerData={providerData} />
          </Grid>
          <Grid item xs={3}>
            <RightSidebar />
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </Box>
    </>
  );
}

export default SPDetails;
