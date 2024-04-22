import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { FaAddressBook, FaList } from "react-icons/fa";
import {
  MdCloudDone,
  MdDashboard,
  MdError,
  MdOutlineRateReview,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();

  const goToBooking = () => {
    navigate("/provider/booking");
  };
  const goToDashboard = () => {
    navigate("/provider/dashboard");
  };
  const goToReviews = () => {
    navigate("/provider/reviews");
  };
  const goToPlans = () => {
    navigate("/provider/plans");
  };
  const gotohome = () => {
    navigate("/provider");
  };
  return (
    <>
      <Box
        sx={{
          p: "1rem 3rem",
          borderRadius: "1rem",
          margin: "1rem",

          /* From https://css.glass */
          background: "rgba(255, 255, 255, 0.18)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(8.6px)",

          border: "1px solid white",
          display: "flex",
          gap: "3rem",

          fontSize: "1.2rem",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <img src="/images/servifyLogo.png" style={{ width: "12rem" }} />
        </Box>
        {/* home  */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.7rem",
            cursor: "pointer",
          }}
          onClick={gotohome}
        >
          <AiFillHome />
          <Box>Home</Box>
        </Box>
        {/* bookings  */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.7rem",
            cursor: "pointer",
          }}
          onClick={goToBooking}
        >
          <FaAddressBook />

          <Box>Bookings</Box>
        </Box>
        {/* Dashboard  */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.7rem",
            cursor: "pointer",
          }}
          onClick={goToDashboard}
        >
          <MdCloudDone />
          <Box>Dashboard</Box>
        </Box>
        {/* Plan  */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.7rem",
            cursor: "pointer",
          }}
          onClick={goToPlans}
        >
          <FaList />
          <Box>Plans</Box>
        </Box>
        {/* reviews  */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.7rem",
            cursor: "pointer",
          }}
          onClick={goToReviews}
        >
          <MdOutlineRateReview />
          <Box>Reviews</Box>
        </Box>
      </Box>
    </>
  );
}

export default Header;
