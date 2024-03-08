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

function Favorite() {
  const [providers, setProviders] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getFavorites = async () => {
      await axios
        .post(`http://localhost:8000/api/utils/getfavorites/`, {
          userId: localStorage.getItem("userId"),
        })
        .then((response) => {
          setProviders(response.data.favoriteProvidersData);
          setLoading(false);
        });
    };
    getFavorites();
  }, []);
  if (loading) return <div>Loading......</div>;
  return (
    <>
      <Box sx={{ mt: "1rem", display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {providers &&
          providers.map((obj, index) => {
            return (
              <Box
                sx={{
                  padding: "1rem",
                  width: "40%",
                  border: "1px solid black",
                  borderRadius: "1rem",
                  cursor: "pointer",
                  transition: "0.5s",
                  ":hover": {
                    boxShadow: "5px 5px 5px",
                  },
                }}
                // onClick={() => clickedServiceProvider(obj)}
              >
                {/* img, name and profession  */}
                <Box sx={{ display: "flex" }}>
                  <Box>
                    <img
                      src={obj.profilePhoto}
                      style={{
                        width: "6rem",
                        height: "6rem",
                        border: "1px solid black",
                        borderRadius: "1rem",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      margin: "0 1rem",
                      mt: "1rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.3rem",
                    }}
                  >
                    <Box sx={{ fontSize: "1.1rem" }}>
                      {obj.fname} {obj.lname}
                    </Box>
                    <Box sx={{ fontWeight: "600" }}>{obj.profession}</Box>
                  </Box>
                </Box>
                {/* location  */}
                <Box sx={{ display: "flex", gap: "2rem" }}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box sx={{ fontWeight: "600" }}>{obj.location}</Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      Phone Verified : &nbsp;{" "}
                      {obj.mobileverified ? (
                        <MdVerified color="blue" />
                      ) : (
                        <MdError color="red" size={20} />
                      )}
                    </Box>
                  </Box>
                </Box>
                {/* rating ,  job and  reviewsct  */}
                <Box sx={{ display: "flex", gap: "2rem" }}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box sx={{ opacity: "0.7" }}>Rating</Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        fontWeight: "600",
                        fontSize: "0.9rem",
                        gap: "0.3rem",
                      }}
                    >
                      <FaStar color="#fee701" size={13} />
                      4.5
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ opacity: "0.7" }}>Completed work</Box>
                    <Box
                      sx={{
                        ml: "0.3rem",
                        alignItems: "center",
                        fontWeight: "600",
                        fontSize: "0.9rem",
                      }}
                    >
                      {obj.completed_work}
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box sx={{ opacity: "0.7" }}>Reviews</Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        fontWeight: "600",
                        fontSize: "0.9rem",
                        gap: "0.3rem",
                      }}
                    >
                      <MdOutlineReviews color="blue" size={13} />
                      20
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
      </Box>
    </>
  );
}

export default Favorite;
