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
import { useLocation, useHistory } from "react-router-dom";

const PaymentStep1 = () => {
  const location = useLocation();
  const { selectedPlan } = location.state;

  const navigate = useNavigate();

  const handleButtonClick = (price, timePeriod) => {
    navigate("/provider/paymentstep2", {
      // state: { originalPrice: price },
      state: {
        originalPrice: price,
        selectedPlan: selectedPlan,
        timePeriod: timePeriod,
      },
    });
  };

  const planDetails = [
    {
      plan: "standard",
      title: "Standard Plan",
      monthlyFee: 2999,
      originalPrice: 3999,
      disPrice: 333,
      discountedPrice: 100,
      discount: 25,
      gst: 18,
      gstAmount: 540,
      yearlyFee: 12999,
      yearlyoriginalPrice: 13999,
      yearlydisPrice: 225,
      yearlydiscountedPrice: 90,
      yearlydiscount: 35,
      yearlygstAmount: 1540,
      /*important*/
      totalMonthlyFee: 3539,
      totalYearlyFee: 13539,
    },
    {
      plan: "premium",
      title: "Premium Plan",
      monthlyFee: 5999,
      originalPrice: 4499,
      disPrice: 333,
      discountedPrice: 150,
      discount: 25,
      gst: 18,
      gstAmount: 810,
      yearlyFee: 12999,
      yearlyoriginalPrice: 13999,
      yearlydisPrice: 225,
      yearlydiscountedPrice: 90,
      yearlydiscount: 35,
      yearlygstAmount: 1540,
      /*important*/
      totalMonthlyFee: 5309,
      totalYearlyFee: 15309,
    },
    {
      plan: "pro",
      title: "Pro Plan",
      monthlyFee: 7997,
      originalPrice: 5998,
      disPrice: 333,
      discountedPrice: 200,
      discount: 25,
      gst: 18,
      gstAmount: 1080,
      yearlyFee: 12999,
      yearlyoriginalPrice: 13999,
      yearlydisPrice: 225,
      yearlydiscountedPrice: 90,
      yearlydiscount: 35,
      yearlygstAmount: 1540,

      /*important*/
      totalMonthlyFee: 7078,
      totalYearlyFee: 17078,
    },
  ];

  const findPlanDetails = () => {
    return planDetails.find((plan) => plan.plan === selectedPlan);
  };

  const selectedPlanDetails = findPlanDetails();

  if (!selectedPlanDetails) {
    return null; // Handle invalid plan
  }

  return (
    <Box>
      {/* <Box>{selectedPlan}</Box> */}
      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: "40%" }} classname="monthly">
          <Box sx={{ padding: "0rem 5rem" }}>
            <Box
              sx={{ fontSize: "1.5rem", fontWeight: "bold", marginTop: "2rem" }}
            >
              payment SetUp Monthly
            </Box>
            <Box sx={{ padding: "2rem 0rem" }}>
              <Box
                sx={{
                  padding: "1.5rem",
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
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      aliggnItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <Box sx={{ color: "#e54eb1", fontWeight: "bold" }}>
                      {selectedPlanDetails.title}
                    </Box>
                    <Box>montly free</Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      aliggnItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <Box
                      sx={{ textDecoration: "line-through", color: "#bcbcbc" }}
                    >
                      ₹ {selectedPlanDetails.monthlyFee}
                    </Box>
                    <Box sx={{ fontWeight: "bold" }}>
                      ₹ {selectedPlanDetails.originalPrice}
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      aliggnItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <Box
                      sx={{ color: "#bcbcbc", textDecoration: "line-through" }}
                    >
                      ₹ {selectedPlanDetails.disPrice}
                    </Box>
                    <Box sx={{ fontWeight: "bold" }}>
                      ₹ {selectedPlanDetails.discountedPrice}/Day
                    </Box>
                  </Box>

                  <Box sx={{ color: "#44cb70" }}>
                    {selectedPlanDetails.discount}% OFF
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "2rem",
                  }}
                >
                  <Box sx={{ fontWeight: "bold" }}>
                    GST {selectedPlanDetails.gst}%
                  </Box>
                  <Box sx={{ fontWeight: "bold" }}>
                    ₹ {selectedPlanDetails.gstAmount}
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "2rem",
                  }}
                >
                  <Box sx={{ fontWeight: "bold" }}>Total Montly Free</Box>
                  <Box sx={{ fontWeight: "bold" }}>
                    ₹ {selectedPlanDetails.totalMonthlyFee}
                  </Box>
                </Box>
                <Box>
                  <Button
                    sx={{
                      width: "100%",
                      marginTop: "2rem",
                      marginBottom: "0.5rem",
                    }}
                    variant="contained"
                    onClick={() =>
                      handleButtonClick(selectedPlanDetails.totalMonthlyFee, 30)
                    }
                  >
                    Proceed to payment
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ width: "40%" }} classname="monthly">
          <Box sx={{ padding: "0rem 5rem" }}>
            <Box
              sx={{ fontSize: "1.5rem", fontWeight: "bold", marginTop: "2rem" }}
            >
              payment SetUp Yearly
            </Box>
            <Box sx={{ padding: "2rem 0rem" }}>
              <Box
                sx={{
                  padding: "1.5rem",
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
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      aliggnItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <Box sx={{ color: "#e54eb1", fontWeight: "bold" }}>
                      {selectedPlanDetails.title}
                    </Box>
                    <Box>yearly free</Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      aliggnItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <Box
                      sx={{ textDecoration: "line-through", color: "#bcbcbc" }}
                    >
                      ₹ {selectedPlanDetails.yearlyFee}
                    </Box>
                    <Box sx={{ fontWeight: "bold" }}>
                      ₹ {selectedPlanDetails.yearlyoriginalPrice}
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      aliggnItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <Box
                      sx={{ color: "#bcbcbc", textDecoration: "line-through" }}
                    >
                      ₹ {selectedPlanDetails.yearlydisPrice}
                    </Box>
                    <Box sx={{ fontWeight: "bold" }}>
                      ₹ {selectedPlanDetails.yearlydiscountedPrice}/Day
                    </Box>
                  </Box>

                  <Box sx={{ color: "#44cb70" }}>
                    {selectedPlanDetails.yearlydiscount}% OFF
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "2rem",
                  }}
                >
                  <Box sx={{ fontWeight: "bold" }}>
                    GST {selectedPlanDetails.gst}%
                  </Box>
                  <Box sx={{ fontWeight: "bold" }}>
                    ₹ {selectedPlanDetails.yearlygstAmount}
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "2rem",
                  }}
                >
                  <Box sx={{ fontWeight: "bold" }}>Total Montly Free</Box>
                  <Box sx={{ fontWeight: "bold" }}>
                    ₹ {selectedPlanDetails.totalYearlyFee}
                  </Box>
                </Box>
                <Box>
                  <Button
                    sx={{
                      width: "100%",
                      marginTop: "2rem",
                      marginBottom: "0.5rem",
                    }}
                    variant="contained"
                    onClick={() =>
                      handleButtonClick(selectedPlanDetails.totalYearlyFee, 365)
                    }
                  >
                    Proceed to payment
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PaymentStep1;
