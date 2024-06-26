import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { AiFillHome } from "react-icons/ai";
import { MdCloudDone, MdFavorite, MdPersonSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";

function Header() {
  const navigate = useNavigate();

  const gotohome = () => {
    navigate("/user");
  };
  const gototakenservice = () => {
    if (localStorage.getItem("userToken")) navigate("/user/takenservices");
    else toast.error("You need to login first...");
  };
  const gotofavorites = () => {
    if (localStorage.getItem("userToken")) navigate("/user/favorites");
    else toast.error("You need to login first...");
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
        <Toaster />

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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.7rem",
            cursor: "pointer",
          }}
          onClick={gotofavorites}
        >
          <FaHeart />
          <Box>Favorites</Box>
        </Box>
      </Box>
    </>
  );
}

export default Header;
