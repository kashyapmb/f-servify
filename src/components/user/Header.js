import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { AiFillHome } from "react-icons/ai";
import { MdCloudDone, MdPersonSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();

  const gototakenservice = () => {
    navigate("/user/takenservices");
  };
  const gotohome = () => {
    navigate("/user");
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
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <img src="/images/servifyLogo.png" style={{ width: "12rem" }} />
        </Box>
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.7rem",
            cursor: "pointer",
          }}
          onClick={gototakenservice}
        >
          <MdCloudDone />
          <Box>Taken Services</Box>
        </Box>
      </Box>
    </>
  );
}

export default Header;
