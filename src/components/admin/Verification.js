import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { MdError, MdOutlineReviews, MdVerified } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Verification({ setCT }) {
  const [provider, setProvider] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/provider/getall"
        );
        // console.log(response.data);
        setProvider(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, []);

  const navigate = useNavigate();
  const clickedServiceProvider = (obj) => {
    // console.log(obj);
    localStorage.setItem("verificationProvider", obj._id);
    setCT(11);
  };
  if (loading) return <h3>Loading....</h3>;
  return (
    <>
      <Box>
        <h2>Verification</h2>
      </Box>
      <Box sx={{ mt: "1rem", display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {provider.map(
          (obj, index) =>
            !obj.approved && ( // Check if the object is not approved
              <Box
                key={index} // Add a unique key prop for each rendered element
                sx={{
                  padding: "1rem",
                  width: "40%",
                  border: "1px solid #ccc",
                  borderRadius: "0.5rem",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  transition: "0.3s",
                  cursor: "pointer",
                  ":hover": {
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                  },
                }}
                onClick={() => clickedServiceProvider(obj)}
              >
                {/* img, name and profession  */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box>
                    <img
                      src={obj.profilePhoto}
                      alt={`Profile of ${obj.fname} ${obj.lname}`}
                      style={{
                        width: "6rem",
                        height: "6rem",
                        border: "1px solid black",
                        borderRadius: "0.5rem",
                        marginRight: "1rem",
                      }}
                    />
                  </Box>
                  <Box>
                    <Box sx={{ fontSize: "1.1rem", fontWeight: "600" }}>
                      {obj.fname} {obj.lname}
                    </Box>
                    <Box sx={{ fontWeight: "600" }}>{obj.email}</Box>
                    <Box sx={{ fontWeight: "600" }}>
                      {"+"}
                      {obj.mobile}
                    </Box>
                    <Box>{obj.address}</Box>
                    <Box>{obj.city}</Box>
                    <Box>{obj.created}</Box>
                  </Box>
                </Box>
              </Box>
            )
        )}
      </Box>
    </>
  );
}

export default Verification;
