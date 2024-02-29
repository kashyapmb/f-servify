import { Box } from "@mui/material";
import React from "react";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";

function LeftSidebar() {
  return (
    <>
      <Box
        sx={{
          pt: "3rem",
          height: "80vh",
          paddingLeft: "5rem",
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
        <img src="images/servifyLogo.png" style={{ width: "12rem" }} />
        <Box sx={{ mt: "2rem", fontSize: "1.4rem" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
            <AiFillHome />
            <Box>Home</Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default LeftSidebar;