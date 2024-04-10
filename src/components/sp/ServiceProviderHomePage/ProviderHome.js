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
  const [providerId, setProviderId] = useState();
  const [provider, setProvider] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProviderId = async () => {
      await axios
        .get("http://localhost:8000/api/user/details", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("providerToken"),
          },
        })
        .then((response) => {
          setProviderId(response.data.user.userId);
          localStorage.setItem("providerId", response.data.user.userId);
          fetchProviderData(response.data.user.userId);
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    };
    const fetchProviderData = async (providerId) => {
      await axios
        .get(`http://localhost:8000/api/provider/getone/${providerId}`)
        .then((response) => {
          console.log("Provider:", response.data);
          setProvider(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    };

    if (localStorage.getItem("providerToken")) {
      fetchProviderId();
    } else {
      navigate("/provider/login");
    }
  }, []);

  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      {provider && (
        <Box sx={{ height: "100%", background: "#f2f2f7", padding: "1rem" }}>
          <Grid container>
            <Grid item xs={3}>
              <LeftSidebar provider={provider} />
            </Grid>
            <Grid item xs={9}>
              <RightSidebar provider={provider} />
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
}

export default ProviderHome;
