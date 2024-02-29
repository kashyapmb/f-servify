import { Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function UserType() {
  const navigate = useNavigate();
  const navigateService = () => {
    navigate("/user");
  };
  const navigateProviderLogin = () => {
    navigate("/provider/login");
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          background: "#ffffff",
          borderRadius: "0.7rem",
          marginTop: "1rem",
          padding: "1rem 0 2rem 0",
        }}
      >
        <Box sx={{ paddingX: "3rem", paddingY: "1rem" }}>
          <Box
            sx={{ marginBottom: "1rem", fontSize: "1.3rem", fontWeight: "600" }}
          >
            Log in into
          </Box>
          <Box sx={{ display: "flex", gap: "3rem" }}>
            <Box
              sx={{
                width: "10rem",
                height: "10rem",
                borderRadius: "11px",
                background: "#ffffff",
                boxShadow: " 8px 8px 28px #dbdbdb, -8px -8px 28px #ffffff",
                transition: "0.5s",
                ":hover": {
                  borderRadius: "11px",
                  background: "linear-gradient(145deg,  #ffffff, #e6e6e6)",
                  boxShadow: "15px 15px 30px #bfbfbf, -15px -15px 30px #ffffff",
                  // background: linear-gradient(145deg, #ffffff, #e6e6e6);
                },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={navigateService}
            >
              <img src="images/typeuser.png" style={{ width: "5rem" }} />
              <Box sx={{ textAlign: "center", margin: "0.5rem" }}>
                As a User
              </Box>
            </Box>
            <Box
              sx={{
                width: "10rem",
                height: "10rem",
                borderRadius: "11px",
                background: "#ffffff",
                boxShadow: " 8px 8px 28px #dbdbdb, -8px -8px 28px #ffffff",
                transition: "0.5s",
                ":hover": {
                  borderRadius: "11px",
                  background: "linear-gradient(145deg,  #ffffff, #e6e6e6)",
                  boxShadow: "15px 15px 30px #bfbfbf, -15px -15px 30px #ffffff",
                  // background: linear-gradient(145deg, #ffffff, #e6e6e6);
                },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={navigateProviderLogin}
            >
              <img src="images/typeProvider.png" style={{ width: "5rem" }} />
              <Box sx={{ textAlign: "center", margin: "0.5rem" }}>
                As a Service Provider
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default UserType;
