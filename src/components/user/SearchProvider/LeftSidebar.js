import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { FaLocationArrow } from "react-icons/fa";
import { services } from "../../../data/services";

function LeftSidebar() {
  const city = localStorage.getItem("servifyCityName");
  const [domain, setDomain] = useState();
  const [obj, setObj] = useState({});
  useEffect(() => {
    // fetch domain from  url
    const currentURL = window.location.href;
    const parts = currentURL.split("/");
    setDomain(parts[parts.length - 1]);
    // set obj by using domain
    services.map((option) => {
      if (domain == option.domain) setObj(option);
    });
    console.log(obj);
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
        {/* cityname */}
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
        {/* service img and name */}
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
          <img
            src={`/images/services/${obj.img}`}
            style={{ width: "5rem" }}
            alt="Image"
          />
          <Box
            sx={{
              textAlign: "center",
              margin: "0.5rem",
              textTransform: "capitalize",
            }}
          >
            {obj.value}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default LeftSidebar;
