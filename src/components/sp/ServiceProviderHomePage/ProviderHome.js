import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProviderHome() {
  const navigate = useNavigate();

  const [user, setUser] = useState();

  useEffect(() => {
    const fetchProviderData = async () => {
      await axios
        .get("http://localhost:8000/api/user/details", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("providerToken"),
          },
        })
        .then((response) => {
          setUser(response.data.user);
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    };

    if (localStorage.getItem("providerToken")) {
      fetchProviderData();
    } else {
      navigate("/provider/login");
    }
  });

  return (
    <>
      {user && (
        <Box sx={{ height: "100%", background: "#f2f2f7", padding: "1rem" }}>
          <Grid container>
            <Grid item xs={3}>
              <LeftSidebar />
            </Grid>
            <Grid item xs={8}>
              <RightSidebar user={user} />
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
}

export default ProviderHome;
