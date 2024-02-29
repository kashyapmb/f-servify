import { Box } from "@mui/material";
import React from "react";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { MdCloudDone, MdPersonSearch } from "react-icons/md";

function LeftSidebar() {
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
        <Box sx={{ ml: "3rem" }}>
          <Box sx={{ mt: "2rem", fontSize: "1.2rem" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
              <AiFillHome />
              <Box>Home</Box>
            </Box>
          </Box>
          <Box sx={{ mt: "2rem", fontSize: "1.2rem" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
              <FaHeart />
              <Box>Favourites</Box>
            </Box>
          </Box>
          <Box sx={{ mt: "2rem", fontSize: "1.2rem" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
              <MdCloudDone />
              <Box>Taken Services</Box>
            </Box>
          </Box>
          <Box sx={{ mt: "2rem", fontSize: "1.2rem" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
              <MdPersonSearch />
              <Box>Your Search Activity</Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default LeftSidebar;
