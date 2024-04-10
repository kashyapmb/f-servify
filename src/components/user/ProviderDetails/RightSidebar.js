//dialoguebox try
import {
  Box,
  Button,
  Rating,
  LinearProgress,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import EnquiryDialogueBox from "./EnquiryDialogueBox";
import { FaStar } from "react-icons/fa";

import { blue, pink } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#faaf00", // Set your desired primary color
    },
  },
});

function RightSidebar({ userId, providerId, providerData }) {
  const [enquiryStatus, setEnquiryStatus] = useState("notenquired");
  const [isDialogueOpen, setIsDialogueOpen] = useState(false);
  const [ratingData, setRatingData] = useState([]);
  const [progress, setProgress] = useState(0);

  const fetchRatingData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/reviews/getratings/${providerId}`
      );
      setRatingData(response.data);
    } catch (error) {
      console.error("Error fetching rating data:", error);
    }
  };

  useEffect(() => {
    // Fetch rating data when the component mounts
    fetchRatingData();
    // ... (other useEffect dependencies)
  }, [providerId]);
  const checkEnquiryStatus = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/enquiry/checkestatus",
        {
          userId: userId,
          providerId: providerId,
        }
      );
      setEnquiryStatus(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEnquiryButtonClick = () => {
    setIsDialogueOpen(true);
  };

  const handleDialogueClose = () => {
    setIsDialogueOpen(false);
    // window.location.reload();

  };

  const handleEnquirySubmit = (formData) => {
    // Handle the submission logic, e.g., send the data to the server
    console.log("Enquiry submitted:", formData);

    // Close the dialogue box
    handleDialogueClose();
  };

  useEffect(() => {
    checkEnquiryStatus();
  }, [userId, providerId]);

  const calculateProgress = (data) => {
    return data.total > 0 ? (data.completed / data.total) * 100 : 0;
  };

  return (
    <>
      <Box sx={{ top: "2rem", position: "sticky" }}>
        <Box
          sx={{
            height: "10vh",
            borderRadius: "1rem",
            margin: "1rem",
            background: "rgba(255, 255, 255, 0.18)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(8.6px)",
            border: "1px solid white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {enquiryStatus === "enquired" ? (
            <Button className="acceptbtn" variant="contained" disabled>
              Enquired
            </Button>
          ) : (
            <Button
              className="acceptbtn"
              variant="contained"
              onClick={handleEnquiryButtonClick}
            >
              Enquiry
            </Button>
          )}
        </Box>
        <Box
          sx={{
            p: "1.5rem",
            height: "50vh",
            borderRadius: "1rem",
            margin: "1rem",
            background: "rgba(255, 255, 255, 0.18)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(8.6px)",
            border: "1px solid white",
          }}
        >
          <Box>
            <h4>Overall Rating</h4>
            {providerData && providerData.overallRating !== undefined ? (
              // <Rating
              //   size="large"
              //   name="read-only"
              //   precision={0.5}
              //   value={providerData.overallRating}
              //   readOnly
              // />

              <span
                style={{
                  backgroundColor:
                    providerData.overallRating >= 4
                      ? "green"
                      : providerData.overallRating >= 3
                      ? "#388e3c"
                      : providerData.overallRating >= 2
                      ? "#fbc02d"
                      : "#d32f2f",
                  borderRadius: "0.3rem",
                  padding: "0.1rem 0.3rem",
                  color: "#ffffff",
                  margin: "auto",
                }}
              >
                {providerData.overallRating}
                <span style={{ marginLeft: "0.2rem", verticalAlign: "middle" }}>
                  <FaStar />
                </span>
              </span>
            ) : (
              <span>No rating available</span>
            )}
          </Box>

          <Box mt={1.5}>
            <ThemeProvider theme={theme}>
              {ratingData.map((data, index) => (
                <Box key={index} mt={1.4}>
                  <h4>{data.rating} star</h4>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ width: "90%" }}>
                      <LinearProgress
                        variant="determinate"
                        value={calculateProgress(data)}
                        color="primary"
                        sx={{
                          height: 18, // Increase the height
                          backgroundColor: "#ececec",

                          borderRadius: 1, // Rounded corners
                          border: "1px solid #c3c7c7",
                          "&:hover": {
                            border: "1px solid #faaf00",
                            backgroundColor: "#fcef9e",
                          },
                        }}
                      />
                    </Box>
                    <Box sx={{ width: "3%" }} ml={1.5}>
                      {data.total > 0
                        ? `${Math.round((data.completed / data.total) * 100)}%`
                        : "0%"}
                    </Box>
                  </Box>
                </Box>
              ))}
            </ThemeProvider>
          </Box>
        </Box>
      </Box>
      <EnquiryDialogueBox
        open={isDialogueOpen}
        handleClose={handleDialogueClose}
        handleSubmit={handleEnquirySubmit}
        userId={userId}
        providerId={providerId}
      />
    </>
  );
}

export default RightSidebar;
