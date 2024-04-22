import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { FaAddressBook, FaList } from "react-icons/fa";
import { MdDashboard, MdError, MdOutlineRateReview } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function LeftSidebar(props) {
  const { provider } = props;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("This data : ", provider);
  });

  const navigate = useNavigate();
  const gotoVerifyEmail = () => {
    navigate("/provider/verifyemail");
  };
  const gotoVerifyMobile = () => {
    navigate("/provider/verifymobile");
  };
  const gotoBooking = () => {
    navigate("/provider/booking");
  };
  const gotoDashboard = () => {
    navigate("/provider/dashboard");
  };
  const gotoPlans = () => {
    navigate("/provider/plans");
  };
  const gotoReviews = () => {
    navigate("/provider/reviews");
  };

  return (
    <>
      <Box
        sx={{
          pt: "3rem",
          height: "80vh",
          borderRadius: "3rem",
          margin: "1rem",

          /* From https://css.glass */
          background: "rgba(255, 255, 255, 0.18)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(8.6px)",

          border: "1px solid white",
          position: "sticky",
          top: "2rem",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <img src="images/servifyLogo.png" style={{ width: "12rem" }} />
        </Box>
        <Box sx={{ mt: "2rem", ml: "3rem", fontSize: "1.4rem", display:'flex', flexDirection:'column', gap:'1.5rem' }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.7rem", cursor:'default' }}>
            <AiFillHome />
            <Box>Home</Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.7rem",
              cursor: "pointer",
            }}
            onClick={gotoBooking}
          >
            <FaAddressBook />
            <Box>Bookings</Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.7rem",
              cursor: "pointer",
            }}
            onClick={gotoDashboard}
          >
            <MdDashboard />
            <Box>Dashboard</Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.7rem",
              cursor: "pointer",
            }}
            onClick={gotoPlans}
          >
            <FaList />
            <Box>Plans</Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.7rem",
              cursor: "pointer",
            }}
            onClick={gotoReviews}
          >
            <MdOutlineRateReview />
            <Box>Reviews</Box>
          </Box>

          {/* {!provider.emailverified && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.7rem",
                mt: "1rem",
                cursor: "pointer",
              }}
              onClick={gotoVerifyEmail}
            >
              <MdError color="red" />
              <Box>Email not verified</Box>
            </Box>
          )}
          {!provider.mobileverified && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.7rem",
                mt: "1rem",
                cursor: "pointer",
              }}
              onClick={gotoVerifyMobile}
            >
              <MdError color="red" />
              <Box>Mobile not verified</Box>
            </Box>
          )} */}
        </Box>
      </Box>
    </>
  );
}

export default LeftSidebar;
