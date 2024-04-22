import { Box } from "@mui/material";
import React from "react";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { MdCloudDone, MdPersonSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

function LeftSidebar() {
  const navigate = useNavigate();
  const gototakenservice = () => {
    if (localStorage.getItem("userToken")) navigate("/user/takenservices");
    else toast.error("You need to login first...");
  };
  const gotoFavorites = () => {
    if (localStorage.getItem("userToken")) navigate("/user/favorites");
    else toast.error("You need to login first...");
  };
  return (
    <>
      <Box
        sx={{
          pt: "3rem",
          height: "80vh",
          borderRadius: "1rem",
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.7rem",
                cursor: "default",
              }}
            >
              <AiFillHome color="#551b27" />
              <Box sx={{ color: "#551b27", textDecoration: "underline" }}>
                Home
              </Box>
            </Box>
          </Box>

          <Box sx={{ mt: "2rem", fontSize: "1.2rem" }}>
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
          <Box sx={{ mt: "2rem", fontSize: "1.2rem" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.7rem",
                cursor: "pointer",
              }}
              onClick={gotoFavorites}
            >
              <FaHeart />
              <Box>Favorites</Box>
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
