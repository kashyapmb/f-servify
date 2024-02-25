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
import { cities } from "../data/cities";
import { services } from "../data/services";

import { MdHome } from "react-icons/md";
import { GoHeart, GoHeartFill, GoStarFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { MdOutlineReviews } from "react-icons/md";

function RightSidebar() {
  return (
    <>
      <Box
        sx={{
          background: "#ffffff",
          borderRadius: "3rem",
          padding: "3rem 3rem",
          margin: "1rem",
          border: "1px solid black",
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <Box
          sx={{
            border: "1px solid black",
            width: "40%",
            height: "8rem",
            borderRadius: "1rem",
            display: "flex",
            gap: "1rem",
          }}
        >
          <Box sx={{ height: "100%" }}>
            <img
              src="/images/typeuser.png"
              style={{
                height: "100%",
                borderRight: "1px solid black",
                borderRadius: "1rem",
              }}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box>Kashyap Bavadiya</Box>
            <Box>Painter</Box>
            <Box sx={{ display: "flex", gap: "1rem" }}>
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
        <Box
          sx={{
            border: "1px solid black",
            width: "40%",
            height: "8rem",
            borderRadius: "1rem",
            display: "flex",
            gap: "1rem",
          }}
        >
          <Box sx={{ height: "100%" }}>
            <img
              src="/images/typeuser.png"
              style={{
                height: "100%",
                borderRight: "1px solid black",
                borderRadius: "1rem",
              }}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box>Kashyap Bavadiya</Box>
            <Box>Painter</Box>
            <Box sx={{ display: "flex", gap: "1rem" }}>
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
        <Box
          sx={{
            border: "1px solid black",
            width: "40%",
            height: "8rem",
            borderRadius: "1rem",
            display: "flex",
            gap: "1rem",
          }}
        >
          <Box sx={{ height: "100%" }}>
            <img
              src="/images/typeuser.png"
              style={{
                height: "100%",
                borderRight: "1px solid black",
                borderRadius: "1rem",
              }}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box>Kashyap Bavadiya</Box>
            <Box>Painter</Box>
            <Box sx={{ display: "flex", gap: "1rem" }}>
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
        <Box
          sx={{
            border: "1px solid black",
            width: "40%",
            height: "8rem",
            borderRadius: "1rem",
            display: "flex",
            gap: "1rem",
          }}
        >
          <Box sx={{ height: "100%" }}>
            <img
              src="/images/typeuser.png"
              style={{
                height: "100%",
                borderRight: "1px solid black",
                borderRadius: "1rem",
              }}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box>Kashyap Bavadiya</Box>
            <Box>Painter</Box>
            <Box sx={{ display: "flex", gap: "1rem" }}>
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
