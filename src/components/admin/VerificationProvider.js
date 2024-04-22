import { Box, Button } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { MdError, MdOutlineReviews, MdVerified } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

function VerificationProvider({ setCT }) {
  const [provider, setProvider] = useState({});
  const [loading, setLoading] = useState(true);
  const id = localStorage.getItem("verificationProvider");
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/provider/getone/${id}`
        );
        // console.log(response);
        setProvider(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, []);

  const navigate = useNavigate();
  const approvedTrue = async () => {
    try {
      setProvider((prevData) => ({
        ...prevData,
        ["approved"]: true,
      }));
      const response = await axios.post(
        `http://localhost:8000/api/provider/providerApproved`,
        provider
      );
      toast.success("Provider Approved");
      setCT(1);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const approvedFalse = (obj) => {
    toast.error("Provider Not Approved");
    setCT(1);
  };
  if (loading) return <h3>Loading....</h3>;
  return (
    <>
      <Box>
        <h2>Verification of this Provider</h2>
      </Box>
      <Box sx={{ mt: "1rem", display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {provider && (
          <Box
            // key={index} // Add a unique key prop for each rendered element
            sx={{
              padding: "1rem",
              width: "50%",
              border: "1px solid #ccc",
              borderRadius: "0.5rem",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "0.3s",
              cursor: "pointer",
              ":hover": {
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              },
            }}
            // onClick={() => clickedServiceProvider(provider)}
          >
            {/* img, name and profession  */}
            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
              <Box>
                <img
                  src={provider.profilePhoto}
                  alt={`Profile of ${provider.fname} ${provider.lname}`}
                  style={{
                    width: "10rem",
                    height: "10rem",
                    border: "1px solid black",
                    borderRadius: "0.5rem",
                    marginRight: "1rem",
                  }}
                />
              </Box>
              <Box>
                <Box sx={{ fontSize: "1.1rem", fontWeight: "600" }}>
                  {provider.fname} {provider.lname}
                </Box>
                <Box sx={{ fontWeight: "600" }}>email : {provider.email}</Box>
                <Box sx={{ fontWeight: "600" }}>
                  mobile : {"+"}
                  {provider.mobile}
                </Box>
                <Box>age : {provider.age}</Box>
                <Box>gender : {provider.gender}</Box>
                <Box>state : {provider.state}</Box>
                <Box>city : {provider.city}</Box>
                <Box>location : {provider.location}</Box>
                <Box>profession : {provider.profession}</Box>
                <Box>visitcharge : ₹{provider.visitcharge}</Box>
                <Box>{provider.created}</Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: "3rem",
                gap: "1rem",
              }}
            >
              <Box>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={() => approvedTrue()}
                >
                  Approved
                </Button>
              </Box>
              <Box>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => approvedFalse()}
                >
                  Not Approved
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
}

export default VerificationProvider;
