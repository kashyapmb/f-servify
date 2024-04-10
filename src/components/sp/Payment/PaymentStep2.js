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
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function createContent(imageUrl, title, content, url) {
  return { imageUrl, title, content, url };
}

const contents = [
  createContent(
    "/images/payo5.png",
    "Show QR Code",
    "Scan with any UPI App",
    "/provider/paymentstep2/qr"
  ),
  createContent(
    "/images/paymento1.svg",
    "UPI Payment",
    "All bank UPI acceptable",
    "/provider/paymentstep2/upi"
  ),
  createContent(
    "/images/paymento4.png",
    "Net Banking",
    "choose your bank to complete payent",
    "/provider/paymentstep2/netbanking"
  ),

  createContent(
    "/images/paymento3.svg",
    "Credit/Debit Card Payment",
    "All bank UPI acceptable",
    "/provider/paymentstep2/card"
  ),
];

const PaymentStep2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const { originalPrice, selectedPlan } = location.state;

  const state = location.state || {}; // Using empty object if state is null

  const originalPrice = state.originalPrice || 0; // Defaulting to 0 if originalPrice is null
  const selectedPlan = state.selectedPlan || ""; // Defaulting to an empty string if selectedPlan is null
  const timePeriod = state.timePeriod || 0;

  const handleContentClick = (url) => {
    navigate(url, {
      state: {
        originalPrice: originalPrice,
        selectedPlan: selectedPlan,
        timePeriod: timePeriod,
      },
    });
  };
  const handletemp = () => {
    navigate("/provider/payment", {
      state: {
        originalPrice: originalPrice,
        selectedPlan: selectedPlan,
        timePeriod: timePeriod,
      },
    });
  };

  return (
    <Box>
      <Box sx={{ padding: "0rem 5rem" }}>
        <h4>
          {" "}
          your payment amount is {originalPrice} {selectedPlan} {timePeriod}
        </h4>
        <Button variant="contained" onClick={handletemp}>
          temp
        </Button>
      </Box>

      <Box sx={{ width: "50%" }} classname="1st portion">
        <Box sx={{ padding: "0rem 5rem" }}>
          <Box
            sx={{ fontSize: "1.5rem", fontWeight: "bold", marginTop: "2rem" }}
          >
            choose payment options
          </Box>
        </Box>
        <Box sx={{ padding: "2rem 5rem" }}>
          {contents.map((content, index) => (
            <Box
              key={index}
              onClick={() => handleContentClick(content.url)}
              sx={{
                padding: "0.2rem",
                border: "1px solid black",
                borderRadius: "1rem",
                cursor: "pointer",
                marginBottom: "1rem",
                transition: "0.5s",
                ":hover": {
                  boxShadow: "5px 5px 5px",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box>
                  <img
                    src={content.imageUrl}
                    style={{
                      width: "5rem",
                      height: "5rem",
                      marginRight: "1.5rem",
                      marginLeft: "1rem",
                    }}
                  />
                </Box>

                <Box sx={{ marginLeft: "3rem" }}>
                  <Box sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                    {content.title}
                  </Box>
                  <Box>{content.content}</Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default PaymentStep2;
