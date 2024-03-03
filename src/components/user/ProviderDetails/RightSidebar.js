import { Box } from "@mui/material";
import React from "react";

function RightSidebar() {
  return (
    <>
      <Box sx={{ top: "2rem", position: "sticky" }}>
        <Box
          sx={{
            height: "10vh",
            borderRadius: "1rem",
            margin: "1rem",

            /* From https://css.glass */
            background: "rgba(255, 255, 255, 0.18)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(8.6px)",

            border: "1px solid white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "50%",
              height: "50%",
              background: "#2962ff",
              color: "white",
              fontSize: "1.2rem",
              ":hover": { background: "blue" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              borderRadius: "1rem",
            }}
          >
            Book
          </Box>
        </Box>
        <Box
          sx={{
            pt: "3rem",
            height: "40vh",
            borderRadius: "1rem",
            margin: "1rem",

            /* From https://css.glass */
            background: "rgba(255, 255, 255, 0.18)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(8.6px)",

            border: "1px solid white",
          }}
        >
          dnwdw
        </Box>
      </Box>
    </>
  );
}

export default RightSidebar;
