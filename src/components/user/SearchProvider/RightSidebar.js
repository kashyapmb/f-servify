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

import { MdHome, MdVerified } from "react-icons/md";
import { GoHeart, GoHeartFill, GoStarFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { MdOutlineReviews } from "react-icons/md";
import { RiVerifiedBadgeFill } from "react-icons/ri";

function RightSidebar() {
  const [domain, setDomain] = useState();
  useEffect(() => {
    // fetch domain from  url
    const currentURL = window.location.href;
    const parts = currentURL.split("/");
    setDomain(parts[parts.length - 1]);
  });
  const navigate = useNavigate();
  const clickedServiceProvider = () => {
    const city = localStorage.getItem("servifyCityName");
    navigate(`/user/${city.toLowerCase()}/${domain}/uuu298382383u29`);
  };
  return (
    <>
      <Box
        sx={{
          background: "#ffffff",
          borderRadius: "1rem",
          padding: "3rem 3rem",
          margin: "1rem",
          border: "1px solid black",
        }}
      >
        {/* filter functionality */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            pr: "5rem",
            mb: "1rem",
          }}
        >
          <Box sx={{ display: "flex" }}>
            Search found : &nbsp;
            <Box sx={{ fontWeight: "600" }}>5 providers</Box>
          </Box>
          <Box>
            Sort by : <Select sx={{ height: "2rem" }} />
          </Box>
        </Box>
        <hr />
        {/* profile card details */}
        <Box
          sx={{ mt: "1rem", display: "flex", flexWrap: "wrap", gap: "1rem" }}
        >
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
            onClick={clickedServiceProvider}
          >
            {/* img, name and profession  */}
            <Box sx={{ display: "flex" }}>
              <Box>
                <img
                  src="https://xsgames.co/randomusers/assets/avatars/male/1.jpg"
                  style={{
                    width: "6rem",
                    borderRight: "1px solid black",
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
                <Box sx={{ fontSize: "1.1rem" }}>Kashyap Bavadiya</Box>
                <Box sx={{ fontWeight: "600" }}>Teacher</Box>
              </Box>
            </Box>
            {/* location  */}
            <Box sx={{ display: "flex", gap: "2rem" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ fontWeight: "600" }}>Mota vrachha</Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  Phone Verified : &nbsp; <MdVerified color="blue" />
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
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ opacity: "0.7" }}>Jobs</Box>
                <Box
                  sx={{
                    ml: "0.3rem",
                    alignItems: "center",
                    fontWeight: "600",
                    fontSize: "0.9rem",
                  }}
                >
                  100
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
            onClick={clickedServiceProvider}
          >
            {/* img, name and profession  */}
            <Box sx={{ display: "flex" }}>
              <Box>
                <img
                  src="https://xsgames.co/randomusers/assets/avatars/male/1.jpg"
                  style={{
                    width: "6rem",
                    borderRight: "1px solid black",
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
                <Box sx={{ fontSize: "1.1rem" }}>Kashyap Bavadiya</Box>
                <Box sx={{ fontWeight: "600" }}>Teacher</Box>
              </Box>
            </Box>
            {/* location  */}
            <Box sx={{ display: "flex", gap: "2rem" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ fontWeight: "600" }}>Mota vrachha</Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  Phone Verified : &nbsp; <MdVerified color="blue" />
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
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ opacity: "0.7" }}>Jobs</Box>
                <Box
                  sx={{
                    ml: "0.3rem",
                    alignItems: "center",
                    fontWeight: "600",
                    fontSize: "0.9rem",
                  }}
                >
                  100
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
            onClick={clickedServiceProvider}
          >
            {/* img, name and profession  */}
            <Box sx={{ display: "flex" }}>
              <Box>
                <img
                  src="https://xsgames.co/randomusers/assets/avatars/male/1.jpg"
                  style={{
                    width: "6rem",
                    borderRight: "1px solid black",
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
                <Box sx={{ fontSize: "1.1rem" }}>Kashyap Bavadiya</Box>
                <Box sx={{ fontWeight: "600" }}>Teacher</Box>
              </Box>
            </Box>
            {/* location  */}
            <Box sx={{ display: "flex", gap: "2rem" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ fontWeight: "600" }}>Mota vrachha</Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  Phone Verified : &nbsp; <MdVerified color="blue" />
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
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ opacity: "0.7" }}>Jobs</Box>
                <Box
                  sx={{
                    ml: "0.3rem",
                    alignItems: "center",
                    fontWeight: "600",
                    fontSize: "0.9rem",
                  }}
                >
                  100
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
            onClick={clickedServiceProvider}
          >
            {/* img, name and profession  */}
            <Box sx={{ display: "flex" }}>
              <Box>
                <img
                  src="https://xsgames.co/randomusers/assets/avatars/male/1.jpg"
                  style={{
                    width: "6rem",
                    borderRight: "1px solid black",
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
                <Box sx={{ fontSize: "1.1rem" }}>Kashyap Bavadiya</Box>
                <Box sx={{ fontWeight: "600" }}>Teacher</Box>
              </Box>
            </Box>
            {/* location  */}
            <Box sx={{ display: "flex", gap: "2rem" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ fontWeight: "600" }}>Mota vrachha</Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  Phone Verified : &nbsp; <MdVerified color="blue" />
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
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ opacity: "0.7" }}>Jobs</Box>
                <Box
                  sx={{
                    ml: "0.3rem",
                    alignItems: "center",
                    fontWeight: "600",
                    fontSize: "0.9rem",
                  }}
                >
                  100
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
            onClick={clickedServiceProvider}
          >
            {/* img, name and profession  */}
            <Box sx={{ display: "flex" }}>
              <Box>
                <img
                  src="https://xsgames.co/randomusers/assets/avatars/male/1.jpg"
                  style={{
                    width: "6rem",
                    borderRight: "1px solid black",
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
                <Box sx={{ fontSize: "1.1rem" }}>Kashyap Bavadiya</Box>
                <Box sx={{ fontWeight: "600" }}>Teacher</Box>
              </Box>
            </Box>
            {/* location  */}
            <Box sx={{ display: "flex", gap: "2rem" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ fontWeight: "600" }}>Mota vrachha</Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  Phone Verified : &nbsp; <MdVerified color="blue" />
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
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ opacity: "0.7" }}>Jobs</Box>
                <Box
                  sx={{
                    ml: "0.3rem",
                    alignItems: "center",
                    fontWeight: "600",
                    fontSize: "0.9rem",
                  }}
                >
                  100
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
        </Box>
      </Box>
    </>
  );
}

export default RightSidebar;
