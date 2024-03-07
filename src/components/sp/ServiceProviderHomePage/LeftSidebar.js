import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { MdError } from "react-icons/md";
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
        <Box sx={{ mt: "2rem", ml: "3rem", fontSize: "1.4rem" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
            <AiFillHome />
            <Box>Home</Box>
          </Box>
          {!provider.emailverified && (
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
          )}
        </Box>
      </Box>
    </>
  );
}

export default LeftSidebar;
