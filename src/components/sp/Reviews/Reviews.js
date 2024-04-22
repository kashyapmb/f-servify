import React, { useState, useEffect } from "react";
import axios from "axios";
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
  Rating,
} from "@mui/material";
import Header from "../Header";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const providerId = localStorage.getItem("providerId");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/reviews/getreviews/${providerId}`
        );
        console.log(response.data);
        setReviews(response.data); // Assuming the response is an array of reviews
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <>
      <Header />

      <Box sx={{ padding: "1rem 4rem" }}>
        <h2>Reviews</h2>
        <ul>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "2.5rem",
              padding: "0rem 5rem",
              marginTop: "2rem",
            }}
          >
            {reviews.map((obj, index) => (
              <Box
                sx={{
                  padding: "1rem",
                  width: "43%",
                  border: "1px solid black",
                  borderRadius: "1rem",

                  transition: "0.5s",
                  ":hover": {
                    boxShadow: "5px 5px 5px",
                  },
                }}
              >
                <Box sx={{ display: "flex", gap: "1rem" }}>
                  <img
                    src={obj.profileimg}
                    style={{
                      width: "3.5rem",
                      borderRadius: "50%",
                    }}
                  />
                  <Box>
                    <Box>
                      {obj.fname} {obj.lname}
                    </Box>
                    <Box>
                      <Rating name="read-only" value={obj.rating} readOnly />
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ ml: "4.5rem", fontWeight: "bold" }}>
                  {obj.review}
                </Box>
                <Box
                  sx={{
                    fontSize: "0.9rem",
                    float: "right",
                  }}
                >
                  {obj.createdAt}
                </Box>
              </Box>
            ))}
          </Box>
        </ul>
      </Box>
    </>
  );
};

export default Reviews;
