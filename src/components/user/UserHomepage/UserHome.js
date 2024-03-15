import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import axios from "axios";

function UserHome() {
  const [city, setCity] = useState("");

  const [user, setUser] = useState();

  const [userId, setUserId] = useState();

  useEffect(() => {
    if (city == "") {
      setCity(localStorage.getItem("servifyCityName") || "");
    }

    if (localStorage.getItem("userToken")) {
      axios
        .get("http://localhost:8000/api/user/details", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("userToken"),
          },
        })
        .then((response) => {
          console.log(response);
          setUserId(response.data.user.userId);
          localStorage.setItem("userId", response.data.user.userId);

          axios
            .get(
              `http://localhost:8000/api/user/getone/${response.data.user.userId}`
            )
            .then((res) => {
              console.log(res);
              setUser(res.data);
              localStorage.setItem("isLoggedIn", true);
            })
            .catch((err) => {
              console.error("Error fetching user details:", err);
            });
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    } else {
      localStorage.setItem("isLoggedIn", false);
    }
  }, []);
  return (
    <>
      <Box sx={{ height: "100%", background: "#f2f2f7", padding: "1rem" }}>
        <Grid container>
          <Grid item xs={3}>
            <LeftSidebar />
          </Grid>
          <Grid item xs={8}>
            <RightSidebar city={city} setCity={setCity} user={user} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default UserHome;
