import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { FaLocationArrow } from "react-icons/fa";

function LeftSidebar() {
  const city = localStorage.getItem("servifyCityName");
  const [service, setService] = useState();
  useEffect(() => {
    const currentURL = window.location.href;
    const parts = currentURL.split("/");
    setService(parts[parts.length - 1]);
  });
  return (
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.7rem",
            fontSize: "1.3rem",
          }}
        >
          <FaLocationArrow />
          <Box>{city}</Box>
        </Box>
        <Box
          sx={{
            width: "10rem",
            height: "10rem",
            borderRadius: "11px",
            transition: "0.5s",
            background: "linear-gradient(145deg,  #ffffff, #e6e6e6)",
            boxShadow: "15px 15px 30px #bfbfbf, -15px -15px 30px #ffffff",

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <img src="/images/typeuser.png" style={{ width: "5rem" }} />
          <Box sx={{ textAlign: "center", margin: "0.5rem", textTransform:'capitalize' }}>{service}</Box>
        </Box>
      </Box>
    </Box>
  );
}

export default LeftSidebar;
